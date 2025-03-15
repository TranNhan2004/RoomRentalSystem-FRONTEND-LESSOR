'use client';
                          
import { Title } from '@/components/partial/data/Title';
import React from 'react';
                          
type ReviewsListProps = {
  rentalRoomId: string;
}

export const ReviewsList = (props: ReviewsListProps) => {
  return (
    <div>
      <Title>Các đánh giá</Title>
      {props.rentalRoomId}
    </div>
  );
};