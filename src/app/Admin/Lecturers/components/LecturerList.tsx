"use client"
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useEffect, useState } from 'react';

const getTopics = async () => {
  try {
    const res = await axios.get("/api/users/lecturer");
    console.log("API response:", res.data);
    toast.success('User exists');

    const { rows } = res.data;
    return rows || [];
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function LecturerList() {
  // const [rows, setRows] = useState([]);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("/api/users/lecturer");
  //       console.log("API response:", res.data);
  //       toast.success('User exists');

  //       const { rows } = res.data;
  //       setRows(rows || []);
  //     } catch (error) {
  //       console.log("Error loading topics: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []); 

  // if (!Array.isArray(rows) || rows.length === 0) {
  //   // Handle the case where rows is undefined or not an array
  //   return <div>No lecturer data available</div>;
  // }


  return (
    <>
      {/* {rows && rows.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))} */}
    </>
  );
}

