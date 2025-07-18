const { cosmiconfigSync } = require('cosmiconfig');
const explorerSync = cosmiconfigSync('qm')
const result = explorerSync.search();

module.exports = ()=>{
  if(result){
    return result.config
  } else {
    return {}
  }
}