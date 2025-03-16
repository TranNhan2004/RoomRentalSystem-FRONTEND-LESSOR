'use client';
                          
import React, { useState } from 'react';
import { INITIAL_CHARGES_LIST } from '@/initials/RentalRoom.initial';
import { ChargesListType } from '@/types/RentalRoom.type';
import { useRouter } from 'next/navigation';
import { ChargesListForm } from './ChargesListForm';
import { handleGeneralAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { ChargesListMessage } from '@/messages/RentalRoom.message';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { chargesListService } from '@/services/RentalRoom.service';
                        
type ChargesListAddProps = {
  roomId: string;
}

export const ChargesListAdd = (props: ChargesListAddProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<ChargesListType>(INITIAL_CHARGES_LIST);

  const handlePostError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    if (
      error.response?.status === 400 &&
      error.response.data[0] === ChargesListMessage.BACKEND_POST_INVALID
    ) {
      await toastError(ChargesListMessage.POST_INVALID);
      return;
    }

    await toastError(ChargesListMessage.POST_ERROR);
  };

  const postData = async () => {
    try {
      await chargesListService.post({ ...reqData, rental_room: props.roomId });
      await toastSuccess(ChargesListMessage.POST_SUCCESS);
      router.push(`/rental-rooms/${props.roomId}`);
    
    } catch (error) {
      await handlePostError(error);
    }
  };

  const saveAndExitOnClick = async () => {
    await handleGeneralAlert(ChargesListMessage.POST_WARNING, postData);
  };

  return (
    <ChargesListForm
      formLabel='Thêm mức giá mới' 
      roomId={props.roomId}
      reqData={reqData}
      setReqData={setReqData}
      saveAndExitOnClick={saveAndExitOnClick}
    />
  );
};