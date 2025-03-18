import { ReviewQueryType } from "@/types/Review.type";

export const INITIAL_REVIEW_QUERY: ReviewQueryType = {
  rental_room: '',
  renter: '',
  rating: 5,
  from_created_date: new Date(),
  to_created_date: new Date(),
} as const;