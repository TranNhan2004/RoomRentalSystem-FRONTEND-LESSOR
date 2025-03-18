import { 
  ChargesQueryType,
  ChargesType,
  MonitoringRentalQueryType,
  MonitoringRentalType,
  MonthlyRoomInvoiceQueryType,
  MonthlyRoomInvoiceType,
  RoomImageQueryType,
  RoomImageType,
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

export const INITIAL_ROOM_IMAGE: RoomImageType = {
  id: '',
  image: '',
  rental_room: '',
} as const;

export const INITIAL_CHARGES: ChargesType = {
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
  current_occupancy: 0,
  is_shareable: false,
} as const;

export const INITIAL_MONTHLY_ROOM_INVOICE: MonthlyRoomInvoiceType = {
  id: '',
  room_code: '',
  old_kWh_reading: 1,
  new_kWh_reading: 1,
  old_m3_reading: 1,
  new_m3_reading: 1,
  prev_remaining_charge: 0,
  due_charge: 0,
  paid_charge: 0,
  created_mode: 'auto',
  continue_renting: true,
  is_settled: false,
} as const;

export const INITIAL_MONITORING_RENTAL: MonitoringRentalType = {
  id: '',
  room_code: '',
  renter: '',
  _renter_phone_number: '',
  start_date: new Date(),
} as const;


export const INITIAL_RENTAL_ROOM_QUERY: RentalRoomQueryType = {
  commune: '',
  lessor: '',
  _province: '',
  _district: '',
} as const;

export const INITIAL_CHARGES_QUERY: ChargesQueryType = {
  rental_room: '',
  from_date: new Date(),
  to_date: new Date(),
} as const;

export const INITIAL_ROOM_IMAGE_QUERY: RoomImageQueryType = {
  rental_room: '',
} as const;

export const INITIAL_ROOM_CODE_QUERY: RoomCodeQueryType = {
  rental_room: '',
} as const;

export const INITIAL_MONTHLY_ROOM_INVOICE_QUERY: MonthlyRoomInvoiceQueryType = {
  room_code: '',
} as const;

export const INITIAL_MONITORING_RENTAL_QUERY: MonitoringRentalQueryType = {
  room_code: '',
  renter: '',
  from_date: new Date(),
  to_date: new Date(),
} as const;