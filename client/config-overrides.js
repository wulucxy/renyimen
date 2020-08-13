const { override, fixBabelImports, addBabelPlugins, addLessLoader } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins(['transform-promise-to-bluebird']),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1890ff' },
    }
  }),
);
