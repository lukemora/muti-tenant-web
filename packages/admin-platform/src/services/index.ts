/**
 * API接口管理
 */

import { useRequest } from './request';
import type {
  UserInfo,
  UserListParams,
  UserListResponse,
  CreateUserParams,
  UpdateUserParams,
  BatchDeleteUsersParams,
  ResetPasswordParams,
  UpdateUserStatusParams,
  LoginParams,
  LoginResponse,
  CaptchaResponse,
  VerifyCaptchaParams,
  ForgotPasswordParams,
  RequestConfig
} from './types';

// ==================== 用户相关API ====================

export const userApi = {
  // 获取用户信息
  getUserInfo: (config: RequestConfig = {}): Promise<UserInfo> => {
    const request = useRequest();
    return request({
      url: '/user/info',
      type: 'GET',
      ...config
    });
  },

  // 更新用户信息
  updateUserInfo: (data: UpdateUserParams, config: RequestConfig = {}): Promise<any> => {
    const request = useRequest();
    return request({
      url: '/user/update',
      type: 'POST',
      data,
      successMessage: '用户信息更新成功',
      ...config
    });
  },

  // 获取用户列表
  getUserList: (
    params: UserListParams = {},
    config: RequestConfig = {}
  ): Promise<UserListResponse> => {
    const request = useRequest();
    return request({
      url: '/user/list',
      type: 'GET',
      data: params,
      ...config
    });
  },

  // 创建用户
  createUser: (data: CreateUserParams, config: RequestConfig = {}): Promise<any> => {
    const request = useRequest();
    return request({
      url: '/user/create',
      type: 'POST',
      data,
      successMessage: '用户创建成功',
      ...config
    });
  },

  // 删除用户
  deleteUser: (id: number, config: RequestConfig = {}): Promise<any> => {
    const request = useRequest();
    return request({
      url: `/user/delete/${id}`,
      type: 'DELETE',
      successMessage: '用户删除成功',
      ...config
    });
  },

  // 批量删除用户
  batchDeleteUsers: (data: BatchDeleteUsersParams, config: RequestConfig = {}): Promise<any> => {
    const request = useRequest();
    return request({
      url: '/user/batch-delete',
      type: 'POST',
      data,
      successMessage: '批量删除成功',
      ...config
    });
  },

  // 重置用户密码
  resetPassword: (data: ResetPasswordParams, config: RequestConfig = {}): Promise<any> => {
    const request = useRequest();
    return request({
      url: '/user/reset-password',
      type: 'POST',
      data,
      successMessage: '密码重置成功',
      ...config
    });
  },

  // 修改用户状态
  updateUserStatus: (data: UpdateUserStatusParams, config: RequestConfig = {}): Promise<any> => {
    const request = useRequest();
    return request({
      url: '/user/update-status',
      type: 'POST',
      data,
      successMessage: '状态更新成功',
      ...config
    });
  }
};

// ==================== 认证相关API ====================

export const authApi = {
  // 用户登录
  login: (data: LoginParams, config: RequestConfig = {}): Promise<LoginResponse> => {
    const request = useRequest();
    return request({
      url: '/auth/login',
      type: 'POST',
      data,
      successMessage: '登录成功',
      ...config
    });
  },

  // 用户登出
  logout: (config: RequestConfig = {}): Promise<any> => {
    const request = useRequest();
    return request({
      url: '/auth/logout',
      type: 'POST',
      successMessage: '退出成功',
      ...config
    });
  },

  // 刷新token
  refreshToken: (config: RequestConfig = {}): Promise<{ token: string }> => {
    const request = useRequest();
    return request({
      url: '/auth/refresh',
      type: 'POST',
      ...config
    });
  },

  // 获取验证码
  getCaptcha: (config: RequestConfig = {}): Promise<CaptchaResponse> => {
    const request = useRequest();
    return request({
      url: '/auth/captcha',
      type: 'GET',
      ...config
    });
  },

  // 验证验证码
  verifyCaptcha: (data: VerifyCaptchaParams, config: RequestConfig = {}): Promise<any> => {
    const request = useRequest();
    return request({
      url: '/auth/verify-captcha',
      type: 'POST',
      data,
      ...config
    });
  },

  // 忘记密码
  forgotPassword: (data: ForgotPasswordParams, config: RequestConfig = {}): Promise<any> => {
    const request = useRequest();
    return request({
      url: '/auth/forgot-password',
      type: 'POST',
      data,
      successMessage: '密码重置邮件已发送',
      ...config
    });
  },

  // 重置密码
  resetPassword: (data: ResetPasswordParams, config: RequestConfig = {}): Promise<any> => {
    const request = useRequest();
    return request({
      url: '/auth/reset-password',
      type: 'POST',
      data,
      successMessage: '密码重置成功',
      ...config
    });
  }
};

export default {
  userApi,
  authApi
};
