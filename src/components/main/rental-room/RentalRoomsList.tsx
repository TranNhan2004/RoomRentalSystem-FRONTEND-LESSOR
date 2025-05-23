'use client';

import React, { useEffect, useRef, useState } from 'react';
import { handleDeleteAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { useRouter } from 'next/navigation';
import { Title } from '@/components/partial/data/Title';
import { InputSearch } from '@/components/partial/data/InputSearch';
import { Sorting } from '@/components/partial/data/Sorting';
import { FilterModal } from '@/components/partial/data/FilterModal';
import { Label } from '@/components/partial/form/Label';
import { OptionType, Select } from '@/components/partial/form/Select';
import { getMyInfo } from '@/lib/client/authToken';
import { RentalRoomQueryType, RentalRoomType } from '@/types/RentalRoom.type';
import { INITIAL_RENTAL_ROOM_QUERY } from '@/initials/RentalRoom.initial';
import { rentalRoomService } from '@/services/RentalRoom.service';
import { RentalRoomMessage } from '@/messages/RentalRoom.message';
import { communeService, districtService, provinceService } from '@/services/Address.service';
import { mapOptions } from '@/lib/client/handleOptions';
import { CommuneType, DistrictType } from '@/types/Address.type';
import { Loading } from '@/components/partial/data/Loading';
import { RentalRoomCard } from './RentalRoomCard';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { PaginationNav } from '@/components/partial/data/PaginationNav';


export const RentalRoomsList = () => {
  const router = useRouter();
  const originalDataRef = useRef<RentalRoomType[]>([]);
  const myIdRef = useRef<string | undefined>(undefined);
  const [data, setData] = useState<RentalRoomType[]>([]);
  const [displayedData, setDisplayedData] = useState<RentalRoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState<RentalRoomQueryType>(INITIAL_RENTAL_ROOM_QUERY); 
  const [provinceOptions, setProvinceOptions] = useState<OptionType[]>([]);
  const [districtOptions, setDistrictOptions] = useState<OptionType[]>([]);
  const [communeOptions, setCommuneOptions] = useState<OptionType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const originalDistrictDataRef = useRef<DistrictType[]>([]);
  const originalCommuneDataRef = useRef<CommuneType[]>([]);
  
  const cardsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        myIdRef.current = (await getMyInfo()).id;

        const [data, provinceData, districtData, communeData] = await Promise.all([
          rentalRoomService.getMany({ lessor: myIdRef.current }),
          provinceService.getMany(),
          districtService.getMany(),
          communeService.getMany(),
        ]);

        originalDataRef.current = [...data];
              
        setData([...originalDataRef.current]);
        setProvinceOptions(mapOptions(provinceData, ['name'], 'id'));
        setDistrictOptions(mapOptions(districtData, ['name'], 'id'));
        setCommuneOptions(mapOptions(communeData, ['name'], 'id'));

        originalDistrictDataRef.current = districtData;
        originalCommuneDataRef.current = communeData;
        
      } catch {
        await toastError(RentalRoomMessage.GET_MANY_ERROR);
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setDisplayedData([...data.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)]);
  }, [data, currentPage]);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    if (
      error.response?.status === 500 && 
      error.response.data?.includes(GeneralMessage.BACKEND_PROTECTED_ERROR_PREFIX)
    ) {
      await toastError(RentalRoomMessage.DELETE_PROTECTED_ERROR);
      return;
    }
    
    await toastError(RentalRoomMessage.DELETE_ERROR);
  };

  const deleteFunction = async (id: string) => {
    await handleDeleteAlert(async () => {
      try {
        await rentalRoomService.delete(id);
        await toastSuccess(RentalRoomMessage.DELETE_SUCCESS);
        originalDataRef.current = originalDataRef.current.filter((item) => item.id !== id);
        setData(originalDataRef.current); 
      
      } catch (error) {
        await handleDeleteError(error);
      }
    });
  };

  const detailsFunction = (id: string) => {
    router.push(`rental-rooms/${id}`);
  };

  const addOnClick = () => {
    router.push(`rental-rooms/add`);
  };

  const filterOnClick = async () => {
    try {
      setLoading(true);
      if (query._province !== '' && query._district === '' && query.commune === '') {
        const districts = await districtService.getMany({ province: query._province });
        
        const communesArray = await Promise.all(districts.map(
          district => communeService.getMany({ district: district.id })
        ));
        const communes = communesArray.flat();
        
        const dataArray = await Promise.all(communes.map(
          commune => rentalRoomService.getMany({ 
            ...query, 
            commune: commune.id,
            lessor: myIdRef.current  
          })
        ));

        const data = dataArray.flat();
        originalDataRef.current = [...data];
        setData([...originalDataRef.current]);

      } else if (query._district !== '' && query.commune === '') {
        const communes = await communeService.getMany({ district: query._district });
        const dataArray = await Promise.all(communes.map(
          commune => rentalRoomService.getMany({ 
            ...query, 
            commune: commune.id, 
            lessor: myIdRef.current 
          })
        ));
        const data = dataArray.flat();
        originalDataRef.current = [...data];
        setData([...originalDataRef.current]);

      } else {
        const data = await rentalRoomService.getMany({
          ...query,
          lessor: myIdRef.current 
        });
        originalDataRef.current = [...data];
        setData([...originalDataRef.current]);
      }
      
    } catch {
      await toastError(RentalRoomMessage.GET_MANY_ERROR);

    } finally {
      setLoading(false);
    }
  };

  const refreshOnClick = () => {
    setQuery(INITIAL_RENTAL_ROOM_QUERY);
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({ ...query, _province: e.target.value });
    if (e.target.value === '') {
      setDistrictOptions(mapOptions(originalDistrictDataRef.current, ['name'], 'id'));
    } else {
      const districts = originalDistrictDataRef.current.filter(district => district.province === e.target.value);
      setDistrictOptions(mapOptions(districts, ['name'], 'id'));
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({ ...query, _district: e.target.value });
    if (e.target.value === '') {
      setCommuneOptions(mapOptions(originalCommuneDataRef.current, ['name'], 'id'));
    } else {
      const communes = originalCommuneDataRef.current.filter(commune => commune.district === e.target.value);
      setCommuneOptions(mapOptions(communes, ['name'], 'id'));
    }
  };

  const handleCommuneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({ ...query, commune: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'pending') {
      setQuery({ ...query, manager_is_null: true });
    
    } else if (value === 'approved') {
      setQuery({ ...query, manager_is_null: false });
    
    } else {
      setQuery({...query, manager_is_null: undefined });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Title>Danh sách phòng trọ</Title>
      <div className='flex items-center'>
        <div className='w-[40%]'>
          <InputSearch 
            placeholder='Tìm kiếm theo tên phòng trọ'
            options={['name']}
            originalData={originalDataRef.current}
            data={data}
            setData={setData}
          />
        </div>

        <div className='ml-[30px]'>
          <Sorting
            options={[
              { label: 'Tên phòng trọ (A-Z)', value: 'asc-name' },
              { label: 'Tên phòng trọ (Z-A)', value: 'desc-name' },
              { label: 'Mới nhất', value: 'desc-created_at' },
              { label: 'Cũ nhất', value: 'asc-created_at' },
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
              <Label htmlFor='province-query'>Tỉnh/Thành phố: </Label>
              <Select
                id='province-query'
                value={query._province}
                className='ml-[-200px] w-[300px]'
                options={provinceOptions}
                onChange={handleProvinceChange}
              />
            </div>    

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='district-query'>Huyện/Quận/Thị xã: </Label>
              <Select
                id='district-query'
                value={query._district}
                className='ml-[-200px] w-[300px]'
                options={districtOptions}
                onChange={handleDistrictChange}
              />
            </div> 

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='commune-query'>Xã/Phường/Thị trấn: </Label>
              <Select
                id='commune-query'
                value={query.commune}
                className='ml-[-200px] w-[300px]'
                options={communeOptions}
                onChange={handleCommuneChange}
              />
            </div> 

            <div className='grid grid-cols-2 items-center mt-1 mb-1'>
              <Label htmlFor='status-query'>Trạng thái: </Label>
              <Select
                id='status-query'
                className='ml-[-200px] w-[300px]'
                value={
                  query.manager_is_null === true ? 'pending' : 
                  query.manager_is_null === false ? 'approved' : ''
                }
                options={[
                  { label: 'Đã được duyệt', value: 'approved' },
                  { label: 'Chưa được duyệt', value: 'pending' },
                ]}
                onChange={handleStatusChange}
              />
            </div>  
          </FilterModal>
        </div>

        <div className='flex ml-auto'>
          <ActionButton mode='add' onClick={addOnClick}>Thêm mới</ActionButton>
        </div>
      </div>
      
      <div className='min-h-screen flex flex-col'>
        <div className='flex-grow mt-12'>
          <div className='grid grid-cols-4 gap-4'>
            {
              displayedData.length === 0 
                ? 'Không có dữ liệu' 
                : displayedData.map((item) => (
                  <RentalRoomCard
                    key={item.id}
                    item={item}
                    detailsFunction={detailsFunction}
                    deleteFunction={deleteFunction}
                  />
                )) 
            }
          </div>
        </div>
        <div className='flex justify-end text-sm italic text-gray-500 mr-5 mt-5'>
          <p>Tổng cộng {data.length} phòng trọ</p>
        </div>
        <PaginationNav 
          totalPages={Math.ceil(data.length / cardsPerPage)}
          currentPage={currentPage}
          onPageChange={onPageChange}
          step={6}
        />
      </div>
    </div>
  );
};