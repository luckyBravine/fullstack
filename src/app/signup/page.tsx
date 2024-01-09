"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {

  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)

 const onSignUp = async () => {
  try{
    setLoading(true);
    const response = await axios.post('/api/users/signup', user);

    console.log("signup successfull", response.data)
    router.push("/login")
  }catch(error: any){
    console.log("SignUp was successfull", error.message )
    toast.error(error.message)
  }finally{
    setLoading(false)
  }
 };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }), [user]
  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <h1>{loading ? "Processing" : "SignUp"}</h1>
      <hr />

      <label htmlFor="username">Username</label>
      <input
        className="text-black outline-none border-none px-1 py-2 rounded-lg mb-2"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
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
        onClick={onSignUp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No SignUp" : "SignUp"}
      </button>
      <Link href='/login'>Already have an Account</Link>
    </div>
  );
}
