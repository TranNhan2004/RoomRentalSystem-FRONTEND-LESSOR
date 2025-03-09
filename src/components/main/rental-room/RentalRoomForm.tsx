'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import { Input } from '@/components/partial/form/Input';
import { Label } from '@/components/partial/form/Label';
import { OptionType, Select } from '@/components/partial/form/Select';
import { handleCancelAlert } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { mapOptions } from '@/lib/client/handleOptions';
import { communeService, districtService, provinceService } from '@/services/Address.service';
import { CommuneType, DistrictType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';
import { Validators } from '@/types/Validators.type';
import { RentalRoomType } from '@/types/RentalRoom.type';
import { RentalRoomMessage } from '@/messages/RentalRoom.message';
import { TextArea } from '@/components/partial/form/TextArea';


type RentalRoomFormProps = {
  reqData: RentalRoomType;
  setReqData: React.Dispatch<React.SetStateAction<RentalRoomType>>;
} & Omit<DataFormProps<RentalRoomType>, 'children' | 'cancelOnClick' | 'validators'>;

export const RentalRoomForm = (props: RentalRoomFormProps) => {
  const router = useRouter();
  const [provinceOptions, setProvinceOptions] = useState<OptionType[]>([]);
  const [districtOptions, setDistrictOptions] = useState<OptionType[]>([]);
  const [communeOptions, setCommuneOptions] = useState<OptionType[]>([]);
  const originalDistrictDataRef = useRef<DistrictType[]>([]);
  const originalCommuneDataRef = useRef<CommuneType[]>([]);
  
  useEffect(() => {
    const fetchOptionData = async () => {
      const [provinceData, districtData, communeData] = await Promise.all([
        provinceService.getMany(),
        districtService.getMany(),
        communeService.getMany(),
      ]);

      setProvinceOptions(mapOptions(provinceData, ['name'], 'id'));
      setDistrictOptions(mapOptions(districtData, ['name'], 'id'));
      setCommuneOptions(mapOptions(communeData, ['name'], 'id'));
      originalDistrictDataRef.current = districtData;
      originalCommuneDataRef.current = communeData;
    };

    fetchOptionData();
  }, []);

  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.back();
    });
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, props.setReqData);
  };
  

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == '') {
      setDistrictOptions(mapOptions(originalDistrictDataRef.current, ['name'], 'id'));
      setCommuneOptions(mapOptions(originalCommuneDataRef.current, ['name'], 'id'));
    } else {
      const districts = originalDistrictDataRef.current.filter(
        district => district.province === e.target.value
      );
      setDistrictOptions(mapOptions(districts, ['name'], 'id'));

      const communesArray = districts.map(district => originalCommuneDataRef.current.filter(
        commune => commune.district === district.id
      ));
      setCommuneOptions(mapOptions(communesArray.flat(), ['name'], 'id'));
    }
  };
  
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == '') {
      setCommuneOptions(mapOptions(originalCommuneDataRef.current, ['name'], 'id'));
    } else {
      const communes = originalCommuneDataRef.current.filter(
        commune => commune.district === e.target.value
      );
      setCommuneOptions(mapOptions(communes, ['name'], 'id'));
    }
  };

  const handleCommuneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.setReqData({ ...props.reqData, commune: e.target.value });
  }

  const handleFurtherDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setReqData({ ...props.reqData, further_description: e.target.value });
  }
  
  const validators: Validators<RentalRoomType> = {
    name: () => {
      if (!props.reqData.name) {
        return RentalRoomMessage.NAME_REQUIRED;
      } 
      return null;
    },
    
    commune: () => {
      if (!props.reqData.commune) {
        return RentalRoomMessage.COMMUNE_REQUIRED;
      } 
      return null;
    },
    
    additional_address: () => {
      if (!props.reqData.additional_address) {
        return RentalRoomMessage.ADDITIONAL_ADDRESS_REQUIRED;
      } 
      return null;
    },
    
    max_occupancy_per_room: () => {
      if (!props.reqData.max_occupancy_per_room) {
        return RentalRoomMessage.MAX_OCCUPANCY_PER_ROOM_REQUIRED;
      } 
      return null;
    },
    
    total_number: () => {
      if (!props.reqData.total_number) {
        return RentalRoomMessage.TOTAL_NUMBER_REQUIRED;
      } 
      return null;
    },
    
    empty_number: () => {
      if (!props.reqData.empty_number) {
        return RentalRoomMessage.EMPTY_NUMBER_REQUIRED;
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
          <Label htmlFor='name' required>Tên phòng: </Label>
          <Input 
            id='name'
            name='name'
            type='text'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.name}
            onChange={handleInputOnChange}
            validate={validators.name}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='province'>Tỉnh: </Label>
          <Select 
            id='province'
            className='w-[300px] ml-[-360px]'
            options={provinceOptions}
            onChange={handleProvinceChange}
          />
        </div>
        
        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='district'>Huyện: </Label>
          <Select 
            id='district'
            className='w-[300px] ml-[-360px]'
            options={districtOptions}
            onChange={handleDistrictChange}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='district' required>Xã: </Label>
          <Select 
            id='district'
            value={props.reqData.commune}
            className='w-[300px] ml-[-360px]'
            options={communeOptions}
            onChange={handleCommuneChange}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='additional-address' required>Địa chỉ cụ thể: </Label>
          <Input 
            id='additional-address'
            name='additional_address'
            type='text'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.additional_address}
            onChange={handleInputOnChange}
            validate={validators.additional_address}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='closing-time'>Giờ đóng cửa: </Label>
          <Input 
            id='closing-time'
            name='closing_time'
            type='time'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.closing_time}
            onChange={handleInputOnChange}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='max-occupancy-per-room' required>Số người tối đa/phòng: </Label>
          <Input 
            id='max-occupancy-per-room'
            name='max_occupancy_per_room'
            type='text'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.max_occupancy_per_room}
            onChange={handleInputOnChange}
            validate={validators.max_occupancy_per_room}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='total-number' required>Tổng số phòng: </Label>
          <Input 
            id='total-number'
            name='total_number'
            type='text'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.total_number}
            onChange={handleInputOnChange}
            validate={validators.total_number}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='empty-number' required>Số phòng trống: </Label>
          <Input 
            id='empty-number'
            name='empty_number'
            type='text'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.empty_number}
            onChange={handleInputOnChange}
            validate={validators.empty_number}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='further-description'>Mô tả: </Label>
          <TextArea 
            id='further-description'
            className='w-[300px] ml-[-360px]'
            rows={5}
            value={props.reqData.further_description}
            onChange={handleFurtherDescriptionChange}
          />
        </div>
      </DataForm>
    </>
  );
};
