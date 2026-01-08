export interface Assignment {
  title: string;
  description?: string;
  type: "Quiz" | "Capstone" | "Assignment";
  course: string;
  chapter: string;
  dueDate: string;
  maxScore: number;
  grades?: Record<string, number>; 
  totalStudents?: number;
  gradedStudents?: number;
}

export interface Student {
  id: string;
  name: string;
}
