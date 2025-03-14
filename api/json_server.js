import { createServer } from 'json-server';
import path from 'path';

export default (req, res) => {
  const server = createServer();
  
  const dbPath = path.resolve('data_base.json');
  server.db = new jsonServer.defaults({ db: dbPath }).db;

  server.use(jsonServer.defaults());
  server.use(server.router(dbPath));
  
  return server(req, res);
}