'use client';
                          
import React from 'react';

type RentalRoomDetailsProps = {
  id: string;
}
                          
export const RentalRoomDetails = (props: RentalRoomDetailsProps) => {
  return (
    <div>
      {props.id}
    </div>
  );
};