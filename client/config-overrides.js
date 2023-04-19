const { addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = function override(config, env) {
  return addWebpackAlias({
    '@auth': path.resolve(__dirname, 'src/features/Auth'),
    '@createRecipe': path.resolve(__dirname, 'src/features/CreateRecipe'),
    '@home': path.resolve(__dirname, 'src/features/Home'),
    '@navbar': path.resolve(__dirname, 'src/features/Navbar'),
    '@profile': path.resolve(__dirname, 'src/features/Profile'),
    '@viewRecipe': path.resolve(__dirname, 'src/features/ViewRecipe')
  })(config);
};
