import { DistrictType, ProvinceType } from "./Address.type";

export type RentalRoomType = {
  id?: string;
  name?: string;
  commune?: string;
  additional_address?: string;
  closing_time?: string;
  total_number?: number;
  further_description?: string;
  average_rating?: number;
  lessor?: string;
  manager?: string;
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

export type RoomCodeType = {
  id?: string;
  value?: string;
  rental_room?: string;
  max_occupancy?: number;
  remaining_occupancy?: number;
  is_shareable?: boolean;
}

export type MonthlyChargesDetailsType = {
  id?: string;
  room_code?: string;
  old_kWh_reading?: number;
  new_kWh_reading?: number;
  old_m3_reading?: number;
  new_m3_reading?: number;
  prev_remaining_charges?: number;
  due_charges?: number;
  paid_charges?: number;
  is_settled?: boolean;
  created_mode?: 'first' | 'auto';
  created_at?: Date;
  updated_at?: Date;
}

export type MonitoringRentalType = {
  id?: string;
  room_code?: string;
  renter?: string;
  start_date?: Date;
  end_date?: Date;
}

export type RentalRoomImageType = {
  id?: string;
  rental_room?: string;
  image?: File | string;
}

export type RentalRoomImageQueryType = {
  rental_room?: RentalRoomImageType['rental_room'];
}

export type ChargesListQueryType = {
  rental_room?: ChargesListType['rental_room'];
  from_date?: Date | string;
  to_date?: Date | string;
}

export type RoomCodeQueryType = {
  rental_room?: RoomCodeType['rental_room'];
}

export type MonthlyChargesDetailsQueryType = {
  room_code?: MonthlyChargesDetailsType['room_code'];
}

export type MonitoringRentalQueryType = {
  room_code?: MonitoringRentalType['room_code'];
  renter?: MonitoringRentalType['renter'];
}