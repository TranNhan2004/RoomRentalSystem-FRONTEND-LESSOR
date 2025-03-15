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