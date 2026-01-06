'use client';

import React, { useState } from 'react';
import {
  Users,
  BarChart3,
  CheckCircle,
  ClipboardList,
} from 'lucide-react';

type Category = 'assignment' | 'capstone' | 'quiz';

interface Student {
  name: string;
  email: string;
  assignment: number;
  capstone: number;
  quiz: number;
}

const studentsData: Student[] = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    assignment: 0,
    capstone: 0,
    quiz: 0,
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    assignment: 0,
    capstone: 0,
    quiz: 0,
  },
  {
    name: 'Michael Brown',
    email: 'm.brown@example.com',
    assignment: 0,
    capstone: 0,
    quiz: 0,
  },
];

const getGrade = (percentage: number) => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};

export default function GradeSummaryPage() {
  const [gradeFilter, setGradeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

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
    <div className="min-h-screen bg-[#f0f4f8]  flex ml-22">
      <div className="flex-1 flex flex-col">
        <main className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">

          {/* TITLE */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#34597E]">
              Grade Summary
            </h1>
            <p className="text-sm text-gray-500">
              Comprehensive view of all student grades
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Users size={26} />,
                title: 'Total Students',
                value: studentsData.length,
                sub: '0 passing',
              },
              {
                icon: <BarChart3 size={26} />,
                title: 'Class Average',
                value: '0.0%',
                sub: 'Overall performance',
              },
              {
                icon: <CheckCircle size={26} />,
                title: 'Pass Rate',
                value: '0%',
                sub: '50% or higher',
              },
              {
                icon: <ClipboardList size={26} />,
                title: 'Total Assignments',
                value: '2',
                sub: '1 Assignment, 1 Capstone',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl px-6 py-5 border border-slate-200 flex items-center gap-4"
              >
                <div className="text-[#34597E]">{card.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-[#34597E]">
                    {card.value}
                  </p>
                  <p className="text-xs text-gray-400">
                    {card.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FILTERS */}
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

          {/* TABLE */}
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