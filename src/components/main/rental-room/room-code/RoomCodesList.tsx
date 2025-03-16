'use client';

import React, { useEffect, useRef, useState } from 'react';
import { handleDeleteAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { Table, DisplayedDataType } from '@/components/partial/data/Table';
import { useRouter } from 'next/navigation';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { roomCodeService } from '@/services/RentalRoom.service';
import { DataLine } from '@/components/partial/data/DataLine';
import { RoomCodeType } from '@/types/RentalRoom.type';
import { RoomCodeMessage } from '@/messages/RentalRoom.message';

type RoomCodesListProps = {
  roomId: string;
}

export const RoomCodesList = (props: RoomCodesListProps) => {
  const router = useRouter();
  const originialDataRef = useRef<RoomCodeType[]>([]);
  const [data, setData] = useState<RoomCodeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await roomCodeService.getMany({ rental_room: props.roomId });
        originialDataRef.current = data;
        setData(data);
      
      } catch {
        await toastError(RoomCodeMessage.GET_MANY_ERROR);
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.roomId]);

  const generateDataForTable = (): DisplayedDataType[] => {
    return data.map((item) => ({
      id: `${item.id}`,
      basicInfo: (
        <>
          <DataLine label='Mã phòng' value={item.value} />
          <DataLine label='Số người ở tối đa' value={item.max_occupancy} />
        </>
      ),
    }));
  };

  const handleDeleteError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    if (
      error.response?.status === 500 && 
      error.response.data?.includes(GeneralMessage.BACKEND_PROTECTED_ERROR_PREFIX)
    ) {
      await toastError(RoomCodeMessage.DELETE_PROTECTED_ERROR);
      return;
    }
    
    await toastError(RoomCodeMessage.DELETE_ERROR);
  };

  const deleteFunction = async (id: string) => {
    await handleDeleteAlert(async () => {
      try {
        await roomCodeService.delete(id);
        await toastSuccess(RoomCodeMessage.DELETE_SUCCESS);
        originialDataRef.current = originialDataRef.current.filter((item) => item.id !== id);
        setData(originialDataRef.current); 
      
      } catch (error) {
        await handleDeleteError(error);
      }
    });
  };

  const detailsFunction = (id: string) => {
    router.push(`${props.roomId}/room-codes/${id}`);
  };

  const addOnClick = () => {
    router.push(`${props.roomId}/room-codes/add`);
  };

  return (
    <div>
      <Title>Danh sách các mã phòng</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo mã phòng'
            options={['value']}
            originalData={originialDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Mã phòng (A-Z)', value: 'asc-value' },
              { label: 'Mã phòng (Z-A)', value: 'desc-value' },
            ]}
            originalData={originialDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-auto'>
          <ActionButton mode='add' onClick={addOnClick}>Thêm mới</ActionButton>
        </div>
      </div>

      <Table 
        data={generateDataForTable()}
        loading={loading}
        actions={[
          {
            rowName: 'Chi tiết',
            function: detailsFunction,
            buttonConfig: { mode: 'details' }
          },
          {
            rowName: 'Xóa',
            function: deleteFunction,
            buttonConfig: { mode: 'delete' }
          }
        ]}
      />
    </div>
  );
};