/** UI cohort: can be from API (ME) or legacy shape */
export interface Cohort {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  participantCount: number;
  isActive: boolean;
  /** Course name for display e.g. "Web Dev" */
  courseName?: string;
  /** Facilitator display name e.g. "Jane Doe" */
  facilitatorName?: string;
  /** Multiple facilitators */
  facilitators?: { id: string; firstName?: string; lastName?: string; email?: string }[];
}