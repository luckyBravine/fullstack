import { connect } from "@/dbConfig/dbConfig";
import Lecturer from "@/models/lecturerModel"
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: any) {
  const {  firstname, lastname, email, password, employeeNumber } = await request.json();
  await connect();
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  await Lecturer.create({ firstname, lastname, email, password: hashedPassword, employeeNumber });
  return NextResponse.json({ message: "Lecturer Created" }, { status: 201 });
}

export async function GET() {
  await connect();
  const lecturer = await Lecturer.find();
  return NextResponse.json({ lecturer });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connect();
  await Lecturer.findByIdAndDelete(id);
  return NextResponse.json({ message: "Lecturer deleted" }, { status: 200 });
}