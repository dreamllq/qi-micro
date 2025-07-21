const path = require('path');
const fs = require('fs');
const process = require('process')
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

const generateTsc  = require('./generate-tsc')
const generatePkg = require('./generate-pkg')
const typesPublish = require('./types-publish')
const generateExportFiles = require('./generate-export-files')

// const outDir = path.join(__dirname, '..', pkg.name, 'exposes-types');

module.exports = ({npmGroupName, outDir})=>{

  const _outDir = path.join(process.cwd(), outDir);
  const exposes = {
    "./locales": "./src/locales/index.ts",
    ...manifest.exposes
  };
  generateTsc(exposes, {outDir: _outDir});
  generateExportFiles(exposes, {outDir: _outDir});
  generatePkg({name: pkg.name, version:pkg.version, groupName:npmGroupName, exposes}, {outDir:_outDir});
}

module.exports.publish = (outDir)=>{
  const _outDir = path.join(process.cwd(), outDir);
  typesPublish({outDir: _outDir})
}
