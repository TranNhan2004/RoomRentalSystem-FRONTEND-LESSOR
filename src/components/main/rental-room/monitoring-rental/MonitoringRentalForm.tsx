'use client';

import React from 'react';
import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import { Input } from '@/components/partial/form/Input';
import { Label } from '@/components/partial/form/Label';
import { handleCancelAlert } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { useRouter } from 'next/navigation';
import { Validators } from '@/types/Validators.type';
import { MonitoringRentalType } from '@/types/RentalRoom.type';
import { MonitoringRentalMessage } from '@/messages/RentalRoom.message';
import { formatDate } from '@/lib/client/format';
import { PHONE_NUMBER_REG_EXP } from '@/lib/client/isValidForm';


type MonitoringRentalFormProps = {
  roomId: string;
  roomCodeId: string;
  reqData: MonitoringRentalType;
  setReqData: React.Dispatch<React.SetStateAction<MonitoringRentalType>>;
} & Omit<DataFormProps<MonitoringRentalType>, 'children' | 'cancelOnClick' | 'validators'>;

export const MonitoringRentalForm = (props: MonitoringRentalFormProps) => {
  const router = useRouter();
  
  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.push(`/rental-rooms/${props.roomId}/room-codes/${props.roomCodeId}`);
    });
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, props.setReqData);
  };
    
  const validators: Validators<MonitoringRentalType> = {
    _renter_phone_number: () => {
      if (!props.reqData._renter_phone_number) {
        return MonitoringRentalMessage.RENTER_PHONE_NUMBER_FORMAT_REQUIRED;
      } 
      if (!PHONE_NUMBER_REG_EXP.test(props.reqData._renter_phone_number)) {
        return MonitoringRentalMessage.RENTER_PHONE_NUMBER_FORMAT_ERROR;
      }
      return null;
    },
    start_date: () =>{
      if (!props.reqData.start_date) {
        return MonitoringRentalMessage.START_DATE_REQUIRED;
      }
      
      if (formatDate(props.reqData.start_date, 'ymd') < formatDate(new Date(), 'ymd')) {
        return MonitoringRentalMessage.START_DATE_INVALID;
      }
      return null;
    },  
  };

  return (
    <>
      <DataForm 
        formLabel={props.formLabel}
        saveOnClick={props.saveOnClick}
        saveAndExitOnClick={props.saveAndExitOnClick}
        cancelOnClick={cancelOnClick}
        validators={validators}
      >
        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='-renter-phone-number' required>Số điện thoại của người thuê: </Label>
          <Input 
            id='-renter-phone-number'
            name='_renter_phone_number'
            type='text'
            className='w-[300px] ml-[-360px]'
            value={props.reqData._renter_phone_number}
            onChange={handleInputOnChange}
            validate={validators._renter_phone_number}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='start-date' required>Ngày bắt đầu thuê: </Label>
          <Input 
            id='start-date'
            name='start_date'
            type='date'
            className='w-[300px] ml-[-360px]'
            value={formatDate(props.reqData.start_date, 'ymd')}
            onChange={handleInputOnChange}
            validate={validators.start_date}
          />
        </div>       
      </DataForm>
    </>
  );
};
