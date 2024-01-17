"use client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import  axios  from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function SignupPage() {

//   const router = useRouter();

//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//     username: "",
//   });

//   const [buttonDisabled, setButtonDisabled] = useState(false)

//   const [loading, setLoading] = useState(false)

//  const onSignUp = async () => {
//   try{
//     setLoading(true);
//     const response = await axios.post('/api/users/signup', user);

//     console.log("signup successfull", response.data)
//     router.push("/login")
//   }catch(error: any){
//     console.log("SignUp was successfull", error.message )
//     toast.error(error.message)
//   }finally{
//     setLoading(false)
//   }
//  };

//   useEffect(() => {
//     if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
//       setButtonDisabled(false)
//     }else{
//       setButtonDisabled(true)
//     }
//   }), [user]
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-between">
//       <h1>{loading ? "Processing" : "SignUp"}</h1>
//       <hr />

//       <label htmlFor="username">Username</label>
//       <input
//         className="text-black outline-none border-none px-1 py-2 rounded-lg mb-2"
//         type="text"
//         value={user.username}
//         onChange={(e) => setUser({ ...user, username: e.target.value })}
//         placeholder="username"
//       />
//       <label htmlFor="username">Email</label>
//       <input
//         className="text-black outline-none border-none px-1 py-2 rounded-lg mb-2"
//         type="text"
//         value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//         placeholder="email"
//       />
//       <label htmlFor="username">Password</label>
//       <input
//         className="text-black outline-none border-none px-1 py-2 rounded-lg mb-2"
//         type="password"
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//       />

//       <button
//         onClick={onSignUp}
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
//       >
//         {buttonDisabled ? "No SignUp" : "SignUp"}
//       </button>
//       <Link href='/login'>Already have an Account</Link>
//     </div>
//   );
// }
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    role: "", // New field for role
    registrationNumber: "", // New field for registration/employee number
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      
      // Assuming the API response includes the user's role
      const role = response.data.role;

      console.log("Signup successful", response.data);

      // Redirect based on user's role
      if (role === "ADMIN") {
        router.push("/Moderator"); // Update with your admin page path
      } else if (role === "STUDENT") {
        router.push("/Student"); // Update with your student page path
      } else {
        router.push("/login");
      }
    } catch (error: any) {
      console.log("Signup was unsuccessful", error.message);
      toast.error(error.message); 
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (selectedRole: string) => {
    setUser({ ...user, role: selectedRole, registrationNumber: "" });
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.role &&
      (user.registrationNumber.length > 0 || user.role === "STUDENT") // Check if registration number is provided for students
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto w-full place-items-center ">
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
      <div>
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

      {user.role && (
        <div>
          <label htmlFor="registrationNumber">
            {user.role === "ADMIN" ? "Employee Number" : "Registration Number"}
          </label>
          <input
            className="text-black outline-none border-none px-1 py-2 rounded-lg mb-2"
            type="text"
            value={user.registrationNumber}
            onChange={(e) => setUser({ ...user, registrationNumber: e.target.value })}
            placeholder={
              user.role === "ADMIN" ? "Enter Employee Number" : "Enter Registration Number"
            }
          />
        </div>
      )}

      <button
        onClick={onSignUp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={buttonDisabled || loading}
      >
        {loading ? "Processing..." : "SignUp"}
      </button>
      <Link href="/login">Already have an Account</Link>
    </div>
  );
}
