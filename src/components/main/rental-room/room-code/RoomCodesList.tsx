'use client';
                          
import { Title } from '@/components/partial/data/Title';
import React from 'react';
                          
type RoomCodesListProps = {
  rentalRoomId: string;
}

export const RoomCodesList = (props: RoomCodesListProps) => {
  return (
    <div>
      <Title>Danh sách mã phòng</Title>
      {props.rentalRoomId}
    </div>
  );
};