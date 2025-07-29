import {Language, mergeJson} from 'llqm-framework-sdk'
import * as foundation from 'foundation/locales/zh-cn';
import * as app from 'app/locales/zh-cn';

export default {[Language.ZH_CN]: mergeJson(foundation, app)};