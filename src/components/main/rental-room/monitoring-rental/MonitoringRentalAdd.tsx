'use client';
                          
import React, { useState } from 'react';
import { INITIAL_MONITORING_RENTAL } from '@/initials/RentalRoom.initial';
import { MonitoringRentalType } from '@/types/RentalRoom.type';
import { useRouter } from 'next/navigation';
import { MonitoringRentalForm } from './MonitoringRentalForm';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { MonitoringRentalMessage } from '@/messages/RentalRoom.message';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { monitoringRentalService } from '@/services/RentalRoom.service';
import { userService } from '@/services/UserAccount.service';
                        
type MonitoringRentalAddProps = {
  roomId: string;
  roomCodeId: string;
}

export const MonitoringRentalAdd = (props: MonitoringRentalAddProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<MonitoringRentalType>(INITIAL_MONITORING_RENTAL);

  const handlePostError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    if (error.response?.status === 400) {

      if (error.response.data[0] === MonitoringRentalMessage.BACKEND_ROOM_CODE_SAME_TIME) {
        await toastError(MonitoringRentalMessage.ROOM_CODE_SAME_TIME);
        return;
      }

      if (error.response.data[0] === MonitoringRentalMessage.BACKEND_ROOM_CODE_UNAVAILABLE) {
        await toastError(MonitoringRentalMessage.ROOM_CODE_UNAVAILABLE);
        return;
      }
    }

    await toastError(MonitoringRentalMessage.POST_ERROR);
  };

  const postData = async (actionAfter: () => void) => {
    try {
      const renter = await userService.getMany({ 
        phone_number: reqData._renter_phone_number,
        is_active: true,
        role_include: ['RENTER']
      });

      if (renter.length !== 1) {
        await toastError(MonitoringRentalMessage.RENTER_PHONE_NUMBER_NOT_FOUND);
        return;
      }

      await monitoringRentalService.post({ ...reqData, room_code: props.roomCodeId, renter: renter[0].id });
      await toastSuccess(MonitoringRentalMessage.POST_SUCCESS);
      actionAfter();
    
    } catch (error) {
      await handlePostError(error);
    }
  };

  const saveOnClick = async () => {
    await postData(() => {
      setReqData(INITIAL_MONITORING_RENTAL);
    });
  };

  const saveAndExitOnClick = async () => {
    await postData(() => {
      router.push(`/rental-rooms/${props.roomId}/room-codes/${props.roomCodeId}`);
    });    
  };

  return (
    <MonitoringRentalForm
      formLabel='Thêm bản ghi theo dõi thuê phòng mới' 
      roomCodeId={props.roomCodeId}
      roomId={props.roomId}
      reqData={reqData}
      setReqData={setReqData}
      saveOnClick={saveOnClick}
      saveAndExitOnClick={saveAndExitOnClick}
    />
  );
};