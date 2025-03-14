
export default {
  basePath: 'https://seu-usuario.github.io/nome-do-repositorio',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
