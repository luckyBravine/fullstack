import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Profile from "@/models/profileModel"
import { NextRequest, NextResponse } from "next/server";


connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {image, registrationNumber, course, yearOfStudy} = reqBody

        console.log(reqBody)

        //check if user exists
        // const user = await User.findOne({email})

        // if(user){
        //     return NextResponse.json({error: "User doesn't exist"}, {status: 400})
        // }

        const base64Image = image.split(',')[1]; 

        const newProfile = new Profile({
            role: String, // You might want to replace this with an actual role value
            registrationNumber,
            course,
            base64Image, 
            yearOfStudy,
        }

        const savedUser = await newProfile.save()
        console.log(savedUser)

        return NextResponse.json({
            message: "Profile created successfully",
            success: true,
            status: 201,
            savedUser,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

function UserProfile() {
    throw new Error("Function not implemented.");
}
