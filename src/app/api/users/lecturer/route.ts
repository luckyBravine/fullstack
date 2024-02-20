import { connect } from "@/dbConfig/dbConfig";
import Lecturer from "@/models/lecturerModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: any) {
  console.log("we are here")
  try {
    const reqBody = await request.json();
    const { firstname, lastname, email, password, employeeNumber } = reqBody;
    console.log(reqBody);
    const lecturer = await Lecturer.findOne({ email });
    if (lecturer) {
      return NextResponse.json({ error: "User already exist" }, { status: 400 });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log("we inside nigga")
    const newLecturer = new Lecturer({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      employeeNumber,
    });
    const savedLecturer = await newLecturer.save();
    return NextResponse.json(
      { message: "Lecturer Created", savedLecturer, success: true, status: 201 },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const lecturer = await Lecturer.find();
    const rows = Array.isArray(lecturer) ? lecturer.map(lecturer => lecturer.toObject()) : [];
    return NextResponse.json( rows );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await Lecturer.findByIdAndDelete(id);
  return NextResponse.json({ message: "Lecturer deleted" }, { status: 200 });
}

// export async function PUT(req: NextRequest) {
//   try {
//     const id = req.nextUrl.searchParams.get("id");;

//     // Check if id is provided
//     if (!id) {
//       return NextResponse.json({ error: "No id provided for updating lecturer" }, { status: 400 });
//     }

//     // Extract the updated lecturer details from the request body
//     const { newFirstName, newLastName, newEmail, newPassword, newEmployeeNumber } = await req.json();

//     // Prepare an object with the updated fields
//     const updateFields = {};
//     if (newFirstName) updateFields.firstname = newFirstName;
//     if (newLastName) updateFields.lastname = newLastName;
//     if (newEmail) updateFields.email = newEmail;
//     if (newPassword) updateFields.password = newPassword;
//     if (newEmployeeNumber) updateFields.employeeNumber = newEmployeeNumber;

//     // Update the lecturer using the findByIdAndUpdate method
//     const updatedLecturer = await Lecturer.findByIdAndUpdate(id, updateFields, { new: true });
//     console.log(updatedLecturer)

//     // Check if the lecturer was not found
//     if (!updatedLecturer) {
//       return NextResponse.json({ error: "Lecturer not found" }, { status: 404 });
//     }

//     // Return the updated lecturer
//     return NextResponse.json({ message: "Lecturer updated", updatedLecturer });
//   } catch (error: any) {
//     console.error("Error updating lecturer:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
export async function PUT(request: any) {
  const id = request.nextUrl.searchParams.get("id");;
  const { newFirstName: firstname, newLastName: lastname, newEmail: email, newPassword: password, newEmployeeNumber: employeeNumber } = await request.json();
  const updatedLecturer = await Lecturer.findByIdAndUpdate(id, { firstname, lastname, email, password, employeeNumber });
  console.log(updatedLecturer)
  return NextResponse.json({ message: "Lecturer updated", updatedLecturer }, { status: 200 });
}

