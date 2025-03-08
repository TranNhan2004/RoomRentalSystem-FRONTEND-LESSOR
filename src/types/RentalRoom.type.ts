import { DistrictType, ProvinceType } from "./Address.type";

export type RentalRoomType = {
  id?: string;
  name?: string;
  commune?: string;
  additional_address?: string;
  closing_time?: string;
  max_occupancy_per_room?: number;
  total_number?: number;
  empty_number?: number;
  further_description?: string;
  average_rating?: number;
  lessor?: string;
  manager?: string;
  images?: RentalRoomImageType[];
  charges_lists?: ChargesListType[];
  created_at?: Date;
  updated_at?: Date;
}

export type RentalRoomQueryType = {
  commune?: RentalRoomType['commune'];
  lessor?: RentalRoomType['lessor'];
  manager_is_null?: boolean;
  _province?: ProvinceType['id'];
  _district?: DistrictType['id'];
};

export type ChargesListType = {
  id?: string;
  rental_room?: string;
  room_charge?: number;
  deposit?: number;
  electricity_charge?: number;
  water_charge?: number;
  wifi_charge?: number;
  rubbish_charge?: number;
  start_date?: Date;
  end_date?: Date;
}

export type ChargesListQueryType = {
  rental_room?: ChargesListType['rental_room'];
}

export type RentalRoomImageType = {
  id?: string;
  rental_room?: string;
  image?: string;
}

export type RentalRoomImageQueryType = {
  rental_room?: RentalRoomImageType['rental_room'];
}