'use client';
                          
import React, { useState } from 'react';
import { INITIAL_CHARGES } from '@/initials/RentalRoom.initial';
import { ChargesType } from '@/types/RentalRoom.type';
import { useRouter } from 'next/navigation';
import { ChargesForm } from './ChargesForm';
import { handleGeneralAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { ChargesMessage } from '@/messages/RentalRoom.message';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { chargesService } from '@/services/RentalRoom.service';
                        
type ChargesAddProps = {
  roomId: string;
}

export const ChargesAdd = (props: ChargesAddProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<ChargesType>(INITIAL_CHARGES);

  const handlePostError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    if (
      error.response?.status === 400 &&
      error.response.data[0] === ChargesMessage.BACKEND_POST_INVALID
    ) {
      await toastError(ChargesMessage.POST_INVALID);
      return;
    }

    await toastError(ChargesMessage.POST_ERROR);
  };

  const postData = async () => {
    try {
      await chargesService.post({ ...reqData, rental_room: props.roomId });
      await toastSuccess(ChargesMessage.POST_SUCCESS);
      router.push(`/rental-rooms/${props.roomId}`);
    
    } catch (error) {
      await handlePostError(error);
    }
  };

  const saveAndExitOnClick = async () => {
    await handleGeneralAlert(ChargesMessage.POST_WARNING, postData);
  };

  return (
    <ChargesForm
      formLabel='Thêm mức giá mới' 
      roomId={props.roomId}
      reqData={reqData}
      setReqData={setReqData}
      saveAndExitOnClick={saveAndExitOnClick}
    />
  );
};