/**
 * API 类型定义
 */

// 用户信息类型
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: number;
  createTime: string;
  updateTime: string;
}

// 用户列表查询参数
export interface UserListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  status?: number;
}

// 用户列表响应
export interface UserListResponse {
  list: UserInfo[];
  total: number;
  page: number;
  pageSize: number;
}

// 创建用户参数
export interface CreateUserParams {
  username: string;
  email: string;
  phone?: string;
  password: string;
}

// 更新用户信息参数
export interface UpdateUserParams {
  id: number;
  username?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

// 批量删除用户参数
export interface BatchDeleteUsersParams {
  ids: number[];
}

// 重置密码参数
export interface ResetPasswordParams {
  id: number;
  newPassword: string;
}

// 更新用户状态参数
export interface UpdateUserStatusParams {
  id: number;
  status: number;
}

// 登录参数
export interface LoginParams {
  username: string;
  password: string;
  captcha?: string;
}

// 登录响应
export interface LoginResponse {
  token: string;
  userInfo: UserInfo;
}

// 验证码响应
export interface CaptchaResponse {
  captchaId: string;
  captchaImage: string;
}

// 验证验证码参数
export interface VerifyCaptchaParams {
  captchaId: string;
  captchaCode: string;
}

// 忘记密码参数
export interface ForgotPasswordParams {
  email: string;
  captchaId?: string;
  captchaCode?: string;
}

// 请求配置类型
export interface RequestConfig {
  successMessage?: string;
  showLoadingDom?: string | HTMLElement;
  showError?: boolean;
  showProgress?: boolean;
  cancelDuplicate?: boolean;
  successCallback?: (result: any) => void;
  errorCallback?: (error: any) => void;
  failCallback?: (error: any, showWarn: (message: string) => void) => void;
}
