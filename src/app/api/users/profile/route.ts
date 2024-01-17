import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Profile from "@/models/profileModel"
import { NextRequest, NextResponse } from "next/server";


connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, image, registrationNumber, employeeNumber, yearOfStudy} = reqBody

        console.log(reqBody)

        //check if user exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User doesn't exist"}, {status: 400})
        }
        


        const newProfile = new Profile({
            Image,
            role: String,
            registrationNumber: user.role === "STUDENT" ? registrationNumber : undefined,
            employeeNumber: user.role === "ADMIN" ? employeeNumber : undefined,
        })

        const savedUser = await newProfile.save()
        console.log(savedUser)

        return NextResponse.json({
            message: "User created successfully",
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
