"use client";

import { useState, FC } from "react";
import { Eye, EyeOff, Lock, Asterisk } from "lucide-react";

interface PasswordInputProps {
  placeholder?: string;
  id?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  label?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({
  placeholder = "Type your password",
  id = "password",
  name,
  value,
  onChange,
  required = false,
  label = "Password",
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-1 font-bold text-[#003366]">
        {label}{required && <Asterisk className="inline w-3 h-3 text-black ml-1 align-top" />}
      </label>
      <div className="relative">
        
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-[#999999]" />
        </div>

     
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="block w-full px-10 py-2 border-2 border-[#0B609D] rounded-md text-[#000000] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#0B609D] focus:border-[#0B609D]"
        />

        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-[#999999]" />
          ) : (
            <Eye className="h-5 w-5 text-[#999999]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
