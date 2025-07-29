import {Language, mergeJson} from 'llqm-framework-sdk'
import  foundation from 'foundation/locales/ja';
import  app from 'app/locales/ja';

export default {[Language.JA]: mergeJson(foundation, app)};