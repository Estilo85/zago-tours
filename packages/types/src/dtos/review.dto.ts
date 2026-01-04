export interface CreateReviewDto {
  title?: string;
  content: string;
  rating: number;
}

export interface UpdateReviewDTO {
  title?: string;
  content?: string;
  rating?: number;
}
