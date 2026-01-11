
import React from 'react';
import { Users, TrendingUp, Briefcase, UserPlus } from 'lucide-react';
import StatCard from '../../../components/ui/statuscard';
import { EmploymentChart, RetentionChart } from '../../../components/ME/overview/charts';
import { AttendanceSummary, TopPerformers, AlertsPanel } from '../../../components/ME/overview/summaryPanels';
import QuickActivities from '../../../components/ME/overview/Quickactivities';

const OverviewPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Users size={20} />} 
          title="Total Participants" 
          value="52" 
          subtext="+5 from last month" 
           
        />
        <StatCard 
          icon={<TrendingUp size={20} />} 
          title="Average Score" 
          value="87%" 
          subtext="Target: 85%" 
          
        />
        <StatCard 
          icon={<Briefcase size={20} />} 
          title="Employment Rate" 
          value="64%" 
          subtext="33 jobs, 12 internships" 
           
        />
        <StatCard 
          icon={<UserPlus size={20} />} 
          title="Active Now" 
          value="50" 
          subtext="96% retention rate" 
           
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmploymentChart />
        <RetentionChart />
      </div>

      {/* Summary Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AttendanceSummary />
        <TopPerformers />
        <AlertsPanel />
      </div>

      {/* Quick Activities */}
      <QuickActivities />
    </div>
  );
};

export default OverviewPage;
