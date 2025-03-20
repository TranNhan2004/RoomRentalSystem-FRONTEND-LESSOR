'use client';

import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid'; 
import { StarIcon as StarOutline } from '@heroicons/react/24/outline'; 
import { round } from '@/lib/client/format';

type RatingStarProps = {
  value: number;
};

export const RatingStar = (props: RatingStarProps) => {
  
  return (
    <div className='flex items-center gap-2'>
      {
        Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
        
          const isFullStar = starValue <= Math.floor(props.value);
          const isFractionStar = starValue === Math.ceil(props.value) && !Number.isInteger(props.value);
          const starPercents = Math.floor((round(props.value, 1) - Math.floor(props.value)) * 100);
          
          return (
            <span key={starValue}>
              {
                isFullStar ? (
                  <StarIcon className='h-5 w-5 text-yellow-500' />
                ) : isFractionStar ? (
                  <div className='relative h-5 w-5 text-yellow-500'>
                    <StarIcon
                      className='absolute inset-0 h-5 w-5 text-yellow-500'
                      style={{ clipPath: `inset(0 ${100 - starPercents}% 0 0)` }}
                    />
                    <StarOutline className='absolute inset-0 h-5 w-5 text-yellow-500' />
                  </div>
                ) : (
                  <StarOutline className='h-5 w-5 text-yellow-500' />
                )
              }
            </span>
          );
        })
      }
    </div>
  );
};