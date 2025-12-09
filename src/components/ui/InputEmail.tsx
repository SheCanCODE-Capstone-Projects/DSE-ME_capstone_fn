'use client'


import React from 'react'
import { FiMail } from 'react-icons/fi'
import { Asterisk } from 'lucide-react'


type EmailProps = {
 value: string
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
 required?: boolean
}


const Email: React.FC<EmailProps> = ({ value, onChange, required = false }) => {
 return (
   <div className="flex flex-col w-full">
   
     <label
       htmlFor="email"
       className="mb-1 font-bold text-[#003366]"
     >
       Email{required && <Asterisk className="inline w-3 h-3 text-black ml-1 align-top" />}
     </label>


     
     <div className="flex items-center border-2 border-[#0B609D] rounded-md p-2 bg-white">
      
       <FiMail className="mr-2 text-[#003366]" />


       
       <input
         id="email"
         name="email"
         type="email"
         placeholder="your email@gmail.com"
         value={value}
         onChange={onChange}
         required={required}
         className="flex-1 text-black text-base bg-transparent outline-none placeholder-gray-500"
       />
     </div>
   </div>
 )
}


export default Email