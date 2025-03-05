'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import { UserType } from '@/types/UserAccount.type';
import { getMyInfo } from '@/lib/client/authToken';
import { getImageSrc } from '@/lib/client/getImageSrc';
import { AccountInfo } from '../partial/account/AccountInfo';
import { NavLink } from '../partial/navbar/NavLink';

export const Navbar = () => {
  const [myInfo, setMyInfo] = useState<UserType>({});

  useEffect(() => {
    const setMyInfoFromCookie = async () => {
      setMyInfo(await getMyInfo());
    };

    setMyInfoFromCookie();
  }, []);

  return (
    <div>
      <div className='flex items-center top-0 left-0 w-full h-[10%] bg-mygreen p-2'>
        {/* Logo (left) */}
        <div className='ml-4 mr-4'>
          <Link href={'/'}>
            <Image 
              src={getImageSrc('logo.png')} 
              alt='Logo' 
              width={150} 
              height={150} 
              className='max-h-[40px] w-full' 
              priority={false}
            />
          </Link>
        </div>

        <div className='flex items-center justify-center space-x-6 ml-[20]'>
          <NavLink href='/'>Trang chủ</NavLink>
          <NavLink href='/rental-rooms'>Quản lý trọ</NavLink>
          <NavLink href='/instructions'>Hướng dẫn</NavLink>
          <NavLink href='/contact'>Liên hệ</NavLink>
        </div>
      
        <div className='flex ml-auto mr-2'>
          <AccountInfo {...myInfo} />
        </div>
      </div>

      <div 
        className="w-full h-[400px] bg-cover bg-center" 
        style={{ backgroundImage: `url(${getImageSrc('background.jpg')})` }}
      ></div>
    </div>
  );
};
