"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("empty");
  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("Logout successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    
    try{
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id); 
    }catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <h1>Profile</h1>
      <hr />
      <h1>Profile page</h1>
      <hr />
      <h2 className="p-1 bg-green-500">
        {data === "empty" ? "Empty" : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        LogOut
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
    </div>
  );
}

// function useState(arg0: string): [any, any] {
//   throw new Error("Function not implemented.");
// }
