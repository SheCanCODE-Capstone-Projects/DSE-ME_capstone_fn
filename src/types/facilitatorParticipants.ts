export type Gender = 'MALE' | 'FEMALE' | 'NON_BINARY' | 'PREFER_NOT_TO_SAY';
export type DisabilityStatus = 'YES' | 'NO' | 'PREFER_NOT_TO_SAY';
export type EmploymentStatusBaseline =
  | 'EMPLOYED'
  | 'UNEMPLOYED'
  | 'SELF_EMPLOYED'
  | 'FURTHER_EDUCATION';

export type EnrollmentStatus =
  | 'ENROLLED'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'COMPLETED'
  | 'DROPPED_OUT'
  | 'WITHDRAWN';

export interface FacilitatorParticipantListItem {
  participantId: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  gender: Gender | null;
  enrollmentDate: string | null; // LocalDate serialized
  attendancePercentage: number | null;
  enrollmentStatus: EnrollmentStatus | string | null;
  enrollmentId: string | null;
}

export interface FacilitatorParticipantsListResponse {
  participants: FacilitatorParticipantListItem[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface FacilitatorParticipantsListParams {
  cohortId?: string;
  page?: number;
  size?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  enrollmentStatusFilter?: EnrollmentStatus;
  genderFilter?: Gender;
}

export interface FacilitatorParticipantStatistics {
  activeParticipantsCount: number;
  inactiveParticipantsCount: number;
  genderDistribution: Record<string, number>;
  totalParticipantsCount: number;
}

export interface FacilitatorParticipantResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string | null; // LocalDate serialized
  gender: Gender;
  disabilityStatus: DisabilityStatus;
  educationLevel: string;
  employmentStatusBaseline: EmploymentStatusBaseline;
  partnerId: string | null;
  partnerName: string | null;
  createdByName: string | null;
  createdByEmail: string | null;
  createdAt: string | null; // Instant serialized
  updatedAt: string | null; // Instant serialized
}

export interface CreateFacilitatorParticipantDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string | null;
  gender: Gender;
  disabilityStatus: DisabilityStatus;
  educationLevel: string;
  employmentStatusBaseline: EmploymentStatusBaseline;
  cohortId?: string;
}

export interface UpdateFacilitatorParticipantDTO {
  firstName: string;
  lastName: string;
  dateOfBirth?: string | null;
  gender: Gender;
  disabilityStatus: DisabilityStatus;
}

export interface FacilitatorParticipantDetail {
  participantId: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  gender: Gender | null;
  disabilityStatus: DisabilityStatus | null;
  cohortName: string | null;
  enrollmentStatus: EnrollmentStatus | string | null;
  attendancePercentage: number | null;
  enrollmentId: string | null;
  cohortId: string | null;
}

