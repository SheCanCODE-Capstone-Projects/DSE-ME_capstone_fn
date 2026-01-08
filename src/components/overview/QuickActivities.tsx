'use client'
import React, { useState } from 'react';
import { Calendar, Users, BarChart2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

function QuickActivities ()  {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerateInsight = async () => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setInsight("Attendance is trending upwards compared to last month. Consider checking in with the 5 participants who missed today's session to ensure retention remains high.");
    setLoading(false);
  };

  const handleRecordAttendance = () => {
    router.push('/attendance');
  };

  const handleViewParticipants = () => {
    router.push('/participants');
  };

  const handleUploadScores = () => {
    router.push('/grades/assignments');
  };
  return (
    <div className="mt-8 bg-[#1e5aa4] rounded-[30px] p-6 shadow-lg text-white">
      <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Quick Activities</h3>
          {insight && (
              <div className="text-xs bg-white/20 px-3 py-1 rounded-full animate-pulse">
                  New Report Available
              </div>
          )}
      </div>
      
      {insight && (
        <div className="mb-6 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="flex items-start gap-2">
                <Sparkles className="text-yellow-300 shrink-0 mt-1" size={16} />
                <p className="text-sm font-medium leading-relaxed">{insight}</p>
                <button onClick={() => setInsight(null)} className="ml-auto text-white/60 hover:text-white text-xs">Dismiss</button>
            </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={handleRecordAttendance}
          className="bg-white text-gray-800 rounded-xl py-4 px-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Calendar className="text-[#1e5aa4]" size={24} />
          <span className="text-sm font-bold">Record Attendance</span>
        </button>

        <button 
          onClick={handleViewParticipants}
          className="bg-white text-gray-800 rounded-xl py-4 px-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Users className="text-[#1e5aa4]" size={24} />
          <span className="text-sm font-bold">View Participants</span>
        </button>

        <button 
            onClick={handleGenerateInsight}
            disabled={loading}
            className="bg-white text-gray-800 rounded-xl py-4 px-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-70"
        >
          {loading ? (
             <div className="w-6 h-6 border-2 border-[#1e5aa4] border-t-transparent rounded-full animate-spin"></div>
          ) : (
             <Sparkles className="text-[#1e5aa4]" size={24} />
          )}
          <span className="text-sm font-bold">{loading ? 'Analyzing...' : 'Generate Report'}</span>
        </button>

        <button 
          onClick={handleUploadScores}
          className="bg-white text-gray-800 rounded-xl py-4 px-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <BarChart2 className="text-[#1e5aa4]" size={24} />
          <span className="text-sm font-bold">Upload Scores</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActivities;