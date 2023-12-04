import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";


export default function UpdateExpenseItem() {

    const params  = useParams();
    console.log(params)
    const accessToken = localStorage.getItem("token");
    const [item , setItem] = useState({});
    const [formData , setformData] = useState({});
    
    
    const dateTimeString = item.date_of_transaction;
    const dateTime = new Date(dateTimeString);
    const datepart = dateTime.toLocaleDateString();
    const timePart = dateTime.toLocaleTimeString();

    // console.log(datepart, timePart);
    console.log(`http://127.0.0.1:8000/editexpense/${params.itemId}`)


    useEffect( () => {
        const fetchDetails = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/editexpense/${params.itemId}`,{
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
            setItem(res.data);
        }

        fetchDetails();
    },[])
  
    const handleChange = (e) => {
    setformData({...formData,
    [e.target.id] : e.target.value})
    console.log(formData)
    }

    
  
    const handleSubmit = async(e) => {
      e.preventDefault();
  console.log(accessToken);
      try {
        const res = await axios.put(
          `http://127.0.0.1:8000/editexpense/${params.itemId}`,
            formData,// Move formData to the correct argument
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(res);
        console.log(formData);
        if(res.status === 200){
         toast.success("Expense Updated sucessfully",{
          position: "top-center",
          autoClose: 5000, // 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        }
      } catch (error) {
        toast.error("error occured on updation",{
            position: "top-right",
            autoClose: 5000, // 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
      })}
    }
  
    return <div className="flex flex-row">



<div className="flex flex-col items-start basis-1/5 bg-purple-950 justify-center h-screen gap-3 sticky top-0">


<Link
     to={"/dashboard"}
     className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
   >
     <h2 className="text-center">Dashboard</h2>
   </Link>
  
   {/* <Link
     to={"/add_expense"}
     className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
   >
     <h2 className="text-center">add new expense</h2>
   </Link> */}
   <Link
        to={"/report"}
        className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
      >
        <h2 className="text-center">monthly report </h2>
      </Link>

<Link
        to={"/history"}
        className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
        >
        <h2 className="text-center">history</h2>
        </Link>

   {/* <Link
     to={"/report"}
     className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
   >
     <h2 className="text-center">monthly report </h2>
   </Link> */}

   <Link
     to={"/"}
     className="uppercase bg-white text-black rounded-lg w-3/4 md:h-12 m-3 p-3 hover:bg-gray-200 hover:text-gray-800"
   >
     <h2 className="text-center">log out</h2>
   </Link>
 </div>




      
    {/* <div className="flex items-center justify-center p-12">
    <div className="mx-auto w-full max-w-[550px]">
      <form onSubmit={handleSubmit} method="POST">
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                for="fName"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Expense Name
              </label>
              <input
                type="text"
                name="expense_name"
                id="expense_name"
                // placeholder= {item.expense_name || "Enter expense name"}
                defaultValue={item.expense_name}
                onChange={handleChange}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            
          </div>
          <div class="w-full px-3 sm:w-1/2">
        
  
  
          </div>
        </div>
        <div class="mb-5">
          <label
            for="guest"
            class="mb-3 block text-base font-medium text-[#07074D]"
          >
            Amount Spent
          </label>
          <input
            type="number"
            name="amount_spent"
            id="amount_spent"
            defaultValue={item.amount_spent}
            min="0"
            onChange={handleChange}
            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
  
        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label
                for="date"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Date of Transaction
              </label>
              <input
                type="date"
                name="date_of_transaction"
                id="date_of_transaction"
                defaultValue={item.date_of_transaction}
                onChange={handleChange}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
        
            </div>
          </div> 
          <div className="mb-5 ms-3">
          <select
                id="category"
                
                defaultValue={item.category}
                onChange={handleChange}
                className="border rounded-lg p-2"
              >
                <option className="font-semibold text-lg" defaultValue="{item.category}">{item.category}</option>
                <option value={"Food"}>Food</option>
                <option value={"Transportation"}>Travel</option>
                <option value={"Entertainment"}>Entertainment</option>
                <option value={"Personal"}>Personal</option>
                <option value={"Utilities"}>Utilities</option>
                <option value={"MedicalCare"}>Health/Medical care</option>
                <option value={"Other"}>Others</option>
              </select>
          </div>
        </div>
  
        <div>
          <button
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
    
  </div>
  </div>
} */}
<div className="flex items-center justify-center p-12">
  <div className="mx-auto w-full max-w-[550px] bg-white rounded-md shadow-lg p-8">
    <form onSubmit={handleSubmit} method="POST">
      <div className="-mx-3 flex flex-wrap mb-6">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-6">
            <label htmlFor="expense_name" className="block mb-3 text-base font-medium text-[#07074D]">
              Expense Name
            </label>
            <input
              type="text"
              name="expense_name"
              id="expense_name"
              defaultValue={item.expense_name}
              onChange={handleChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          {/* Add content for the second half if needed */}
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="amount_spent" className="block mb-3 text-base font-medium text-[#07074D]">
          Amount Spent
        </label>
        <input
          type="number"
          name="amount_spent"
          id="amount_spent"
          defaultValue={item.amount_spent}
          min="0"
          onChange={handleChange}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="-mx-3 flex flex-wrap mb-6">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-6">
            <label htmlFor="date_of_transaction" className="block mb-3 text-base font-medium text-[#07074D]">
              Date of Transaction
            </label>
            <input
              type="date"
              name="date_of_transaction"
              id="date_of_transaction"
              defaultValue={item.date_of_transaction}
              onChange={handleChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          {/* Add content for the second half if needed */}
        </div>
        <div className="mb-5 ms-3">
          <select
            id="category"
            defaultValue={item.category}
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option className="font-semibold text-lg" value="{item.category}">{item.category}</option>
            <option value={"Food"}>Food</option>
            <option value={"Transportation"}>Travel</option>
            <option value={"Entertainment"}>Entertainment</option>
            <option value={"Personal"}>Personal</option>
            <option value={"Utilities"}>Utilities</option>
            <option value={"MedicalCare"}>Health/Medical care</option>
            <option value={"Other"}>Others</option>
          </select>
        </div>
      </div>
      <div>
        <button
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Submit
        </button>
      </div>
    </form>
    <ToastContainer />
  </div>
</div>
</div>
}

