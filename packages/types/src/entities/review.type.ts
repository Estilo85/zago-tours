export interface Review {
  id: string;
  title?: string | null;
  content: string;
  rating: number;
  isFeatured: boolean;
  userId: string;
  adventureId: string;
  createdAt: Date;
}
