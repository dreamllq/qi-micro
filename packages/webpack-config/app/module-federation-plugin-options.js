const fs = require('fs');
const path = require('path');
const process = require('process')
const moduleFederationCommonShared = require('../module-federation-common/shared')
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

//#region 国际化扫描
const scannerLocale = ()=>{
  const config = [];
  const loaderConfig = {};
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
        config.push(file)
        loaderConfig[file] = indexFilePath;
      }
    }
  })
  saveLocaleConfig(config)
  saveMessagesLoaders(loaderConfig)
}

const saveLocaleConfig = (config)=>{
  if(!fs.existsSync(path.join(__dirname, '..', 'locales'))){
    fs.mkdirSync(path.join(__dirname, '..', 'locales'));
  }

  fs.writeFileSync(path.join(__dirname, '..', 'locales',`${pkg.name}.ts`), `
    export default ${JSON.stringify(config)}
  `)
}

const saveMessagesLoaders = (loaderConfig)=>{
  if(!fs.existsSync(path.join(__dirname, '..', 'messages-loaders'))){
    fs.mkdirSync(path.join(__dirname, '..', 'messages-loaders'));
  }

  fs.writeFileSync(path.join(__dirname, '..', 'messages-loaders',`${pkg.name}.ts`), `
    export default {
      ${Object.keys(loaderConfig).map(l=> `'${l}': ()=>import('${loaderConfig[l]}')`)}
    }
  `)
}

//#endregion

module.exports = (env)=>{
  const shared = {
    ...moduleFederationCommonShared,
    ...manifest.shared
  };

  scannerLocale();
  const config = {
    name: pkg.name,
    filename: 'remoteEntry.js',
    exposes: {
      ...manifest.exposes,
      "./support-languages": path.join(__dirname, '..', 'locales',  `${pkg.name}.ts`),
      "./messages-loader": path.join(__dirname, '..', 'messages-loaders',  `${pkg.name}.ts`),
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

  return config;
};