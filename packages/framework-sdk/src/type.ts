import { type Router } from 'vue-router';
export type InitFunction = (args:Config)=>void

export interface Config {
  getLoginUser:()=>any,
  router: Router
}

export type MenuItem = {
  key: string,
  label:string,
  permissionKey?:string,
  icon?: string,
  subPages?: string[]
}

export type MenuItemConfig = {[key:string]:MenuItem}

export type MenuConfig = {[key:string]:MenuItemConfig}