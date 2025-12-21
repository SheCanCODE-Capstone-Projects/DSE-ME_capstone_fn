import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import StatCard from '@/components/ui/statuscard';
import AttendanceChart from '@/components/overview/AttendanceChart';
import PerformanceChart from '@/components/overview/Perfomance';
import AlertsPanel from '@/components/overview/Alertspanel';
import QuickActivities from '@/components/overview/QuickActivities';

function FacilitatorDashboard () {
  return (
    <div className="min-h-screen bg-[#f0f4f8] text-gray-800 font-sans relative">

      <main className="pl-32 pr-8 py-8 min-h-screen max-w-7xl mx-auto">
      

        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={<Users size={32} />}
              title="Participants"
              value={52}
              subtext="+5 this month"
            />
             <StatCard 
              icon={<Users size={32} />}
              title="Participants"
              value={52}
              subtext="+5 this month"
            />
            <StatCard 
              icon={<Users size={32} />}
              title="Average Score"
              value="87%"
              subtext="+5 this month"
            />
            <StatCard 
              icon={<UserPlus size={32} />}
              title="Active Participants"
              value={50}
              subtext="+5 this month"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AttendanceChart />
            <PerformanceChart />
            <AlertsPanel />
          </div>
          <QuickActivities />
        </div>
      </main>
    </div>
  );
};

export default FacilitatorDashboard;

