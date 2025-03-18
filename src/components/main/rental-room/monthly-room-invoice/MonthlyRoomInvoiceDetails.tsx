'use client';
                          
import React, { useEffect, useState } from 'react';
import { INITIAL_MONTHLY_ROOM_INVOICE } from '@/initials/RentalRoom.initial';
import { MonthlyRoomInvoiceType } from '@/types/RentalRoom.type';
import { useRouter } from 'next/navigation';
import { monthlyRoomInvoiceService } from '@/services/RentalRoom.service';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { Loading } from '@/components/partial/data/Loading';
import { DataDetails } from '@/components/partial/data/DataDetails';
import { formatCurrency, formatDate } from '@/lib/client/format';
                        
type MonthlyRoomInvoiceDetailsProps = {
  roomId: string;
  roomCodeId: string;
  id: string;
}

export const MonthlyRoomInvoiceDetails = (props: MonthlyRoomInvoiceDetailsProps) => {
  const router = useRouter();
  const [data, setData] = useState<MonthlyRoomInvoiceType>(INITIAL_MONTHLY_ROOM_INVOICE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await monthlyRoomInvoiceService.get(props.id);
        setData(data);

      } catch {
        router.push(NOT_FOUND_URL);
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.id, router]);
  
  const cancelOnClick = async () => {
    router.push(`/rental-rooms/${props.roomId}/room-codes/${props.roomCodeId}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <DataDetails 
      title='Chi tiết hóa đơn tiền trọ hằng tháng'
      data={[
        {
          label: 'Chỉ số điện cũ',
          value: data.old_kWh_reading,
        },
        {
          label: 'Chỉ số điện mới',
          value: data.new_kWh_reading,
        },
        {
          label: 'Chỉ số nước cũ',
          value: data.old_m3_reading,
        },
        {
          label: 'Chỉ số nước mới',
          value: data.new_m3_reading,
        },
        {
          label: 'Số tiền nợ tháng trước',
          value: formatCurrency(data.prev_remaining_charge),
        },
        {
          label: 'Số tiền phải trả',
          value: formatCurrency(data.due_charge),
        },
        {
          label: 'Số tiền đã trả',
          value: formatCurrency(data.paid_charge),
        },
        {
          label: 'Tiếp tục thuê',
          value: data.continue_renting ? 'Có' : 'Không',
        },
        {
          label: 'Trạng thái',
          value: data.is_settled ? 'Đã kết toán' : 'Chưa kết toán',
        },
        {
          label: 'Ngày tạo',
          value: formatDate(data.created_at, 'dmy'),
        },
        {
          label: 'Ngày cập nhật',
          value: formatDate(data.updated_at, 'dmy'),
        }
      ]}
      cancelOnClick={cancelOnClick}
    />
  );
};