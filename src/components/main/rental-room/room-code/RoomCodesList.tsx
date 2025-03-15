'use client';
                          
import { Title } from '@/components/partial/data/Title';
import React from 'react';
                          
type RoomCodesListProps = {
  roomId: string;
}

export const RoomCodesList = (props: RoomCodesListProps) => {
  return (
    <div>
      <Title>Danh sách mã phòng</Title>
      {props.roomId}
    </div>
  );
};