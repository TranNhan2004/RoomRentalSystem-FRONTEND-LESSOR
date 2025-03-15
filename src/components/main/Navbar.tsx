'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import { UserType } from '@/types/UserAccount.type';
import { getMyInfo } from '@/lib/client/authToken';
import { getImageSrc } from '@/lib/client/getImageSrc';
import { AccountInfo } from '../partial/account/AccountInfo';
import { NavLink } from '../partial/navbar/NavLink';
import { Background } from '../partial/navbar/Background';
import { ActionButton } from '../partial/button/ActionButton';
import { INITIAL_USER } from '@/initials/UserAccount.initial';
import { objectEquals } from '@/lib/client/objectEquals';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();
  const [myInfo, setMyInfo] = useState<UserType>(INITIAL_USER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setMyInfoFromCookie = async () => {
      setLoading(true);
      setMyInfo(await getMyInfo());
      setLoading(false);
    };

    setMyInfoFromCookie();
  }, []);

  return (
    <div>
      <div className='flex items-center top-0 left-0 w-full h-[10%] bg-mygreen p-2'>
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
          {
            loading ? null :
            objectEquals(myInfo, INITIAL_USER) ? (
              <div className='flex items-center space-x-4'>
                <ActionButton 
                  mode='register' 
                  onClick={() => { router.push('/auth/register'); }}
                >
                  Đăng ký
                </ActionButton>

                <ActionButton 
                  mode='login'
                  onClick={() => { router.push('/auth/login'); }}
                >
                  Đăng nhập
                </ActionButton>
              </div>
            ) : <AccountInfo {...myInfo} />
          }
        </div>
      </div>

      <Background />
    </div>
  );
};
