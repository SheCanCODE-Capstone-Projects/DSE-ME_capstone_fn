import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}

export function Button({ variant = 'default', className = "", children, ...props }: ButtonProps) {
  const baseClasses = "px-4 py-2 text-sm font-medium rounded-lg transition-colors";
  const variantClasses = {
    default: "bg-[#0B609D] text-white hover:bg-[#094d7d]",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}