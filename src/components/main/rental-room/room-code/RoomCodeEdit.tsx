'use client';
                          
import React, { useEffect, useState } from 'react';
import { RoomCodeForm } from './RoomCodeForm';
import { RoomCodeType } from '@/types/RentalRoom.type';
import { INITIAL_ROOM_CODE } from '@/initials/RentalRoom.initial';
import { useRouter } from 'next/navigation';
import { roomCodeService } from '@/services/RentalRoom.service';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { RoomCodeMessage } from '@/messages/RentalRoom.message';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { Loading } from '@/components/partial/data/Loading';

                       
type RoomCodeEditProps = {
  id: string;
  roomId: string;
}

export const RoomCodeEdit = (props: RoomCodeEditProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<RoomCodeType>(INITIAL_ROOM_CODE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await roomCodeService.get(props.id);
        setReqData(data);

      } catch {
        await toastError(RoomCodeMessage.GET_ERROR);
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.id]);

  const handlePatchError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    if (
      error.response?.status === 400 &&
      error.response.data[0] === RoomCodeMessage.BACKEND_MAX_OCCUPANCY_INVALID
    ) {
      await toastError(RoomCodeMessage.MAX_OCCUPANCY_INVALID);
      return;
    }
    
    await toastError(RoomCodeMessage.PATCH_ERROR);
  };

  const patchData = async (actionAfter?: () => void) => {
    try {
      await roomCodeService.patch(props.id, { 
        ...reqData, 
        rental_room: props.roomId, 
        remaining_occupancy: reqData.max_occupancy 
      });
      await toastSuccess(RoomCodeMessage.PATCH_SUCCESS);
      actionAfter?.();
    
    } catch (error) {
      await handlePatchError(error);
    }
  };

  const cancelOnClick = () => {
    router.push(`/rental-rooms/${props.roomId}/room-codes/${props.id}`);
  };

  const saveOnClick = async () => {
    await patchData();
  };
  
  const saveAndExitOnClick = async () => {
    await patchData(() => {
      router.push(`/rental-rooms/${props.roomId}/room-codes/${props.id}`);
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <RoomCodeForm 
      formLabel='Chỉnh sửa mã phòng'
      mode='edit'
      reqData={reqData}
      setReqData={setReqData}
      cancelOnClick={cancelOnClick}
      saveOnClick={saveOnClick}
      saveAndExitOnClick={saveAndExitOnClick}
    />
  );
};