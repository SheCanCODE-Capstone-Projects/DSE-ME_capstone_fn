import StatCard from '@/components/ui/statuscard'
import { CheckCircle, Clock, UserMinus } from 'lucide-react'
import React from 'react'

function page() {
  return (
    <div className='ml-28'>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <StatCard icon={<UserMinus size={32} />}title="Total Assignments"value={1} subtext="Currently running"/>
            <StatCard icon={<UserMinus size={32} />}title="Class Average"value={1} subtext="Currently running"/>
            <StatCard icon={<UserMinus size={32} />}title="Completed"value={1} subtext="Currently running"/>
            <StatCard icon={<UserMinus size={32} />}title="Top Performers"value={1} subtext="Currently running"/>
           
          </div>

    </div>
  )
}

export default page
