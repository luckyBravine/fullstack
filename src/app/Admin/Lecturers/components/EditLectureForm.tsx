"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditLectureForm({
  firstname,
  lastname,
  email,
  password,
  employeeNumber,
}) {
  const [newFirstname, setFirstname] = useState(firstname);
  const [newLastname, setLastname] = useState(lastname);
  const [newEmail, setEmail] = useState(email);
  const [newPassword, setPassword] = useState(password);
  const [newEmployeeNumber, setEmployeeNumber] = useState(employeeNumber);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/lecturer/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newFirstname,
          newLastname,
          newEmail,
          newPassword,
          newEmployeeNumber,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setFirstname(e.target.value)}
        value={newFirstname}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Firstname"
      />

      <input
        onChange={(e) => setLastname(e.target.value)}
        value={newLastname}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Lastname"
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={newPassword}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Firstname"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={newEmail}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Firstname"
      />
      <input
        onChange={(e) => setEmployeeNumber(e.target.value)}
        value={newEmployeeNumber}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Firstname"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
}
