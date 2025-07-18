const path = require('path');
const fs = require('fs');
module.exports = ({name, version, groupName='@llqm-microapp-types', exposes}, { outDir })=>{
  const packageJson = {
    "name": `${groupName}/${name}`,
    "version": `${version}`,
    "scripts": {
      "publish:latest": "npm publish"
    },
    "types": "index.d.ts",
    "dependencies":{}
  };

  fs.writeFileSync(path.join(outDir, 'package.json'), JSON.stringify(packageJson, null,2), 'utf8')
}
