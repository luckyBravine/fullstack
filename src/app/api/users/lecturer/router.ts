import { connect } from "@/dbConfig/dbConfig";
import Lecturer from "@/models/lecturerModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: any) {
  console.log("we are here")
  try{const reqBody = await request.json();
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
  }catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const lecturer = await Lecturer.find();
    const rows = Array.isArray(lecturer)
      ? lecturer.map((lecturer) => lecturer.toObject())
      : [];
    return NextResponse.json({ rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await Lecturer.findByIdAndDelete(id);
  return NextResponse.json({ message: "Lecturer deleted" }, { status: 200 });
}
