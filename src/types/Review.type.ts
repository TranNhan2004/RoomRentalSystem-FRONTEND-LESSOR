export type ReviewType = {
  id?: string;
  comment?: string;
  rating?: number;
  rental_room?: string;
  renter?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type ReviewQueryType = {
  rental_room?: ReviewType['rental_room'];
  renter?: ReviewType['renter'];
  rating?: ReviewType['rating'] | string;
  from_created_date?: Date | string;
  to_created_date?: Date | string;
}