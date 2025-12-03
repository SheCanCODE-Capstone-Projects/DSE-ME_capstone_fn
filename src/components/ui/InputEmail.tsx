'use client'


import React from 'react'
import { FiMail } from 'react-icons/fi'


type EmailProps = {
 value: string
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const Email: React.FC<EmailProps> = ({ value, onChange }) => {
 return (
   <div className="flex flex-col w-72">
     {/* Label on top */}
     <label
       htmlFor="email"
       className="mb-1 font-bold text-[#003366]"
     >
       Email
     </label>


     {/* Input container */}
     <div className="flex items-center border-2 border-[#0B609D] rounded-md p-2 bg-white">
       {/* Email icon */}
       <FiMail className="mr-2 text-[#003366]" />


       {/* Input field */}
       <input
         id="email"
         type="email"
         placeholder="your email@gmail.com"
         value={value}
         onChange={onChange}
         className="flex-1 text-black text-base bg-transparent outline-none placeholder-black"
       />
     </div>
   </div>
 )
}


export default Email