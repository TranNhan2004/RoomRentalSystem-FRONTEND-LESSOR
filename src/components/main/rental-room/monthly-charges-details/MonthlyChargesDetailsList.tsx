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
import { MonthlyChargesDetailsQueryType, MonthlyChargesDetailsType } from '@/types/RentalRoom.type';
import { INITIAL_MONTHLY_CHARGES_DETAILS_QUERY } from '@/initials/RentalRoom.initial';
import { monthlyChargesDetailsService } from '@/services/RentalRoom.service';
import { MonthlyChargesDetailsMessage } from '@/messages/RentalRoom.message';
import { DataLine } from '@/components/partial/data/DataLine';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { Input } from '@/components/partial/form/Input';
import { Validators } from '@/types/Validators.type';
import { formatCurrency, formatDate } from '@/lib/client/format';
import { Select } from '@/components/partial/form/Select';

                          
type MonthlyChargesDetailsListProps = {
  roomCodeId: string;
}

export const MonthlyChargesDetailsList = (props: MonthlyChargesDetailsListProps) => {
  const router = useRouter();
  
  const [data, setData] = useState<MonthlyChargesDetailsType[]>([]);
  const [query, setQuery] = useState<MonthlyChargesDetailsQueryType>(INITIAL_MONTHLY_CHARGES_DETAILS_QUERY);
  const [loading, setLoading] = useState(true);
  
  const originialDataRef = useRef<MonthlyChargesDetailsType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await monthlyChargesDetailsService.getMany({ room_code: props.roomCodeId });
        originialDataRef.current = data;
        setData([...originialDataRef.current]);

      } catch {
        await toastError(MonthlyChargesDetailsMessage.GET_MANY_ERROR);
    
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.roomCodeId]);

  const generateDataForTable = (): DisplayedDataType[] => {
    return data.map((item) => ({
      id: `${item.id}`,
      basicInfo: (
        <>
          <DataLine label='Số tiền phải trả' value={formatCurrency(item.due_charge ?? -1)} />
          <DataLine label='Số tiền đã trả' value={formatCurrency(item.paid_charge ?? -1)} />
          <DataLine label='Ngày tạo' value={formatDate(item.created_at, 'dmy')} />
          <DataLine 
            label='Trạng thái' 
            value={item.is_settled ? 'Đã kết toán' : 'Chưa kết toán'} 
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

    await toastError(MonthlyChargesDetailsMessage.DELETE_ERROR);
  };

  const deleteFunction = async (id: string) => {
    await handleDeleteAlert(async () => {
      try {
        await monthlyChargesDetailsService.delete(id);
        await toastSuccess(MonthlyChargesDetailsMessage.DELETE_SUCCESS);
        originialDataRef.current = originialDataRef.current.filter(item => item.id !== id);
        setData(originialDataRef.current); 
      
      } catch (error) {
        await handleDeleteError(error);
      }
    });
  };

  const deleteDisabledFunction = (id: string) => {
    return !data.find(item => item.id === id)?.is_settled;
  };
  
  const settleFunction = async (id: string) => {
    const confirmedMethod = async () => {
      try {
        await monthlyChargesDetailsService.patch(id, { is_settled: true });
        await toastSuccess(MonthlyChargesDetailsMessage.SETTLE_SUCCESS);
      
        const data = originialDataRef.current.find(data => data.id === id);
        if (data && !data.is_settled) {  
          data.is_settled = true;
          setData([...originialDataRef.current]);  
        }
      
      } catch {
        await toastError(MonthlyChargesDetailsMessage.SETTLE_ERROR);
      }
    };

    await handleGeneralAlert(MonthlyChargesDetailsMessage.SETTLE_WARNING, confirmedMethod);
  };

  const settleDisabledFunction = (id: string) => {
    const item = data.find(item => item.id === id);
    return item?.is_settled || item?.paid_charge === undefined;
  };

  const detailsFunction = (id: string) => {
    router.push(`${props.roomCodeId}/monthly-charges-details/${id}`);
  };

  const editFunction = (id: string) => {
    router.push(`${props.roomCodeId}/monthly-charges-details/${id}/edit`);
  };

  const editDisabledFunction = (id: string) => {
    return data.find(item => item.id === id)?.is_settled;
  };

  const addOnClick = () => {
    router.push(`${props.roomCodeId}/monthly-charges-details/add`);
  };

  const filterOnClick = async () => {
    try {
      setLoading(true);
      const data = await monthlyChargesDetailsService.getMany({
        ...query, 
        room_code: props.roomCodeId,
        from_created_date: formatDate(query.from_created_date as Date, 'ymd'),
        to_created_date: formatDate(query.to_created_date as Date, 'ymd'),
      });

      originialDataRef.current = data;
      setData(data);
      
    } catch {
      await toastError(MonthlyChargesDetailsMessage.GET_MANY_ERROR);
    
    } finally {
      setLoading(false);
    }
  };

  const refreshOnClick = () => {
    setQuery(INITIAL_MONTHLY_CHARGES_DETAILS_QUERY);
  };

  const dateValidators: Validators<MonthlyChargesDetailsQueryType> = {
    to_created_date: () => {
      if (query.from_created_date && query.to_created_date && query.to_created_date < query.from_created_date) {
        return MonthlyChargesDetailsMessage.END_DATE_INVALID;
      } 
      return null;
    }
  };

  const handleQueryInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setQuery);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'true') {
      setQuery({...query, is_settled: true });
    
    } else if (value === 'false') {
      setQuery({...query, is_settled: false });
    
    } else {
      setQuery({...query, is_settled: undefined });
    }
  };

  return (
    <div>
      <Title>Danh sách các hóa đơn hằng tháng</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo số tiền phải trả, đã trả'
            options={['due_charge', 'paid_charge']}
            originalData={originialDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Mới nhất', value: 'desc-created_at' },
              { label: 'Cũ nhất', value: 'asc-created_at' },
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
              <Label htmlFor='from-created-date-query'>Từ ngày: </Label>
              <Input
                id='from-created-date-query'
                name='from_created_date'
                type='date'
                value={formatDate(query.from_created_date as Date, 'ymd')}
                className='ml-[-200px] w-[300px]'
                onChange={handleQueryInputOnChange}
              />
            </div>  

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='to-created-date-query'>Đến ngày: </Label>
              <Input
                id='to-created-date-query'
                name='to_created_date'
                type='date'
                value={formatDate(query.to_created_date as Date, 'ymd')}
                className='ml-[-200px] w-[300px]'
                onChange={handleQueryInputOnChange}
                validate={dateValidators.to_created_date}
              />
            </div>  

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='status-query'>Trạng thái: </Label>
              <Select
                id='status-query'
                value={query.is_settled === undefined ?
                  '' : query.is_settled ?
                  'true' : 'false'
                }
                className='ml-[-200px] w-[300px]'
                options={[
                  { label: 'Đã kết toán', value: 'true' },
                  { label: 'Chưa kết toán', value: 'false' },
                ]}
                onChange={handleStatusChange}
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
            buttonConfig: { mode: 'details' },
          },
          {
            rowName: 'Sửa', 
            function: editFunction,
            buttonConfig: { mode: 'edit' },
            disabledFunction: editDisabledFunction,
          },
          {
            rowName: 'Hoàn thành kết toán',
            function: settleFunction,
            buttonConfig: { mode: 'active' },
            disabledFunction: settleDisabledFunction,
          },
          {
            rowName: 'Xóa', 
            function: deleteFunction,
            buttonConfig: { mode: 'delete' },
            disabledFunction: deleteDisabledFunction,
          }
        ]}
      />
      
    </div>
  );
};