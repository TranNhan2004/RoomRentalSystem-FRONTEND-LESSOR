import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instructions",
  description: "Instructions page.",
};

export default function InstructionsPage() {
  return (
    <div className="bg-gray-50 py-12 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Hướng dẫn sử dụng
        </h1>
        <ul className="space-y-4 text-justify">

          <li className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              1. Chất lượng phòng
            </h2>
            <p className="text-gray-600">
              Chủ trọ phải đảm bảo rằng chất lượng phòng phải phù hợp với giá tiền. Các quản lý sẽ duyệt qua các phòng trọ mà bạn đưa lên, nếu phù hợp thì sẽ được duyệt.
              Phần <strong>HÌNH ẢNH</strong> của trọ nên chụp đầy đủ các dịch vụ. Hình ảnh càng chi tiết, khả năng được duyệt càng cao.
            </p>
          </li>

          <li className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              2. Địa chỉ phòng trọ
            </h2>
            <p className="text-gray-600">
              Phần <strong>ĐỊA CHỈ CỤ THỂ</strong> của phòng trọ nên dùng <strong>GOOGLE MAPS</strong> để kiểm tra xem địa chỉ có hợp lệ hay không. Nếu không, hãy dùng địa chỉ gần đó để tránh sai sót không mong muốn.
              Các <strong>ĐỊA CHỈ CỤ THỂ</strong> cần được đặt theo <strong>CÚ PHÁP</strong> sau: <strong>&quot;&lt;Số nhà&gt;, Hẻm &lt;X&gt;, Đ. &lt;Y&gt;&quot;</strong>. 
              Ví dụ địa chỉ <strong>&quot;122B, Hẻm 12, Đường Võ Văn Kiệt&quot;</strong> viết đúng cú pháp là <strong>&quot;122B, Hẻm 12, Đ. Võ Văn Kiệt&quot;</strong>.
            </p>
          </li>

          <li className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              3. Tiền trọ hàng tháng
            </h2>
            <p className="text-gray-600">
              Tiền trọ sẽ được tính vào mỗi đầu tháng, gồm tiền điện, nước của tháng trước và tiền phòng của tháng này. Chủ trọ cần nhập thông tin chỉ số điện và nước mới để tính chi phí chính xác. 
              Chủ trọ <strong>KHÔNG THỂ</strong> thêm chi phí hằng tháng mới nếu chi phí tháng vừa rồi chưa được <strong>KẾT TOÁN</strong>.
              Và sau khi <strong>KẾT TOÁN</strong>, chủ trọ <strong>KHÔNG THỂ</strong> sửa đổi thông tin chi phí hằng tháng.
            </p>
          </li>

          <li className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              4. Lỗi tham chiếu khi xóa dữ liệu
            </h2>
            <p className="text-gray-600">
              Lỗi tham chiếu xảy ra khi bạn cố gắng xóa một dữ liệu, nhưng có những dữ liệu khác đang phụ thuộc hoặc liên quan đến nó. 
              Ví dụ, nếu bạn có một danh sách phòng trọ và mỗi phòng trọ có nhiều mã phòng khác nhau, bạn không thể xóa phòng trọ khi mã phòng của nó còn tồn tại. 
              Để giải quyết, bạn cần kiểm tra và xóa các dữ liệu liên quan trước. Lưu ý dữ liệu <strong>ĐÁNH GIÁ</strong> không được bảo vệ bởi cơ chế này, vì vậy bạn có thể an tâm xóa phòng trọ nếu vẫn còn dữ liệu <strong>ĐÁNH GIÁ</strong> từ người thuê.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
