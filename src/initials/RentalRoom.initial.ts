import { RentalRoomQueryType } from "@/types/RentalRoom.type";

export const INITIAL_RENTAL_ROOM_QUERY: RentalRoomQueryType = {
  commune: '',
  lessor: '',
  _province: '',
  _district: '',
} as const;