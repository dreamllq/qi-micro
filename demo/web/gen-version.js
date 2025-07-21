const path = require('path');
const fs = require('fs');

const containerVersionFilePath = path.join(__dirname, 'container-version.json');
const appsVersionFilePath = path.join(__dirname, 'app-versions.json');

const containerPkgPath = path.join(__dirname, 'public', 'package.json');
const containerPkg = JSON.parse(fs.readFileSync(containerPkgPath, 'utf8'))

fs.writeFileSync(containerVersionFilePath, JSON.stringify(containerPkg.version))

const appsPath = path.join(__dirname, 'public', 'app');

const apps = {}
fs.readdirSync(appsPath).forEach(appName=>{ 
  const appPath = path.join(appsPath, appName);
  const appPkgPath = path.join(appPath, 'package.json');
  const appPkg = JSON.parse(fs.readFileSync(appPkgPath, 'utf8'))
  apps[appName] = appPkg.version;
})

fs.writeFileSync(appsVersionFilePath, JSON.stringify(apps))

