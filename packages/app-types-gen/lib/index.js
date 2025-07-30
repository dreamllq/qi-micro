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

const scannerLocal = ()=>{
  const exposes = {};
  const localDir = path.join(process.cwd(), 'src', 'locales');
  if(!fs.existsSync(localDir)) return exposes;
  const files = fs.readdirSync(localDir);
  files.forEach(file=>{
    const filePath = path.join(localDir, file);
    if(fs.statSync(filePath).isDirectory()){
      const indexTsFilePath = path.join(filePath, 'index.ts');
      const indexJsFilePath = path.join(filePath, 'index.js');

      const indexFilePath = [
        indexTsFilePath,
        indexJsFilePath
      ].find(file=>fs.existsSync(file));

      if(indexFilePath){
        exposes[`./locales/${file}`] = path.relative(process.cwd(), indexFilePath);
      }
    }
  })

  return exposes;
}

module.exports = ({npmGroupName, outDir})=>{
  const localsExposes = scannerLocal();
  const _outDir = path.join(process.cwd(), outDir);
  const exposes = {
    ...manifest.exposes,
    ...localsExposes
  };
  generateTsc(exposes, {outDir: _outDir});
  generateExportFiles(exposes, {outDir: _outDir});
  generatePkg({name: pkg.name, version:pkg.version, groupName:npmGroupName, exposes}, {outDir:_outDir});
}

module.exports.publish = (outDir)=>{
  const _outDir = path.join(process.cwd(), outDir);
  typesPublish({outDir: _outDir})
}
