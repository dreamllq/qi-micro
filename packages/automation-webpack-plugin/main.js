
    import { isArray, mergeWith, isObject } from 'lodash';

    import foundation from 'foundation/main';
import app from 'app/main';

    const toObject = (module) => Object.keys(module).reduce((acc, key) => {
      acc[key] = module[key];
      return acc;
    }, {});
    
    const customizer = (objValue, srcValue) => {
      if (isArray(objValue) && isArray(srcValue)) {
        return objValue.concat(srcValue);
      } else if (isObject(objValue) && isObject(srcValue)) {
        return mergeWith(toObject(objValue), toObject(srcValue), customizer);
      }
    };

    export default mergeWith(
      toObject(foundation),
toObject(app),
      customizer
    )
  