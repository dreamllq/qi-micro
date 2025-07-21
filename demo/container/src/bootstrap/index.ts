import start from 'foundation/start';
import { env } from '@llqm/framework-sdk';


start();

const replaceFavicon = (src) => {
  const link = document.createElement('link');
  link.rel = 'shortcut icon';
  link.href = src; // 替换为新的 favicon 图片路径
 
  // 获取 head 元素，并移除旧的 link 标签
  const head = document.querySelector('head');
  const oldLink = document.querySelector('link[rel="shortcut icon"]');
  if (oldLink) {
    head?.removeChild(oldLink);
  }
 
  // 添加新的 link 标签到 head 元素
  head?.appendChild(link);
};