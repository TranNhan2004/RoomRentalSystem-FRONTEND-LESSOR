'use client';

import React, { useEffect, useState } from 'react';
import { DataDetails } from '@/components/partial/data/DataDetails';
import { Loading } from '@/components/partial/data/Loading';
import { INITIAL_PROVINCE } from '@/initials/Address.initial';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { useRouter } from 'next/navigation';
import { ChargesListType } from '@/types/RentalRoom.type';
import { chargesListService } from '@/services/RentalRoom.service';
import { formatCurrency, formatDate } from '@/lib/client/format';

type ChargesListDetailsProps = {
  roomId: string;
  id: string;
}

export const ChargesListDetails = (props: ChargesListDetailsProps) => {
  const router = useRouter();
  const [data, setData] = useState<ChargesListType>(INITIAL_PROVINCE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await chargesListService.get(props.id);
        setData(data);

      } catch {
        router.push(NOT_FOUND_URL);
      
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.id, router]);

  const cancelOnClick = () => {
    router.push(`/rental-rooms/${props.roomId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DataDetails
        title={`Thông tin chi tiết các mức giá`}
        data={[
          {
            label: 'Giá phòng',
            value: formatCurrency(data.room_charge ?? -1)
          },
          {
            label: 'Giá đặt cọc',
            value: formatCurrency(data.deposit ?? -1)
          },
          {
            label: 'Giá điện',
            value: formatCurrency(data.electricity_charge ?? -1)
          },
          {
            label: 'Giá nước',
            value: formatCurrency(data.water_charge ?? -1)
          },
          {
            label: 'Giá wifi',
            value: formatCurrency(data.wifi_charge ?? -1)
          },
          {
            label: 'Giá thu dọn rác',
            value: formatCurrency(data.rubbish_charge ?? -1)
          },
          {
            label: 'Ngày bắt đầu áp dụng',
            value: formatDate(data.start_date, 'dmy')
          },
          {
            label: 'Ngày kết thúc áp dụng',
            value: data.end_date ? formatDate(data.end_date, 'dmy') : 'Chưa xác định'
          }
        ]}
        cancelOnClick={cancelOnClick}
      />
    </>
  );
};