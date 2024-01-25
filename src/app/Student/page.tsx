"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import dr_patel from "../../../public/dr_patel.jpg";
import dr_Njeri from "../../../public/dr_Njeri.jpg";
import { BsSearch, BsFileEarmarkText } from "react-icons/bs";
import { IoMdNotificationsOutline, IoMdHome } from "react-icons/io";
import { AiOutlinePrinter } from "react-icons/ai";
// import Select from "react-select";
import Notification from "./Components/Notification/Notification"
import Link from "next/link";
const table = [
  {
    morning: {
      date_name: "Mon",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sinh",  
    },
    mid_morning: {
      date_name: "Mon",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "1000hrs-1300hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
    evening: {
      date_name: "Mon",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "1300hrs-1600hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
  },
  {
    morning: {
      date_name: "Tue",
      date_number: "27/4/2023",
      unit: "Free Lesson",
      time: "0700hrs-1000hrs",
      venue: "",
      img: dr_Njeri,
      lec: "Dr.Njeri",
    },
    mid_morning: {
      date_name: "Tue",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_patel,
      lec: "Dr.Patel Sighn",
    },
    evening: {
      date_name: "Tue",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
  },
  {
    morning: {
      date_name: "Wed",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_patel,
      lec: "Dr.Patel Sighn",
    },
    mid_morning: {
      date_name: "Wed",
      date_number: "27/3/2023",
      unit: "AMM 103",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
    evening: {
      date_name: "Wed",
      date_number: "27/3/2023",
      unit: "Free Lesson",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
  },
  {
    morning: {
      date_name: "Thur",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
    mid_morning: {
      date_name: "Thur",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
    evening: {
      date_name: "Thur",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
  },
  {
    morning: {
      date_name: "Fri",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
    mid_morning: {
      date_name: "Fri",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
    evening: {
      date_name: "Fri",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
  },
  {
    morning: {
      date_name: "Sat",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
    mid_morning: {
      date_name: "Sat",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
    evening: {
      date_name: "Sat",
      date_number: "27/3/2023",
      unit: "AMM 102",
      time: "0700hrs-1000hrs",
      venue: "Tution Block",
      img: dr_Njeri,
      lec: "Dr.Patel Sighn",
    },
  },
];

const getDayTime = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 10) {
    return "morning";
  } else if (currentHour < 13) {
    return "mid_morning";
  } else {
    return "evening";
  }
};

const timesOfDay = ["morning", "mid_morning", "evening"];

const Student = () => {
  const [selectedItems, setSelectedItems] = useState(
    Array(table.length).fill(null)
  );
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState(getDayTime());

  const [show, setShow] = useState(false)
  const [close, setClose] = useState(false)

  const handleItemClick = (index: any, timeOfDay: string) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = timeOfDay;
    setSelectedItems(newSelectedItems);
    setCurrentTimeOfDay(timeOfDay);
  };

  const handleUpdateTimeOfDay = () => {
    setCurrentTimeOfDay(getDayTime());
  };

  useEffect(() => {
    // Update the time of day periodically (e.g., every minute)
    const interval = setInterval(handleUpdateTimeOfDay, 60000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const searchOptions = [
    { value: "Math", label: "math" },
    { value: "English", label: "english" },
    { value: "Science", label: "science" },
    { value: "Insha", label: "insha" },
  ];
  const handleChange = (selectedOptions: any) => {
    console.log("handleChange", selectedOptions);
  };
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: 20,
      backgroundColor: state.isFocused ? "#e0f7fa" : "#e0f7fa",
    }),
  };

  // 

  return (
    <main className="flex flex-col justify-center place-items-center items-center mx-auto w-full overflow-hidden">
      <nav className="py-6 flex justify-between place-items-center items-center mx-auto relative  w-[100vw] shadow-lg">
        <div className="flex items-center w-[80%] mx-auto justify-around">
        <Link
            className="bg-[#313131] p-1 rounded-full flex justify-center items-center"
            href="/"
          >
            <div className="flex items-center">
            <IoMdHome className="relative w-5 h-5 ml-2 mr-1 text-slate-300" />
            <span className=" text-base text-slate-300">Home</span>
            </div>
          </Link>
          <div className="flex bg-[#313131]  items-center rounded-full">
            <BsSearch className="w-4 ml-3 mr-1 h-4 text-slate-300" />
            <input
              type="text"
              placeholder="Search Classes here"
              className="p-1 bg-transparent outline-none w-[80%] rounded-r-full"
            />
          </div>
          <div>
            <button className="bg-[#313131]  p-1 rounded-full w-7 h-7 flex justify-center items-center relative" onClick={() => setShow(!show)} >
              <IoMdNotificationsOutline className="relative w-6 h-6 text-slate-300" />
              {show ? <div className="absolute bg-green-400 w-3 h-3 rounded-full top-[-3px] ml-4"></div> : null}
              
            </button>
            { show ? null : <Notification /> }
          </div>
          {/* <Select
            options={searchOptions}
            className="rounded-full "
            placeholder="School of"
            onChange={handleChange}
            styles={customStyles}
          /> */}
          <div>
            <button className="bg-[#313131] p-1 rounded-full flex justify-center items-center">
              <AiOutlinePrinter className="relative w-6 h-6 ml-3 mr-1 text-slate-300" />
              <span className=" mr-1 text-base text-slate-300">
                Generate Report
              </span>
            </button>
          </div>
          <div>
            <button className="bg-[#313131] p-1 rounded-full flex justify-center items-center">
              <BsFileEarmarkText className="relative text-lg ml-3 mr-1 text-slate-300" />
              <span className=" mr-1 text-base text-slate-300">
                SC211/1088/2019
              </span>
            </button>
          </div>
        </div>
      </nav>
      <section className="grid my-6 gap-x-0 items-center place-items-center justify-center overflow-x-hidden mx-auto w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {table.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center mx-auto place-items-center items-center bg-stone-800 rounded-lg w-[80%]"
          >
            <div className="bg-stone-700 flex justify-between mx-auto w-full p-3 rounded-t-lg"> 
              <h3 className="font-semibold text-lg ">
                {item[currentTimeOfDay].date_name}
              </h3>
              <h4 className="text-base text-slate-200">
                {item[currentTimeOfDay].date_number}
              </h4>
            </div>
            <div className="flex flex-col justify-between mx-auto w-full p-3">
              <div className="flex items-center my-2">
                <label htmlFor="" className="text-slate-200 text-base">
                  Unit:
                </label>
                <span className="font-bold text-base ml-3">
                  {item[currentTimeOfDay].unit}
                </span>
              </div>
              <div className="flex items-center my-2">
                <label htmlFor="" className="text-slate-200 text-base">
                  Time:
                </label>
                <span className="font-bold text-base ml-3">
                  {item[currentTimeOfDay].time}
                </span>
              </div>
              <div className="flex items-center my-2">
                <label htmlFor="" className="text-slate-200 text-base">
                  Venue:
                </label>
                <span className="font-bold text-base ml-3">
                  {item[currentTimeOfDay].venue}
                </span>
              </div>
            </div>
            <div className="flex mx-auto w-full p-3 items-center">
              <Image
                alt={item[currentTimeOfDay].lec}
                src={item[currentTimeOfDay].img}
                className="w-8 h-7 object-cover rounded-full"
              />
              <span className="font-semibold text-sm ml-3">
                {item[currentTimeOfDay].lec}
              </span>
            </div>
            <div className="flex justify-center mx-auto w-full p-3 items-center">
              {timesOfDay.map((time) => (
                <div
                  key={time}
                  onClick={() => handleItemClick(index, time)}
                  className={`bg-slate-100 w-3 h-3 rounded-full mx-1 cursor-pointer ${
                    currentTimeOfDay === time ? "opacity-100" : "opacity-50"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Student;
