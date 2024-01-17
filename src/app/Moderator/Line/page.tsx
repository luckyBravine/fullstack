"use client";
import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  LineSeries,
} from "@syncfusion/ej2-react-charts";
import { firstYear, secondYear, thirdYear, fourthYear } from "./data";



const Line = () => {
  const marker = {
    visible: true,
    width: 10,
    height: 10,
    border: { width: 2, color: "#F8AB1D" },
  };

  return (
    <ChartComponent id="charts" className="lg:w-full md:w-[90%] w-[80%] flex justify-center">
      <Inject services={[LineSeries, Legend, Tooltip, DataLabel, Category]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={firstYear}
          xName="x"
          yName="y"
          fill="green"
          width={2}
          name="First Year"
          type="Line"
          marker={marker}
        ></SeriesDirective>
        <SeriesDirective
          dataSource={secondYear}
          xName="x"
          yName="y"
          fill="red"
          width={2}
          name="Second Year"
          type="Line"
          marker={marker}
        ></SeriesDirective>
        <SeriesDirective
          dataSource={thirdYear}
          xName="x"
          yName="y"
          fill="blue"
          width={2}
          name="Third Year"
          type="Line"
          marker={marker}
        ></SeriesDirective>
        <SeriesDirective
          dataSource={fourthYear}
          xName="x"
          yName="y"
          fill="yellow"
          width={2}
          name="Fourth Year"
          type="Line"
          marker={marker}
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Line;
