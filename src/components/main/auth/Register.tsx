'use client';
      
import React, { useState } from 'react';
import Link from 'next/link';
import { RegisterUserType } from '@/types/UserAccount.type';
import { INITIAL_REGISTER_USER } from '@/initials/UserAccount.initial';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { Validators } from '@/types/Validators.type';
import { AuthMessage, UserMessage } from '@/messages/UserAccount.message';
import { EMAIL_REG_EXP, isValidForm, PASSWORD_REG_EXP, PHONE_NUMBER_REG_EXP } from '@/lib/client/isValidForm';
import { authService } from '@/services/UserAccount.service';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { Input } from '@/components/partial/form/Input';
import { Form } from '@/components/partial/form/Form';
import { Spin } from '@/components/partial/data/Spin';
import { AxiosError } from 'axios';
import { GeneralMessage } from '@/messages/General.message';
import { Label } from '@/components/partial/form/Label';
import { dateStrOfMaxAge, dateStrOfMinAge } from '@/lib/client/dateLimit';
import { Select } from '@/components/partial/form/Select';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/lib/client/format';


export const Register = () => {
  const [reqData, setReqData] = useState<RegisterUserType>(INITIAL_REGISTER_USER);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [step, setStep] = useState(1);
  
  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, setReqData);
  };

  const handleRegisterError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }
    
    if (error.response?.status !== 400) {
      await toastError(AuthMessage.REGISTER_ERROR);
      return;
    }
    
    if (error.response?.status === 400 && error.response.data) {
      const data = error.response.data;
      if (
        Object.hasOwn(data, 'email') && 
        data.email[0] === AuthMessage.BACKEND_EMAIL_UNIQUE_ERROR
      ) {
        await toastError(AuthMessage.EMAIL_UNIQUE_ERROR);
        return;
      }

      if (
        Object.hasOwn(data, 'phone_number') && 
        data.phone_number[0] === UserMessage.BACKEND_PHONE_NUMBER_UNIQUE_ERROR
      ) {
        await toastError(UserMessage.PHONE_NUMBER_UNIQUE_ERROR);
        return;
      }

      if (
        Object.hasOwn(data, 'citizen_number') && 
        data.citizen_number[0] === UserMessage.BACKEND_CITIZEN_NUMBER_UNIQUE_ERROR
      ) {
        await toastError(UserMessage.CITIZEN_NUMBER_UNIQUE_ERROR);
        return;
      }
    }

    await toastError(AuthMessage.REGISTER_ERROR);
  };
  
  
  const validators: Validators<RegisterUserType> = {
    email: () => {
      if (!reqData.email) {
        return AuthMessage.EMAIL_REQUIRED;
      }

      if (!EMAIL_REG_EXP.test(reqData.email)) {
        return AuthMessage.EMAIL_FORMAT_ERROR;
      }
      return null;
    },

    password: () => {
      if (!reqData.password) {
        return AuthMessage.PASSWORD_REQUIRED;
      }
      if (!PASSWORD_REG_EXP.test(reqData.password)) {
        return AuthMessage.PASSWORD_FORMAT_ERROR;
      }
      return null;
    },

    confirm_password: () => {
      if (!reqData.confirm_password) {
        return AuthMessage.CONFIRM_PASSWORD_REQUIRED;
      }
      if (reqData.confirm_password !== reqData.password) {
        return AuthMessage.CONFIRM_PASSWORD_MISMATCH;
      }
      return null;
    },

    last_name: () => {
      if (!reqData.last_name) {
        return UserMessage.LAST_NAME_REQUIRED;
      }
      return null;
    },

    first_name: () => {
      if (!reqData.first_name) {
        return UserMessage.FIRST_NAME_REQUIRED;
      }
      return null;
    },

    phone_number: () => {
      if (!reqData.phone_number) {
        return UserMessage.PHONE_NUMBER_REQUIRED;
      }
      if (!PHONE_NUMBER_REG_EXP.test(reqData.phone_number)) {
        return UserMessage.PHONE_NUMBER_FORMAT_ERROR;
      }
      return null;
    },

    citizen_number: () => {
      if (!reqData.citizen_number) {
        return UserMessage.CITIZEN_NUMBER_REQUIRED;
      }
      if (reqData.citizen_number.length !== 12) {
        return UserMessage.CITIZEN_NUMBER_FORMAT_ERROR;
      }
      return null;
    },

    gender: () => {
      if (!reqData.gender) {
        return UserMessage.GENDER_REQUIRED;
      }
      return null;
    }
  };
  
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReqData({ ...reqData, gender: e.target.value as RegisterUserType['gender'] });
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await isValidForm(validators);
  
    if (!isValid) {
      return;
    }
    
    setIsSubmitted(true);
    
    try {
      alert(JSON.stringify(reqData));
      await authService.register(reqData);
      await toastSuccess(AuthMessage.REGISTER_SUCCESS);

    } catch (error) {
      await handleRegisterError(error);
    
    } finally {
      setIsSubmitted(false);
    }

  };

  return (
    <Form 
      label='Đăng ký tài khoản' 
      className='w-[350px]'  
      onSubmit={handleSubmit} 
      useModal
    >
      { 
        step === 1 && (
          <>
            <div className='space-y-1'>
              <Label htmlFor='email' required>Email:</Label>
              <Input 
                id='email'
                name='email'
                type='text' 
                value={reqData.email}
                onChange={handleInputOnChange}
                validate={validators.email}
              />
            </div>

            <div className='space-y-1'>
            <Label htmlFor='password' required>Mật khẩu:</Label>
              <Input 
                id='password'
                name='password'
                type='password' 
                value={reqData.password}
                onChange={handleInputOnChange}
                validate={validators.password}
              />
            </div>

            <div className='space-y-1'>
            <Label htmlFor='confirm-password' required>Nhập lại mật khẩu:</Label>
              <Input 
                id='confirm-password'
                name='confirm_password'
                type='password' 
                value={reqData.confirm_password}
                onChange={handleInputOnChange}
                validate={validators.confirm_password}
              />
            </div>
          </>
        )   
      }
      {
        step === 2 && (
          <>
            <div className='space-y-1'>
              <Label htmlFor='last-name' required>Họ: </Label>
              <Input 
                id='last-name'
                name='last_name'
                type='text' 
                value={reqData.last_name}
                onChange={handleInputOnChange}
                validate={validators.last_name}
              />
            </div>
      
            <div className='space-y-1'>
              <Label htmlFor='first-name' required>Tên: </Label>
              <Input 
                id='first-name'
                name='first_name'
                type='text'
                value={reqData.first_name}
                onChange={handleInputOnChange}
                validate={validators.first_name}
              />
            </div>

            <div className='space-y-1'>
              <Label htmlFor='gender' required>Giới tính: </Label>
              <Select
                id='gender'
                value={reqData.gender}
                options={[
                  { label: 'Nam', value: 'MALE'},
                  { label: 'Nữ', value: 'FEMALE'},
                  { label: 'Không rõ', value: 'UNKNOWN'},
                ]}
                onChange={handleGenderChange}
                validate={validators.gender}
              />
            </div>
          </>
        )
      }
      {
        step === 3 && (
          <>
            <div className='space-y-1'>
              <Label htmlFor='phone-number' required>Số điện thoại: </Label>
              <Input 
                id='phone-number'
                name='phone_number'
                type='text'
                value={reqData.phone_number}
                onChange={handleInputOnChange}
                validate={validators.phone_number}
              />
            </div>
      
            <div className='space-y-1'>
              <Label htmlFor='citizen-number' required>Số CCCD: </Label>
              <Input 
                id='citizen-number'
                name='citizen_number'
                type='text'
                value={reqData.citizen_number}
                onChange={handleInputOnChange}
                validate={validators.citizen_number}
              />
            </div>
            
            <div className='space-y-1'>
              <Label htmlFor='date-of-birth'>Ngày sinh: </Label>
              <Input 
                id='date-of-birth'
                name='date_of_birth'
                type='date'
                value={formatDate(reqData.date_of_birth, 'ymd')}
                onChange={handleInputOnChange}
                min={dateStrOfMaxAge}
                max={dateStrOfMinAge}
              />
            </div>

            <div>
              <p className='italic text-gray-500 text-sm'>
                Vui lòng truy cập vào email của bạn để lấy liên kết kích hoạt tài khoản
              </p>
            </div> 
          </>
        )
      }
  
      <div>
        <Link href={'/auth/login'} className='underline text-blue-500 text-left'>Đã có tài khoản? Đăng nhập ngay</Link>
      </div>

      <div className='text-left italic font-bold'>
        <p>Bước {step}/3</p>
      </div>

      <div className="flex justify-between mt-4">
        {
          step > 1 && (
            <button 
              type="button" 
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={handlePrevStep}
            >
              <div className='flex items-center'>
                <ChevronLeftIcon className='w-5 h-5'/> Trước đó
              </div>
            </button>
          )
        }
        {
          step < 3 ? (
            <button 
              type="button" 
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800`}
              onClick={handleNextStep}
            >
              <div className='flex items-center'>
                Kế tiếp <ChevronRightIcon className='w-5 h-5'/>
              </div>
            </button>
          ) : (
            <button 
              type="submit" 
              className={`font-semibold px-4 py-2 text-white rounded-lg
                        ${isSubmitted ? 
                          'bg-mydarkgreen cursor-not-allowed disabled' : 
                          'bg-mygreen hover:bg-mydarkgreen transition duration-300 ease-in-out'}`}
              onClick={handleSubmit}
            >
              {isSubmitted ? <Spin /> : 'Hoàn tất'}
            </button>
          )
        }
      </div>
    </Form>
  );
};