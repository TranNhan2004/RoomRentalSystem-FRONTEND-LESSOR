import { Metadata } from "next";
import { 
  HomeIcon, 
  ClipboardDocumentCheckIcon, 
  CurrencyDollarIcon, 
  CogIcon, 
  StarIcon, 
  PhoneIcon 
} from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-[5%]">Chào mừng bạn đến với hệ thống</h1>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="p-8 bg-red-400 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <HomeIcon className="h-6 w-6 text-white mr-2" />
            <h2 className="text-xl font-bold">Quản lý phòng trọ</h2>
          </div>
          <p className="text-justify">Chủ trọ có thể thêm, chỉnh sửa, và xóa thông tin phòng trọ.</p>
        </div>
        
        <div className="p-8 bg-green-400 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <ClipboardDocumentCheckIcon className="h-6 w-6 text-white mr-2" />
            <h2 className="text-xl font-bold">Theo dõi cho thuê</h2>
          </div>
          <p className="text-justify">Kiểm tra và quản lý các trạng thái thuê phòng của người thuê một cách dễ dàng.</p>
        </div>

        <div className="p-8 bg-blue-400 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <CurrencyDollarIcon className="h-6 w-6 text-white mr-2" />
            <h2 className="text-xl font-bold">Thống kê thu nhập</h2>
          </div>
          <p className="text-justify">Chủ trọ có thể xem tổng quan về thu nhập từ các phòng trọ.</p>
        </div>

        <div className="p-8 bg-yellow-400 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <CogIcon className="h-6 w-6 text-white mr-2" />
            <h2 className="text-xl font-bold">Quản lý chi phí</h2>
          </div>
          <p className="text-justify">Chủ trọ có thể thêm, chỉnh sửa, và xóa thông tin các loại chi phí liên quan đến phòng trọ.</p>
        </div>

        <div className="p-8 bg-purple-400 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <StarIcon className="h-6 w-6 text-white mr-2" />
            <h2 className="text-xl font-bold">Đánh giá phòng trọ</h2>
          </div>
          <p className="text-justify">Xem các đánh giá của người thuê để cải thiện chất lượng dịch vụ và phòng trọ.</p>
        </div>

        <div className="p-8 bg-pink-400 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <PhoneIcon className="h-6 w-6 text-white mr-2" />
            <h2 className="text-xl font-bold">Liên hệ hỗ trợ</h2>
          </div>
          <p className="text-justify">Chủ trọ có thể liên hệ với quản lý hoặc bộ phận hỗ trợ để giải quyết các vấn đề liên quan.</p>
        </div>
      </div>
    </div>
  );
}

