/**
 * Vue3 Request Hooks
 * 集成axios封装的Vue3 Composition API hooks
 *
 * 功能特性：
 * - 响应式状态管理（loading、data、error）
 * - 支持options配置方式
 * - 支持回调函数（successCallback、errorCallback、failCallback）
 * - 支持Loading和消息处理
 * - 请求/响应拦截器
 * - 请求取消和防重复
 * - 全局进度条显示
 * - 错误统一处理
 */

import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';
import { ElMessage, ElLoading } from 'element-plus';

// ==================== 类型定义 ====================

// 请求配置类型
export interface RequestOptions {
  /** 请求的URL地址 */
  url: string;
  /** HTTP请求方法类型 */
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /** 请求体数据，用于POST、PUT、PATCH请求 */
  data?: any;
  /** URL查询参数，用于GET请求 */
  params?: any;
  /** 请求成功时的回调函数，参数为响应结果 */
  successCallback?: (result: any) => void;
  /** HTTP错误回调函数，处理4xx、5xx等HTTP状态码错误 */
  errorCallback?: (error: any) => void;
  /** 业务错误回调函数，处理HTTP 200但业务失败的情况，第二个参数为显示警告消息的函数 */
  failCallback?: (error: any, showWarn: (message: string) => void) => void;
  /** 显示Loading的DOM元素选择器或HTMLElement对象 */
  showLoadingDom?: string | HTMLElement;
  /** 请求成功时显示的成功消息 */
  successMessage?: string;
  /** 是否显示错误文本消息，默认true */
  showErrText?: boolean;
  /** 是否显示错误提示，默认true */
  showError?: boolean;
  /** 是否显示全局进度条，默认true */
  showProgress?: boolean;
  /** 是否取消重复请求，默认true（相同请求会被取消） */
  cancelDuplicate?: boolean;
}

// 扩展的Axios配置
export interface ExtendedAxiosConfig extends AxiosRequestConfig {
  showLoadingDom?: string | HTMLElement;
  showProgress?: boolean;
  cancelDuplicate?: boolean;
  __loadingInstance?: any;
  showError?: boolean;
  data?: any;
  params?: any;
  method?: string;
  url?: string;
}

// 业务响应类型
export interface BusinessResponse<T = any> {
  code: number;
  message?: string;
  msg?: string;
  success?: boolean;
  data?: T;
}

// 取消令牌类型
interface CancelToken {
  token: AbortSignal;
  cancel: (reason?: any) => void;
}

// 全局状态
let token: string = localStorage.getItem('token') || '';
const pendingRequests = new Map<string, CancelToken>();
let requestId = 0;
let progressRequestCount = 0;

// 允许重复请求的URL白名单（不会被取消）
const allowDuplicateUrls: string[] = [
  // 例如：'/api/heartbeat', '/api/ping', '/api/status'
];

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * 简单的Loading处理函数
 */
function showLoading(target: string | HTMLElement | any): any {
  if (!target) return null;

  // 获取DOM元素
  let element: HTMLElement | null = null;
  if (typeof target === 'string') {
    element = document.querySelector(target);
  } else if (target.$el) {
    element = target.$el; // Vue组件
  } else if (target instanceof HTMLElement) {
    element = target;
  } else {
    console.warn('Invalid loading target:', target);
    return null;
  }

  if (!element) {
    console.warn(`Loading target element not found: ${target}`);
    return null;
  }

  // 创建loading实例
  if (typeof ElLoading !== 'undefined') {
    return ElLoading.service({ target: element });
  }

  console.warn('Element Plus Loading not available');
  return null;
}

function hideLoading(instance: any): void {
  if (instance && instance.close) {
    instance.close();
  }
}

/**
 * 简单的进度条管理函数
 */
function startProgress(): void {
  progressRequestCount++;

  if (progressRequestCount === 1 && typeof (window as any).NProgress !== 'undefined') {
    (window as any).NProgress.start();
  }
}

function doneProgress(): void {
  progressRequestCount = Math.max(0, progressRequestCount - 1);

  if (progressRequestCount === 0 && typeof (window as any).NProgress !== 'undefined') {
    (window as any).NProgress.done();
  }
}

/**
 * 生成请求唯一标识
 * 用于识别相同的请求（相同的请求会被去重）
 */
function generateRequestKey(config: ExtendedAxiosConfig): string {
  const { url, method, params, data } = config;
  let key = `${method}:${url}`;

  if (method === 'get' && params) {
    key += `:${JSON.stringify(params)}`;
  } else if (['post'].includes(method || '') && data) {
    key += `:${JSON.stringify(data)}`;
  }

  return key;
}

/**
 * 检查URL是否允许重复请求
 */
function isAllowDuplicate(url: string): boolean {
  return allowDuplicateUrls.some(allowUrl => {
    // 支持精确匹配和通配符匹配
    if (allowUrl.includes('*')) {
      const pattern = allowUrl.replace(/\*/g, '.*');
      return new RegExp(`^${pattern}$`).test(url);
    }
    return url.includes(allowUrl);
  });
}

function createCancelToken(): CancelToken {
  const controller = new AbortController();
  return {
    token: controller.signal,
    cancel: (reason?: any) => controller.abort(reason)
  };
}

/**
 * 未授权处理
 */
function handleUnauthorized(): void {
  token = '';
  localStorage.removeItem('token');
  ElMessage.error('登录已过期，请重新登录');
  // 跳转到登录页
  window.location.href = '/login';
}

/**
 * HTTP 错误处理函数
 * 处理 HTTP 状态码错误（非 200 状态码）
 */
function handleError(error: AxiosError): void {
  const { response, request, message } = error;

  if (response) {
    // HTTP 状态码错误：服务器返回了错误状态码
    const { status, data } = response;

    if (status === 401) {
      // 401 未授权：用户未登录或 token 过期，跳转登录页
      handleUnauthorized();
    } else if (status === 403) {
      // 403 权限不足：暂时也跳转登录页
      handleUnauthorized();
    } else {
      // 其他 HTTP 错误：400, 404, 500 等
      // 显示服务器返回的错误信息给用户
      const errorMsg = (data as any)?.message || (data as any)?.msg || `请求失败 (${status})`;
      ElMessage.error(errorMsg);
    }
  } else if (request) {
    // 网络错误：无法连接到服务器，提示用户检查网络
    ElMessage.error('网络连接失败，请检查网络设置');
  } else {
    // 其他错误：如请求被取消等（这些通常不需要显示错误提示）
    ElMessage.error(message || '请求失败');
  }
}

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  async (config: any) => {
    // 1. 请求去重和取消管理
    // 如果相同的请求正在进行中，取消之前的请求（保留当前请求）
    const requestKey = generateRequestKey(config as ExtendedAxiosConfig);
    const existingRequest = pendingRequests.get(requestKey);

    // 检查是否允许重复请求（白名单或配置）
    const allowDuplicate = isAllowDuplicate(config.url || '') || config.cancelDuplicate === false;

    if (existingRequest && !allowDuplicate) {
      // 取消之前的请求，保留当前请求
      existingRequest.cancel('重复请求被取消');
    }

    // 2. 为当前请求添加取消令牌
    // 创建新的取消令牌并存储，覆盖之前的请求
    const cancelToken = createCancelToken();
    config.signal = cancelToken.token;
    pendingRequests.set(requestKey, cancelToken);

    // 3. 添加认证信息
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 4. 添加请求ID用于追踪
    config.headers = config.headers || {};
    config.headers['X-Request-ID'] = `req_${++requestId}_${Date.now()}`;

    // 5. 添加时区信息
    config.headers['X-Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // 6. 显示进度条
    if (config.showProgress !== false) {
      startProgress();
    }

    // 7. 显示Loading
    if (config.showLoadingDom) {
      config.__loadingInstance = showLoading(config.showLoadingDom);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 处理 HTTP 200 响应的业务逻辑
 */
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { config } = response;

    // 1. 清理请求管理器
    const requestKey = generateRequestKey(config as ExtendedAxiosConfig);
    pendingRequests.delete(requestKey);

    // 2. 隐藏Loading
    if ((config as ExtendedAxiosConfig).__loadingInstance) {
      hideLoading((config as ExtendedAxiosConfig).__loadingInstance);
    }

    // 3. 隐藏进度条
    doneProgress();

    // 4. 处理业务逻辑（HTTP 200 但可能有业务错误）
    const { data } = response;

    // 业务错误处理：HTTP 状态码是 200，但 data.code 不是成功码
    // 例如：{ code: 400, message: "用户名不能为空" }
    if (data.code !== undefined) {
      if (data.code === 200 || data.code === 0 || data.success === true) {
        // 业务成功：HTTP 200 + 业务成功码
        return data;
      } else {
        // 业务错误：HTTP 200 + 业务错误码
        // 显示服务器返回的错误信息给用户
        if ((config as ExtendedAxiosConfig).showError !== false) {
          const errorMsg = data.message || data.msg || '请求失败';
          ElMessage.error(errorMsg);
        }
        return Promise.reject(data);
      }
    }

    // 如果没有 code 字段，直接返回数据
    return data;
  },
  /**
   * 错误拦截器
   * 处理 HTTP 状态码错误（如 401, 403, 500 等）
   */
  async (error: AxiosError) => {
    const { config } = error;

    // 1. 清理请求管理器
    if (config) {
      const requestKey = generateRequestKey(config as ExtendedAxiosConfig);
      pendingRequests.delete(requestKey);

      // 隐藏Loading
      if ((config as ExtendedAxiosConfig).__loadingInstance) {
        hideLoading((config as ExtendedAxiosConfig).__loadingInstance);
      }
    }

    // 2. 隐藏进度条
    doneProgress();

    // 4. 处理取消的请求（这是期望的行为，不算错误）
    if (error.name === 'AbortError') {
      return Promise.reject(error);
    }

    // 5. HTTP 错误处理：HTTP 状态码不是 200
    // 例如：401 未授权、403 权限不足、500 服务器错误等
    handleError(error);

    return Promise.reject(error);
  }
);

/**
 * 请求hook
 * @returns {Function} ajax方法
 */
export function useRequest() {
  /**
   * 执行请求
   * @param {RequestOptions} options 请求配置
   * @returns {Promise} 请求结果
   */
  const ajax = async (options: RequestOptions): Promise<any> => {
    // 默认配置
    const config: RequestOptions = {
      successCallback: () => { },
      errorCallback: () => { },
      failCallback: () => { },
      showErrText: true,
      ...options
    };

    // 构建axios请求配置
    const axiosConfig: ExtendedAxiosConfig = {
      url: config.url,
      method: config.type.toLowerCase() as any,
      showProgress: true // 强制为 true
    } as ExtendedAxiosConfig;

    // 添加Loading配置
    if (config.showLoadingDom) {
      axiosConfig.showLoadingDom = config.showLoadingDom;
    }

    // 添加数据
    if (config.data) {
      if (config.type.toUpperCase() === 'GET') {
        axiosConfig.params = config.data;
      } else {
        axiosConfig.data = config.data;
      }
    }

    try {
      // 直接使用service发送请求
      const result = await service(axiosConfig);

      // 处理成功结果
      handleSuccess(result, config);

      return result;
    } catch (err) {
      // 处理错误
      handleRequestError(err, config);
      throw err;
    }
  };

  /**
   * 处理成功响应
   */
  const handleSuccess = (result: any, config: RequestOptions): void => {
    // 显示成功消息
    if (config.successMessage) {
      if (typeof ElMessage !== 'undefined') {
        ElMessage.success(config.successMessage);
      }
    }

    // 执行成功回调
    config.successCallback?.(result);
  };

  /**
   * 处理错误响应
   */
  const handleRequestError = (err: any, config: RequestOptions): void => {
    // 判断是HTTP错误还是业务错误
    if (err.response) {
      // HTTP错误（4xx, 5xx）
      config.errorCallback?.(err);
    } else if (err.code !== undefined) {
      // 业务错误（HTTP 200但业务失败）
      const showWarn = (message: string) => {
        if (config.showErrText && message) {
          if (typeof ElMessage !== 'undefined') {
            ElMessage.error(message);
          }
        }
      };
      config.failCallback?.(err, showWarn);
    } else {
      // 其他错误（网络错误等）
      config.errorCallback?.(err);
    }
  };

  return ajax;
}

// 默认导出
export default {
  useRequest
};
