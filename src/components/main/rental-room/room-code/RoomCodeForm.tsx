'use client';

import React from 'react';
import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import { Input } from '@/components/partial/form/Input';
import { Label } from '@/components/partial/form/Label';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { Validators } from '@/types/Validators.type';
import { RoomCodeType } from '@/types/RentalRoom.type';
import { RoomCodeMessage } from '@/messages/RentalRoom.message';

type RoomCodeFormProps = {
  mode: 'add' | 'edit';
  reqData: RoomCodeType;
  setReqData: React.Dispatch<React.SetStateAction<RoomCodeType>>;
} & Omit<DataFormProps<RoomCodeType>, 'children' | 'validators'>;

export const RoomCodeForm = (props: RoomCodeFormProps) => {

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, props.setReqData);
  };

  const validators: Validators<RoomCodeType> = {
    value: () => {
      if (!props.reqData.value) {
        return RoomCodeMessage.VALUE_REQUIRED;
      }
      return null;
    },
    max_occupancy: () => {
      if (!props.reqData.max_occupancy) {
        return RoomCodeMessage.MAX_OCCUPANCY_REQUIRED;
      }
      if (props.reqData.max_occupancy <= 0) {
        return RoomCodeMessage.MAX_OCCUPANCY_POSITIVE;
      }
      return null;
    }
  };

  return (
    <>
      <DataForm 
        formLabel={props.formLabel}
        saveOnClick={props.saveOnClick}
        saveAndExitOnClick={props.saveAndExitOnClick}
        cancelOnClick={props.cancelOnClick}
        validators={validators}
      >
        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='value' required>Mã phòng: </Label>
          <Input 
            id='value'
            name='value'
            type='text'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.value}
            onChange={handleInputOnChange}
            validate={validators.value}
          />
        </div>
        {
          props.mode === 'edit' && (
            <div className='grid grid-cols-2 items-center'>
              <Label htmlFor='current-occupancy'>Số người ở hiện tại: </Label>
              <Input 
                id='current-occupancy'
                name='current_occupancy'
                type='number'
                className='w-[300px] ml-[-360px]'
                value={props.reqData.current_occupancy}
                onChange={handleInputOnChange}
                disabled
              />
            </div>
          )
        }
        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='max-occupancy' required>Số người ở tối đa: </Label>
          <Input 
            id='max-occupancy'
            name='max_occupancy'
            type='number'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.max_occupancy}
            onChange={handleInputOnChange}
            validate={validators.max_occupancy}
          />
        </div>
      </DataForm>
    </>
  );
};
