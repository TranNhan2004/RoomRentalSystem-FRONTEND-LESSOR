'use client';
                          
import { toastError } from '@/lib/client/alert';
import { AuthMessage } from '@/messages/UserAccount.message';
import { authService } from '@/services/UserAccount.service';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
                          
type ActivateAccountProps = {
  uidb64: string;
  token: string;
}

export const ActivateAccount = (props: ActivateAccountProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await authService.activateAccount(props.uidb64, props.token);
        setIsLoading(false);
      } catch {
        await toastError(AuthMessage.ACTIVATE_ERROR);
      }
    }

    activateAccount();
  }, [props]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center text-lg space-x-2'>
        <h1>Đang kích hoạt tài khoản</h1>
        <span className="dot animate-bounce1">.</span>
        <span className="dot animate-bounce2">.</span>
        <span className="dot animate-bounce3">.</span>
      </div>
    )
  }

  return (
    <div className='flex items-center justify-center text-lg space-x-2'>
      <h1>
        Đã kích hoạt thành công thành công! Vui lòng trở lại trang
        <Link href={'/auth/login'} className='underline text-blue-500 text-left'> đăng nhập</Link>
      </h1>
    </div>
  );
};