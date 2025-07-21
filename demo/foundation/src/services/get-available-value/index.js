import { checkPermission } from '@llqm/vue-permission';
import { appsData } from '@llqm/framework-sdk';

export const getAvailableValue = (operateQueryKeys, defaultValue) => {
  const route = getRouteMessage();
  if (defaultValue) {
    return defaultValue;
  }
  // 根据权限返回路由配置的queryValues
  if (route.meta.operateQuery[operateQueryKeys].values.every(n => checkPermission(n.permissionKey))) {
    return route.meta.operateQuery[operateQueryKeys].values[0].value;
  }
  const type = route.meta.operateQuery[operateQueryKeys].values.find(n => checkPermission(n.permissionKey))?.value;
  if (type) {
    return type;
  }
  return '';
};

// 获取路由信息
export const getRouteMessage = () => {
  const routes = appsData.routes;
  const route = routes.find(item => `/${item.path}` === window.location.pathname);
  const result = route ? {
    ...route,
    query: setQuery() 
  } : route;
  return result;
};

// url参数转obj
const setQuery = () => {
  const url = window.location.href;
  let data = {};
  let surl = url.slice(url.indexOf('?') + 1).split('&');
  for (let i = 0; i < surl.length; i++) {
    const obj = surl[i].split('=');
    data[obj[0]] = obj[1];
  }
  return data;
};

// 配置拼接key
export const getFrontRoute = (operateQueryKeys, defaultValue) => {
  const availableValue = getAvailableValue(operateQueryKeys, defaultValue);
  if (availableValue) {
    return `${operateQueryKeys}=${availableValue}`;
  }
  return '';
};