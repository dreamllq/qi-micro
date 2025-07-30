const fs = require('fs');
const path = require('path');
const process = require('process')
const moduleFederationCommonShared = require('../module-federation-common/shared')
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

const scannerLocale = ()=>{
  const exposes = {};
  const config = [];
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
        exposes[`./locales/${file}`] = indexFilePath;
        config.push(file)
      }
    }
  })
  saveLocaleConfig(config)
  return exposes;
}

const saveLocaleConfig = (config)=>{
  if(!fs.existsSync(path.join(__dirname, '..', 'locales'))){
    fs.mkdirSync(path.join(__dirname, '..', 'locales'));
  }

  fs.writeFileSync(path.join(__dirname, '..', 'locales',`${pkg.name}.ts`), `
    export default ${JSON.stringify(config)}
  `)
}

module.exports = (env)=>{
  const shared = {
    ...moduleFederationCommonShared,
    ...manifest.shared
  };

  const localExpose = scannerLocale();
  const config = {
    name: pkg.name,
    filename: 'remoteEntry.js',
    exposes: {
      ...manifest.exposes,
      ...localExpose,
      "./support-languages": path.join(__dirname, '..', 'locales',  `${pkg.name}.ts`),
      "./main":path.join(__dirname, '..', 'main', pkg.name, 'index.ts'),
      "./routes": path.join(__dirname, '..', 'routes', pkg.name, 'index.ts'),
      "./public-path": path.join(__dirname, '..', 'public-path', pkg.name, 'index.ts')
    },
    library: { type: 'module' },
    remoteType: 'module',
    shared: Object.keys(shared).reduce((acc, key)=>{
      const {devVersion, ...configs} = shared[key];
      if(devVersion){
        if(env === 'development'){
          acc[key] = {
            ...configs,
            version: devVersion
          }
          return acc;
        }
      }
      acc[key] = {
        ...configs
      }
      return acc;
    }, {})
  }

  console.log('moduleFederation.exposes');
  console.log(config.exposes);
  
  
  return config;
};