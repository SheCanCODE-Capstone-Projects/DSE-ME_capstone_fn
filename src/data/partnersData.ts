import { type Partner, type MERequest } from "@/types/partners";

export const partnersData: Partner[] = [
  {
    id: "1",
    name: "Klab Rwanda",
    type: "Tech Hub",
    email: "info@klab.rw",
    phone: "+250-788-123-456",
    province: "Kigali City",
    district: "Gasabo",
    staff: 45,
    status: "Active",
    joinDate: "2023-01-15",
    totalParticipants: 320,
    activeParticipants: 120,
    completedParticipants: 180,
    dropoutRate: 6.25,
    employmentRate: 78,
    internshipPlacementRate: 85,
    programs: 3,
    participantsWithDisability: 28,
    femaleParticipants: 192,
    maleParticipants: 128
  },
  {
    id: "2",
    name: "Rwanda Coding Academy",
    type: "Educational Institution",
    email: "info@rca.ac.rw",
    phone: "+250-788-654-321",
    province: "Kigali City",
    district: "Kicukiro",
    staff: 28,
    status: "Active",
    joinDate: "2023-03-20",
    totalParticipants: 250,
    activeParticipants: 85,
    completedParticipants: 145,
    dropoutRate: 8.0,
    employmentRate: 82,
    internshipPlacementRate: 90,
    programs: 2,
    participantsWithDisability: 22,
    femaleParticipants: 140,
    maleParticipants: 110
  },
  {
    id: "3",
    name: "Digital Opportunity Trust Rwanda",
    type: "NGO",
    email: "rwanda@dotrust.org",
    phone: "+250-788-987-654",
    province: "Northern Province",
    district: "Musanze",
    staff: 35,
    status: "Active",
    joinDate: "2023-02-10",
    totalParticipants: 180,
    activeParticipants: 65,
    completedParticipants: 95,
    dropoutRate: 11.1,
    employmentRate: 65,
    internshipPlacementRate: 72,
    programs: 2,
    participantsWithDisability: 15,
    femaleParticipants: 108,
    maleParticipants: 72
  },
  {
    id: "4",
    name: "WeCode Rwanda",
    type: "Training Center",
    email: "info@wecode.rw",
    phone: "+250-788-456-789",
    province: "Eastern Province",
    district: "Kayonza",
    staff: 22,
    status: "Active",
    joinDate: "2023-04-05",
    totalParticipants: 150,
    activeParticipants: 55,
    completedParticipants: 80,
    dropoutRate: 10.0,
    employmentRate: 70,
    internshipPlacementRate: 76,
    programs: 1,
    participantsWithDisability: 12,
    femaleParticipants: 75,
    maleParticipants: 75
  },
  {
    id: "5",
    name: "INES Ruhengeri ICT Center",
    type: "University",
    email: "ict@ines.ac.rw",
    phone: "+250-788-321-654",
    province: "Northern Province",
    district: "Musanze",
    staff: 18,
    status: "Pending",
    joinDate: "2024-01-10",
    totalParticipants: 0,
    activeParticipants: 0,
    completedParticipants: 0,
    dropoutRate: 0,
    employmentRate: 0,
    internshipPlacementRate: 0,
    programs: 0,
    participantsWithDisability: 0,
    femaleParticipants: 0,
    maleParticipants: 0
  }
];

export const meRequestsData: MERequest[] = [
  {
    id: "1",
    name: "Jean Baptiste Nzeyimana",
    email: "jean.nzeyimana@email.com",
    phone: "+250-788-111-222",
    experience: "5 years in educational management",
    requestDate: "2024-01-15",
    partnerId: "1",
    status: "pending"
  },
  {
    id: "2",
    name: "Marie Claire Uwimana",
    email: "marie.uwimana@email.com",
    phone: "+250-788-333-444",
    experience: "3 years in program coordination",
    requestDate: "2024-01-18",
    partnerId: "1",
    status: "pending"
  },
  {
    id: "3",
    name: "Patrick Habimana",
    email: "patrick.habimana@email.com",
    phone: "+250-788-555-666",
    experience: "4 years in tech training",
    requestDate: "2024-01-20",
    partnerId: "2",
    status: "pending"
  },
  {
    id: "4",
    name: "Grace Mukamana",
    email: "grace.mukamana@email.com",
    phone: "+250-788-777-888",
    experience: "6 years in youth development",
    requestDate: "2024-01-22",
    partnerId: "3",
    status: "pending"
  }
];

export const getPartnerById = (id: string): Partner | undefined => {
  return partnersData.find((partner) => partner.id === id);
};

export const getMERequestsByPartnerId = (partnerId: string): MERequest[] => {
  return meRequestsData.filter((request) => request.partnerId === partnerId);
};