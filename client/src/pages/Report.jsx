// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import SideBar from '../components/SideBar';
// import BarChart from '../components/BarChart';
// import { Button } from '@material-tailwind/react';
// import { Link } from "react-router-dom";
// import { FaRupeeSign } from "react-icons/fa";

// const TotalExpensesByCategory = () => {
//   const [expensesByCategory, setExpensesByCategory] = useState({});
//   const [filterData, setFilterData] = useState({});
//   const [data, setData] = useState(null); // Initialize with null
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchTotalExpensesByCategory = async () => {
//       try {
//         setLoading(true); // Set loading to true before making the API call

//         const response = await axios.get(`http://127.0.0.1:8000/expensebycategory/`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//           params: filterData, // Pass filterData as params
//         });

//         setExpensesByCategory(response.data);
//         setData(filterData); // Set data when API call is successful
//       } catch (error) {
//         console.error('Error fetching total expenses by category:', error);
//       } finally {
//         setLoading(false); // Set loading to false after API call completes
//       }
//     };

//     fetchTotalExpensesByCategory();
//   }, [filterData]);

//   const handleInput = (e) => {
//     setFilterData({
//       ...filterData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleFilter = (e) => {
//     e.preventDefault();
    
//     // No need to set data here, it will be set in the API call
//   };

//   return (
//     // <div className='flex flex-row'>

// <div className="flex flex-row">
//     <div className="flex flex-col items-start basis-1/5 bg-blue-950 justify-center h-screen gap-3 sticky top-0">


//     <Link
//         to={"/dashboard"}
//         className="uppercase bg-green-600 text-white rounded-lg w-3/4 md:h-12 m-3 p-3"
//       >
//         <h2 className="text-center">Dashboard</h2>
//       </Link>
     
//       <Link
//         to={"/add_expense"}
//         className="uppercase bg-green-600 text-white rounded-lg w-3/4 md:h-12 m-3 p-3"
//       >
//         <h2 className="text-center">add new expense</h2>
//       </Link>

//       <Link
//         to={"/report"}
//         className="uppercase bg-green-600 text-white rounded-lg w-3/4 md:h-12 m-3 p-3"
//       >
//         <h2 className="text-center">monthly report </h2>
//       </Link>
//       <Link
//         to={""}
//         className="uppercase bg-green-600 text-white rounded-lg w-3/4 md:h-12 m-3 p-3"
//       >
//         <h2 className="text-center">yearly report</h2>
//       </Link>
//       <Link
//         to={"/"}
//         className="uppercase bg-green-600 text-white rounded-lg w-3/4 md:h-12 m-3 p-3"
//       >
//         <h2 className="text-center">log out</h2>
//       </Link>
//     </div>

//       <div className='w-full'>
//         <div className='mt-3'>
//           <label className='ms-3 text-lg font-medium'>Select Year</label>
//           <input
//             id='year'
//             onChange={handleInput}
//             placeholder=''
//             className='ms-2 border border-solid border-x-gray-800 rounded-lg p-1 text-lg'
//           />
//         </div>
//         <div className='mt-3 flex flex-row'>
//           <label className='ms-3 text-lg font-medium'>Select Month</label>
//           <input
//             id='month'
//             type='number'
//             min='1'
//             max='12'
//             onChange={handleInput}
//             placeholder=''
//             className='ms-2 border border-solid border-x-gray-800 rounded-lg p-1 text-lg'
//           />
//           <div className='flex w-max gap-4'>
//             <Button onClick={handleFilter} variant='text'>
//               Filter
//             </Button>
//           </div>
//         </div>
//         <div className='w-full'>
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             <BarChart data={data} />
//           )}
//         </div>
//         <div className='m-5 mt-5 grid grid-cols-5 gap-4'>
//           {Object.entries(expensesByCategory).map(([category, value]) => (
//             <div key={category} className='bg-purple-100 p-4 rounded-md'>
//               <h3 className='text-lg font-semibold mb-2'>{category}</h3>
//               <p className='text-xl'>{value}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TotalExpensesByCategory;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

import BarChart from '../components/BarChart';
import { Button } from '@material-tailwind/react';

import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";


const TotalExpensesByCategory = () => {
  const [expensesByCategory, setExpensesByCategory] = useState({});
  const [filterData, setFilterData] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [monthlyData, setMonthlyData] = useState({})
  const accessToken = localStorage.getItem('token');


  useEffect(() => {
    console.log(filterData);
    setYear(filterData.year);
    setMonth(filterData.month);
  }, [filterData]);

  useEffect(() => {
    const fetchTotalExpensesByCategory = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`http://127.0.0.1:8000/expensebycategory/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setExpensesByCategory(response.data);
        setData(filterData);
      } catch (error) {
        console.error('Error fetching total expenses by category:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalExpensesByCategory();
  }, [filterData, accessToken]);

  const handleInput = (e) => {
    setFilterData({
      ...filterData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchMonthlyData();
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/monthly-report/?year=${year}&month=${month}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data) {
        const data = response.data;
        setMonthlyData(data);
      } else {
        console.error('Empty response data.');
      }
    } catch (error) {
      console.error('Error fetching monthly data:', error);
    }
  };

  return (
    <div className='flex flex-row'>
      



      <div className="flex flex-col items-start basis-1/5 bg-purple-950 justify-center h-screen gap-3 sticky top-0">


   <Link
        to={"/dashboard"}
        className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
      >
        <h2 className="text-center">Dashboard</h2>
      </Link>
     
      <Link
        to={"/add_expense"}
        className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
      >
        <h2 className="text-center">add new expense</h2>
      </Link>

      {/* <Link
        to={"/report"}
        className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
      >
        <h2 className="text-center">monthly report </h2>
      </Link> */}

        <Link
        to={"/history"}
        className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
        >
        <h2 className="text-center">history</h2>
        </Link>

      <Link
        to={"/"}
        className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
      >
        <h2 className="text-center">log out</h2>
      </Link>
    </div>




      <div className='w-full'>
        <div className='mt-3'>
          <label className='ms-3 text-lg font-medium'>Select Year</label>
          <input
            id='year'
            onChange={handleInput}
            placeholder=''
            className='ms-2 border border-solid border-x-gray-800 rounded-lg p-1 text-lg'
          />
        </div>
        <div className='mt-3 flex flex-row'>
          <label className='ms-3 text-lg font-medium'>Select Month</label>
          <input
            id='month'
            type='number'
            min='1'
            max='12'
            onChange={handleInput}
            placeholder=''
            className='ms-2 border border-solid border-x-gray-800 rounded-lg p-1 text-lg'
          />
          <div className='flex w-max gap-4'>
            <Button onClick={handleFilter} variant="outlined">
              Filter
            </Button>
          </div>
        </div>
        <div className='w-full'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BarChart data={monthlyData} />
          )}
        </div>
        <div><p className='text-2xl font-bold m-3'>EXPENSE OF THIS MONTH</p></div>
        <div className='m-5 mt-5 grid grid-cols-5 gap-4'>
        
          {Object.entries(expensesByCategory).map(([category, value]) => (
            <div key={category} className='bg-purple-100 p-4 rounded-md border border-solid border-purple-500 rounded-full'>
              <h3 className='text-lg font-semibold mb-2'>{category}</h3>
              <p className='text-xl'>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalExpensesByCategory;
