
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/product_manager/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/product_manager"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23584, hash: '9b2e8a05ab640e136503128526cb7e634bd10083ccad501b40253dbe4938ec0a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17158, hash: 'b58f25901c849c4186a28daecb557827cada454a9493a040faa700abd724738c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 96663, hash: '104e653cb1b490a975e7f500bed70c17129810cf13f28c2926cd3e13dde95ab6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
