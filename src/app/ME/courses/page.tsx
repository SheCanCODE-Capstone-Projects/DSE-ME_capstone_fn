"use client";

import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import CourseCard from "@/components/ME/Course/CourseCard";
import CreateCourseModal from "@/components/ME/Course/CreateCourseModal";

interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  facilitatorsCount: number;
  participantsCount: number;
  isActive: boolean;
}

const mockCourses: Course[] = [
  {
    id: "1",
    name: "Business Skills Fundamentals",
    description: "Essential business skills for professional development",
    duration: "8 weeks",
    level: "Beginner",
    facilitatorsCount: 3,
    participantsCount: 45,
    isActive: true
  },
  {
    id: "2", 
    name: "Leadership Development",
    description: "Advanced leadership and management techniques",
    duration: "12 weeks",
    level: "Advanced",
    facilitatorsCount: 2,
    participantsCount: 28,
    isActive: true
  },
  {
    id: "3",
    name: "Digital Marketing",
    description: "Modern digital marketing strategies and tools",
    duration: "6 weeks", 
    level: "Intermediate",
    facilitatorsCount: 1,
    participantsCount: 32,
    isActive: false
  }
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(search.toLowerCase()) ||
                         course.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    const matchesStatus = statusFilter === "all" ||
                         (statusFilter === "active" && course.isActive) ||
                         (statusFilter === "inactive" && !course.isActive);
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const handleCreateCourse = (newCourse: Omit<Course, "id">) => {
    const course: Course = {
      ...newCourse,
      id: `course_${Date.now()}`
    };
    setCourses(prev => [...prev, course]);
    setCreateModalOpen(false);
  };

  const handleToggleActive = (id: string) => {
    setCourses(prev =>
      prev.map(course => 
        course.id === id ? { ...course, isActive: !course.isActive } : course
      )
    );
  };

  return (
    <div>
    
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0B609D] text-white rounded-lg hover:bg-[#094d7a] transition"
          >
            <Plus size={16} />
            New Course
          </button>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onToggleActive={handleToggleActive}
          />
        ))}

        {filteredCourses.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No courses found.
          </p>
        )}
      </div>

      <CreateCourseModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateCourse}
      />
    </div>
  );
}