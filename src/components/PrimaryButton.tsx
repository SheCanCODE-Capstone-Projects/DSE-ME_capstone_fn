import React from 'react'

function PrimaryButton({ label }: { label: string }) {
    return (
        <div className="p-4 bg-gradient-to-r from-[#0B609D] to-gray-500 rounded-full text-white flex items-center justify-center 
w-40 sm:w-48 md:w-60 lg:w-72 h-8 sm:h-9 md:h-10 lg:h-12 text-sm sm:text-base md:text-lg">
          <h1>{label}</h1>  
        </div>
    )
}

export default PrimaryButton
