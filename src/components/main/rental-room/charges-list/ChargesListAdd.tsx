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

    await toastError(ChargesListMessage.POST_ERROR);
  };

  const postData = async () => {
    try {
      await chargesListService.post({ ...reqData, rental_room: props.roomId });
      await toastSuccess(ChargesListMessage.POST_SUCCESS);
    } catch (error) {
      await handlePostError(error);
    }
  };

  const saveAndExitOnClick = async () => {
    await handleGeneralAlert(ChargesListMessage.POST_WARNING, async () => {
      await postData();
      router.push(`/rental-rooms/${props.roomId}`);
    });
  };

  return (
    <ChargesListForm
      formLabel='Thêm các loại phí' 
      roomId={props.roomId}
      reqData={reqData}
      setReqData={setReqData}
      saveAndExitOnClick={saveAndExitOnClick}
    />
  );
};