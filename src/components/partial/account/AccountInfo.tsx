'use client';

import React from 'react';
import { UserType } from '@/types/UserAccount.type';
import { DropdownMenu } from './DropdownMenu';
import { DefaultAvatar } from './DefaultAvatar';

export const AccountInfo = (props: UserType) => {
  return (
    <div className="relative flex items-center justify-center h-full"> {/* Thêm h-full và flex items-center */}
      <DropdownMenu data={props}>
        <div 
          className="p-1 bg-white text-black rounded-full shadow-lg cursor-pointer 
                     border-1 border-green-50">
          <DefaultAvatar 
            data={props} 
            width={30} 
            height={30} 
            fontSize={14} 
            shape="circle" 
          />
        </div>
      </DropdownMenu>
    </div>
  );
};
