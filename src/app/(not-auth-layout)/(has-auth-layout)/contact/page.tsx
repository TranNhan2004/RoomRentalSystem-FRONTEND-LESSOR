import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50 py-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Liên hệ với chúng tôi
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Vui lòng liên hệ nếu có bất kỳ thắc mắc nào cần hỗ trợ hoặc yêu cầu
          thêm thông tin về hệ thống.
        </p>

        {/* Bảng liên hệ với quản lý */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Liên hệ với quản lý
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Quản lý Cần Thơ */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-700">Thành phố Cần Thơ</h3>
              <p className="text-gray-600 mt-2">
                <strong>Số điện thoại:</strong> (123) 456-7890
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> manager.cantho@roomrental.com
              </p>
              <p className="text-gray-600">
                <strong>Địa chỉ:</strong> 15B, Đường Nguyễn Trãi, Quận Ninh Kiều, Thành phố Cần Thơ
              </p>
            </div>

            {/* Quản lý TP Hồ Chí Minh */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-700">Thành phố Hồ Chí Minh</h3>
              <p className="text-gray-600 mt-2">
                <strong>Số điện thoại:</strong> (321) 654-9870
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> manager.hcm@roomrental.com
              </p>
              <p className="text-gray-600">
                <strong>Địa chỉ:</strong> 110A, Phường Tân Định, Quận 1, Thành phố Hồ Chí Minh
              </p>
            </div>
          </div>
        </div>

        {/* Thông tin liên hệ phần mềm */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Liên hệ với bên phần mềm
          </h2>
          <h3 className="text-xl font-semibold text-gray-800">
            FASTPlugin Software Company
          </h3>
          <p className="text-gray-600 mb-4">
            Nếu bạn có nhu cầu mua web hoặc phần mềm, hoặc cần hỗ trợ kỹ thuật,
            vui lòng xem thông tin chi tiết dưới đây:
          </p>
          <div className="grid grid-cols-3 gap-4">
            {/* Hỗ trợ mua */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Hỗ trợ mua</h3>
              <p className="text-gray-600">
                <strong>Email:</strong> support@fastplugin.com
              </p>
              <p className="text-gray-600">
                <strong>Số điện thoại:</strong> (555) 888-1234
              </p>
            </div>

            {/* Bán hàng */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Bán hàng</h3>
              <p className="text-gray-600">
                <strong>Email:</strong> sales@fastplugin.com
              </p>
              <p className="text-gray-600">
                <strong>Số điện thoại:</strong> (555) 888-9999
              </p>
            </div>

            {/* Kỹ thuật */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Hỗ trợ kỹ thuật</h3>
              <p className="text-gray-600">
                <strong>Email:</strong> technical@fastplugin.com
              </p>
              <p className="text-gray-600">
                <strong>Số điện thoại:</strong> (111) 222-3333
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
