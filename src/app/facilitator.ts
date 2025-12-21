export interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtext: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface ParticipantData {
  name: string;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export enum ActivityType {
  ATTENDANCE = 'ATTENDANCE',
  PARTICIPANTS = 'PARTICIPANTS',
  SCORES = 'SCORES',
  
}