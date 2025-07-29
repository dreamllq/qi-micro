import {Language, mergeJson} from 'llqm-framework-sdk'
import foundation from 'foundation/locales/zh-cn';
import app from 'app/locales/zh-cn';

export default {[Language.ZH_CN]: mergeJson(foundation, app)};