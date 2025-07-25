
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('node:child_process');
const getConfig = require('../../utils/get-config');
const lodash = require('lodash')
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))

module.exports = (options)=>{
  // qm-app-types-gen --npmGroupName @aaa && qm-app-types-publish
  const config = getConfig()
  const genParams = [];
  const npmGroupName = lodash.get(config, 'types.npmGroupName')
  const outDir = options.outDir
  if(npmGroupName){
    genParams.push('--npmGroupName')
    genParams.push(npmGroupName)
  }

  genParams.push('--outDir')
  genParams.push(path.join(outDir, pkg.name))
  
  spawnSync('qm-app-types-gen', genParams, {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  });

  // if(options.autoPublish){
  //   spawnSync('qm-app-types-publish', [], {
  //     cwd: process.cwd(),
  //     stdio: [process.stdin, process.stdout, process.stderr],
  //     shell: process.platform === 'win32'
  //   });
  // }
}