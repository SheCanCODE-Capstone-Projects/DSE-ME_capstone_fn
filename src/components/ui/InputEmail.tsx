'use client';

import React from 'react';
import { FiMail } from 'react-icons/fi';
import { Asterisk } from 'lucide-react';

export interface EmailProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Email: React.FC<EmailProps> = ({ label = 'Email', ...inputProps }) => {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={inputProps.id || 'email'}
        className="mb-1 font-bold text-[#003366]"
      >
        {label}
        {inputProps.required && (
          <Asterisk className="inline w-3 h-3 text-black ml-1 align-top" />
        )}
      </label>

      <div className="flex items-center border-2 border-[#0B609D] rounded-md p-2 bg-white">
        <FiMail className="mr-2 text-[#003366]" />

        <input
          type="email"
          name="email"
          className="flex-1 text-black text-base bg-transparent outline-none placeholder-gray-500"
          {...inputProps}
        />
      </div>
    </div>
  );
};

export default Email;
