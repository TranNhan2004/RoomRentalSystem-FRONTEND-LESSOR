'use client';
                          
import { Title } from '@/components/partial/data/Title';
import React from 'react';
                          
type ReviewsListProps = {
  roomId: string;
}

export const ReviewsList = (props: ReviewsListProps) => {
  return (
    <div>
      <Title>Các đánh giá</Title>
      {props.roomId}
    </div>
  );
};