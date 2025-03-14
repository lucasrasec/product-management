
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://seu-usuario.github.io/nome-do-repositorio/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/nome-do-repositorio"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23617, hash: '0987d645820fcec1447c8ffabdbd472520aa3d908bf3b42d71b1e5ed3a72eb8d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17191, hash: '6515cc8228db6074f76352c687573471d5accb9fcfd325064cd43563a1251915', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 96696, hash: '88142d073bfd3ecccfe2eb911aa5c7be2879df77c1bb16e1c7f88f9d258fa56f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
