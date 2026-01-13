export interface Participant {
  id: string;
  name: string;
  email: string;
  cohort: string;
  gender: string;
  employment: string;
  score: number | null;
  income: string;
  schoolName?: string;
  status: "Completed" | "In Progress" | "Not Started";
  joinDate: string;
}