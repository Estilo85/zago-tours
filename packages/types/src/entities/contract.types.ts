import { ContractStatus, CallStatus } from '../enums';

export interface Contract {
  id: string;
  userId: string;
  agreement: string;
  status: ContractStatus;
  signedAt?: Date;
  documentUrl: string;
  createdAt: Date;
}

export interface TripPlanningCall {
  id: string;
  adventurerId: string;
  agentId: string;
  calendarEventId?: string;
  meetingLink?: string;
  startTime: Date;
  endTime?: Date;
  status: CallStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface TripRequest {
  id: string;
  tripType: string;
  destination: string;
  date: Date;
  preferences?: string;
  createdAt: Date;
}

export interface CallbackRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  bestTime: string;
  createdAt: Date;
}

export interface GeneralInquiry {
  id: string;
  email: string;
  message: string;
  phone?: string;
  address?: string;
  createdAt: Date;
}
