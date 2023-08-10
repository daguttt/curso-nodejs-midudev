import http from 'node:http';

import { findAvailablePort } from './free-port';

const PORT = !process.env.PORT ? 3000 : Number(process.env.PORT);

const server = http.createServer((req, res) => {
  res.writeHead(202, 'Cool', {
    'X-Custom-Header': 'By Daguttt',
  });
  res.write('Hello, World! By Daguttt');
  res.end();
});

findAvailablePort(PORT)
  .then((port) => {
    server.listen(port, 'localhost', () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch(() => console.error("Error: Couldn't start the server."));
