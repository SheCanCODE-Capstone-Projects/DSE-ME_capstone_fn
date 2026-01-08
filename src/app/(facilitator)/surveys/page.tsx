'use client';
import StatCard from "@/components/ui/statuscard";
import { useState } from "react";
import { Plus, Users, CheckCircle, Clock, View } from "lucide-react";

const surveyData = [
  {
    id: '001',
    name: 'Starting the cohort',
    period: 'Start',
    participants: 35,
    status: 'done',
  },
  {
    id: '002',
    name: 'Middle of the cohort',
    period: 'Middle',
    participants: 20,
    status: 'pending',
  },
  {
    id: '003',
    name: 'End of the cohort',
    period: 'End',
    participants: null,
    status: '',
  },
];

export default function Surveys() {
  const [filter, setFilter] = useState<'All' | 'Start' | 'Middle' | 'End'>('All');

  const filteredSurveys =
    filter === 'All' ? surveyData : surveyData.filter((s) => s.period === filter);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col">
        <main className="flex-1  pt-1 pb-4" >
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#34597E'}}>Survey Management</h1>

         
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold" style={{ color: '#796666' }}>manage and track your surveys for your cohort Participants</h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md" style={{ background: 'linear-gradient(135deg, #0B609D, #666666)', color: 'white' }}>
              <Plus className="w-4 h-4" />
              Add Survey
            </button>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard 
              icon={<Users size={32} />}
              title="Active Survey"
              value={1}
              subtext="Currently running"
            />
            <StatCard 
              icon={<CheckCircle size={32} />}
              title="Completed"
              value={1}
              subtext="This month"
            />
            <StatCard 
              icon={<Clock size={32} />}
              title="Pending"
              value={7}
              subtext="Awaiting responses"
            />
          </div>

         
          <div className="flex justify-end gap-4 mb-6">
            {['All', 'Start', 'Middle', 'End'].map((period) => (
              <button
                key={period}
                onClick={() => setFilter(period as 'All' | 'Start' | 'Middle' | 'End')}
                className="px-4 py-2 rounded-full"
                style={{
                  background: filter === period 
                    ? 'linear-gradient(135deg, #0B609D, #666666)' 
                    : '#D9D9D9',
                  color: filter === period ? 'white' : '#666666'
                }}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Survey Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)', border: '1px solid #999999', borderRadius: '12px', overflow: 'hidden' }}>
              <thead>
                <tr className="text-left" style={{ borderBottom: '1px solid #999999' }}>
                  <th className="p-4">ID</th>
                  <th>Name of Survey</th>
                  <th>Period</th>
                  <th>Nbr of Participants</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {filteredSurveys.map((survey) => (
                  <tr key={survey.id} style={{ borderBottom: '1px solid #999999' }}>
                    <td className="p-4">{survey.id}</td>
                    <td>{survey.name}</td>
                    <td>{survey.period}</td>
                    <td>{survey.participants ?? '--'}</td>
                    <td>{survey.status || '--'}</td>
                    <td className="space-x-2">
                      {survey.status && (
                        <button className="px-2 py-1 text-xs bg-gray-200 rounded">
                          {survey.status}
                        </button>
                      )}
                    </td>
                    <td>
                      <button className="flex items-center gap-1 px-2 py-1 text-xs rounded" style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}>
                        <View className="w-3 h-3" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

