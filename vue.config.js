module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/f2e-salary/'
    : '/',
  transpileDependencies: [
    'vue-meta',
  ],
};
