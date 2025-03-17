'use client';

import React from 'react';
import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import { Input } from '@/components/partial/form/Input';
import { Label } from '@/components/partial/form/Label';
import { handleCancelAlert } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { useRouter } from 'next/navigation';
import { Validators } from '@/types/Validators.type';
import { MonthlyChargesDetailsType } from '@/types/RentalRoom.type';
import { MonthlyChargesDetailsMessage } from '@/messages/RentalRoom.message';


type MonthlyChargesDetailsFormProps = {
  mode: 'add' | 'edit';
  roomId: string;
  roomCodeId: string;
  reqData: MonthlyChargesDetailsType;
  setReqData: React.Dispatch<React.SetStateAction<MonthlyChargesDetailsType>>;
} & Omit<DataFormProps<MonthlyChargesDetailsType>, 'children' | 'cancelOnClick' | 'validators'>;

export const MonthlyChargesDetailsForm = (props: MonthlyChargesDetailsFormProps) => {
  const router = useRouter();
  
  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.push(`/rental-rooms/${props.roomId}/room-codes/${props.roomCodeId}`);
    });
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, props.setReqData);
  };

  const handleContinueRentingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'true') {
      props.setReqData({ ...props.reqData, continue_renting: true });
    
    } else {
      props.setReqData({ ...props.reqData, continue_renting: false });
    }
  };
    
  const validators: Validators<MonthlyChargesDetailsType> = {
    old_kWh_reading: () => {
      if (props.reqData.created_mode === 'auto') {
        return null;
      }
      if (!props.reqData.old_kWh_reading) {
        return MonthlyChargesDetailsMessage.OLD_KWH_READING_REQUIRED;
      }
      if (props.reqData.old_kWh_reading < 0) {
        return MonthlyChargesDetailsMessage.OLD_KWH_READING_INVALID;
      }
      return null;
    },
    new_kWh_reading: () => {
      if (!props.reqData.new_kWh_reading) {
        return MonthlyChargesDetailsMessage.NEW_KWH_READING_REQUIRED;
      }
      if (props.reqData.old_kWh_reading && props.reqData.new_kWh_reading < props.reqData.old_kWh_reading) {
        return MonthlyChargesDetailsMessage.NEW_KWH_READING_INVALID;
      }
      return null;
    },
    old_m3_reading: () => {
      if (props.reqData.created_mode === 'auto') {
        return null;
      }
      if (!props.reqData.old_m3_reading) {
        return MonthlyChargesDetailsMessage.OLD_M3_READING_REQUIRED;
      }
      if (props.reqData.old_m3_reading < 0) {
        return MonthlyChargesDetailsMessage.OLD_M3_READING_INVALID;
      }
      return null;
    },
    new_m3_reading: () => {
      if (!props.reqData.new_m3_reading) {
        return MonthlyChargesDetailsMessage.NEW_M3_READING_REQUIRED;
      }
      if (props.reqData.old_m3_reading && props.reqData.new_m3_reading < props.reqData.old_m3_reading) {
        return MonthlyChargesDetailsMessage.NEW_M3_READING_INVALID;
      }
      return null;
    },
    paid_charge: () => {
      if (props.mode === 'add') {
        return null;
      }
      if (!props.reqData.paid_charge) {
        return MonthlyChargesDetailsMessage.PAID_CHARGE_REQUIRED;
      }
      if (props.reqData.paid_charge < 0) {
        return MonthlyChargesDetailsMessage.PAID_CHARGE_INVALID;
      }
      if (props.reqData.due_charge && props.reqData.paid_charge > props.reqData.due_charge) {
        return MonthlyChargesDetailsMessage.PAID_CHARGE_INVALID_2;
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
        {
          props.mode === 'add' ? (
            <>
              {
                props.reqData.created_mode === 'first' && (
                  <div className='grid grid-cols-2 items-center'>
                    <Label htmlFor='old-kWh-reading' required>Chỉ số điện cũ: </Label>
                    <Input 
                      id='old-kWh-reading'
                      name='old_kWh_reading'
                      type='number'
                      className='w-[300px] ml-[-360px]'
                      value={props.reqData.old_kWh_reading}
                      onChange={handleInputOnChange}
                      validate={validators.old_kWh_reading}
                    />
                  </div>
                )
              }

              <div className='grid grid-cols-2 items-center'>
                <Label htmlFor='new-kWh-reading' required>Chỉ số điện mới: </Label>
                <Input 
                  id='new-kWh-reading'
                  name='new_kWh_reading'
                  type='number'
                  className='w-[300px] ml-[-360px]'
                  value={props.reqData.new_kWh_reading}
                  onChange={handleInputOnChange}
                  validate={validators.new_kWh_reading}
                />
              </div>

              {
                props.reqData.created_mode === 'first' && (
                  <div className='grid grid-cols-2 items-center'>
                    <Label htmlFor='old-m3-reading' required>Chỉ số nước cũ: </Label>
                    <Input 
                      id='old-m3-reading'
                      name='old_m3_reading'
                      type='number'
                      className='w-[300px] ml-[-360px]'
                      value={props.reqData.old_m3_reading}
                      onChange={handleInputOnChange}
                      validate={validators.old_m3_reading}
                    />
                  </div>
                )
              }

              <div className='grid grid-cols-2 items-center'>
                <Label htmlFor='new-m3-reading' required>Chỉ số nước mới: </Label>
                <Input 
                  id='new-m3-reading'
                  name='new_m3_reading'
                  type='number'
                  className='w-[300px] ml-[-360px]'
                  value={props.reqData.new_m3_reading}
                  onChange={handleInputOnChange}
                  validate={validators.new_m3_reading}
                />
              </div>

              <div className='grid grid-cols-2 items-center'>
                <Label htmlFor='continue-renting' required>Tiếp tục thuê: </Label>
                <div className='px-4 py-2 flex items-center w-[300px] ml-[-375px] space-x-8'>
                  <div className='flex items-center'>
                    <Input 
                      id='continue-renting-1'
                      name='continue_renting'
                      type='radio'
                      className='mr-2'
                      value={'true'}
                      checked={props.reqData.continue_renting === true}
                      onChange={handleContinueRentingChange}
                      validate={validators.continue_renting}
                    /> Có
                  </div>
                  <div className='flex items-center'>
                    <Input 
                      id='continue-renting-2'
                      name='continue_renting'
                      type='radio'
                      className='ml-8 mr-2'
                      value={'false'}
                      checked={props.reqData.continue_renting === false}
                      onChange={handleContinueRentingChange}
                      validate={validators.continue_renting}
                    /> Không
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 items-center'>
                <div></div>
                <p className='w-[500px] ml-[-360px] italic text-gray-500'>
                  Chọn tiếp tục thuê là &quot;Có&quot; nếu người dùng tiếp tục thuê vào tháng sau
                </p>
              </div>

              <div className='grid grid-cols-2 items-center mt-3 mb-3'>
                <Label htmlFor='created-mode' required>Chế độ thêm: </Label>
                <div className='px-4 py-2 flex items-center w-[300px] ml-[-375px] space-x-8'>
                  <div className='flex items-center'>
                    <Input 
                      id='created-mode-1'
                      name='created_mode'
                      type='radio'
                      className='mr-2'
                      value={'first'}
                      checked={props.reqData.created_mode === 'first'}
                      onChange={handleInputOnChange}
                      validate={validators.created_mode}
                    /> Lần đầu
                  </div>
                  <div className='flex items-center'>
                    <Input 
                      id='created-mode-2'
                      name='created_mode'
                      type='radio'
                      className='mr-2'
                      value={'auto'}
                      checked={props.reqData.created_mode === 'auto'}
                      onChange={handleInputOnChange}
                      validate={validators.created_mode}
                    /> Tự động
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 items-center'>
                <div></div>
                <p className='w-[500px] ml-[-360px] italic text-gray-500'>
                  Chọn chế độ thêm là &quot;Lần đầu&quot; khi tạo hóa đơn đầu tiên
                </p>
              </div>
            </>      
          ) : (
            <>
              <div className='grid grid-cols-2 items-center'>
                <Label htmlFor='due-charge' required>Số tiền phải trả: </Label>
                <Input 
                  id='due-charge'
                  name='due_charge'
                  type='number'
                  className='w-[300px] ml-[-360px]'
                  value={props.reqData.due_charge}
                  onChange={handleInputOnChange}
                  disabled
                />
              </div>
              <div className='grid grid-cols-2 items-center'>
                <Label htmlFor='paid-charge' required>Số tiền đã trả: </Label>
                <Input 
                  id='paid-charge'
                  name='paid_charge'
                  type='number'
                  className='w-[300px] ml-[-360px]'
                  value={props.reqData.paid_charge}
                  onChange={handleInputOnChange}
                  validate={validators.paid_charge}
                />
              </div>
            </>
          )
        }
      </DataForm>
    </>
  );
};