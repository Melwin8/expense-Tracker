import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {

  const  navigate = useNavigate()
    useEffect(() => {
        // Your code here
    
        // Example: Navigate to the root ("/") when the component mounts
        navigate("/signup");
      }, []);
  return (
    <div>
      
    </div>
  )
}
