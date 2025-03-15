import { 
  ChangePasswordType,
  LoginRequestType, 
  LoginResponseType, 
  RegisterUserType, 
  ResetPasswordRequestAfterType, 
  ResetPasswordRequestBeforeType, 
  UserQueryType, 
  UserType 
} from "@/types/UserAccount.type";
import { ApiService } from "./Api.service";
import { axiosInstance } from "@/lib/client/axios";
import { formatDate } from "@/lib/client/formatDate";

const smoothData = async (data: UserType | RegisterUserType) => {
  const dataToSend: Record<string, unknown> = { ...data };
  if (data.date_of_birth) {
    dataToSend.date_of_birth = formatDate(data.date_of_birth, 'ymd');
  }
  return dataToSend;
};

class UserService extends ApiService<UserType, UserQueryType> {
  constructor() {
    super('/app.user-account/users');
  }

  public async patch(id: string, data: UserType) {
    return await super.patch(id, await smoothData(data));
  }

  public async changePassword(id: string, data: ChangePasswordType) {
    const response = await axiosInstance.patch(`/app.user-account/change-password/${id}/`, data);
    return response.data;
  }
};

class AuthService {
  constructor() {}
  private defaultURL = '/app.user-account/auth';

  public async register(data: RegisterUserType) {
    data.role = 'LESSOR';
    const response = await axiosInstance.post(`${this.defaultURL}/register/`, await smoothData(data));
    return response.data;
  }

  public async activateAccount(uidb64: string, token: string) {
    const response = await axiosInstance.post(
      `${this.defaultURL}/activate-account/${uidb64}/${token}/`,
      {}
    );
    return response.data;
  }

  public async login(data: LoginRequestType) {
    data.role = 'LESSOR';
    const response = await axiosInstance.post<LoginResponseType>(`${this.defaultURL}/login/`, data);
    return response.data;
  }

  public async getResetPasswordURL(data: ResetPasswordRequestBeforeType) {
    const response = await axiosInstance.post(`${this.defaultURL}/reset-password/`, data);
    return response.data;
  }

  public async resetPassword(data: ResetPasswordRequestAfterType, uidb64: string, token: string) {
    const response = await axiosInstance.post(
      `${this.defaultURL}/reset-password-confirm/${uidb64}/${token}/`,
      data
    );
    return response.data;
  }
};


export const userService = new UserService();
export const authService = new AuthService();