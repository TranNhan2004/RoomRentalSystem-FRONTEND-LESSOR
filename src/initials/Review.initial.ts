import { ReviewQueryType, ReviewType } from "@/types/Review.type";

export const INITIAL_CHARGES_LIST: ReviewType = {
  id: '',
  comment: '',
  rating: 0,
  rental_room: '',
  renter: '',
} as const;

export const INITIAL_REVIEW_QUERY_TYPE: ReviewQueryType = {
  rental_room: '',
  renter: '',
  rating: 5,
  from_created_date: new Date(),
  to_created_date: new Date(),
} as const;