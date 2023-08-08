const http = require('node:http');

const PORT = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
  // res.statusCode = 200;
  // res.setHeader('X-Custom-Header', 'By Daguttt')
  res.writeHead(201, 'Cool', {
    'X-Custom-Header': 'By Daguttt'
  })
  res.write('Hello, World! By Daguttt');
  res.end()
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port: ${PORT}`);
})