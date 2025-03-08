'use client';

import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid'; // Icon đầy sao
import { StarIcon as StarOutline } from '@heroicons/react/24/outline'; // Icon rỗng sao

type RatingStarProps = {
  value: number;
}

export const RatingStar = (props: RatingStarProps) => {
  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      {
        Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;

          const isFullStar = starValue <= Math.floor(props.value);
          const isHalfStar = starValue === Math.ceil(props.value) && !Number.isInteger(props.value);

          return (
            <span key={starValue}>
              {
                isFullStar ? (
                  <StarIcon className="h-6 w-6 text-yellow-500" /> 
                ) : isHalfStar ? (
                  <div className="relative h-6 w-6 text-yellow-500">
                    <StarIcon className="absolute inset-0 h-6 w-6 text-yellow-500" style={{ clipPath: 'inset(0 50% 0 0)' }} /> 
                    <StarOutline className="absolute inset-0 h-6 w-6 text-gray-400" />
                  </div>
                ) : (
                  <StarOutline className="h-6 w-6 text-gray-400" /> 
                )
              }
            </span>
          );
        })
      }
    </div>
  );
};

