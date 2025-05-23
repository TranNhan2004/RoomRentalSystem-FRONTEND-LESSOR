'use client';

import React, { useEffect, useRef, useState } from 'react';
import { handleDeleteAlert, handleGeneralAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { DisplayedDataType, Table } from '@/components/partial/data/Table';
import { useRouter } from 'next/navigation';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { FilterModal } from '@/components/partial/data/FilterModal';
import { Label } from '@/components/partial/form/Label';
import { ChargesQueryType, ChargesType } from '@/types/RentalRoom.type';
import { INITIAL_CHARGES_QUERY } from '@/initials/RentalRoom.initial';
import { chargesService } from '@/services/RentalRoom.service';
import { ChargesMessage } from '@/messages/RentalRoom.message';
import { DataLine } from '@/components/partial/data/DataLine';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { Input } from '@/components/partial/form/Input';
import { Validators } from '@/types/Validators.type';
import { formatCurrency, formatDate } from '@/lib/client/format';

                          
type ChargesListProps = {
  roomId: string;
}

export const ChargesList = (props: ChargesListProps) => {
  const router = useRouter();
  
  const [data, setData] = useState<ChargesType[]>([]);
  const [query, setQuery] = useState<ChargesQueryType>(INITIAL_CHARGES_QUERY);
  const [loading, setLoading] = useState(true);
  
  const originalDataRef = useRef<ChargesType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await chargesService.getMany({ rental_room: props.roomId });
        
        setData(data);
        originalDataRef.current = data;
    
      } catch {
        await toastError(ChargesMessage.GET_MANY_ERROR);
    
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.roomId]);

  const generateDataForTable = (): DisplayedDataType[] => {
    return data.map((item) => ({
      id: `${item.id}`,
      basicInfo: (
        <>
          <DataLine label='Giá phòng' value={formatCurrency(item.room_charge)} />
          <DataLine label='Ngày bắt đầu áp dụng' value={formatDate(item.start_date, 'dmy')} />
          <DataLine 
            label='Ngày kết thúc áp dụng' 
            value={item.end_date ? formatDate(item.end_date, 'dmy') : 'Chưa xác định'} 
          />
        </>
      ),
    }));
  };

  const handleDeleteError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    await toastError(ChargesMessage.DELETE_ERROR);
  };

  const deleteFunction = async (id: string) => {
    await handleDeleteAlert(async () => {
      try {
        await chargesService.delete(id);
        await toastSuccess(ChargesMessage.DELETE_SUCCESS);
        originalDataRef.current = originalDataRef.current.filter(item => item.id !== id);
        setData(originalDataRef.current); 
      
      } catch (error) {
        await handleDeleteError(error);
      }
    });
  };

  const deleteDisabledFunction = (id: string) => {
    return !data.find(item => item.id === id)?.end_date;
  };
  
  const stopApplyFunction = async (id: string) => {
    const confirmedMethod = async () => {
      try {
        const today = new Date(); 
        await chargesService.patch(id, { end_date: today });
        await toastSuccess(ChargesMessage.STOP_APPLY_SUCCESS);
      
        const data = originalDataRef.current.find(data => data.id === id);
        if (data && !data.end_date) {  
          data.end_date = today;
          setData([...originalDataRef.current]);  
        }
      
      } catch {
        await toastError(ChargesMessage.STOP_APPLY_ERROR);
      }
    };

    await handleGeneralAlert(ChargesMessage.STOP_APPLY_WARNING, confirmedMethod);
  };

  const stopApplyDisabledFunction = (id: string) => {
    const item = data.find(item => item.id === id);
    return !!item?.end_date || new Date(formatDate(item?.start_date, 'ymd')) >= new Date();
  };

  const detailsFunction = (id: string) => {
    router.push(`${props.roomId}/charges/${id}`);
  };

  const addOnClick = () => {
    router.push(`${props.roomId}/charges/add`);
  };

  const filterOnClick = async () => {
    try {
      setLoading(true);
      const data = await chargesService.getMany({ 
        rental_room: props.roomId,
        from_date: formatDate(query.from_date as Date, 'ymd'),
        to_date: formatDate(query.to_date as Date, 'ymd'),
      });

      originalDataRef.current = data;
      setData(data);
      
    } catch {
      await toastError(ChargesMessage.GET_MANY_ERROR);
    
    } finally {
      setLoading(false);
    }
  };

  const refreshOnClick = () => {
    setQuery(INITIAL_CHARGES_QUERY);
  };

  const dateValidators: Validators<ChargesQueryType> = {
    to_date: () => {
      if (query.from_date && query.to_date && query.to_date < query.from_date) {
        return ChargesMessage.END_DATE_INVALID;
      } 
      return null;
    }
  };

  const handleQueryInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setQuery);
  };

  return (
    <div>
      <Title>Danh sách các mức giá</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo giá phòng'
            options={['room_charge']}
            originalData={originalDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Giá phòng tăng dần', value: 'asc-room_charge' },
              { label: 'Giá phòng giảm dần', value: 'desc-room_charge' },
              { label: 'Mới nhất', value: 'desc-start_date' },
              { label: 'Cũ nhất', value: 'asc-start_date' },
            ]}
            originalData={originalDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[10px]'>
          <FilterModal 
            filterOnClick={filterOnClick}
            refreshOnClick={refreshOnClick}
          >
            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='from-date-query'>Từ ngày: </Label>
              <Input
                id='from-date-query'
                name='from_date'
                type='date'
                value={formatDate(query.from_date as Date, 'ymd')}
                className='ml-[-200px] w-[300px]'
                onChange={handleQueryInputOnChange}
              />
            </div>  

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='to-date-query'>Đến ngày: </Label>
              <Input
                id='to-date-query'
                name='to_date'
                type='date'
                value={formatDate(query.to_date as Date, 'ymd')}
                className='ml-[-200px] w-[300px]'
                onChange={handleQueryInputOnChange}
                validate={dateValidators.to_date}
              />
            </div>    
          </FilterModal>
        </div>

        <div className='ml-auto'>
          <ActionButton mode='add' onClick={addOnClick}>Thêm mới</ActionButton>
        </div>
      </div>
      
      <Table 
        data={generateDataForTable()}
        loading={loading}
        actions={[
          {
            rowName: 'Chi tiết',
            function: detailsFunction,
            buttonConfig: { mode: 'details' }
          }, 
          {
            rowName: 'Dừng áp dụng',
            function: stopApplyFunction,
            buttonConfig: { mode: 'deactive' },
            disabledFunction: stopApplyDisabledFunction,
          },
          {
            rowName: 'Xóa', 
            function: deleteFunction,
            buttonConfig: { mode: 'delete' },
            disabledFunction: deleteDisabledFunction,
          }
        ]}
        note='Lưu ý: Chỉ có thể dừng áp dụng sau ngày bắt đầu 1 ngày.'
      />
      
    </div>
  );
};