'use client';

import React from 'react';
import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import { Input } from '@/components/partial/form/Input';
import { Label } from '@/components/partial/form/Label';
import { handleCancelAlert } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { useRouter } from 'next/navigation';
import { Validators } from '@/types/Validators.type';
import { ChargesType } from '@/types/RentalRoom.type';
import { ChargesMessage } from '@/messages/RentalRoom.message';
import { formatDate } from '@/lib/client/format';


type ChargesFormProps = {
  roomId: string;
  reqData: ChargesType;
  setReqData: React.Dispatch<React.SetStateAction<ChargesType>>;
} & Omit<DataFormProps<ChargesType>, 'children' | 'cancelOnClick' | 'validators'>;

export const ChargesForm = (props: ChargesFormProps) => {
  const router = useRouter();
  
  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.push(`/rental-rooms/${props.roomId}`);
    });
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, props.setReqData);
  };
    
  const validators: Validators<ChargesType> = {
    room_charge: () =>{
      if (!props.reqData.room_charge) {
        return ChargesMessage.ROOM_CHARGE_REQUIRED;
      }
      if (props.reqData.room_charge < 0) {
        return ChargesMessage.ROOM_CHARGE_INVALID;
      }
      return null;
    },

    deposit: () =>{
      if (!props.reqData.deposit) {
        return ChargesMessage.DEPOSIT_REQUIRED;
      }
      if (props.reqData.deposit < 0) {
        return ChargesMessage.DEPOSIT_INVALID;
      }
      return null;
    },

    electricity_charge: () =>{
      if (!props.reqData.electricity_charge) {
        return ChargesMessage.ELECTRICITY_CHARGE_REQUIRED;
      }
      if (props.reqData.electricity_charge < 0) {
        return ChargesMessage.ELECTRICITY_CHARGE_INVALID;
      }
      return null;
    },

    water_charge: () =>{
      if (!props.reqData.water_charge) {
        return ChargesMessage.WATER_CHARGE_REQUIRED;
      }
      if (props.reqData.water_charge < 0) {
        return ChargesMessage.WATER_CHARGE_INVALID;
      }
      return null;
    },

    wifi_charge: () =>{
      if (!props.reqData.wifi_charge) {
        return ChargesMessage.WIFI_CHARGE_REQUIRED;
      }
      if (props.reqData.wifi_charge < -1) {
        return ChargesMessage.WIFI_CHARGE_INVALID;
      }
      return null;
    },
    
    rubbish_charge: () =>{
      if (!props.reqData.rubbish_charge) {
        return ChargesMessage.RUBBISH_CHARGE_REQUIRED;
      }
      if (props.reqData.rubbish_charge < 0) {
        return ChargesMessage.RUBBISH_CHARGE_INVALID;
      }
      return null;
    },

    start_date: () =>{
      if (!props.reqData.start_date) {
        return ChargesMessage.START_DATE_REQUIRED;
      }
      
      if (formatDate(props.reqData.start_date, 'ymd') < formatDate(new Date(), 'ymd')) {
        return ChargesMessage.START_DATE_INVALID;
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
          <Label htmlFor='room-charge' required>Giá phòng: </Label>
          <Input 
            id='room-charge'
            name='room_charge'
            type='number'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.room_charge}
            onChange={handleInputOnChange}
            validate={validators.room_charge}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='deposit' required>Giá đặt cọc: </Label>
          <Input 
            id='deposit'
            name='deposit'
            type='number'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.deposit}
            onChange={handleInputOnChange}
            validate={validators.deposit}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='electrictiy-charge' required>Giá điện (/kWh): </Label>
          <Input 
            id='electrictiy-charge'
            name='electricity_charge'
            type='number'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.electricity_charge}
            onChange={handleInputOnChange}
            validate={validators.electricity_charge}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='water-charge' required>Giá nước (/mét khối): </Label>
          <Input 
            id='water-charge'
            name='water_charge'
            type='number'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.water_charge}
            onChange={handleInputOnChange}
            validate={validators.water_charge}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='wifi-charge' required>Giá wifi: </Label>
          <Input 
            id='wifi-charge'
            name='wifi_charge'
            type='number'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.wifi_charge}
            onChange={handleInputOnChange}
            validate={validators.wifi_charge}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <div></div>
          <p className='w-[500px] ml-[-360px] italic text-gray-500'>
            Giá wifi = -1 là không có wifi, còn = 0 là có wifi nhưng miễn phí!
          </p>
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='rubbish-charge' required>Giá thu dọn rác: </Label>
          <Input 
            id='rubbish-charge'
            name='rubbish_charge'
            type='number'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.rubbish_charge}
            onChange={handleInputOnChange}
            validate={validators.rubbish_charge}
          />
        </div>
        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='start-date' required>Ngày bắt đầu áp dụng: </Label>
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
