import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRupeeSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


export default function AddExpense() {
  const accessToken = localStorage.getItem("token");
  const [formData , setformData] = useState({
  })

  const handleChange = (e) => {
  setformData({...formData,
  [e.target.id] : e.target.value})
  console.log(formData)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
console.log(accessToken);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/addexpense/",
        formData, // Move formData to the correct argument
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res);
      if(res.status === 201){
       toast.success("Expense added sucessfully",{
        position: "top-center",
        autoClose: 3000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      }
    } catch (error) {
      console.error("Error:", error);
    }
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


  {/* <div class="flex items-center justify-center p-12">
  <div class="mx-auto w-full max-w-[550px]">
    <form onSubmit={handleSubmit} method="POST">
      <div class="-mx-3 flex flex-wrap">
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
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
              placeholder="Enter expense name"
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
          placeholder="Enter the amount spent"
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
              onChange={handleChange}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label
              for="time"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div className="mb-5 ms-3">
        <select
              id="category"
              name="category"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              className="border rounded-lg p-2"
            >
              <option className="font-semibold text-lg" value=''>Select Category</option>
              <option value={"Food"}>Food</option>
              <option value={"Personal"}>Personal</option>
              <option value={"Transportation"}>Travel</option>
              <option value={"Entertainment"}>Entertainment</option>
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
          Add Expense
        </button>
      </div>
    </form>
    <ToastContainer />
  </div>
  
</div>
</div>
} */}
<div class="flex items-center justify-center p-12">
  <div class="mx-auto w-full max-w-[550px] bg-white rounded-md shadow-lg p-8">
    <form onSubmit={handleSubmit} method="POST">
      <div class="-mx-3 flex flex-wrap mb-6">
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-6">
            <label for="expense_name" class="block mb-3 text-base font-medium text-[#07074D]">
              Expense Name
            </label>
            <input
              type="text"
              name="expense_name"
              id="expense_name"
              placeholder="Enter expense name"
              onChange={handleChange}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-6">
            {/* <!-- Content for the second half, if needed --> */}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label for="amount_spent" class="block mb-3 text-base font-medium text-[#07074D]">
          Amount Spent
        </label>
        <input
          type="number"
          name="amount_spent"
          id="amount_spent"
          placeholder="Enter the amount spent"
          min="0"
          onChange={handleChange}
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="-mx-3 flex flex-wrap mb-6">
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-6">
            <label for="date_of_transaction" class="block mb-3 text-base font-medium text-[#07074D]">
              Date of Transaction
            </label>
            <input
              type="date"
              name="date_of_transaction"
              id="date_of_transaction"
              onChange={handleChange}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-6">
            <label for="time" class="block mb-3 text-base font-medium text-[#07074D]">
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div class="mb-6 ms-3">
          <select
            id="category"
            name="category"
            onChange={handleChange}
            defaultValue={"created_at_desc"}
            class="border rounded-lg p-2"
          >
            <option class="font-semibold text-lg" value=''>Select Category</option>
            <option value={"Food"}>Food</option>
            <option value={"Personal"}>Personal</option>
            <option value={"Transportation"}>Travel</option>
            <option value={"Entertainment"}>Entertainment</option>
            <option value={"Utilities"}>Utilities</option>
            <option value={"MedicalCare"}>Health/Medical care</option>
            <option value={"Other"}>Others</option>
          </select>
        </div>
      </div>
      <div>
        <button
          class="rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white hover:shadow-form outline-none"
        >
          Add
        </button>
      </div>
    </form>
    <ToastContainer />
  </div>
</div>
</div>
}
