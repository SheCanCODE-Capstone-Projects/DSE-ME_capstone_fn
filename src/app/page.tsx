import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React from 'react'
import Footer from "@/components/Footer";

function page() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#EEF3FD' }}>
       <Sidebar />
       <div className="flex-1 flex flex-col">
         <Navbar />
         <main className="flex-1 p-4 overflow-auto">
           {/* <p>Main content area</p> */}
         </main>
         <Footer/>
       </div>
    </div>
  )
}

export default page
  

