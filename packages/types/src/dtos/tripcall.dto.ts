import { CallStatus, MediaType } from '../enums';

export interface CreateTripRequestDTO {
  tripType: string;
  destination: string;
  date: Date;
  preferences?: string;
}

export interface CreateCallbackRequestDTO {
  name: string;
  email: string;
  phone: string;
  bestTime: string;
}

export interface CreateGeneralInquiryDTO {
  email: string;
  message: string;
  phone?: string;
  address?: string;
}

export interface CreateTripPlanningCallDTO {
  adventurerId: string;
  agentId: string;
  calendarEventId?: string;
  meetingLink?: string;
  startTime: Date;
  endTime?: Date;
}

export interface UpdateTripPlanningCallDTO {
  calendarEventId?: string;
  meetingLink?: string;
  startTime?: Date;
  endTime?: Date;
  status?: CallStatus;
}

export interface CreateDestinationCountryDTO {
  name: string;
  code?: string;
  isActive?: boolean;
}

export interface UpdateDestinationCountryDTO {
  name?: string;
  code?: string;
  isActive?: boolean;
}
