// import mongoose from 'mongoose';
// import { NextRequest, NextResponse } from 'next/server';
// import { connect } from '@/dbConfig/dbConfig';
// import { Timetable } from '@/models/timetableModel';

// connect();

// export async function GET(request: NextRequest){
//     try {
//         const latestTimetable = await Timetable.findOne({}, {}, { sort: { lastModified: -1 }, limit: 1 });
//         if (!latestTimetable) {
//             return NextResponse.json({ error: 'No PDF found' }, { status: 404 });
//         }

//         // Retrieve the PDF file from GridFS
//         const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//             bucketName: 'timetables'
//         });
//         const file = await bucket.find({ _id: latestTimetable.fileId }).next();
//         const pdfData = await new Promise<Buffer>((resolve, reject) => {
//             const chunks: Uint8Array[] = [];
//             file?.stream()
//                 .on('data', (chunk: Uint8Array) => chunks.push(chunk))
//                 .on('end', () => resolve(Buffer.concat(chunks)))
//                 .on('error', (error: Error) => reject(error));
//         });

//         // Send response with the PDF data
//         return new NextResponse({ body: pdfData, headers: { 'Content-Type': 'application/pdf' } });
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

// import mongoose from 'mongoose';
// import { NextRequest, NextResponse } from 'next/server';
// import { connect } from '@/dbConfig/dbConfig';
// import { Timetable } from '@/models/timetableModel';

// connect();

// export async function GET(request: NextRequest){
//     try {
//         const latestTimetable = await Timetable.findOne({}, {}, { sort: { lastModified: -1 }, limit: 1 });
//         if (!latestTimetable) {
//             return NextResponse.json({ error: 'No PDF found' }, { status: 404 });
//         }

//         // Retrieve the PDF file from GridFS
//         const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//             bucketName: 'timetables'
//         });
//         const file = await bucket.find({ _id: latestTimetable.fileId }).next();
//         const pdfData = await new Promise<Buffer>((resolve, reject) => {
//             const chunks: Uint8Array[] = [];
//             file?.stream()
//                 .on('data', (chunk: Uint8Array) => chunks.push(chunk))
//                 .on('end', () => resolve(Buffer.concat(chunks)))
//                 .on('error', (error: Error) => reject(error));
//         });

//         // Send response with the PDF data
//         return new NextResponse({ body: pdfData, headers: { 'Content-Type': 'application/pdf' } });
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }


import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import { Timetable } from '@/models/timetableModel';
import { GridFSBucket } from 'mongodb';
import { resolve } from 'dns';

connect();

export async function GET(request: NextRequest){
    try {
        const latestTimetable = await Timetable.findOne({}, {}, { sort: { lastModified: -1 }, limit: 1 });
        if (!latestTimetable) {
            return NextResponse.json({ error: 'No PDF found' }, { status: 404 });
        }

        const bucket = new GridFSBucket(mongoose.connection.db);

        const downloadStream = bucket.openDownloadStream(latestTimetable._id);

        downloadStream.on('data', (chunk) => {
          chunk.push(chunk)
        });

        downloadStream.on('end', (chunk: Uint8Array) => {
          return resolve(Buffer.concat(chunk));
        });

        downloadStream.on('error', (error) => {
          return  reject(error)
        });

        // Send response indicating the file download has started
        return NextResponse.json({ message: 'PDF download started' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
function reject(error: Error): void {
  throw new Error('Function not implemented.');
}

