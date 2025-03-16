'use client';

import React from 'react';
import Image from 'next/image';

export type DataLineProps = {
  label?: string;
  value?: string | number;
  isImage?: boolean;
  width?: number;
  height?: number;
}

export const DataLine = (props: DataLineProps) => {  
  if (props.value === undefined) {
    return null;
  }

  return props.isImage ? (
    <div className='space-y-2'>
      <span className='text-gray-800 mr-1 font-bold'>{props.label}:</span>
      <Image
        src={props.value as string}
        alt='Logo'
        width={props.width && 40}
        height={props.height && 40} 
      />
    </div>
  ) : (
    <p className='text-gray-800'>
      <span className='text-gray-800 mr-1 font-bold'>{props.label}:</span>{props.value}
    </p>
  );
};