'use client';

import React, { useEffect, useState } from 'react';
import { DataDetails } from '@/components/partial/data/DataDetails';
import { Loading } from '@/components/partial/data/Loading';
import { INITIAL_PROVINCE } from '@/initials/Address.initial';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { useRouter } from 'next/navigation';
import { RoomCodeType } from '@/types/RentalRoom.type';
import { roomCodeService } from '@/services/RentalRoom.service';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { MonitoringRentalsList } from '../monitoring-rental/MonitoringRentalsList';
import { MonthlyRoomInvoiceList } from '../monthly-room-invoice/MonthlyRoomInvoicesList';

type RoomCodeDetailsProps = {
  roomId: string;
  id: string;
}

export const RoomCodeDetails = (props: RoomCodeDetailsProps) => {
  const router = useRouter();
  const [data, setData] = useState<RoomCodeType>(INITIAL_PROVINCE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await roomCodeService.get(props.id);
        setData(data);

      } catch {
        router.push(NOT_FOUND_URL);
      
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.id, router]);

  const editOnClick = () => {
    router.push(`${props.id}/edit`);
  };

  const cancelOnClick = () => {
    router.push(`/rental-rooms/${props.roomId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DataDetails
        title={`Thông tin chi tiết của mã phòng`}
        data={[
          {
            label: 'Mã phòng',
            value: data.value
          },
          {
            label: 'Số người ở hiện tại',
            value: data.current_occupancy
          },
          {
            label: 'Số người ở tối đa',
            value: data.max_occupancy
          },
          {
            label: 'Có thể ở ghép',
            value: data.is_shareable ? 'Có thể' : 'Không thể'
          }
        ]}
      />
      <div className='w-full h-[60px] rounded-lg bg-gray-200 mt-1'>
        <div className='flex justify-end items-center space-x-4 h-full mr-4'>
          <ActionButton mode='edit' onClick={editOnClick}>
            Chỉnh sửa
          </ActionButton>  
          <ActionButton mode='cancel' onClick={cancelOnClick}>
            Thoát
          </ActionButton>  
        </div>
      </div>

      <div className='mt-10'>
        <MonitoringRentalsList roomCodeId={props.id} />
      </div>

      <div className='mt-10'>
        <MonthlyRoomInvoiceList roomCodeId={props.id} />
      </div>
    </>
  );
};