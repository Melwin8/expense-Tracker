import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = ({ data }) => {
  const [monthlyData, setMonthlyData] = useState(null);

  useEffect(() => {
    if (data && data.daily_expenses && Object.keys(data.daily_expenses).length > 0) {
      setMonthlyData(Object.values(data.daily_expenses));
    }
  }, [data]);

  if (!data || !data.year || !data.month) {
    return <div className='text-4xl text'>Loading...</div>;
  }

  if (!monthlyData || monthlyData.length === 0) {
    return <div>Loading...</div>;
  }

  // Convert string values to numbers
  const numericData = monthlyData.map(value => parseFloat(value));

  const options = {
    animationEnabled: true,
    // theme: "dark2",
    title: {
      text: `Monthly Expenses - ${data.month} ${data.year}`,
    },
    axisY: {
      title: 'Amount (in INR)',
    },
    axisX: {
      title: 'Day',
    },
    data: [
      {
        type: 'column',
        color:'purple',
        dataPoints: numericData.map((value, index) => ({ y: value, label: `${index + 1}` })),
      },
    ],
  };

  return (
    <div className='w-full h-full'>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default BarChart;
