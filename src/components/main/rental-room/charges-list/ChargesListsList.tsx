'use client';
                          
import { Title } from '@/components/partial/data/Title';
import React from 'react';
                          
type ChargesListsListProps = {
  rentalRoomId: string;
}

export const ChargesListsList = (props: ChargesListsListProps) => {
  return (
    <div>
      <Title>Danh sách các loại phí</Title>
      {props.rentalRoomId}
    </div>
  );
};