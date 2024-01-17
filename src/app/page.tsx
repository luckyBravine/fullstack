"use client";
import Image from "next/image";
import { registerLicense } from "@syncfusion/ej2-base";
import { useState } from "react";
import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import sheduler from "../../public/sheduler.jpg";
import admin from "../../public/admin.jpg";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH5feXRVRGFeWE1yV0M="
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-200">
      <main className="w-full relative flex flex-col mx-auto overflow-x-hidden justify-center">
        <nav className="flex justify-around items-center mx-auto p-4 w-[100%] bg-white">
          <header className="text-lg font-bold font-poppins">CTMS</header>
          <div className="flex justify-around"><Link
            href="/login"
            className="w-[200px] rounded-full p-2 flex justify-center mx-auto items-center place-items-center my-2 border border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Login <HiOutlineArrowLongRight className="ml-2" />
          </Link>
          <Link
            href="/signup"
            className="w-[200px] rounded-full p-2 flex justify-center mx-auto items-center place-items-center my-2 border border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Register <HiOutlineArrowLongRight className="ml-2" />
          </Link></div>
        </nav>
        <section className="mt-7 py-8 flex place-items-center items-center w-[90vw] mx-auto justify-center">
          <div className="w-[40%] flex flex-col mx-auto">
            <h1 className="font-bold text-5xl mb-3 font-poppins">
              Welcome to CTMS
            </h1>
            <span className="text-base text-stone-700 leading-9">
              Empower your academic journey with the Classmate Timetable
              Management System – where efficiency meets organization. Say
              goodbye to scheduling chaos and hello to seamless class planning.
              Revolutionize your timetable experience today!
            </span>
          </div>
          <div className="flex justify-evenly w-[50%] mx-auto place-items-center">
            <div className="bg-white rounded-sm w-[280px]">
              <div className="bg-green-300 w-full rounded-t-sm h-40">
                <Image
                  className="object-contain"
                  src={sheduler}
                  alt="sheduler"
                />
              </div>
              <div className="flex-col my-5">
                <div className="p-2">
                  <h2 className="text-lg font-semibold font-poppins">
                    Student's Page
                  </h2>
                  <p className="font-poppins text-sm text-stone-600 ">
                    Get Updated on timely schedules for your classes, cats and
                    exams
                  </p>
                </div>
                <Link
                  href="/Profile"
                  className="w-[90%] rounded-full p-2 flex justify-center mx-auto items-center place-items-center my-2 border border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Take A Look <HiOutlineArrowLongRight className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-sm w-[280px]">
              <div className="bg-green-300 w-full rounded-t-sm h-40">
                <Image className="object-contain" src={admin} alt="sheduler" />
              </div>
              <div className="flex-col my-5">
                <div className="p-2">
                  <h2 className="text-lg font-semibold font-poppins">
                    Moderator's Page
                  </h2>
                  <p className="font-poppins text-sm text-stone-600 ">
                    Restricted access to authorized personel only.
                  </p>
                </div>
                <Link
                  href="/Moderator"
                  className="w-[90%] rounded-full p-2  flex justify-center mx-auto items-center place-items-center my-2 border border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Get Verified <HiOutlineArrowLongRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <section className="bg-white h-20 rounded p-6 flex fixed left-0 right-0 mx-auto justify-evenly w-[80%] bottom-0 ">
        <div className="flex">
          <span className="text-4xl text-blue-400 mr-2">10</span>
          <h3 className="text-sm text-stone-600 font-semibold font-poppins">
            Learning <br /> Institutions
          </h3>
        </div>
        <div className="h-[80%] flex justify-center w-[2px] bg-slate-400"></div>
        <div className="flex">
          <span className="text-4xl text-blue-400 mr-2">1000</span>
          <h3 className="text-sm text-stone-600 font-semibold font-poppins">
            Learning <br /> Students
          </h3>
        </div>
        <div className="h-[80%] flex justify-center w-[2px] bg-slate-400"></div>
        <div className="flex">
          <span className="text-4xl text-blue-400 mr-2">60</span>
          <h3 className="text-sm text-stone-600 font-semibold font-poppins">
            Administrative <br /> Moderators
          </h3>
        </div>
      </section>
    </div>
  );
}
