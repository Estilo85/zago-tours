export interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
