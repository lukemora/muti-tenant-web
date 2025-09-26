// 此文件会被脚手架覆盖

import { useRequest } from '@/services/request';

// 创建请求实例
const request = useRequest();

// 用户相关接口
export const userService = {
  // 登录
  login(username: string, password: string, options?: any) {
    return request({
      url: '/auth/login',
      type: 'POST',
      data: { username, password },
      ...options
    });
  },

  // 获取用户信息
  getUserInfo(options?: any) {
    return request({
      url: '/user/info',
      type: 'GET',
      ...options
    });
  },

  // 更新用户信息
  updateUserInfo(userInfo: Partial<UserInfo>, options?: any) {
    return request({
      url: '/user/info',
      type: 'PUT',
      data: userInfo,
      ...options
    });
  },

  // 登出
  logout(options?: any) {
    return request({
      url: '/auth/logout',
      type: 'POST',
      ...options
    });
  },

  // 获取用户列表
  getUserList(params?: any, options?: any) {
    return request({
      url: '/user/list',
      type: 'GET',
      data: params,
      ...options
    });
  },

  // 创建用户
  createUser(userData: any, options?: any) {
    return request({
      url: '/user/create',
      type: 'POST',
      data: userData,
      ...options
    });
  },

  // 删除用户
  deleteUser(id: number, options?: any) {
    return request({
      url: `/user/${id}`,
      type: 'DELETE',
      ...options
    });
  },

  // 批量删除用户
  batchDeleteUsers(ids: number[], options?: any) {
    return request({
      url: '/user/batch-delete',
      type: 'POST',
      data: { ids },
      ...options
    });
  },

  // 重置密码
  resetPassword(id: number, newPassword: string, options?: any) {
    return request({
      url: '/user/reset-password',
      type: 'POST',
      data: { id, newPassword },
      ...options
    });
  },

  // 更新用户状态
  updateUserStatus(id: number, status: number, options?: any) {
    return request({
      url: '/user/update-status',
      type: 'POST',
      data: { id, status },
      ...options
    });
  }
};

// 产品相关接口
export const productService = {
  // 获取产品列表
  getProducts(params?: { page?: number; size?: number; category?: string }, options?: any) {
    return request({
      url: '/products',
      type: 'GET',
      data: params,
      ...options
    });
  },

  // 获取产品详情
  getProductDetail(id: number, options?: any) {
    return request({
      url: `/products/${id}`,
      type: 'GET',
      ...options
    });
  },

  // 创建产品
  createProduct(product: Omit<Product, 'id'>, options?: any) {
    return request({
      url: '/products',
      type: 'POST',
      data: product,
      ...options
    });
  },

  // 更新产品
  updateProduct(id: number, product: Partial<Product>, options?: any) {
    return request({
      url: `/products/${id}`,
      type: 'PUT',
      data: product,
      ...options
    });
  },

  // 删除产品
  deleteProduct(id: number, options?: any) {
    return request({
      url: `/products/${id}`,
      type: 'DELETE',
      ...options
    });
  },

  // 批量删除产品
  batchDeleteProducts(ids: number[], options?: any) {
    return request({
      url: '/products/batch-delete',
      type: 'POST',
      data: { ids },
      ...options
    });
  },

  // 获取产品分类
  getProductCategories(options?: any) {
    return request({
      url: '/products/categories',
      type: 'GET',
      ...options
    });
  }
};

// 文件上传接口
export const fileService = {
  // 上传文件
  uploadFile(file: File, options?: any) {
    const formData = new FormData();
    formData.append('file', file);

    return request({
      url: '/file/upload',
      type: 'POST',
      data: formData,
      ...options
    });
  },

  // 批量上传文件
  uploadFiles(files: File[], options?: any) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    return request({
      url: '/file/batch-upload',
      type: 'POST',
      data: formData,
      ...options
    });
  },

  // 删除文件
  deleteFile(fileId: string, options?: any) {
    return request({
      url: `/file/${fileId}`,
      type: 'DELETE',
      ...options
    });
  },

  // 获取文件列表
  getFileList(params?: any, options?: any) {
    return request({
      url: '/file/list',
      type: 'GET',
      data: params,
      ...options
    });
  }
};

// 系统配置接口
export const systemService = {
  // 获取系统配置
  getSystemConfig(options?: any) {
    return request({
      url: '/system/config',
      type: 'GET',
      ...options
    });
  },

  // 更新系统配置
  updateSystemConfig(config: any, options?: any) {
    return request({
      url: '/system/config',
      type: 'PUT',
      data: config,
      ...options
    });
  },

  // 获取系统统计信息
  getSystemStats(options?: any) {
    return request({
      url: '/system/stats',
      type: 'GET',
      ...options
    });
  },

  // 清理缓存
  clearCache(options?: any) {
    return request({
      url: '/system/clear-cache',
      type: 'POST',
      ...options
    });
  }
};
