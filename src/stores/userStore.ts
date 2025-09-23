import { userService } from '@/services/api';
import router from '@/router';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token') || null,
    userInfo: null
  }),

  actions: {
    // 设置 token
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },

    // 清除 token
    clearToken() {
      this.token = null;
      localStorage.removeItem('token');
    },

    // 登录
    async login(username: string, password: string) {
      try {
        const { token } = await userService.login(username, password);
        this.setToken(token);
        await this.getUserInfo();
        router.push('/');
        return true;
      } catch (error) {
        console.error('登录失败:', error);
        return false;
      }
    },

    // 获取用户信息
    async getUserInfo() {
      if (!this.token) return;

      try {
        this.userInfo = await userService.getUserInfo();
      } catch (error) {
        console.error('获取用户信息失败:', error);
        this.logout();
      }
    },

    // 登出
    logout() {
      this.clearToken();
      this.userInfo = null;
      userService.logout();
      router.push('/login');
    },

    // 更新用户信息
    async updateUserInfo(userInfo: Partial<UserInfo>) {
      if (!this.token) return;

      try {
        await userService.updateUserInfo(userInfo);
        if (this.userInfo) {
          this.userInfo = { ...this.userInfo, ...userInfo };
        }
        return true;
      } catch (error) {
        console.error('更新用户信息失败:', error);
        return false;
      }
    }
  },

  getters: {
    // 是否已登录
    isLoggedIn: state => !!state.token,

    // 用户角色
    roles: state => state.userInfo?.roles || [],

    // 用户权限
    permissions: state => state.userInfo?.permissions || []
  }
});
