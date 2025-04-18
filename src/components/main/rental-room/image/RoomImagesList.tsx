'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { RoomImageType } from '@/types/RentalRoom.type';
import { roomImageService } from '@/services/RentalRoom.service';
import { handleDeleteAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { RoomImageMessage } from '@/messages/RentalRoom.message';
import { INITIAL_ROOM_IMAGE } from '@/initials/RentalRoom.initial';

type RoomImagesListProps = {
  roomId: string;
}

export const RoomImagesList = (props: RoomImagesListProps) => {
  const [data, setData] = useState<RoomImageType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbnailOffset, setThumbnailOffset] = useState(0); 
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [uploadedImage, setUploadedImage] = useState<RoomImageType>(INITIAL_ROOM_IMAGE);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await roomImageService.getMany({ rental_room: props.roomId });
        setData(data);
      } catch {
        await toastError(RoomImageMessage.GET_MANY_ERROR);
      }
    };

    fetchData();
  }, [props.roomId]);

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      if (currentIndex - 1 < thumbnailOffset) {
        setThumbnailOffset((prevOffset) => prevOffset - 1);
      }
    }
  };

  const nextImage = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      if (currentIndex + 1 >= thumbnailOffset + 3) {
        setThumbnailOffset((prevOffset) => prevOffset + 1);
      }
    }
  };

  const deleteOnClick = async () => {
    await handleDeleteAlert(async () => {
      try {
        setIsSubmitted(true);
        await roomImageService.delete(data[currentIndex].id ?? '');
        await toastSuccess(RoomImageMessage.DELETE_SUCCESS);
  
        const newImages = data.filter((_, index) => index !== currentIndex);
        setData(newImages);
        if (currentIndex >= newImages.length) {
          setCurrentIndex(newImages.length - 1);
        }
      
        if (thumbnailOffset >= newImages.length - 2) {
          setThumbnailOffset(Math.max(0, newImages.length - 3));
        }
    
      } catch {
        await toastError(RoomImageMessage.DELETE_ERROR);
      
      } finally {
        setIsSubmitted(false);
      }
    });
  };

  const handleUploadOnClick = () => {
    fileInputRef.current?.click();
  };

  const uploadImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setUploadedImage({ ...uploadedImage, image: file });
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    if (index < thumbnailOffset) {
      setThumbnailOffset(index);
    } else if (index >= thumbnailOffset + 3) {
      setThumbnailOffset(index - 2);
    }
  };

  const confirmOnClick = async () => {
    try {
      setUploadedImage(INITIAL_ROOM_IMAGE);
      setIsSubmitted(true);
      const image = await roomImageService.post({ 
        ...uploadedImage, 
        rental_room: props.roomId 
      });
      await toastSuccess(RoomImageMessage.POST_SUCCESS);
      setData((prevData) => {
        const newData = [...prevData, image];
        setCurrentIndex(newData.length - 1); 
        return newData;
      });
    
    } catch {
      await toastError(RoomImageMessage.POST_ERROR);

    } finally {
      setIsSubmitted(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
    
  };

  const cancelOnClick = () => {
    setUploadedImage(INITIAL_ROOM_IMAGE);
    setIsSubmitted(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className='max-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg'>
        {
          data.length > 0 ? (
            <div className='relative'>
              <div className='flex justify-center items-center rounded-lg overflow-hidden'>
                <div className='w-64 h-96'>
                  <Image
                    src={data[currentIndex].image as string}
                    alt='Image Carousel'
                    width={640}
                    height={900}
                    className="object-cover w-full h-full rounded-sm"
                    unoptimized
                  />
                </div>
              </div>

              <div className='flex justify-center items-center mt-4 space-x-2'>
                <button onClick={prevImage} className='text-gray-600 p-2' disabled={currentIndex === 0}>
                  <ChevronLeftIcon className='h-6 w-6' />
                </button>
                {
                  data
                    .slice(thumbnailOffset, thumbnailOffset + 3)
                    .map((item, index) => {
                      const globalIndex = thumbnailOffset + index;
                      return (
                        <div
                          key={globalIndex}
                          className={`relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden cursor-pointer ${
                            currentIndex === globalIndex ? 'border-2 border-blue-500' : ''
                          }`}
                          onClick={() => handleThumbnailClick(globalIndex)}
                        >
                          <Image
                            src={item.image as string}
                            alt={`Thumbnail ${globalIndex + 1}`}
                            className='w-full h-full object-cover'
                            width={80}
                            height={80}
                            unoptimized
                          />
                        </div>
                      );
                    })
                }
                <button onClick={nextImage} className='text-gray-600 p-2' disabled={currentIndex === data.length - 1}>
                  <ChevronRightIcon className='h-6 w-6' />
                </button>
              </div>
            </div>
          ) : (
            <p className='text-center text-gray-600'>Chưa có ảnh nào được tải lên</p>
          )
        }
      </div>

      <div className='flex justify-between mt-4'>
        <ActionButton mode='delete' onClick={deleteOnClick} disabled={data.length === 0 || isSubmitted}>
          Xóa ảnh này
        </ActionButton>
        <ActionButton mode='upload' onClick={handleUploadOnClick} disabled={isSubmitted}>
          Tải lên ảnh mới
          <input 
            type='file'
            ref={fileInputRef}
            accept='.jpg, .jpeg, .png'
            className='hidden'
            onChange={uploadImageChange}
            multiple={false}
          />
        </ActionButton>
      </div>

      {
        uploadedImage.image && (
          <div className='mt-4'>
            <div>
              <h3 className='text-xl font-bold mb-2'>Ảnh được tải lên:</h3>
              <div className='mb-4'>
                <Image
                  src={URL.createObjectURL(uploadedImage.image as File)}
                  alt='Uploaded image'
                  width={150}
                  height={150}
                  className='object-cover rounded-lg'
                  unoptimized
                />
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <ActionButton mode='save' color='green' onClick={confirmOnClick}>
                Xác nhận
              </ActionButton>
              <ActionButton mode='cancel' onClick={cancelOnClick}>
                Hủy bỏ
              </ActionButton>
            </div>
          </div>
        )
      }
    </>
  );
};