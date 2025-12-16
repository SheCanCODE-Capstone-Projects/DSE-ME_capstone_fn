"use client"
import IconButton from '@/components/IconButton'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'  

function Participant() {
    const router = useRouter()              

    return (
        <div className='h-screen flex flex-col'>
            <header className='mt-6'>
                {/* <topbar/> */} 
            </header>
            <div className='flex mt-4 gap-2'>
                <aside className='left-2'>
                    {/* <SideBar/> */}sidebar!!!!!!!!!!!!!!!!!!!!!!
                </aside>

                <main className=''>
                    <div className='flex gap-24'>
                        <div className='gap-12'>
                            <h1 className='text-2xl font-bold'>Participants Management</h1>
                            <h2 className='font-bold'>Manage and track all participants in your cohort.</h2>
                        </div>

                        <IconButton 
                            label="Add Participant" 
                            onClick={() => router.push('/')} 
                            icon={<Plus size={16} />}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Participant
