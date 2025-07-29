import {Language, mergeJson} from 'llqm-framework-sdk'
import  foundation from 'foundation/locales/en';
import  app from 'app/locales/en';

export default {[Language.EN]: mergeJson(foundation, app)};