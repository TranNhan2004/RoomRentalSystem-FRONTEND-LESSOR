'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { RentalRoomType, RentalRoomImageType, ChargesListType } from '@/types/RentalRoom.type';
import { currencyFormat } from '@/lib/client/currencyFormat';
import { RatingStar } from '@/components/partial/data/RatingStar';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { getImageSrc } from '@/lib/client/getImageSrc';

type RentalRoomCardProps = {
  id: RentalRoomType['id'];
  name: RentalRoomType['name'];
  manager: RentalRoomType['manager'];
  averageRating: RentalRoomType['average_rating'];
  image?: RentalRoomImageType['image'];
  roomCharge?: ChargesListType['room_charge'];
  detailsFunction?: (id: string) => void;
  deleteFunction?: (id: string) => void;
};

export const RentalRoomCard = (props: RentalRoomCardProps) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden w-50 bg-gray-50">
      <div className="h-48">
        <Image
          src={props.image as string ?? getImageSrc('not-found.png')}
          alt={`Image of ${props.name}`}
          width={300}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{props.name}</h2>

        <div className="text-lg font-semibold text-gray-800 mb-3">
          {currencyFormat(props.roomCharge ?? -1)}
        </div>

        <div className="flex items-center mb-1">
          <RatingStar value={props.averageRating ?? 0} />
          <span className="ml-2 text-gray-600 text-sm">
            {`${props.averageRating}/5`}
          </span>
        </div>

        <div className="flex items-center mb-2">
          { 
            props.manager ?                
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" /> : 
              <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
          }
          <span className="text-gray-600">
            {props.manager ? 'Đã được duyệt' : 'Chưa được duyệt'}
          </span>
        </div>

        <div className='flex items-center space-x-2 justify-end'>
          <ActionButton 
            mode='details' 
            onClick={() => props.detailsFunction?.(props.id ?? '')}
          >
            Chi tiết
          </ActionButton>
          
          <ActionButton 
            mode='delete' 
            onClick={() => props.deleteFunction?.(props.id ?? '')}
          >
            Xóa
          </ActionButton>
        </div>
      </div>
    </div>
  );
};
