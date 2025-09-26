// TODO: liujun 待删除 通过插件写入的

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/src/message.scss';
import 'element-plus/theme-chalk/src/message-box.scss';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export default {
  install(app) {
    // 使用 Element Plus
    app.use(ElementPlus);

    // 注册所有 Element Plus 图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  }
};
