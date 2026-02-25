"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Filter, Users, CheckCircle, Clock, AlertCircle } from "lucide-react";
import AssignmentCard from "@/components/GradesComponents/AssignmentCard";
import CreateAssignmentModal from "@/components/GradesComponents/CreateAssignmentModal";
import GradeStudentsModal from "@/components/GradesComponents/GradeStudentsModal";
import ViewGradesModal from "@/components/GradesComponents/ViewGradesModal";
import Pagination from "@/components/ui/Pagination";
import { Assignment } from "@/types/assignment";
import { getAllParticipants } from "@/lib/mockParticipants";

export default function AssignmentsPage() {
  const router = useRouter();

 
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "not-started" | "in-progress" | "completed">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "Quiz" | "Capstone" | "Assignment">("all");
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "title">("latest");
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  const mockStudents = getAllParticipants().map(p => ({
    id: p.id,
    name: p.name
  }));
  
  const totalStudents = mockStudents.length;

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [openGrade, setOpenGrade] = useState(false);
  const [gradeIndex, setGradeIndex] = useState<number | null>(null);
  
  const [openViewGrades, setOpenViewGrades] = useState(false);
  const [viewGradesIndex, setViewGradesIndex] = useState<number | null>(null);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      title: "HTML Structure Assignment",
      type: "Assignment",
      course: "Web Fundamentals",
      chapter: "HTML Basics",
      dueDate: "2025-01-20",
      maxScore: 100,
      totalStudents: totalStudents,
      gradedStudents: 3,
      grades: { "1": 85, "2": 92, "3": 78 }
    },
    {
      title: "Final Portfolio Project",
      type: "Capstone",
      course: "Web Fundamentals",
      chapter: "Responsive Design",
      dueDate: "2025-01-25",
      maxScore: 200,
      totalStudents: totalStudents,
      gradedStudents: totalStudents,
      grades: { "001": 180, "002": 195, "003": 165, "004": 188, "005": 172, "006": 190, "007": 175, "008": 185 }
    },
    {
      title: "CSS Flexbox Quiz",
      type: "Quiz",
      course: "Web Fundamentals",
      chapter: "CSS Layout",
      dueDate: "2025-01-15",
      maxScore: 50,
      totalStudents: totalStudents,
      gradedStudents: 0
    },
    {
      title: "JavaScript Basics Test",
      type: "Quiz",
      course: "Web Fundamentals",
      chapter: "JavaScript Intro",
      dueDate: "2025-01-30",
      maxScore: 75,
      totalStudents: totalStudents,
      gradedStudents: 5
    },
  ]);

  
  const getAssignmentStatus = (assignment: Assignment) => {
    if (!assignment.totalStudents || assignment.totalStudents === 0) return "not-started";
    if (!assignment.gradedStudents || assignment.gradedStudents === 0) return "not-started";
    if (assignment.gradedStudents < assignment.totalStudents) return "in-progress";
    return "completed";
  };

  
  const filteredAndSortedAssignments = useMemo(() => {
    const filtered = assignments.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.chapter.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || getAssignmentStatus(assignment) === statusFilter;
      const matchesType = typeFilter === "all" || assignment.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    // Sort assignments
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        case "oldest":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [assignments, searchTerm, statusFilter, typeFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedAssignments.length / itemsPerPage);
  const paginatedAssignments = filteredAndSortedAssignments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter, sortBy]);

  const addAssignment = (newAssignment: Assignment) => {
    setAssignments(prev => [...prev, { ...newAssignment, totalStudents: totalStudents, gradedStudents: 0 }]);
    setOpenCreate(false);
  };

  const updateAssignment = (updated: Assignment) => {
    if (editIndex === null) return;
    const newList = [...assignments];
    newList[editIndex] = updated;
    setAssignments(newList);
    setOpenEdit(false);
    setEditIndex(null);
  };

  const deleteAssignment = (index: number) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      const newList = [...assignments];
      newList.splice(index, 1);
      setAssignments(newList);
    }
  };

  const saveGrades = (grades: Record<string, number>) => {
    if (gradeIndex === null) return;
    const newList = [...assignments];
    const gradedCount = Object.keys(grades).length;
    newList[gradeIndex] = { 
      ...newList[gradeIndex], 
      grades,
      gradedStudents: gradedCount
    };
    setAssignments(newList);
    setOpenGrade(false);
    setGradeIndex(null);
  };

  return (
    <div className="pr-6 pb-6 min-h-screen">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-sky-700">Assignments</h1>
          <p className="text-xs text-gray-600">Create, manage, and grade student assignments</p>
        </div>
      </div>

     
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "not-started" | "in-progress" | "completed")}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as "all" | "Quiz" | "Capstone" | "Assignment")}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="Quiz">Quiz</option>
            <option value="Assignment">Assignment</option>
            <option value="Capstone">Capstone</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "latest" | "oldest" | "title")}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">By Title</option>
          </select>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-red-500" size={16} />
            <span className="text-sm text-gray-600">Not Started</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-yellow-500" size={16} />
            <span className="text-sm text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={16} />
            <span className="text-sm text-gray-600">Completed</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpenCreate(true)}
          className="px-4 py-2 text-xs text-white rounded-full bg-gradient-to-r from-sky-600 to-gray-400 hover:from-sky-700 hover:to-gray-500 transition"
        >
          + New Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedAssignments.map((a) => {
          const originalIndex = assignments.findIndex(assignment => assignment === a);
          const status = getAssignmentStatus(a);
          return (
            <AssignmentCard
              key={originalIndex}
              {...a}
              status={status}
              onGradeClick={() => {
                if (status === "completed") {
                  setViewGradesIndex(originalIndex);
                  setOpenViewGrades(true);
                } else {
                  setGradeIndex(originalIndex);
                  setOpenGrade(true);
                }
              }}
              onEditClick={() => {
                setEditIndex(originalIndex);
                setOpenEdit(true);
              }}
              onDeleteClick={() => deleteAssignment(originalIndex)}
            />
          );
        })}
      </div>
      
      {filteredAndSortedAssignments.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredAndSortedAssignments.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        showInfo={true}
      />

      <CreateAssignmentModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={addAssignment}
      />

      {editIndex !== null && (
        <CreateAssignmentModal
          isOpen={openEdit}
          onClose={() => setOpenEdit(false)}
          onCreate={updateAssignment}
          assignment={assignments[editIndex]}
        />
      )}

      {gradeIndex !== null && (
        <GradeStudentsModal
          isOpen={openGrade}
          onClose={() => setOpenGrade(false)}
          assignment={assignments[gradeIndex]}
          students={mockStudents}
          onSaveGrades={saveGrades}
        />
      )}

      {viewGradesIndex !== null && (
        <ViewGradesModal
          isOpen={openViewGrades}
          onClose={() => {
            setOpenViewGrades(false);
            setViewGradesIndex(null);
          }}
          assignment={assignments[viewGradesIndex]}
          students={mockStudents}
          onSaveGrades={(grades) => {
            const newList = [...assignments];
            const gradedCount = Object.keys(grades).length;
            newList[viewGradesIndex] = { 
              ...newList[viewGradesIndex], 
              grades,
              gradedStudents: gradedCount
            };
            setAssignments(newList);
          }}
        />
      )}
    </div>
  );
}