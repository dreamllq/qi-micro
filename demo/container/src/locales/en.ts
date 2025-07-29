import {Language, mergeJson} from 'llqm-framework-sdk'
import * as foundation from 'foundation/locales/en';
import * as app from 'app/locales/en';

export default {[Language.EN]: mergeJson(foundation, app)};