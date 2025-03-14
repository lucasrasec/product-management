
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/project_management/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/project_management"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23587, hash: 'ebc8df5bdf53c6094314e58abf128f96994990a54e195f3861aef518efa028a7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17161, hash: 'c3e8c6d15cb17552897d45641fb06a09958e273118bdd2d976b7babd5e451174', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 96666, hash: 'b024eb12940ca3b9fe4d2846b4d1f9a7ef34a73c407715e2e1e0a14c132d1316', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
