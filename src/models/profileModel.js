import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "STUDENT", 
        enum: ["ADMIN", "STUDENT"],
    },
    registrationNumber: String,
    employeeNumber: String,
})

const Profile = mongoose.models.userProfile || mongoose.model("userProfile", profileSchema);

export default Profile  