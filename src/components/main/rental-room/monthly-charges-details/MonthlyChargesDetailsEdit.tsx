'use client';
                          
import React, { useEffect, useState } from 'react';
import { INITIAL_MONTHLY_CHARGES_DETAILS } from '@/initials/RentalRoom.initial';
import { MonthlyChargesDetailsType } from '@/types/RentalRoom.type';
import { useRouter } from 'next/navigation';
import { MonthlyChargesDetailsForm } from './MonthlyChargesDetailsForm';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { MonthlyChargesDetailsMessage } from '@/messages/RentalRoom.message';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { monthlyChargesDetailsService } from '@/services/RentalRoom.service';
import { NOT_FOUND_URL } from '@/lib/client/notFoundURL';
import { Loading } from '@/components/partial/data/Loading';
                        
type MonthlyChargesDetailsEditProps = {
  roomId: string;
  roomCodeId: string;
  id: string;
}

export const MonthlyChargesDetailsEdit = (props: MonthlyChargesDetailsEditProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<MonthlyChargesDetailsType>(INITIAL_MONTHLY_CHARGES_DETAILS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await monthlyChargesDetailsService.get(props.id);
        setReqData(data);

      } catch {
        router.push(NOT_FOUND_URL);
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.id, router]);

  const handlePatchError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    await toastError(MonthlyChargesDetailsMessage.PATCH_ERROR);
  };

  const patchData = async (actionAfter?: () => void) => {
    try {
      await monthlyChargesDetailsService.patch(props.id, reqData);
      await toastSuccess(MonthlyChargesDetailsMessage.PATCH_SUCCESS);
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
      router.push(`/rental-rooms/${props.roomId}/room-codes/${props.roomCodeId}`);
    });    
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <MonthlyChargesDetailsForm
      formLabel='Chỉnh sửa hóa đơn tiền trọ hằng tháng' 
      mode='edit'
      roomCodeId={props.roomCodeId}
      roomId={props.roomId}
      reqData={reqData}
      setReqData={setReqData}
      saveOnClick={saveOnClick}
      saveAndExitOnClick={saveAndExitOnClick}
    />
  );
};