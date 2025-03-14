
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/product_management/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/product_management"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23587, hash: '43554666f03bc74e2671f9562e8a0be19f3c29d257ffddcab79be8f8f9f5eab9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17161, hash: '5c742f70929f0c6c7b176e32747b0f1e242cdbfaa929c0cdcac649809c60f695', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 96666, hash: '4f5e3e77084f71768f97813ab428cc0f4cc8ffdc2bfb453482597e5fc38ac855', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
