
export interface Participant {
  id: string;
  name: string;
  gender: string;
  age: number;
  phone: string;
  email?: string;
  course: string;
  cohort: string;
  enrollmentDate: string;
  status: string;
}

export const mockParticipants: Participant[] = [
  {
    id: "001",
    name: "Nedege Isi",
    gender: "Female",
    age: 24,
    phone: "0781234567",
    email: "nedege@example.com",
    enrollmentDate: "2025-01-01",
    course: "Web Fundamentals",
    cohort: "cohort-1",
    status: "Active",
  },
  {
    id: "002",
    name: "John Doe",
    gender: "Male",
    age: 29,
    phone: "0787654321",
    email: "john@example.com",
    enrollmentDate: "2025-01-05",
    course: "Web Fundamentals",
    cohort: "cohort-1",
    status: "Inactive",
  },
  {
    id: "003",
    name: "Mary Jane",
    gender: "Female",
    age: 22,
    phone: "0781112223",
    email: "mary@example.com",
    enrollmentDate: "2025-01-10",
    course: "Web Fundamentals",
    cohort: "cohort-1",
    status: "Active",
  },
  {
    id: "004",
    name: "Alice Smith",
    gender: "Female",
    age: 31,
    phone: "0784445556",
    email: "alice@example.com",
    enrollmentDate: "2025-02-01",
    course: "Web Fundamentals",
    cohort: "cohort-1",
    status: "Active",
  },
  {
    id: "005",
    name: "Robert Brown",
    gender: "Male",
    age: 45,
    phone: "0789998887",
    email: "robert@example.com",
    enrollmentDate: "2025-02-15",
    course: "Web Fundamentals",
    cohort: "cohort-1",
    status: "Active",
  },
  {
    id: "006",
    name: "Diane Brown",
    gender: "Female",
    age: 28,
    phone: "0783334445",
    email: "diane@example.com",
    enrollmentDate: "2025-01-12",
    course: "Web Fundamentals",
    cohort: "cohort-1",
    status: "Active",
  },
  {
    id: "007",
    name: "Frank Miller",
    gender: "Male",
    age: 35,
    phone: "0786667778",
    email: "frank@example.com",
    enrollmentDate: "2025-01-18",
    course: "Web Fundamentals",
    cohort: "cohort-1",
    status: "Active",
  },
  {
    id: "008",
    name: "Grace Lee",
    gender: "Female",
    age: 26,
    phone: "0789990001",
    email: "grace@example.com",
    enrollmentDate: "2025-01-22",
    course: "Web Fundamentals",
    cohort: "cohort-1",
    status: "Active",
  }
];


export function getParticipantsByCohort(cohort: string): Participant[] {
  return mockParticipants.filter(p => p.cohort === cohort);
}


export function getParticipantsByCourse(course: string): Participant[] {
  return mockParticipants.filter(p => p.course === course);
}


export function getActiveParticipants(): Participant[] {
  return mockParticipants.filter(p => p.status === "Active");
}


export function getAllParticipants(): Participant[] {
  return mockParticipants;
}
