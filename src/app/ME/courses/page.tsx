"use client";

import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import CourseCard from "@/components/ME/Course/CourseCard";
import CreateCourseModal from "@/components/ME/Course/CreateCourseModal";
import EditCourseModal from "@/components/ME/Course/EditCourseModal";
import { useGetMeCourses } from "@/hooks/me/useMeCohorts";
import { meApi } from "@/lib/meApi";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: string;
  facilitatorsCount: number;
  participantsCount: number;
  isActive: boolean;
}

interface EditCourse {
  id: string;
  name: string;
  code: string;
  description: string;
  durationWeeks: number;
  level: string;
}

export default function CoursesPage() {
  const queryClient = useQueryClient();
  const { data: coursesData = [], isLoading } = useGetMeCourses();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<EditCourse | null>(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const courses: Course[] = coursesData.map((c: any) => ({
    id: c.id,
    name: c.name,
    description: c.description || "No description available",
    duration: String(c.durationWeeks || 12),
    level: c.level || "BEGINNER",
    facilitatorsCount: c.facilitatorsCount || 0,
    participantsCount: c.participantsCount || 0,
    isActive: c.status === "ACTIVE",
  }));

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(search.toLowerCase()) ||
                         course.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "all" || course.level.toUpperCase() === levelFilter.toUpperCase();
    const matchesStatus = statusFilter === "all" ||
                         (statusFilter === "active" && course.isActive) ||
                         (statusFilter === "inactive" && !course.isActive);
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const handleCreateCourse = () => {
    setCreateModalOpen(false);
  };

  const handleToggleActive = async (id: string) => {
    try {
      await meApi.toggleCourseStatus(id);
      await queryClient.invalidateQueries({ queryKey: ["me", "courses"] });
      toast.success("Course status updated");
    } catch (error) {
      toast.error((error as Error).message || "Failed to update course status");
    }
  };

  const handleEdit = (course: Course) => {
    const editCourse: EditCourse = {
      id: course.id,
      name: course.name,
      code: coursesData.find((c: any) => c.id === course.id)?.code || "",
      description: course.description,
      durationWeeks: parseInt(course.duration),
      level: course.level,
    };
    setSelectedCourse(editCourse);
    setEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      return;
    }
    try {
      await meApi.deleteCourse(id);
      await queryClient.invalidateQueries({ queryKey: ["me", "courses"] });
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error((error as Error).message || "Failed to delete course");
    }
  };

  const handleEditSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["me", "courses"] });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading courses…</p>
      </div>
    );
  }

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
            onEdit={handleEdit}
            onDelete={handleDelete}
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

      <EditCourseModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        course={selectedCourse}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}