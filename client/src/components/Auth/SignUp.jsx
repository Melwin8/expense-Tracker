import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id] : e.target.value
    });
  }

  const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://127.0.0.1:8000/register/",{
      method : "POST",
      headers : {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData)
    })
  const data = await res.json();
  if(data.success === false){
    setLoading(false);
    setError(data.message);
    return;
  }
  console.log(data);
  setLoading(false);
  navigate("/dashboard");
  } catch (error) {
    console.log(err);
  }
  }

  return (
    <>
      <div className="h-screen justify-center w-full grid md:grid-cols-2  bg-violet-900">
        <div className="justify-center items-center hidden md:flex flex-col">
          <div>
            <h1
              style={{ fontFamily: "cursive" }}
              className="text-6xl font text-white font-bold"
            >
              Expense Tracker
            </h1>
            <p className="my-4 font-medium text-end text-slate-300">
              - <span>No one</span> will care about your money more than you
            </p>
          </div>
          <img
            width={"400px"}
            // src="https://i.postimg.cc/L5ttXF89/vecteezy-dollar-money-bag-with-coins-and-papers-15275954-996.png"
            src="/src/assets/fakeMoney.png"
          />
        </div>
        {/* <div className="p-3 flex justify-center items-center w-full">
          <div className="md:w-3/4">
            <h1 className="text-3xl text-white text-center font-semibold my-7">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <input
                type="text"
                placeholder="username"
                id="username"
                className="border p-3 rounded-lg"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Email"
                id="email"
                className="border p-3 rounded-lg"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="border p-3 rounded-lg"
                onChange={handleChange}
              />
              <button
                disabled={loading}
                className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75"
              >
                {loading ? "LOADING..." : "SIGN UP"}
              </button> */}
              {/* <Oauth /> */}
            {/* </form>
            <div className="flex gap-2 mt-5 justify-center ">
              <p className="text-white "> Have an account?</p>
              <Link to={"/login"}>
                <span className="text-green-600 hover:underline ">
                  {" "}
                  Sign in{" "}
                </span>
              </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </div>
        </div>
      </div> */}
      <div className="p-3 flex justify-center items-center w-full">
  <div className="md:w-3/4 bg-gray-800 rounded-lg p-8">
    <h1 className="text-3xl text-white text-center font-semibold my-7">Sign Up</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input
        type="text"
        placeholder="Username"
        id="username"
        className="border p-3 rounded-lg focus:outline-none focus:border-green-500"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Email"
        id="email"
        className="border p-3 rounded-lg focus:outline-none focus:border-green-500"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        id="password"
        className="border p-3 rounded-lg focus:outline-none focus:border-green-500"
        onChange={handleChange}
      />
      <button
        disabled={loading}
        className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75 focus:outline-none"
      >
        {loading ? "LOADING..." : "SIGN UP"}
      </button>
    </form>
    <div className="flex gap-2 mt-5 justify-center text-white">
      <p>Already have an account?</p>
      <Link to="/login">
        <span className="text-green-600 hover:underline">Sign in</span>
      </Link>
    </div>
    {error && <p className="text-red-500 mt-5">{error}</p>}
  </div>
</div>
</div>
    </>
  );
}
