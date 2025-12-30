export interface CreateEventDTO {
  title: string;
  date: Date;
  description: string;
  location: string;
  createdBy: string;
  spotLeft: number;
  joinTill: Date;
  cancellationTerms: string;
  mediaUrl?: string;
}

export interface UpdateEventDTO {
  title?: string;
  date?: Date;
  description?: string;
  location?: string;
  spotLeft?: number;
  joinTill?: Date;
  cancellationTerms?: string;
  mediaUrl?: string;
}
