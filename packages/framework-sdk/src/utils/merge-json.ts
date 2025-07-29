import { isArray, mergeWith, isObject } from 'lodash';

const toObject = (module: any) => Object.keys(module).reduce((acc: any, key: string) => {
  acc[key] = module[key];
  return acc;
}, {});

const customizer = (objValue: any, srcValue: any) => {
  if (isArray(objValue) && isArray(srcValue)) {
    return objValue.concat(srcValue);
  } else if (isObject(objValue) && isObject(srcValue)) {
    return mergeWith(toObject(objValue), toObject(srcValue), customizer);
  }
};

export default (...args: any[]) => {
  const params = [...args.map(item => toObject(item)), customizer];
  return mergeWith(...params as [any, ...any[]]);
};