import './html-lang'; // 初始化html国际化
import 'normalize.css';
import directives from './directives';
import { permissionOptions } from './permission';
import { start } from 'llqm-framework';
import Layout from '@/components/layout/index.vue';
import { i18n, global, appsData } from 'llqm-framework-sdk';

export default () => {
  start({
    defaultPage: '/app/demo',
    fullView: [/login\//],
    layout: Layout,
    i18n,
    permissionOptions,
    routes: appsData.routes,
    getLoginUser: async () => {
      return {
        user: 1,
      };
    },
    beforeLayoutMount: async ({ userInfo }) => {
      
    },
    beforeMount: ({ app, router, i18n, permission }) => {
      app.use(directives);
      router.beforeEach((to, from) => {
      });
    }
  });
};
