"use client";
import { IoClose } from "react-icons/io5";
import dr_patel from "../../../../../public/dr_patel.jpg";
import dr_Njeri from "../../../../../public/dr_Njeri.jpg";
// import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import Image from "next/image";
import { useState } from "react";

const Notification = () => {
  return (
    <main className="bg-white absolute top-18 rounded w-[300px] flex flex-col">
      <div className=" rounded-t p-2 flex justify-between shadow-sm w-full mx-auto items-center">
        <div className="flex justify-center ">
          <span className="mr-2">0</span>
          <h1>Notifications</h1>
        </div>
        {/* <button className="right-0 left-0 flex-end bg-white h-6 w-6 flex justify-center rounded-full">
          <IoClose />
        </button> */}
      </div>
      <div className="my-2">
        <div className="p-1 flex justify-evenly">
          <Image
            src={dr_patel}
            alt="dr Patel"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h1 className="text-sm font-bold">Dr. Patel Sighn</h1>
              <span className="text-stone-500 text-sm font-poppins">2 sec</span>
            </div>
            <p className="text-stone-600 text-sm font-poppins">
              Lorem, ipsum dolor sit.
            </p>
          </div>
          <div className="flex justify-center align-center place-items-center">
            <RiDeleteBin6Line />
          </div>
        </div>
        <div className="p-1 flex justify-evenly">
          <Image
            src={dr_Njeri}
            alt="dr Patel"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h1 className="text-sm font-bold">Dr. Njeri Ndugu</h1>
              <span className="text-stone-500 text-sm font-poppins">4 sec</span>
            </div>
            <p className="text-stone-600 text-sm font-poppins">
              Lorem, ipsum dolor sit.
            </p>
          </div>
          <div className="flex justify-center align-center place-items-center">
            <RiDeleteBin6Line />
          </div>
        </div>
      </div>
      <div className="py-2 bottom-0 text-center bg-blue-400 rounded-b">
        <h1 className="text-base text-white">Mark all as read</h1>
      </div>
    </main>
  );
};

export default Notification;
