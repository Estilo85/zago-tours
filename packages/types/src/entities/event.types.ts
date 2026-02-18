export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
  location: string;
  createdBy: string;
  spotLeft: number;
  isSignature: boolean;
  joinTill: Date;
  cancellationTerms: string;
  mediaUrl: string | null;
  publicId: string | null;
  createdAt: Date;
  deletedAt: Date | null;
  isExpired?: boolean;
  isFull?: boolean;
  hasJoined?: boolean;
}
