import { 
  ChargesListQueryType,
  ChargesListType,
  MonitoringRentalQueryType,
  MonitoringRentalType,
  MonthlyChargesDetailsQueryType,
  MonthlyChargesDetailsType,
  RentalRoomImageQueryType,
  RentalRoomImageType,
  RentalRoomQueryType, 
  RentalRoomType,
  RoomCodeQueryType,
  RoomCodeType

} from "@/types/RentalRoom.type";


export const INITIAL_RENTAL_ROOM: RentalRoomType = {
  id: '',
  name: '',
  commune: '',
  additional_address: '',
  closing_time: '',
  max_occupancy_per_room: 0,
  total_number: 0,
  empty_number: 0,
  further_description: '',
  average_rating: 0,
  lessor: '',
  manager: '',
  created_at: new Date(),
  updated_at: new Date(),
} as const;

export const INITIAL_RENTAL_ROOM_IMAGE: RentalRoomImageType = {
  id: '',
  image: '',
  rental_room: '',
} as const;

export const INITIAL_CHARGES_LIST: ChargesListType = {
  id: '',
  rental_room: '',
  room_charge: 0,
  deposit: 0,
  electricity_charge: 0,
  water_charge: 0,
  wifi_charge: 0,
  rubbish_charge: 0,
  start_date: new Date(),
  end_date: new Date(),
} as const;

export const INITIAL_ROOM_CODE: RoomCodeType = {
  id: '',
  value: '',
  rental_room: '',
} as const;

export const INITIAL_MONTHLY_CHARGES_DETAILS: MonthlyChargesDetailsType = {
  id: '',
  room_code: '',
  old_kWh_reading: 0,
  new_kWh_reading: 0,
  old_m3_reading: 0,
  new_m3_reading: 0,
  prev_remaining_charges: 0,
  due_charges: 0,
  paid_charges: 0,
  is_settled: false,
  created_at: new Date(),
  updated_at: new Date(),
}

export const INITIAL_MONITORING_RENTAL: MonitoringRentalType = {
  id: '',
  room_code: '',
  renter: '',
  start_date: new Date(),
  end_date: new Date(),
} as const;


export const INITIAL_RENTAL_ROOM_QUERY: RentalRoomQueryType = {
  commune: '',
  lessor: '',
  _province: '',
  _district: '',
} as const;

export const INITIAL_CHARGES_LIST_QUERY: ChargesListQueryType = {
  rental_room: '',
} as const;

export const INITIAL_RENTAL_ROOM_IMAGE_QUERY: RentalRoomImageQueryType = {
  rental_room: '',
} as const;

export const INITIAL_ROOM_CODE_QUERY: RoomCodeQueryType = {
  rental_room: '',
} as const;

export const INITIAL_MONTHLY_CHARGES_DETAILS_QUERY: MonthlyChargesDetailsQueryType = {
  room_code: '',
} as const;

export const INITIAL_MONITORING_RENTAL_QUERY: MonitoringRentalQueryType = {
  room_code: '',
  renter: ''
} as const;