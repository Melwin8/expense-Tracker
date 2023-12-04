// import React from "react";

// export default function History() {
//   return <div>History</div>;
// }

import React, { useEffect, useState } from "react";
// import SideBar from "../components/SideBar";
import HistoryTable from "../components/HistoryTable";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link, useNavigate } from "react-router-dom";
export default function History() {
  const accessToken = localStorage.getItem("token");

  const [history, setHistory] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  // New state variables for filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

  const fetchHistoryData = async (url) => {
    try {
      // Update the params based on filter values
      const params = {
        start_date: startDate,
        end_date: endDate,
        category: categoryFilter,
        search: searchTerm,
      };

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params, // Include params in the request
      });

      const data = res.data;
      setHistory((prevHistory) => [...prevHistory, ...data.results]);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    } catch (error) {
      toast.error("Error occurred", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    fetchHistoryData("http://127.0.0.1:8000/paginationexpenselist/"); // Initial fetch
  }, [accessToken]);

  const handlePageChange = (url) => {
    fetchHistoryData(url);
  };

  // Function to handle applying filters
  const applyFilters = () => {
    // Clear existing history and fetch data with filters
    setHistory([]);
    fetchHistoryData("http://127.0.0.1:8000/paginationexpenselist/");
  };

  return (
    <div className="flex flex-row">





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

   <Link
     to={"/report"}
     className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
   >
     <h2 className="text-center">monthly report </h2>
   </Link>

   <Link
     to={"/"}
     className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
   >
     <h2 className="text-center">log out</h2>
   </Link>
 </div>





      <div className="flex flex-col items-start basis-1/5 bg-white justify-center h-screen gap-3 sticky top-0">
        {/* <SideBar /> */}
      </div>
      <div className="w-full">
        <div className="font-bold text-1.5xl text-indigo-800 justify-center m-2">
          <div className="items-center justify-center flex flex-row">
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <input
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Term"
            />
            <select
              onChange={(e) => setCategoryFilter(e.target.value)}
              placeholder="Select Category"
            >
              <option className="font-semibold text-lg" value=''>Select Category</option>
              <option value={"Food"}>Food</option>
              <option value={"Personal"}>Personal</option>
              <option value={"Transportation"}>Travel</option>
              <option value={"Entertainment"}>Entertainment</option>
              <option value={"Utilities"}>Utilities</option>
              <option value={"Health/MedicalCare"}>Health/Medical care</option>
              <option value={"Other"}>Others</option>
            </select>
            <button onClick={applyFilters}>Apply Filters</button>
          </div>
        </div>
        <HistoryTable data={history} />
        <div className="font-bold text-1.5xl text-indigo-800 justify-center m-2">
          <div className="items-center justify-center flex flex-row">
            {previousPage && (
              <button
                onClick={() => handlePageChange(previousPage)}
                style={{ marginRight: "20px" }}
              >
                Previous <IoIosArrowBack />
              </button>
            )}
            {nextPage && (
              <button onClick={() => handlePageChange(nextPage)}>
                Next <IoIosArrowForward />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}