"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios  from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try{
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
  
      console.log("Login successfull", response.data)
      toast.success("Login successfull");
      router.push("/profile")
    }catch(error: any){
      console.log("Login was successfull", error.message )
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  };
  
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }), [user]
  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <h1>{loading ? "Processing" : "LogIn"}</h1>
      <hr />
      <label htmlFor="username">Email</label>
      <input
        className="text-black outline-none border-none px-1 py-2 rounded-lg mb-2"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="username">Password</label>
      <input
        className="text-black outline-none border-none px-1 py-2 rounded-lg mb-2"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
       {buttonDisabled ? "No LogIn" : "LogIn"}
      </button>
      <Link href='/signup'>Don't have an Account yet?</Link>
    </div>
  );
}
