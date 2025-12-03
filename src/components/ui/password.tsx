"use client";

import { useState, FC } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps {
  placeholder?: string;
  id?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({
  placeholder = "Type your password",
  id = "password",
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="w-full max-w-sm mx-auto">
      <label htmlFor={id} className="block text-sm font-medium text-[#000000] mb-1">
        Password
      </label>
      <div className="relative">
        {/* Lock icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-[#999999]" />
        </div>

        {/* Password input */}
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          className="block w-full px-10 py-2 border-2 border-[#0B609D] rounded-md text-[#000000] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#0B609D] focus:border-[#0B609D]"
        />

        {/* Eye icon */}
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
