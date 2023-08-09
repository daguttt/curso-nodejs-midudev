import http from 'node:http';

const PORT = !process.env.PORT ? 3000 : Number(process.env.PORT);

const server = http.createServer((req, res) => {
  res.writeHead(202, 'Cool', {
    'X-Custom-Header': 'By Daguttt',
  });
  res.write('Hello, World! By Daguttt');
  res.end();
});

server.listen(PORT, 'localhost', () => {
  console.log(`Server listening on port: ${PORT}`);
});
