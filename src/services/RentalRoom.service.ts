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
  RoomCodeType, 
} from "@/types/RentalRoom.type";
import { ApiService } from "./Api.service";
import { formatDate } from "@/lib/client/format";

const smoothData = async (data: ChargesType) => {
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

class RoomImageService extends 
ApiService<
  RoomImageType, 
  RoomImageQueryType
> {

  constructor() {
    super('/app.rental-room/room-images');
  }

  public async post(data: RoomImageType) {
    return await super.post(data, true);
  }

  public async patch(id: string, data: RoomImageType) {
    return await super.patch(id, data, true);
  }
};

class ChargesService extends 
ApiService<
  ChargesType, 
  ChargesQueryType
> {

  constructor() {
    super('/app.rental-room/charges');
  }

  public async post(data: ChargesType) {
    return await super.post(await smoothData(data));
  }

  public async patch(id: string, data: ChargesType) {
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

class MonthlyRoomInvoiceService extends 
ApiService<
  MonthlyRoomInvoiceType, 
  MonthlyRoomInvoiceQueryType
> {

  constructor() {
    super('/app.rental-room/monthly-room-invoices');
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
export const chargesService = new ChargesService();
export const roomImageService = new RoomImageService();
export const roomCodeService = new RoomCodeService();
export const monthlyRoomInvoiceService = new MonthlyRoomInvoiceService();
export const monitoringRentalService = new MonitoringRentalService();