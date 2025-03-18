'use client';
                          
import React, { useState } from 'react';
import { INITIAL_MONTHLY_ROOM_INVOICE } from '@/initials/RentalRoom.initial';
import { MonthlyRoomInvoiceType } from '@/types/RentalRoom.type';
import { useRouter } from 'next/navigation';
import { MonthlyRoomInvoiceForm } from './MonthlyRoomInvoiceForm';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { MonthlyRoomInvoiceMessage } from '@/messages/RentalRoom.message';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { monthlyRoomInvoiceService } from '@/services/RentalRoom.service';
                        
type MonthlyRoomInvoiceAddProps = {
  roomId: string;
  roomCodeId: string;
}

export const MonthlyRoomInvoiceAdd = (props: MonthlyRoomInvoiceAddProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<MonthlyRoomInvoiceType>(INITIAL_MONTHLY_ROOM_INVOICE);

  const handlePostError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    if (error.response?.status === 400) {
      if (error.response.data[0] === MonthlyRoomInvoiceMessage.BACKEND_CHARGES_LIST_NOT_FOUND) {
        await toastError(MonthlyRoomInvoiceMessage.CHARGES_LIST_NOT_FOUND);
        return;
      }

      if (error.response.data[0] === MonthlyRoomInvoiceMessage.BACKEND_UNSETTLED_RECORD_EXIST) {
        await toastError(MonthlyRoomInvoiceMessage.UNSETTLED_RECORD_EXIST);
        return;
      }

      if (error.response.data[0] === MonthlyRoomInvoiceMessage.BACKEND_PREV_RECORD_NOT_FOUND) {
        await toastError(MonthlyRoomInvoiceMessage.PREV_RECORD_NOT_FOUND);
        return;
      }
    }

    if (error.response?.status === 500) {
      if (error.response.data.includes(MonthlyRoomInvoiceMessage.BACKEND_NEW_KWH_READING_INVALID_SUBSTR)) {
        await toastError(MonthlyRoomInvoiceMessage.NEW_KWH_READING_INVALID);
        return;
      }

      if (error.response.data.includes(MonthlyRoomInvoiceMessage.BACKEND_NEW_M3_READING_INVALID_SUBSTR)) {
        await toastError(MonthlyRoomInvoiceMessage.NEW_M3_READING_INVALID);
        return;
      }
    }

    await toastError(MonthlyRoomInvoiceMessage.POST_ERROR);
  };

  const postData = async (actionAfter: () => void) => {
    try {
      await monthlyRoomInvoiceService.post({ ...reqData, room_code: props.roomCodeId });
      await toastSuccess(MonthlyRoomInvoiceMessage.POST_SUCCESS);
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
    <MonthlyRoomInvoiceForm
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