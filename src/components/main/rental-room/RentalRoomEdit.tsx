'use client';

import React, { useEffect, useState } from 'react';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { RentalRoomForm } from './RentalRoomForm';
import { GeneralMessage } from '@/messages/General.message';
import { RentalRoomType } from '@/types/RentalRoom.type';
import { INITIAL_RENTAL_ROOM } from '@/initials/RentalRoom.initial';
import { RentalRoomMessage } from '@/messages/RentalRoom.message';
import { rentalRoomService } from '@/services/RentalRoom.service';

type RentalRoomEditProps = {
  id: string;
}

export const RentalRoomEdit = (props: RentalRoomEditProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<RentalRoomType>(INITIAL_RENTAL_ROOM);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await rentalRoomService.get(props.id);
        setReqData(data);
      } catch {
        await toastError(RentalRoomMessage.GET_ERROR);
      }
    }

    fetchData();
  }, [props]);

  const handlePostError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    await toastError(RentalRoomMessage.POST_ERROR);
  };

  const postData = async (actionAfter: () => void) => {
    try {
      await rentalRoomService.post(reqData);
      await toastSuccess(RentalRoomMessage.POST_SUCCESS);
      actionAfter();
      
    } catch (error) {
      await handlePostError(error);
    }
  };

  const saveOnClick = async () => {
    await postData(() => {
      setReqData(INITIAL_RENTAL_ROOM);
    });
  };

  const saveAndExitOnClick = async () => {
    await postData(() => {
      router.back();
    });
  };

  return (
    <>
      <RentalRoomForm 
        formLabel={`Chỉnh sửa phòng trọ ${reqData.name}`}
        saveOnClick={saveOnClick}
        saveAndExitOnClick={saveAndExitOnClick}
        reqData={reqData}
        setReqData={setReqData}
      />
    </>
  );
};