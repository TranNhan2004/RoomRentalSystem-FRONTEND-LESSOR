'use client';

import React, { useEffect, useState } from 'react';
import { handleCancelAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { RentalRoomForm } from './RentalRoomForm';
import { GeneralMessage } from '@/messages/General.message';
import { RentalRoomType } from '@/types/RentalRoom.type';
import { INITIAL_RENTAL_ROOM } from '@/initials/RentalRoom.initial';
import { RentalRoomMessage } from '@/messages/RentalRoom.message';
import { rentalRoomService } from '@/services/RentalRoom.service';
import { Loading } from '@/components/partial/data/Loading';

type RentalRoomEditProps = {
  id: string;
}

export const RentalRoomEdit = (props: RentalRoomEditProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<RentalRoomType>(INITIAL_RENTAL_ROOM);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await rentalRoomService.get(props.id);
        setReqData(data);

      } catch {
        await toastError(RentalRoomMessage.GET_ERROR);
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props]);

  const handlePatchError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    await toastError(RentalRoomMessage.PATCH_ERROR);
  };

  const patchData = async (actionAfter?: () => void) => {
    try {
      alert(JSON.stringify(reqData));
      await rentalRoomService.patch(props.id, reqData);
      await toastSuccess(RentalRoomMessage.PATCH_SUCCESS);
      actionAfter?.();
      
    } catch (error) {
      await handlePatchError(error);
    }
  };

  const saveOnClick = async () => {
    await patchData();
  };

  const saveAndExitOnClick = async () => {
    await patchData(() => {
      router.back();
    });
  };

  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.push(`/rental-rooms/${reqData.id}`);
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <RentalRoomForm 
        reqData={reqData}
        setReqData={setReqData}
        formLabel={`Chỉnh sửa phòng trọ ${reqData.name}`}
        saveOnClick={saveOnClick}
        saveAndExitOnClick={saveAndExitOnClick}
        cancelOnClick={cancelOnClick}
      />
    </>
  );
};