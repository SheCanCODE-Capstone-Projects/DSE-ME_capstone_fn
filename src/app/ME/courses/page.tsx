"use client";

import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import CourseCard from "@/components/ME/Course/CourseCard";
import CreateCourseModal from "@/components/ME/Course/CreateCourseModal";
import { useEffect } from "react";
import { getCourses, createCourse } from "../../../lib/courseApi";

export type CreateCoursePayload = {
  name: string;
  code: string;
  description: string;
  level: string;
  durationWeeks: number;
  maxParticipants: number;
};

interface Facilitator {
  id: string;
  firstName: string;
  lastName: string;
}
export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  level: string;
  durationWeeks: number;
  maxParticipants: number;
  currentParticipants: number;
  status: string; // "ACTIVE" | "INACTIVE"
  facilitators: Facilitator[];
}

export type Payload = {
  name: string;
  code: string;
  description: string;
  level: string;
  durationWeeks: number;
  maxParticipants: number;
};


const mapCourseToCard = (course: Course) => {
  // Convert API level to UI-friendly level
  let uiLevel: "Beginner" | "Intermediate" | "Advanced";
  switch (course.level.toUpperCase()) {
    case "BEGINNER":
      uiLevel = "Beginner";
      break;
    case "INTERMEDIATE":
      uiLevel = "Intermediate";
      break;
    case "ADVANCED":
      uiLevel = "Advanced";
      break;
    default:
      uiLevel = "Beginner"; // fallback
  }

  return {
    id: course.id,
    name: course.name,
    description: course.description,
    duration: course.durationWeeks.toString(),
    level: uiLevel, // now matches your CourseCard type
    facilitatorsCount: course.facilitators.length,
    participantsCount: course.currentParticipants,
    isActive: course.status === "ACTIVE",
  };
};



const levelOptions = [
  { label: "Beginner", value: "BEGINNER" },
  { label: "Intermediate", value: "INTERMEDIATE" },
  { label: "Advanced", value: "ADVANCED" },
];

// -----------------------------
// Component
// -----------------------------
export default function CoursesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses();
        setCourses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());

    const matchesLevel = levelFilter === "all" || course.level === levelFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && course.status === "ACTIVE") ||
      (statusFilter === "inactive" && course.status === "INACTIVE");

    return matchesSearch && matchesLevel && matchesStatus;
  });

  const handleCreateCourse = async (newCourse: CreateCoursePayload) => {
    try {
      setError(null);
      setCreating(true);

      const payload = {
        name: newCourse.name,
        code: newCourse.code,
        description: newCourse.description,
        level: newCourse.level,
        durationWeeks: Number(newCourse.durationWeeks),
        maxParticipants: Number(newCourse.maxParticipants),
      };

      const createdCourse = await createCourse(payload);

      // Add new course to state
      setCourses((prev) => [...prev, createdCourse]);
      setCreateModalOpen(false);
    } catch (err: any) {
      console.error("Failed to create course:", err);
      setError(err.message || "Failed to create course");
    } finally {
      setCreating(false);
    }
  };

  const handleToggleActive = (id: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id
          ? { ...course, status: course.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : course
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
              {levelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
                ))}
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
        {loading && (
          <p className="text-center text-gray-500">Loading courses...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={mapCourseToCard(course)}
            onToggleActive={handleToggleActive}
          />
        ))}

        {! loading && filteredCourses.length === 0 && (
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