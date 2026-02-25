'use client';

import React from 'react';
import { Users, UserPlus, TrendingUp, Award } from 'lucide-react';
import StatCard from '@/components/ui/statuscard';
import AttendanceChart from '@/components/overview/AttendanceChart';
import PerformanceChart from '@/components/overview/Perfomance';
import AlertsPanel from '@/components/overview/Alertspanel';
import QuickActivities from '@/components/overview/QuickActivities';
import { useAuth } from '@/context/AuthContext';
import { getPersonalizedGreeting } from '@/lib/userUtils';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

interface DashboardData {
  enrollmentCount: number;
  activeParticipantsCount: number;
  averageScore: string;
  weeklyAttendance: {
    thisWeekAttendanceRate: string;
    changeDisplayText: string;
  };
}

function FacilitatorDashboard () {
  const { user } = useAuth();
  
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['facilitator', 'dashboard'],
    queryFn: () => apiFetch<DashboardData>('/facilitator/dashboard', { method: 'GET' }),
  });

  return (
    <div className="text-gray-800 font-sans relative">
      <main className="min-h-screen">
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {getPersonalizedGreeting(user)}
            </h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your participants today.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={<Users size={32} />}
              title="Total Participants"
              value={isLoading ? '...' : dashboard?.enrollmentCount || 0}
              subtext="Enrolled in cohort"
            />
            <StatCard 
              icon={<UserPlus size={32} />}
              title="Active Participants"
              value={isLoading ? '...' : dashboard?.activeParticipantsCount || 0}
              subtext="Currently active"
            />
            <StatCard 
              icon={<Award size={32} />}
              title="Average Score"
              value={isLoading ? '...' : dashboard?.averageScore ? `${dashboard.averageScore}%` : '0%'}
              subtext="Overall performance"
            />
            <StatCard 
              icon={<TrendingUp size={32} />}
              title="Weekly Attendance"
              value={isLoading ? '...' : dashboard?.weeklyAttendance?.thisWeekAttendanceRate ? `${dashboard.weeklyAttendance.thisWeekAttendanceRate}%` : '0%'}
              subtext={isLoading ? 'Loading...' : dashboard?.weeklyAttendance?.changeDisplayText || 'No data'}
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

