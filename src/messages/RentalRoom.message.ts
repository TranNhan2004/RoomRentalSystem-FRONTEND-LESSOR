export class RentalRoomMessage {
  public static readonly NAME_REQUIRED = 'Tên phòng trọ không được để trống!';
  public static readonly COMMUNE_REQUIRED = 'Địa chỉ xã của phòng trọ không được để trống!';
  public static readonly ADDITIONAL_ADDRESS_REQUIRED = 'Địa chỉ cụ thể của phòng trọ không được để trống!';
  public static readonly TOTAL_NUMBER_REQUIRED = 'Tổng số phòng trọ không được để trống!';
  public static readonly TOTAL_NUMBER_POSITIVE = 'Tổng số phòng phải từ 1 trở lên!';

  public static readonly GET_MANY_ERROR = 'Đã xảy ra lỗi khi lấy danh sách phòng trọ!';
  public static readonly GET_ERROR = 'Đã xảy ra lỗi khi lấy thông tin phòng trọ theo ID!';
  public static readonly POST_ERROR = 'Đã xảy ra lỗi khi thêm phòng trọ mới!';
  public static readonly PATCH_ERROR = 'Đã xảy ra lỗi khi cập nhật thông tin phòng trọ!';
  public static readonly DELETE_ERROR = 'Đã xảy ra lỗi khi xóa phòng trọ!';
  public static readonly DELETE_PROTECTED_ERROR = 'Phải xóa các dữ liệu có tham chiếu đến phòng trọ này trước!';

  public static readonly POST_SUCCESS = 'Thêm phòng trọ mới thành công!';
  public static readonly PATCH_SUCCESS = 'Cập nhật thông tin phòng trọ thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa phòng trọ thành công!';
}

export class RentalRoomImageMessage {
  public static readonly GET_MANY_ERROR = 'Đã xảy ra lỗi khi lấy danh sách các ảnh trọ!';
  public static readonly POST_ERROR = 'Đã xảy ra lỗi khi thêm ảnh mới!';
  public static readonly DELETE_ERROR = 'Đã xảy ra lỗi khi xóa ảnh!';

  public static readonly POST_SUCCESS = 'Thêm ảnh mới thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa ảnh thành công!';
}

export class ChargesListMessage {
  public static readonly BACKEND_POST_INVALID = 'There is an existing rental with a null end date.';
  
  public static readonly ROOM_CHARGE_REQUIRED = 'Giá phòng trọ không được để trống!';
  public static readonly DEPOSIT_REQUIRED = 'Giá đặt cọc không được để trống!';
  public static readonly ELECTRICITY_CHARGE_REQUIRED = 'Giá điện không được để trống!';
  public static readonly WATER_CHARGE_REQUIRED = 'Giá nước không được để trống!';
  public static readonly WIFI_CHARGE_REQUIRED = 'Giá wifi không được để trống!';
  public static readonly RUBBISH_CHARGE_REQUIRED = 'Giá thu dọn rác không được để trống!';
  public static readonly START_DATE_REQUIRED = 'Ngày bắt đầu áp dụng không được để trống!';

  public static readonly ROOM_CHARGE_INVALID = 'Giá phòng trọ phải từ 0 trở lên!';
  public static readonly DEPOSIT_INVALID = 'Giá đặt cọc phải từ 0 trở lên!';
  public static readonly ELECTRICITY_CHARGE_INVALID = 'Giá điện phải từ 0 trở lên!';
  public static readonly WATER_CHARGE_INVALID = 'Giá nước phải từ 0 trở lên!';
  public static readonly WIFI_CHARGE_INVALID = 'Giá wifi phải từ -1 trở lên!';
  public static readonly RUBBISH_CHARGE_INVALID = 'Giá thu dọn rác phải từ 0 trở lên!';
  public static readonly START_DATE_INVALID = 'Ngày bắt đầu phải ít nhất là ngày hôm nay!';
  public static readonly END_DATE_INVALID = 'Ngày kết thúc phải lớn hơn ngày bắt đầu!';

  public static readonly STOP_APPLY_WARNING = 'Việc dừng áp dụng mức giá này sẽ không thể thay đổi';
  public static readonly POST_WARNING = 'Sau khi tạo xong bạn không thể sửa đổi các loại giá, chỉ có thể xóa và tạo bản mới!';

  public static readonly POST_INVALID = 'Phải dừng áp dụng mức giá cũ trước khi tạo mức giá mới!';
  
  public static readonly GET_MANY_ERROR = 'Đã xảy ra lỗi khi lấy danh sách các mức giá!';
  public static readonly GET_ERROR = 'Đã xảy ra lỗi khi lấy thông tin mức giá theo ID!';
  public static readonly POST_ERROR = 'Đã xảy ra lỗi khi thêm mức giá mới!';
  public static readonly DELETE_ERROR = 'Đã xảy ra lỗi khi xóa mức giá!';
  public static readonly STOP_APPLY_ERROR = 'Đã xảy ra lỗi khi dừng áp dụng mức giá!';

  public static readonly POST_SUCCESS = 'Thêm mức giá mới thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa mức giá thành công!';
  public static readonly STOP_APPLY_SUCCESS = 'Dừng áp dụng mức giá thành công!';
}

export class RoomCodeMessage {
  public static readonly BACKEND_MAX_ROOM_CODE_ERROR = 'Maximum number of room codes reached.';
  public static readonly BACKEND_MAX_OCCUPANCY_INVALID = 'Max occupancy cannot be lower than the current rental.';

  public static readonly VALUE_REQUIRED = 'Giá trị của mã phòng không được để trống!';
  public static readonly MAX_OCCUPANCY_REQUIRED = 'Số người ở tối đa không được để trống!';
  public static readonly MAX_OCCUPANCY_POSITIVE = 'Số người ở tối đa phải lớn hơn 0!';

  public static readonly MAX_OCCUPANCY_INVALID = 'Số người ở tối đa không được ít hơn số người ở hiện tại!';

  public static readonly GET_MANY_ERROR = 'Đã xảy ra lỗi khi lấy danh sách các mã phòng!';
  public static readonly GET_ERROR = 'Đã xảy ra lỗi khi lấy thông tin mã phòng theo ID!';
  public static readonly POST_ERROR = 'Đã xảy ra lỗi khi thêm mã phòng mới!';
  public static readonly PATCH_ERROR = 'Đã xảy ra lỗi khi chỉnh sửa thông tin mã phòng!';
  public static readonly DELETE_ERROR = 'Đã xảy ra lỗi khi xóa mã phòng!';
  public static readonly STOP_APPLY_ERROR = 'Đã xảy ra lỗi khi dừng áp dụng mã phòng!';
  public static readonly MAX_ROOM_CODE_ERROR = 'Tổng số mã phòng đã đạt mức tối đa!';

  public static readonly POST_SUCCESS = 'Thêm mã phòng mới thành công!';
  public static readonly PATCH_SUCCESS = 'Chỉnh sửa thông tin mã phòng thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa mã phòng thành công!';
  public static readonly DELETE_PROTECTED_ERROR = 'Phải xóa các dữ liệu có tham chiếu đến mã phòng này trước!';
}

export class MonitoringRentalMessage {
  public static readonly BACKEND_ROOM_CODE_SAME_TIME = 'Renter already has a rental in progress.';
  public static readonly BACKEND_ROOM_CODE_UNAVAILABLE = 'Room is not available.';

  public static readonly RENTER_PHONE_NUMBER_FORMAT_REQUIRED = 'Số điện thoại của người thuê không được để trống!';
  public static readonly START_DATE_REQUIRED = 'Ngày bắt đầu thuê không được để trống!';

  public static readonly START_DATE_INVALID = 'Ngày bắt đầu thuê phải ít nhất là ngày hôm nay!';
  public static readonly END_DATE_INVALID = 'Ngày kết thúc phải lớn hơn ngày bắt đầu!';

  public static readonly ROOM_CODE_SAME_TIME = 'Người dùng hiện đang thuê phòng trọ này! Không thể tạo thêm bản ghi mới, trừ khi dừng thuê!';
  public static readonly ROOM_CODE_UNAVAILABLE = 'Phòng trọ này đã hết chỗ!';

  public static readonly RENTER_PHONE_NUMBER_FORMAT_ERROR = 'Số điện thoại phải có đủ 10 chữ số!';

  public static readonly STOP_RENT_WARNING = 'Việc dừng theo dõi cho thuê sẽ không thể thay đổi';

  public static readonly RENTER_PHONE_NUMBER_NOT_FOUND = 'Số điện thoại chưa được đăng ký tài khoản!';

  public static readonly GET_MANY_ERROR = 'Đã xảy ra lỗi khi lấy danh sách các bản ghi theo dõi cho thuê!';
  public static readonly POST_ERROR = 'Đã xảy ra lỗi khi thêm bản ghi theo dõi cho thuê!';
  public static readonly STOP_RENT_ERROR = 'Đã xảy ra lỗi khi dừng theo dõi cho thuê!';
  public static readonly DELETE_ERROR = 'Đã xảy ra lỗi khi xóa bản ghi theo dõi cho thuê!';

  public static readonly POST_SUCCESS = 'Thêm bản ghi theo dõi cho thuê thành công!';
  public static readonly STOP_RENT_SUCCESS = 'Dừng theo dõi cho thuê thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa bản ghi theo dõi cho thuê thành công!';
}

export class MonthlyChargesDetailsMessage {
  public static readonly BACKEND_CHARGES_LIST_NOT_FOUND = 'Charges list not found for this room.';
  public static readonly BACKEND_UNSETTLED_RECORD_EXIST = 'There is an existing unsettled record.';
  public static readonly BACKEND_PREV_RECORD_NOT_FOUND = 'Previous record not found.';
  public static readonly BACKEND_NEW_KWH_READING_INVALID_SUBSTR = 'new_kWh_reading__gte';
  public static readonly BACKEND_NEW_M3_READING_INVALID_SUBSTR = 'new_m3_reading__gte';
  
  public static readonly OLD_KWH_READING_REQUIRED = 'Chỉ số điện cũ không được để trống!';
  public static readonly NEW_KWH_READING_REQUIRED = 'Chỉ số điện mới không được để trống!';
  public static readonly OLD_M3_READING_REQUIRED = 'Chỉ số nước cũ không được để trống!';
  public static readonly NEW_M3_READING_REQUIRED = 'Chỉ số nước mới không được để trống!';
  public static readonly PAID_CHARGE_REQUIRED = 'Số tiền đã trả không được để trống!'; 

  public static readonly OLD_KWH_READING_INVALID = 'Chỉ số điện cũ không được nhỏ hơn 0!';
  public static readonly NEW_KWH_READING_INVALID = 'Chỉ số điện mới không được nhỏ hơn chỉ số điện cũ!';
  public static readonly OLD_M3_READING_INVALID = 'Chỉ số nước cũ không được nhỏ hơn 0!';
  public static readonly NEW_M3_READING_INVALID = 'Chỉ số nước mới không được nhỏ hơn chỉ số nước cũ!';
  public static readonly PAID_CHARGE_INVALID = 'Số tiền đã trả không được nhỏ hơn 0!';
  public static readonly PAID_CHARGE_INVALID_2 = 'Số tiền đã trả không được lớn hơn số tiền phải trả!';
  public static readonly END_DATE_INVALID = 'Ngày kết thúc phải lớn hơn ngày bắt đầu!';

  public static readonly SETTLE_WARNING = 'Sau khi kết toán hóa đơn, bạn không thể chỉnh sửa nội dung bên trong nữa!';

  public static readonly CHARGES_LIST_NOT_FOUND = 'Chưa có dữ liệu về mức giá của phòng này!';
  public static readonly UNSETTLED_RECORD_EXIST = 'Tồn tại hóa đơn chưa hoàn thành kết toán!';
  public static readonly PREV_RECORD_NOT_FOUND = 'Vui lòng chọn chế độ thêm là "Lần đầu" khi tạo bản ghi đầu tiên';
  
  public static readonly GET_MANY_ERROR = 'Đã xảy ra lỗi khi lấy danh sách các hóa đơn tiền trọ hằng tháng!';
  public static readonly POST_ERROR = 'Đã xảy ra lỗi khi thêm hóa đơn tiền trọ hằng tháng!';
  public static readonly PATCH_ERROR = 'Đã xảy ra lỗi khi chỉnh sửa thông tin hóa đơn tiền trọ hằng tháng!';
  public static readonly SETTLE_ERROR = 'Đã xảy ra lỗi khi kết toán hóa đơn tiền trọ hằng tháng!';
  public static readonly DELETE_ERROR = 'Đã xảy ra lỗi khi xóa hóa đơn tiền trọ hằng tháng!';

  public static readonly POST_SUCCESS = 'Thêm hóa đơn tiền trọ hằng tháng thành công!';
  public static readonly PATCH_SUCCESS = 'Chỉnh sửa thông tin hóa đơn tiền trọ hằng tháng thành công!';
  public static readonly SETTLE_SUCCESS = 'Kết toán hóa đơn tiền trọ hằng tháng thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa hóa đơn tiền trọ hằng tháng thành công!';
}