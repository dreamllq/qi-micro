import { getLoginUserInfo, env } from 'llqm-framework-sdk';
import { appsData } from 'llqm-framework-sdk';

const options = {
  permissionKeys: async () => {
    return [];
  },
  checkPermission: (key: string, permissionKeys: string[]) => true
};

export const permissionOptions = options;