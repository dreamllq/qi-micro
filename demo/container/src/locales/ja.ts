import {Language, mergeJson} from 'llqm-framework-sdk'
import * as foundation from 'foundation/locales/ja';
import * as app from 'app/locales/ja';

export default {[Language.JA]: mergeJson(foundation, app)};