'use client';

import React, { useEffect, useRef, useState } from 'react';
import { toastError } from '@/lib/client/alert';
import { DisplayedDataType, Table } from '@/components/partial/data/Table';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { FilterModal } from '@/components/partial/data/FilterModal';
import { Label } from '@/components/partial/form/Label';
import { INITIAL_CHARGES_LIST_QUERY } from '@/initials/RentalRoom.initial';
import { DataLine } from '@/components/partial/data/DataLine';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { Input } from '@/components/partial/form/Input';
import { Validators } from '@/types/Validators.type';
import { formatDate } from '@/lib/client/format';
import { ReviewQueryType, ReviewType } from '@/types/Review.type';
import { INITIAL_REVIEW_QUERY_TYPE } from '@/initials/Review.initial';
import { ReviewMessage } from '@/messages/Review.message';
import { RatingStar } from '@/components/partial/data/RatingStar';
import { Select } from '@/components/partial/form/Select';
import { reviewService } from '@/services/Review.service';

type ReviewsListProps = {
  roomId: string;
}

export const ReviewsList = (props: ReviewsListProps) => {
  const [data, setData] = useState<ReviewType[]>([]);
  const [query, setQuery] = useState<ReviewQueryType>(INITIAL_REVIEW_QUERY_TYPE);
  const [loading, setLoading] = useState(true);
  
  const originialDataRef = useRef<ReviewType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await reviewService.getMany({ rental_room: props.roomId });
        
        setData(data);
        originialDataRef.current = data;
    
      } catch {
        await toastError(ReviewMessage.GET_MANY_ERROR);
    
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
          <DataLine label='Bình luận' value={item.comment} />
          <div className='flex items-center space-x-2'>
            <DataLine label='Đánh giá' value={''} />
            <RatingStar value={item.rating ?? 0} />
          </div>
          <DataLine label='Ngày tạo' value={formatDate(item.created_at, 'dmy')} />
        </>
      ),
    }));
  };

  const filterOnClick = async () => {
    try {
      setLoading(true);
      const data = await reviewService.getMany({ 
        ...query,
        rental_room: props.roomId,
        from_created_date: formatDate(query.from_created_date as Date, 'ymd'),
        to_created_date: formatDate(query.to_created_date as Date, 'ymd'),
      });

      originialDataRef.current = data;
      setData(data);
      
    } catch {
      await toastError(ReviewMessage.GET_MANY_ERROR);
    
    } finally {
      setLoading(false);
    }
  };

  const refreshOnClick = () => {
    setQuery(INITIAL_CHARGES_LIST_QUERY);
  };

  const dateValidators: Validators<ReviewQueryType> = {
    to_created_date: () => {
      if (query.from_created_date && query.to_created_date && query.to_created_date < query.from_created_date) {
        return ReviewMessage.TO_CREATED_DATE_INVALID;
      } 
      return null;
    }
  };

  const handleQueryInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setQuery);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setQuery({ ...query, rating: undefined });
    
    } else {
      setQuery({...query, rating: parseInt(e.target.value) });
    }
  };

  return (
    <div>
      <Title>Danh sách các đánh giá</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo bình luận'
            options={['comment']}
            originalData={originialDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Mới nhất', value: 'desc-created_date' },
              { label: 'Cũ nhất', value: 'asc-created_date' },
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
                value={formatDate(query.from_created_date as Date, 'ymd')}
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
                value={formatDate(query.to_created_date as Date, 'ymd')}
                className='ml-[-200px] w-[300px]'
                onChange={handleQueryInputOnChange}
                validate={dateValidators.to_created_date}
              />
            </div>

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='rating-query'>Đánh giá: </Label>
              <Select
                id='rating-query'
                value={query.rating?.toString()}
                className='ml-[-200px] w-[300px]'
                options={[
                  { label: '1 Sao', value: '1' }, 
                  { label: '2 Sao', value: '2' }, 
                  { label: '3 Sao', value: '3' }, 
                  { label: '4 Sao', value: '4' }, 
                  { label: '5 Sao', value: '5' }, 
                ]}
                onChange={handleRatingChange}
              />
            
            </div>    
          </FilterModal>
        </div>
      </div>
      
      <Table 
        data={generateDataForTable()}
        loading={loading}
        actions={[]}
      />
      
    </div>
  );
};