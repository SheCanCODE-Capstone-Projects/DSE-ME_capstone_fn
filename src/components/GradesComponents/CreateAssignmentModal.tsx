"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Assignment } from "@/types/assignment";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (assignment: Assignment) => void;
  assignment?: Assignment; 
};

export default function CreateAssignmentModal({ isOpen, onClose, onCreate, assignment }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [chapter, setChapter] = useState("");
  const [category, setCategory] = useState<Assignment["type"]>("Assignment");
  const [dueDate, setDueDate] = useState("");
  const [maxScore, setMaxScore] = useState(100);


  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title);
      setDescription(assignment.description || "");
      setCourse(assignment.course);
      setChapter(assignment.chapter);
      setCategory(assignment.type);
      setDueDate(assignment.dueDate);
      setMaxScore(assignment.maxScore);
    } else {
      setTitle("");
      setDescription("");
      setCourse("");
      setChapter("");
      setCategory("Assignment");
      setDueDate("");
      setMaxScore(100);
    }
  }, [assignment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      title,
      description,
      type: category,
      course,
      chapter,
      dueDate,
      maxScore,
    });
  };

  const courses = ["Web Fundamentals", "JavaScript Basics", "React Basics"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg p-4 sm:p-6 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-sky-900">
            {assignment ? "Edit Assignment" : "Create New Assignment"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form className="space-y-4 px-1 rounded relative w-full sm:w-[400px]" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">Assignment Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. HTML Structure Assignment"
              className="w-full border border-gray-200 rounded-2xl px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              placeholder="Assignment instructions..."
              className="w-full border border-gray-200 rounded-2xl px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Course *</label>
              <select
                value={course}
                onChange={e => setCourse(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-3 py-2"
                required
              >
                <option value="">Select course</option>
                {courses.map((c, idx) => (
                  <option key={idx} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Max Score</label>
              <input
                type="number"
                value={maxScore}
                onChange={e => setMaxScore(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-2xl px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Chapter Name *</label>
            <input
              type="text"
              value={chapter}
              onChange={e => setChapter(e.target.value)}
              placeholder="e.g. HTML Basics"
              className="w-full border border-gray-200 rounded-2xl px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as Assignment["type"])}
              className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="Quiz">Quiz</option>
              <option value="Capstone">Capstone</option>
              <option value="Assignment">Assignment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl px-3 py-2"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-2xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-white rounded-2xl bg-gradient-to-r from-sky-700 to-gray-600 hover:from-sky-800 hover:to-gray-700 transition"
            >
              {assignment ? "Update Assignment" : "Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
