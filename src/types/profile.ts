export interface ProfileDetails {
  name: string;
  email: string;
  organization: string;
  location: string;
  extra?: string;
}

export type UserRole = "Partner" | "ME" | "Facilitator";


export interface Organization {
  name: string;
  locations: string[];
}
