export interface Event {
  id: string;
  title: string;
  date: Date;
  description: string;
  location: string;
  createdBy: string;
  spotLeft: number;
  joinTill: Date;
  cancellationTerms: string;
  mediaUrl?: string;
  createdAt: Date;
  deletedAt?: Date;
}
