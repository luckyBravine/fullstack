import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker';
// import pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "../../node_modules/pdfjs-dist/build/pdf.worker.js";

// Define the filter options
interface TimetableItem {
  day: string;
  time: string;
  lecturer: string;
  unit: string;
  courseTitle: string;
  venue: string;
}

const parseTimetablePage = async (pageNumber) => {
  try {
    const existingPdfBytes = await fetch('timetable.pdf').then(res => res.arrayBuffer());
    const pdf = await pdfjsLib.getDocument({ data: existingPdfBytes }).promise;
    const page = await pdf.getPage(pageNumber);
    const textContentOnPage = await page.getTextContent();
    const text = textContentOnPage.items.map(item => item.str).join('\n');

    console.log("Extracted text from page", pageNumber);
    console.log(text);

    const dayRegex = /(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY)/g;
    // const timeRegex = /(\d{1,2}\.\d{2}[ap]m-\d{1,2}\.\d{2}[ap]m)/g;
    const timeRegex = /(\d{1,2}\.\d{2}[ap]m-\d{1,2}\.\d{2}[ap]m|\d{1,2}\.\d{2}[ap]m-\d{1,2}\.\d{2}[ap]m|\d{1,2}\.\d{2}[ap]m-\d{1,2}\.\d{2}[ap]m)/g;
    const lecturerRegex = /[A-Z]\.[A-Za-z]+/g;
    const unitRegex = /[A-Z]+\s\d{3}(?:\/[A-Z]+\s?\d{3})?/g;
    const courseTitleRegex = /[A-Z][a-z]+\s[A-Z][a-z]+/g;
    const venueRegex = /[A-Z]\d\.\d(?:\/[A-Z]\d\.\d)?/g;

    const days = text.match(dayRegex);
    const times = text.match(timeRegex);
    const lecturers = text.match(lecturerRegex);
    const units = text.match(unitRegex);
    const courseTitles = text.match(courseTitleRegex);
    const venues = text.match(venueRegex);

    if (!days || !times || !lecturers || !units || !courseTitles || !venues) {
      console.error("Failed to extract timetable details from page", pageNumber);
      return null;
    }

    const timetableDetails = days.reduce((acc, day, index) => {
      acc[day] = acc[day] || [];
      acc[day].push({
        time: times[index],
        lecturer: lecturers[index],
        unit: units[index],
        courseTitle: courseTitles[index],
        venue: venues[index]
      });
      return acc;
    }, {});

    console.log("Timetable details extracted successfully for page", pageNumber);

    return timetableDetails;
  } catch (error) {
    console.error("Failed to parse timetable", error.message);
    return null;
  }
}


const matchTimetableDetails = async () => {
  const timetableDetails = {};

  for (let i = 1; i <= 13; i++) {
    const details = await parseTimetablePage(i);
    if (details) {
      Object.entries(details).forEach(([day, lectures]) => {
        if (!timetableDetails[day]) {
          timetableDetails[day] = [];
        }
        timetableDetails[day].push(...lectures);
      });
    }
  }

  console.log("Matched Timetable Details:");
  console.log(timetableDetails);
};

matchTimetableDetails();
const filterOptions = {
  years: ['Y1', 'Y2', 'Y3', 'Y4'],
  semesters: ['Y1S1', 'Y1S2', 'Y2S1', 'Y2S2', 'Y3S1', 'Y3S2', 'Y4S1', 'Y4S2'],
  courses: [
    'BCOM',
    'BA Dev Stud. with IT',
    'BSc.HRM',
    'BSc.EP',
    'BSc.Agric',
    'BSc.Agri.Econ',
    'BSc Agr.Edu & Ext',
    'BSc Agr.Mgt & Entr',
    'BSc.ASP',
    'BSc. M.E',
    'BSc. M&C.S',
    'Statistics',
    'Applied',
    'BSc A.Sc',
    'B. MLS',
    'BSc Nursing',
    'BSc Comm Health',
    'BSc Env Health',
    'BSc A.Chemistry',
    'BSc I.Chemistry',
    'B.Ed.Sc',
    'B.Ed.Arts',
    'BLC',
    'BJDM',
    'BSc. C.S.S',
    'BSc.Pub Adm & Gov',
    'Dip. C.S.S',
    'B.Ted Electrical',
    'B.Ted Mech',
    'B.Ted Civil',
    'BSc ELEC',
    'BSc ELEC(PWR)',
    'BSc ELEC(TLCM)',
    'BTECH ELEC',
    'BTECH MECH',
    'BSc. IT',
    'BBIT',
    'BSc. SE',
    'BSc. CS',
    'BSc. COMP. Tech',
    'BSc. TTM',
    'BSc. Tourism',
    'BSc. Hospitality',
  ],
};

const TimetableFilter = ({ applyFilter }) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    applyFilter(selectedYear, selectedSemester, selectedCourse);
  }, [selectedYear, selectedSemester, selectedCourse]);

  return (
    <div className="flex justify-center items-center space-x-4">
      <select
        className="border border-gray-300 rounded-md px-3 py-1"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Select Year</option>
        {filterOptions.years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        className="border border-gray-300 rounded-md px-3 py-1"
        value={selectedSemester}
        onChange={(e) => setSelectedSemester(e.target.value)}
      >
        <option value="">Select Semester</option>
        {filterOptions.semesters.map((semester) => (
          <option key={semester} value={semester}>
            {semester}
          </option>
        ))}
      </select>
      <select
        className="border border-gray-300 rounded-md px-3 py-1"
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="">Select Course</option>
        {filterOptions.courses.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimetableFilter;
