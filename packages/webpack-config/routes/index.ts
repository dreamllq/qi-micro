import autoRoutes from './auto-routes';
import { i18n } from '@llqm/framework-sdk';

export default (autoRoutes as any[]).map(item => {
  if (item.meta && item.meta.title)
    item.meta.title = i18n.global.t(item.meta.title);
  item.path = `${__APP_NAME__}/${item.path}`;
  return item;
});