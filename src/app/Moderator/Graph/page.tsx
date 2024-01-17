// pages/linegraph.js
"use client";
import React from 'react';
import {
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  Inject,
  Legend,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from '@syncfusion/ej2-react-charts';

const LineGraphPage = () => {
  const data = [
    { month: 'Jan', sales: 35 },
    { month: 'Feb', sales: 28 },
    { month: 'Mar', sales: 34 },
    { month: 'Apr', sales: 32 },
    { month: 'May', sales: 40 },
    { month: 'Jun', sales: 32 },
    { month: 'Jul', sales: 35 },
    { month: 'Aug', sales: 55 },
    { month: 'Sep', sales: 38 },
    { month: 'Oct', sales: 30 },
    { month: 'Nov', sales: 25 },
    { month: 'Dec', sales: 32 },
  ];

  const tooltip = { enable: true, shared: false };
  const primaryYAxis = { labelFormat: '${value}K' };
  const primaryXAxis = { valueType: 'Category' };
  const legendSettings = { visible: true };
  const marker = { dataLabel: { visible: true } };

  return (
    <ChartComponent
      id="charts"
      primaryXAxis={primaryXAxis}
      legendSettings={legendSettings}
      primaryYAxis={primaryYAxis}
      tooltip={tooltip}
    >
      <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={data} xName="month" yName="sales" name="Sales" marker={marker} />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineGraphPage;
