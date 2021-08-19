var path = require('path');
var colors = require('colors');
const {
  copyFile,
  copyContentFolder,
  createFolder,
} = require('./filesystem.helpers');
const { replaceString } = require('./string.helpers');
const { addPropertyToJsonFile } = require('./json.helpers');
const { k8s_fe, k8s_be } = require('./backstage.helpers');

// SETTINGS
// const backstageFolder = '/Users/maurosala/Dev/backstage/test'
const customizatorFolder = '.github/customizator';
const backstageFolder = '.';

console.clear();
console.log('#################################'.grey);
console.log('# Customizator for Backstage.io #'.grey);
console.log('#################################'.grey);

// APP
console.log(`\nApp`.black.bgGreen);
copyFile(
  path.join(customizatorFolder, 'files/app/Dockerfile'),
  path.join(backstageFolder, 'packages/app', 'Dockerfile'),
  'Copy Dockerfile',
);
addPropertyToJsonFile(
  path.join(backstageFolder, 'packages/app', 'package.json'),
  'scripts.build-image',
  'docker build ../.. -f Dockerfile --tag example-app',
  'Add build-image to scripts section in package.json',
);
copyFile(
  path.join(customizatorFolder, 'files/app/LogoFull.tsx'),
  path.join(
    backstageFolder,
    'packages/app/src/components/Root',
    'LogoFull.tsx',
  ),
  'Copy Logo Full',
);
copyFile(
  path.join(customizatorFolder, 'files/app/LogoIcon.tsx'),
  path.join(
    backstageFolder,
    'packages/app/src/components/Root',
    'LogoIcon.tsx',
  ),
  'Copy Logo Icon',
);
copyContentFolder(
  path.join(customizatorFolder, 'files/app/public'),
  path.join(backstageFolder, 'packages/app/public'),
  'Copy Public folder',
);
createFolder(path.join(backstageFolder, 'docker'), 'Create root docker folder');
copyContentFolder(
  path.join(customizatorFolder, 'files/common/docker'),
  path.join(backstageFolder, 'docker'),
  'Copy docker folder to repo root',
);
// replaceString(
//   path.join(
//     backstageFolder,
//     'node_modules/@backstage/plugin-search/dist/index.esm.js'
//   ),
//   [{ s: 'Search in Backstage', r: 'Search in Kerberus' }],
//   'Replace Search placeholder'
// )
k8s_fe(
  backstageFolder,
  '@backstage/plugin-kubernetes',
  "import { EntityKubernetesContent } from '@backstage/plugin-kubernetes';",
  '<EntityLayout.Route path="/kubernetes" title="Kubernetes"><EntityKubernetesContent /></EntityLayout.Route>',
  'Add Kubernetes plugin',
);

// BACKEND
console.log(`\nBackend`.black.bgGreen);
copyFile(
  path.join(customizatorFolder, 'files/backend/Dockerfile'),
  path.join(backstageFolder, 'packages/backend', 'Dockerfile'),
  'Copy Dockerfile',
);
addPropertyToJsonFile(
  path.join(backstageFolder, 'packages/backend', 'package.json'),
  'scripts.build-image',
  'docker build ../.. -f Dockerfile --tag example-backend',
  'Add build-image to scripts section in package.json',
);
k8s_be(
  backstageFolder,
  customizatorFolder,
  '@backstage/plugin-kubernetes-backend',
  'files/backend/kubernetes.ts',
  "import kubernetes from './plugins/kubernetes';",
  "const kubernetesEnv = useHotMemoize(module, () => createEnv('kubernetes'));",
  "apiRouter.use('/kubernetes', await kubernetes(kubernetesEnv));",
  'Add Kubernetes plugin',
);

// COMMON
console.log(`\nProject`.black.bgGreen);
addPropertyToJsonFile(
  path.join(backstageFolder, '', 'package.json'),
  'scripts.docker-build-frontend',
  'yarn workspace example-app build-image',
  'Add docker-build-frontend to scripts section in package.json',
);
addPropertyToJsonFile(
  path.join(backstageFolder, '', 'package.json'),
  'scripts.docker-build-backend',
  'yarn tsc && yarn workspace example-backend build --build-dependencies && yarn workspace example-backend build-image',
  'Add docker-build-backend to scripts section in package.json',
);
