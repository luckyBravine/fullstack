"use client";
import avatar from '../../../public/avatar.png'
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import './profile.css'

const url = "http://localhost:3000/profile"

function convertToBase64(file: any){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    image: "",
    yearOfStudy: "",
    course: "",
    registrationNumber: "", 
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postImage, setPostImage] = useState( { myFile : ""})

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/profile", profile);
      
      // Assuming the API response includes the user's role
      const role = response.data.role;

      console.log("Signup successful", response.data);

      // Redirect based on user's role
      if (role === "ADMIN") {
        router.push("/Admin");
      } else if (role === "STUDENT") {
        router.push("/Student");
      } else {
        router.push("/login");
      }
    } catch (error: any) {
      console.log("Profile was not created", error.message);
      toast.error(error.message); 
    } finally {
      setLoading(false);
    }
  };

  // const handleRoleChange = (selectedRole: string) => {
  //   setProfile({ ...profile, role: selectedRole, registrationNumber: "" });
  // };

  useEffect(() => {
    if (
      profile.yearOfStudy.length > 0 &&
      profile.image.length > 0 &&
      profile.course.length > 0 &&
      profile.registrationNumber.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [profile]);

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto w-full place-items-center ">
      <h1>{loading ? "Processing" : "Set Your Profile"}</h1>
      <hr />

      {/* <label htmlFor="username">User Image</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        type="file"
        value={profile.image}
        onChange={(e) => setProfile({ ...profile, image: e.target.value })}
        placeholder="username"
      /> */}
      <label htmlFor="file-upload" className='custom-file-upload'>
          {/* <img src={profile.image || profile} alt="" /> */}
          <Image src={profile.image || avatar} alt="Profile Image" width={50} height={50} className="w-[50px] h-[50px]"/>
      </label>

        <input 
          type="file"
          name="myFile"
          id='file-upload'
          accept='.jpeg, .png, .jpg'
          onChange={(e) => setProfile({ ...profile, image: e.target.value })}
          className="input"
         />
      <label htmlFor="username">Your Of Study</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="number"
        value={profile.yearOfStudy}
        onChange={(e) => setProfile({ ...profile, yearOfStudy: e.target.value })}
        placeholder="Year Of Study"
      />
       <label htmlFor="username">Your Course</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        value={profile.course}
        onChange={(e) => setProfile({ ...profile, course: e.target.value })}
        placeholder="Year Of Study"
      />
        <label htmlFor="username">Registration Number</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        value={profile.registrationNumber}
        onChange={(e) => setProfile({ ...profile,registrationNumber: e.target.value })}
        placeholder="Year Of Study"
      />
      {/* <div className="flex-col">
        <label>Role:</label>
        <div>
          <input
            type="radio"
            id="admin"
            name="role"
            value="ADMIN"
            onChange={() => handleRoleChange("ADMIN")}
          />
          <label htmlFor="admin">Admin</label>
        </div>
        <div>
          <input
            type="radio"
            id="student"
            name="role"
            value="STUDENT"
            onChange={() => handleRoleChange("STUDENT")}
          />
          <label htmlFor="student">Student</label>
        </div>
      </div>

      {profile.role && (
        <div className="flex-col">
          <label htmlFor="registrationNumber">
            {profile.role === "ADMIN" ? "Employee Number" : "Registration Number"}
          </label>
          <input
            className="p-2 border flex-col border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="text"
            value={profile.registrationNumber}
            onChange={(e) => setProfile({ ...profile, registrationNumber: e.target.value })}
            placeholder={
              profile.role === "ADMIN" ? "Enter Employee Number" : "Enter Registration Number"
            }
          />
        </div>
      )} */}
      {/* <label>
          Role:
          <select value={profile.role}  onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
            <option value="STUDENT">Student</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label> */}

      <button
        onClick={onSignUp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={buttonDisabled || loading}
      >
        {loading ? "Saving..." : "Submit"}
      </button>
      <Link href="/login">Already have an Account</Link>
    </div>
  );
}
function createPost(postImage: { myFile: string; }) {
  throw new Error('Function not implemented.');
}

