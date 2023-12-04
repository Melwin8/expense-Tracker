import React, { useEffect } from "react";
import Charts from "../components/Charts";
import { FaRupeeSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import BarChart from "../components/Charts";
import Canva from "../components/Charts";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import HistoryTable from "../components/HistoryTable";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";


export default function Dashboard() {
  
  const navigate = useNavigate()
  const accessToken = localStorage.getItem("token");
  const username=localStorage.getItem("username")

  const [historyData, setHistoryData] = useState({});
  const [chartData, setChartData] = useState({});
  const [monthlyExpenseData, setmonthlyExpenseData] = useState("")
  const [totalexpensedata, settotalexpensedata] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/addexpense/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });



          // Modify the data before setting it in the state
    const modifiedData = res.data.map(item => {
      // Assuming 'date_of_transaction' is a string in the format "YYYY-MM-DDTHH:mm:ss"
      const date = new Date(item.date_of_transaction);
      const formattedDate = date.toISOString().split('T')[0];
      
      // Add the formatted date to the item
      return {
        ...item,
        date_of_transaction: formattedDate,
      };
    });




        // console.log(res); 
        // setHistoryData(res.data);
        setHistoryData(modifiedData);
        // console.log(historyData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }


    const totalexpense = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/expenseinmonth/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log(res); 
        settotalexpensedata(res.data.total_expense);
        console.log(totalexpensedata);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }




    const monthlyExpenseDetails = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/total-amount-by-category/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log(res); 
        const data = res.data;
        setmonthlyExpenseData(data);
        // setChartData(res.data);
        console.log(monthlyExpenseData);

      } catch (error) {
        toast.error("Error occured",{
          position: "top-right",
          autoClose: 5000, // 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })}
    }

    
        
    fetchData();
    totalexpense();
    monthlyExpenseDetails();
  },[])
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
      }
  return(
   <>
  <div className="flex flex-row">
    <div className="flex flex-col items-start basis-1/5 bg-purple-950 justify-center h-screen gap-3 sticky top-0">
      {/* <div className="text-white flex flex-row justify-center gap-3 font-semibold text-xl items-center">
        Name: {username}
      </div> */}
      <div className="text-white flex flex-row justify-center gap-3 font-semibold text-2xl items-center">
      Name: {username}
      </div>
      <div className="text-white flex flex-row justify-center gap-3 font-semibold text-xl items-center">
        <FaRupeeSign /> Salary - 25000
      </div>
      <div className="text-white flex flex-row justify-center gap-3 font-semibold text-xl items-center">
        <FaRupeeSign /> Expense - {totalexpensedata}
      </div>
      {/* <Link
        to={"/add_expense"}
        className="uppercase bg-w text-black rounded-lg w-3/4 md:h-12 m-3 p-3"
      >
        <h2 className="text-center">add new expense</h2>
      </Link>

      <Link
        to={"/report"}
        className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3"
      >
        <h2 className="text-center">monthly report </h2>
      </Link>
      <Link
        to={"/history"}
        className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3"
      >
        <h2 className="text-center">history</h2>
      </Link>
      <button 
        onClick={logOut}
        className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3"
      >
        <h2 className="text-center">log out</h2>
      </button> */}
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
  <h2 className="text-center">monthly report</h2>
</Link>

<Link
  to={"/history"}
  className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
>
  <h2 className="text-center">history</h2>
</Link>

<button
  onClick={logOut}
  className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
>
  <h2 className="text-center">log out</h2>
</button>

    </div>
    <div className="basis-4/5 flex flex-col">
      
        <div className="text-center" style={{position:'relative'}} >
            <h1 style={{ color: 'white',position: 'absolute',
                          top: '55%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 1, }}>Total Expense<br></br>$ {totalexpensedata}</h1>
          <Canva data={monthlyExpenseData} />
        </div>
     
      <div>
        <h2 className="p-3 text-lg font-semibold">All transactions</h2>
        <div className="w-full">
        <HistoryTable data={historyData} />
        </div>
      </div>
    </div>
  </div>
</>
)
}
