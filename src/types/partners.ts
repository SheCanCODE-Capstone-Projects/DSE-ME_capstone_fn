export interface Partner {
  readonly id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  province: string;
  district: string;
  staff: number;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
  totalParticipants: number;
  activeParticipants: number;
  completedParticipants: number;
  dropoutRate: number;
  employmentRate: number;
  internshipPlacementRate: number;
  programs: number;
  participantsWithDisability: number;
  femaleParticipants: number;
  maleParticipants: number;
}

export interface MERequest {
  readonly id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  requestDate: string;
  readonly partnerId: string;
  status: 'pending' | 'approved' | 'denied';
}