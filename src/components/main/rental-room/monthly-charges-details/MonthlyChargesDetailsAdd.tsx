'use client';
                          
import React, { useState } from 'react';
import { INITIAL_MONTHLY_CHARGES_DETAILS } from '@/initials/RentalRoom.initial';
import { MonthlyChargesDetailsType } from '@/types/RentalRoom.type';
import { useRouter } from 'next/navigation';
import { MonthlyChargesDetailsForm } from './MonthlyChargesDetailsForm';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { MonthlyChargesDetailsMessage } from '@/messages/RentalRoom.message';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { monthlyChargesDetailsService } from '@/services/RentalRoom.service';
                        
type MonthlyChargesDetailsAddProps = {
  roomId: string;
  roomCodeId: string;
}

export const MonthlyChargesDetailsAdd = (props: MonthlyChargesDetailsAddProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<MonthlyChargesDetailsType>(INITIAL_MONTHLY_CHARGES_DETAILS);

  const handlePostError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    if (error.response?.status === 400) {
      if (error.response.data[0] === MonthlyChargesDetailsMessage.BACKEND_CHARGES_LIST_NOT_FOUND) {
        await toastError(MonthlyChargesDetailsMessage.CHARGES_LIST_NOT_FOUND);
        return;
      }

      if (error.response.data[0] === MonthlyChargesDetailsMessage.BACKEND_UNSETTLED_RECORD_EXIST) {
        await toastError(MonthlyChargesDetailsMessage.UNSETTLED_RECORD_EXIST);
        return;
      }

      if (error.response.data[0] === MonthlyChargesDetailsMessage.BACKEND_PREV_RECORD_NOT_FOUND) {
        await toastError(MonthlyChargesDetailsMessage.PREV_RECORD_NOT_FOUND);
        return;
      }
    }

    if (error.response?.status === 500) {
      if (error.response.data.includes(MonthlyChargesDetailsMessage.BACKEND_NEW_KWH_READING_INVALID_SUBSTR)) {
        await toastError(MonthlyChargesDetailsMessage.NEW_KWH_READING_INVALID);
        return;
      }

      if (error.response.data.includes(MonthlyChargesDetailsMessage.BACKEND_NEW_M3_READING_INVALID_SUBSTR)) {
        await toastError(MonthlyChargesDetailsMessage.NEW_M3_READING_INVALID);
        return;
      }
    }

    await toastError(MonthlyChargesDetailsMessage.POST_ERROR);
  };

  const postData = async (actionAfter: () => void) => {
    try {
      await monthlyChargesDetailsService.post({ ...reqData, room_code: props.roomCodeId });
      await toastSuccess(MonthlyChargesDetailsMessage.POST_SUCCESS);
      actionAfter();
    
    } catch (error) {
      await handlePostError(error);
    }
  };

  const saveAndExitOnClick = async () => {
    await postData(() => {
      router.push(`/rental-rooms/${props.roomId}/room-codes/${props.roomCodeId}`);
    });    
  };

  return (
    <MonthlyChargesDetailsForm
      formLabel='Thêm hóa đơn tiền trọ hằng tháng mới' 
      mode='add'
      roomCodeId={props.roomCodeId}
      roomId={props.roomId}
      reqData={reqData}
      setReqData={setReqData}
      saveAndExitOnClick={saveAndExitOnClick}
    />
  );
};