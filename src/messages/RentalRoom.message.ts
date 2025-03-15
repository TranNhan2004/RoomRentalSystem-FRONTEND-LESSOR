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
  public static readonly ROOM_CHARGE_REQUIRED = 'Giá phòng trọ không được để trống!';
  public static readonly ROOM_CHARGE_INVALID = 'Giá phòng trọ phải từ 0 trở lên!';
  public static readonly DEPOSIT_REQUIRED = 'Giá đặt cọc không được để trống!';
  public static readonly DEPOSIT_INVALID = 'Giá đặt cọc phải từ 0 trở lên!';
  public static readonly ELECTRICITY_CHARGE_REQUIRED = 'Giá điện không được để trống!';
  public static readonly ELECTRICITY_CHARGE_INVALID = 'Giá điện phải từ 0 trở lên!';
  public static readonly WATER_CHARGE_REQUIRED = 'Giá nước không được để trống!';
  public static readonly WATER_CHARGE_INVALID = 'Giá nước phải từ 0 trở lên!';
  public static readonly WIFI_CHARGE_REQUIRED = 'Giá wifi không được để trống!';
  public static readonly WIFI_CHARGE_INVALID = 'Giá wifi phải từ -1 trở lên!';
  public static readonly RUBBISH_CHARGE_REQUIRED = 'Giá thu dọn rác không được để trống!';
  public static readonly RUBBISH_CHARGE_INVALID = 'Giá thu dọn rác phải từ 0 trở lên!';
  public static readonly START_DATE_REQUIRED = 'Ngày bắt đầu áp dụng không được để trống!';
  public static readonly START_DATE_INVALID = 'Ngày bắt đầu phải ít nhất là ngày hôm nay!';
  public static readonly END_DATE_INVALID = 'Ngày kết thúc phải lớn hơn ngày bắt đầu!';

  public static readonly STOP_APPLY_WARNING = 'Việc dừng áp dụng mức giá này sẽ không thể thay đổi';
  public static readonly POST_WARNING = 'Sau khi tạo xong bạn không thể sửa đổi các loại giá, chỉ có thể xóa và tạo bản mới!';

  public static readonly GET_MANY_ERROR = 'Đã xảy ra lỗi khi lấy danh sách các mức giá!';
  public static readonly GET_ERROR = 'Đã xảy ra lỗi khi lấy thông tin mức giá theo ID!';
  public static readonly POST_ERROR = 'Đã xảy ra lỗi khi thêm mức giá mới!';
  public static readonly DELETE_ERROR = 'Đã xảy ra lỗi khi xóa mức giá!';
  public static readonly STOP_APPLY_ERROR = 'Đã xảy ra lỗi khi dừng áp dụng mức giá!';

  public static readonly POST_SUCCESS = 'Thêm mức giá mới thành công!';
  public static readonly DELETE_SUCCESS = 'Xóa các loại giá thành công!';
  public static readonly STOP_APPLY_SUCCESS = 'Dừng áp dụng mức giá thành công!';
}