'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  BarChart3,
  CheckCircle,
  ClipboardList,
  ArrowLeft,
} from 'lucide-react';
import StatCard from '@/components/ui/statuscard';
import { getAllParticipants } from '@/lib/mockParticipants';

type Category = 'assignment' | 'capstone' | 'quiz';

interface Student {
  name: string;
  email: string;
  assignment: number;
  capstone: number;
  quiz: number;
}

const studentsData: Student[] = getAllParticipants().map(p => ({
  name: p.name,
  email: p.email || `${p.name.toLowerCase().replace(' ', '.')}@example.com`,
  assignment: 0,
  capstone: 0,
  quiz: 0,
}));

const getGrade = (percentage: number) => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};

export default function GradeSummaryPage() {
  const router = useRouter();
  const [gradeFilter, setGradeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const statsData = [
    { title: "Total Students", value: studentsData.length.toString(), subtext: "0 passing", icon: <Users size={32} /> },
    { title: "Class Average", value: "0.0%", subtext: "Overall performance", icon: <BarChart3 size={32} /> },
    { title: "Pass Rate", value: "0%", subtext: "50% or higher", icon: <CheckCircle size={32} /> },
    { title: "Total Assignments", value: "2", subtext: "1 Assignment, 1 Capstone", icon: <ClipboardList size={32} /> },
  ];

  const filteredStudents = studentsData.filter((student) => {
    const totalScore =
      student.assignment + student.capstone + student.quiz;
    const percentage = (totalScore / 350) * 100;
    const grade = getGrade(percentage);

    if (gradeFilter !== 'All' && grade !== gradeFilter) return false;

    if (categoryFilter !== 'All') {
      return student[categoryFilter as Category] > 0;
    }

    return true;
  });

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col">
        <main className="py-6 space-y-8">
         
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-sky-700">
                Grade Summary
              </h1>
              <p className="text-sm text-gray-500">
                Comprehensive view of all student grades
              </p>
            </div>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, i) => (
              <StatCard
                key={i}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                subtext={stat.subtext}
              />
            ))}
          </div>

          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm"
            >
              <option value="All">All Categories</option>
              <option value="assignment">Assignments Only</option>
              <option value="capstone">Capstone Only</option>
              <option value="quiz">Quizzes Only</option>
            </select>

            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm"
            >
              <option value="All">All Grades</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>

          
          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
            <table className="min-w-[800px] w-full text-sm">
              <thead className="bg-[#eef3fb] text-[#1e3a8a]">
                <tr>
                  <th className="p-4 text-left">Student</th>
                  <th className="p-4 text-center">Assignment</th>
                  <th className="p-4 text-center">Capstone</th>
                  <th className="p-4 text-center">Quiz</th>
                  <th className="p-4 text-center">Total</th>
                  <th className="p-4 text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const total =
                    student.assignment +
                    student.capstone +
                    student.quiz;
                  const grade = getGrade((total / 350) * 100);

                  return (
                    <tr
                      key={student.email}
                      className="border-t border-slate-200"
                    >
                      <td className="p-4 whitespace-nowrap">
                        <p className="font-semibold text-gray-800">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-400 break-all">
                          {student.email}
                        </p>
                      </td>
                      <td className="p-4 text-center">{student.assignment}/100</td>
                      <td className="p-4 text-center">{student.capstone}/200</td>
                      <td className="p-4 text-center">{student.quiz}/50</td>
                      <td className="p-4 text-center font-semibold text-[#1e3a8a]">
                        {total}/350
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-4 py-1 rounded-full bg-red-100 text-red-600 font-bold">
                          {grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}