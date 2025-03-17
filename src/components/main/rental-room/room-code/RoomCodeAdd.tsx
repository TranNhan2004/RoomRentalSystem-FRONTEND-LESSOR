'use client';
                          
import React, { useState } from 'react';
import { RoomCodeForm } from './RoomCodeForm';
import { RoomCodeType } from '@/types/RentalRoom.type';
import { INITIAL_ROOM_CODE } from '@/initials/RentalRoom.initial';
import { useRouter } from 'next/navigation';
import { roomCodeService } from '@/services/RentalRoom.service';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { RoomCodeMessage } from '@/messages/RentalRoom.message';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';

                       
type RoomCodeAddProps = {
  roomId: string;
}

export const RoomCodeAdd = (props: RoomCodeAddProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<RoomCodeType>(INITIAL_ROOM_CODE);

  const handlePostError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    if (
      error.response?.status === 400 &&
      error.response.data[0] === RoomCodeMessage.BACKEND_MAX_ROOM_CODE_ERROR
    ) {
      await toastError(RoomCodeMessage.MAX_ROOM_CODE_ERROR);
      return;
    }
    
    await toastError(RoomCodeMessage.POST_ERROR);
  };

  const postData = async (actionAfter: () => void) => {
    try {
      await roomCodeService.post({ ...reqData, rental_room: props.roomId });
      await toastSuccess(RoomCodeMessage.POST_SUCCESS);
      actionAfter();
    
    } catch (error) {
      await handlePostError(error);
    }
  };

  const cancelOnClick = () => {
    router.push(`/rental-rooms/${props.roomId}`);
  };

  const saveOnClick = async () => {
    await postData(() => {
      setReqData(INITIAL_ROOM_CODE);
    });
  };
  
  const saveAndExitOnClick = async () => {
    await postData(() => {
      router.push(`/rental-rooms/${props.roomId}`);
    });
  };

  return (
    <RoomCodeForm 
      formLabel='Thêm mã phòng mới'
      mode='add'
      reqData={reqData}
      setReqData={setReqData}
      cancelOnClick={cancelOnClick}
      saveOnClick={saveOnClick}
      saveAndExitOnClick={saveAndExitOnClick}
    />
  );
};