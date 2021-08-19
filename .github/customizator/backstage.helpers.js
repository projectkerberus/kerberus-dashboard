var fs = require('fs');
var path = require('path');
var colors = require('colors');
const { runNodeCommand } = require('./node.helpers');
const { concatString } = require('./string.helpers');
const { copyFile, mergeFiles } = require('./filesystem.helpers');

const k8s_fe = (
  backstageFolder,
  pluginName,
  importCode,
  routeCode,
  message,
  log = true,
) => {
  try {
    runNodeCommand(
      `yarn --cwd ${backstageFolder} workspace example-app add ${pluginName} -s --non-interactive --no-progress`,
    );
    concatString(
      path.join(
        backstageFolder,
        'packages/app/src/components/catalog/EntityPage.tsx',
      ),
      [
        {
          s: "import { EmptyState } from '@backstage/core-components';",
          r: importCode,
        },
        {
          s: '</EntityLayout>',
          r: routeCode,
          b: true,
        },
      ],
      `Add ${pluginName} to EntityPage`,
    );
    if (log) console.log(`- ${message}`.green);
  } catch (err) {
    if (log) console.log(`- ${message}`.red);
  }
};

const k8s_be = (
  backstageFolder,
  customizatorFolder,
  pluginName,
  tsFile,
  importCode,
  memo,
  routeCode,
  message,
  log = true,
) => {
  try {
    runNodeCommand(
      `yarn --cwd ${backstageFolder} workspace example-backend add ${pluginName} -s --non-interactive --no-progress`,
    );
    copyFile(
      path.join(customizatorFolder, tsFile),
      path.join(
        backstageFolder,
        'packages/backend/src/plugins/',
        path.basename(tsFile),
      ),
      null,
      false,
    );
    concatString(
      path.join(backstageFolder, 'packages/backend/src/index.ts'),
      [
        {
          s: "import { PluginEnvironment } from './types';",
          r: importCode,
        },
        {
          s: "const appEnv = useHotMemoize(module, () => createEnv('app'));",
          r: memo,
        },
        {
          s: 'apiRouter.use(notFoundHandler());',
          r: routeCode,
          b: true,
        },
      ],
      `Add ${pluginName} to index.ts`,
    );
    mergeFiles(
      path.join(backstageFolder, 'app-config.yaml'),
      path.join(customizatorFolder, './files/backend/kubernetes.yaml'),
      'Add kubernetes section to to app-config.yaml',
    );
    if (log) console.log(`- ${message}`.green);
  } catch (err) {
    if (log) console.log(`- ${message}`.red);
  }
};

exports.k8s_fe = k8s_fe;
exports.k8s_be = k8s_be;
