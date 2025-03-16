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
  RoomCodeType, 
} from "@/types/RentalRoom.type";
import { ApiService } from "./Api.service";
import { formatDate } from "@/lib/client/format";

const smoothData = async (data: ChargesListType) => {
  const dataToSend: Record<string, unknown> = { ...data };
  if (data.start_date) {
    dataToSend.start_date = formatDate(data.start_date, 'ymd');
  }
  if (data.end_date) {
    dataToSend.end_date = formatDate(data.end_date, 'ymd');
  }
  return dataToSend;
};

class RentalRoomService extends 
ApiService<
  RentalRoomType, 
  RentalRoomQueryType
> {
  constructor() {
    super('/app.rental-room/rental-rooms');
  }
};

class RentalRoomImageService extends 
ApiService<
  RentalRoomImageType, 
  RentalRoomImageQueryType
> {

  constructor() {
    super('/app.rental-room/rental-room-images');
  }

  public async post(data: RentalRoomImageType) {
    return await super.post(data, true);
  }

  public async patch(id: string, data: RentalRoomImageType) {
    return await super.patch(id, data, true);
  }
};

class ChargesListService extends 
ApiService<
  ChargesListType, 
  ChargesListQueryType
> {

  constructor() {
    super('/app.rental-room/charges-lists');
  }

  public async post(data: ChargesListType) {
    return await super.post(await smoothData(data));
  }

  public async patch(id: string, data: ChargesListType) {
    return await super.patch(id, await smoothData(data));
  }
};

class RoomCodeService extends 
ApiService<
  RoomCodeType, 
  RoomCodeQueryType
> {

  constructor() {
    super('/app.rental-room/room-codes');
  }
};

class MonthlyChargesDetailsService extends 
ApiService<
  MonthlyChargesDetailsType, 
  MonthlyChargesDetailsQueryType
> {

  constructor() {
    super('/app.rental-room/monthly-charges-details');
  }
};

class MonitoringRentalService extends 
ApiService<
  MonitoringRentalType, 
  MonitoringRentalQueryType
> {

  constructor() {
    super('/app.rental-room/monitoring-rentals');
  }
};


export const rentalRoomService = new RentalRoomService();
export const chargesListService = new ChargesListService();
export const rentalRoomImageService = new RentalRoomImageService();
export const roomCodeService = new RoomCodeService();
export const monthlyChargesDetailsService = new MonthlyChargesDetailsService();
export const monitoringRentalService = new MonitoringRentalService();