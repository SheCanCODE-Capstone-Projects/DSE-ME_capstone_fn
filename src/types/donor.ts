export interface Donor {
  readonly id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  type: 'Individual' | 'Corporate' | 'Foundation' | 'Government';
  status: 'Active' | 'Inactive';
  joinDate: string;
  totalDonations: number;
  lastDonationDate: string;
  preferredCauses: string[];
}

export interface Donation {
  readonly id: string;
  donorId: string;
  amount: number;
  currency: string;
  date: string;
  purpose: string;
  status: 'Completed' | 'Pending' | 'Failed';
  partnerId?: string;
  programId?: string;
}

export interface DonorStats {
  totalDonors: number;
  totalDonations: number;
  averageDonation: number;
  monthlyGrowth: number;
  activeDonors: number;
  topDonors: Donor[];
}

export interface ImpactMetrics {
  participantsSupported: number;
  programsEnabled: number;
  partnersSupported: number;
  employmentRate: number;
  completionRate: number;
  satisfactionScore: number;
}