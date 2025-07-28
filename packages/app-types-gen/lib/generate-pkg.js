const path = require('path');
const fs = require('fs');
module.exports = ({name, version, groupName='@llqm-types', exposes}, { outDir })=>{
  const packageJson = {
    "name": `${groupName}/${name}`,
    "version": `${version}`,
    "main": "",
    "scripts": {
      "publish:latest": "npm publish"
    },
    "types": "index.d.ts",
    "dependencies":{}
  };

  fs.writeFileSync(path.join(outDir, 'package.json'), JSON.stringify(packageJson, null,2), 'utf8')
  fs.writeFileSync(path.join(outDir, 'index.d.ts'), '');
}
