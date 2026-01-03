"use client";

import GradeCards from '@/components/GradesComponents/GradeCards';
import StatCard from '@/components/ui/statuscard';
import { UserMinus, BarChart2, CheckCircle, Award } from "lucide-react";
import { BookOpen, ClipboardList, TrendingUp } from "lucide-react";
import React from 'react';

function DashboardPage() {
  return (
    <div className='font-sans ml-28'>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
        <StatCard icon={<BarChart2 size={32} />} title="Total Assignments" value={1} subtext="Currently running" />
        <StatCard icon={<UserMinus size={32} />} title="Class Average" value={1} subtext="Currently running" />
        <StatCard icon={<CheckCircle size={32} />} title="Completed" value={1} subtext="Currently running" />
        <StatCard icon={<Award size={32} />} title="Top Performers" value={1} subtext="Currently running" />
      </div>

      
      <div className="font-sans mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GradeCards
            icon={BookOpen}
            title="Typing Practice"
            description="View weekly summaries and track typing progress"
            buttonText="View Typing Data"
            href="/typing-practice"
          />

          <GradeCards
            icon={ClipboardList}
            title="Assignments"
            description="Create assignments and grade student submissions"
            buttonText="Manage Assignments"
            href="/grades/assignments"
          />

          <GradeCards
            icon={TrendingUp}
            title="Grade Summary"
            description="View comprehensive grade reports and analytics"
            buttonText="View Summary"
            href="/grade-summary"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
