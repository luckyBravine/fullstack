"use client";
import { IoClose } from "react-icons/io5";
import dr_patel from "../../../../../public/dr_patel.jpg";
import dr_Njeri from "../../../../../public/dr_Njeri.jpg";
// import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import Image from "next/image";
import { useState } from "react";


const Notification = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "Dr. Patel Sighn",
      message: "Let's meet at 2pm, venue F1,2.",
      img: dr_Njeri,
    },
    {
      id: 2,
      name: "Dr. Njeri Ndugu",
      message: "No class today, Revise the notes.",
      img: dr_patel,
    }
  ]);

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications([]);
  };
  return (
    <div className={`absolute top-20 z-50 ${showNotification ? 'block' : 'hidden'}`}>
      <main className="bg-white rounded-lg shadow-lg w-80">
        <div className="flex items-center justify-between px-4 py-2 bg-blue-100 rounded-t-lg">
          <div className="flex justify-center ">
            <span className="mr-2 text-stone-800 font-semibold">{notifications.length}</span>
            <h1 className="text-black font-bold">Notifications</h1>
          </div>
          <button onClick={() => setShowNotification(false)}>
            <IoClose className="text-black" />
          </button>
        </div>
        <div className="my-1">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-1 flex justify-evenly bg-slate-300 rounded my-1 mx-2 hover:mx-0">
              <div className="flex items-center">
                <Image
                  src={notification.img}
                  alt={notification.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="ml-2 flex flex-col">
                  <div className="flex justify-between">
                    <h1 className="text-sm font-bold text-stone-600">{notification.name}</h1>
                    <span className="text-stone-500 text-sm font-poppins">2 sec</span>
                  </div>
                  <p className="text-stone-500 text-sm font-poppins">{notification.message}</p>
                </div>
              </div>
              <button
                onClick={() => deleteNotification(notification.id)}
                className="flex justify-center align-center place-items-center"
              >
                <RiDeleteBin6Line className="text-red-400" />
              </button>
            </div>
          ))}
        </div>
        <div className="py-2 bg-blue-200 rounded-b-lg text-center" onClick={() => markAllAsRead()}>
          <h1 className="text-sm font-semibold text-gray-600 hover:text-gray-800 cursor-pointer">
            Mark all as read
          </h1>
        </div>
      </main>
    </div>
  );
};

export default Notification;
