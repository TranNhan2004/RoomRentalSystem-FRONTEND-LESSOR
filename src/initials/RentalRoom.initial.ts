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
  total_number: 1,
  average_rating: 0,
  further_description: '',
} as const;

export const INITIAL_RENTAL_ROOM_IMAGE: RentalRoomImageType = {
  id: '',
  image: '',
  rental_room: '',
} as const;

export const INITIAL_CHARGES_LIST: ChargesListType = {
  id: '',
  rental_room: '',
  room_charge: 1000000,
  deposit: 500000,
  electricity_charge: 4000,
  water_charge: 12000,
  wifi_charge: -1,
  rubbish_charge: 10000,
  start_date: new Date(),
} as const;

export const INITIAL_ROOM_CODE: RoomCodeType = {
  id: '',
  value: '',
  rental_room: '',
  max_occupancy: 1,
  remaining_occupancy: 1,
  is_shareable: false,
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
} as const;

export const INITIAL_MONITORING_RENTAL: MonitoringRentalType = {
  id: '',
  room_code: '',
  renter: '',
  start_date: new Date(),
} as const;


export const INITIAL_RENTAL_ROOM_QUERY: RentalRoomQueryType = {
  commune: '',
  lessor: '',
  _province: '',
  _district: '',
} as const;

export const INITIAL_CHARGES_LIST_QUERY: ChargesListQueryType = {
  rental_room: '',
  from_date: new Date(),
  to_date: new Date(),
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