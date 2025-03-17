'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { MonitoringRentalQueryType, MonitoringRentalType } from '@/types/RentalRoom.type';
import { INITIAL_MONITORING_RENTAL_QUERY } from '@/initials/RentalRoom.initial';
import { monitoringRentalService } from '@/services/RentalRoom.service';
import { MonitoringRentalMessage } from '@/messages/RentalRoom.message';
import { DataLine } from '@/components/partial/data/DataLine';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { Input } from '@/components/partial/form/Input';
import { Validators } from '@/types/Validators.type';
import { formatDate } from '@/lib/client/format';
import { userService } from '@/services/UserAccount.service';

                          
type MonitoringRentalsListProps = {
  roomCodeId: string;
}

export const MonitoringRentalsList = (props: MonitoringRentalsListProps) => {
  const router = useRouter();
  
  const [data, setData] = useState<MonitoringRentalType[]>([]);
  const [query, setQuery] = useState<MonitoringRentalQueryType>(INITIAL_MONITORING_RENTAL_QUERY);
  const [loading, setLoading] = useState(true);
  
  const originialDataRef = useRef<MonitoringRentalType[]>([]);

  const fetchRelatedData = useCallback(async (data: MonitoringRentalType[]) => {
    let newData = [...data];
    await Promise.all(
      data.map(async (item) => {
        const renter = await userService.get(item.renter ?? '');
        
        newData = newData.map(thisItem => {
          if (thisItem.id === item.id) {
            return { 
              ...thisItem,
              _rental_first_name: renter.first_name,
              _rental_last_name: renter.last_name,
              _rental_phone_number: renter.phone_number,
            };
          }
          return thisItem;
        });  
      })
    );

    return newData;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await monitoringRentalService.getMany({ room_code: props.roomCodeId });
        originialDataRef.current = await fetchRelatedData(data);
        
        setData([...originialDataRef.current]);

      } catch {
        await toastError(MonitoringRentalMessage.GET_MANY_ERROR);
    
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.roomCodeId, fetchRelatedData]);

  const generateDataForTable = (): DisplayedDataType[] => {
    return data.map((item) => ({
      id: `${item.id}`,
      basicInfo: (
        <>
          <DataLine label='Tên người thuê' value={item._renter_first_name + ' ' + item._renter_last_name} />
          <DataLine label='Số điện thoại' value={item._renter_phone_number} />
          <DataLine label='Ngày bắt đầu thuê' value={formatDate(item.start_date, 'dmy')} />
          <DataLine 
            label='Ngày kết thúc thuê' 
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

    await toastError(MonitoringRentalMessage.DELETE_ERROR);
  };

  const deleteFunction = async (id: string) => {
    await handleDeleteAlert(async () => {
      try {
        await monitoringRentalService.delete(id);
        await toastSuccess(MonitoringRentalMessage.DELETE_SUCCESS);
        originialDataRef.current = originialDataRef.current.filter(item => item.id !== id);
        setData(originialDataRef.current); 
      
      } catch (error) {
        await handleDeleteError(error);
      }
    });
  };

  const deleteDisabledFunction = (id: string) => {
    return !data.find(item => item.id === id)?.end_date;
  };
  
  const stopRentFunction = async (id: string) => {
    const confirmedMethod = async () => {
      try {
        const today = new Date(); 
        await monitoringRentalService.patch(id, { end_date: today });
        await toastSuccess(MonitoringRentalMessage.STOP_RENT_SUCCESS);
      
        const data = originialDataRef.current.find(data => data.id === id);
        if (data && !data.end_date) {  
          data.end_date = today;
          setData([...originialDataRef.current]);  
        }
      
      } catch {
        await toastError(MonitoringRentalMessage.STOP_RENT_ERROR);
      }
    };

    await handleGeneralAlert(MonitoringRentalMessage.STOP_RENT_WARNING, confirmedMethod);
  };

  const stopRentDisabledFunction = (id: string) => {
    const item = data.find(item => item.id === id);
    return !!item?.end_date || formatDate(item?.start_date, 'ymd') >= formatDate(new Date(), 'ymd');
  };

  const addOnClick = () => {
    router.push(`${props.roomCodeId}/monitoring-rentals/add`);
  };

  const filterOnClick = async () => {
    try {
      setLoading(true);
      const data = await monitoringRentalService.getMany({
        ...query, 
        room_code: props.roomCodeId,
        from_date: formatDate(query.from_date as Date, 'ymd'),
        to_date: formatDate(query.to_date as Date, 'ymd'),
      });

      originialDataRef.current = await fetchRelatedData(data);
      setData([...originialDataRef.current]);
      
    } catch {
      await toastError(MonitoringRentalMessage.GET_MANY_ERROR);
    
    } finally {
      setLoading(false);
    }
  };

  const refreshOnClick = () => {
    setQuery(INITIAL_MONITORING_RENTAL_QUERY);
  };

  const dateValidators: Validators<MonitoringRentalQueryType> = {
    to_date: () => {
      if (query.from_date && query.to_date && query.to_date < query.from_date) {
        return MonitoringRentalMessage.END_DATE_INVALID;
      } 
      return null;
    }
  };

  const handleQueryInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setQuery);
  };

  return (
    <div>
      <Title>Danh sách các bản ghi theo dõi cho thuê</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo họ tên, số điện thoại người thuê'
            options={['_renter_first_name', '_renter_last_name', '_renter_phone_number']}
            originalData={originialDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Mới nhất', value: 'desc-start_date' },
              { label: 'Cũ nhất', value: 'asc-start_date' },
            ]}
            originalData={originialDataRef.current}
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
            rowName: 'Dừng thuê',
            function: stopRentFunction,
            buttonConfig: { mode: 'deactive' },
            disabledFunction: stopRentDisabledFunction,
          },
          {
            rowName: 'Xóa', 
            function: deleteFunction,
            buttonConfig: { mode: 'delete' },
            disabledFunction: deleteDisabledFunction,
          }
        ]}
        note='Lưu ý: Chỉ có thể dừng thuê sau ngày bắt đầu 1 ngày.'
      />
      
    </div>
  );
};