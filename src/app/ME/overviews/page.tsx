'use client';

import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, Briefcase, UserPlus } from 'lucide-react';
import StatCard from '../../../components/ui/statuscard';
import { EmploymentChart, RetentionChart } from '../../../components/ME/overview/charts';
import { AttendanceSummary, TopPerformers, AlertsPanel } from '../../../components/ME/overview/summaryPanels';
import QuickActivities from '../../../components/ME/overview/Quickactivities';
import { useAuth } from '@/context/AuthContext';
import { getPersonalizedGreeting } from '@/lib/userUtils';
import { meApi, AnalyticsOverview } from '@/lib/meApi';

const OverviewPage: React.FC = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await meApi.getOverviewAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const activeParticipants = analytics ? analytics.totalParticipants - (analytics.completedParticipants || 0) : 0;
  const retentionRate = analytics && analytics.totalParticipants > 0 
    ? Math.round((activeParticipants / analytics.totalParticipants) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {getPersonalizedGreeting(user)}
        </h1>
        <p className="text-gray-600 mt-1">Track program performance and participant outcomes.</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Users size={20} />} 
          title="Total Participants" 
          value={loading ? '...' : String(analytics?.totalParticipants || 0)} 
          subtext={`${analytics?.completedParticipants || 0} completed`} 
        />
        <StatCard 
          icon={<TrendingUp size={20} />} 
          title="Average Score" 
          value={loading ? '...' : `${analytics?.averageScore || 0}%`} 
          subtext="Target: 85%" 
        />
        <StatCard 
          icon={<Briefcase size={20} />} 
          title="Active Cohorts" 
          value={loading ? '...' : String(analytics?.activeCohorts || 0)} 
          subtext={`${analytics?.totalCourses || 0} courses available`} 
        />
        <StatCard 
          icon={<UserPlus size={20} />} 
          title="Active Participants" 
          value={loading ? '...' : String(activeParticipants)} 
          subtext={`${retentionRate}% retention rate`} 
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
