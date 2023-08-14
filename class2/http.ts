// import { Server } from 'node:http';
import { createServer, STATUS_CODES } from 'node:http';
import { readFile } from 'node:fs';
import { join } from 'node:path';

import { findAvailablePort } from '../class1/free-port';

// const serverRaw = new Server((req, res) => {
//   res.writeHead(200, 'OK', {
//     'Content-Type': 'text/plain',
//   });
//   res.write('Testing my serverRaw instance');
//   res.end('\nendsito');
// });

const IMAGE_PATH = './nodejs.png';

const server = createServer((req, res) => {
  //            ☝️ createSever() <-> new Server() same signature

  console.log();
  switch (req.url) {
    case '/': {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      });
      return res.end('Bienvenido a mi aplicación');
    }
    case '/my-png-image.png': {
      return readFile(
        join(__dirname, IMAGE_PATH),
        // { encoding: 'utf-8' }, // -> This isn't required
        (err, data) => {
          if (err) {
            console.log();
            console.log('Error: ', err);
            console.log();

            const statusCode = 500;
            const statusMessage = STATUS_CODES[statusCode];
            res.writeHead(statusCode, statusMessage, {
              'Content-Type': 'application/json',
            });
            const message = {
              error: statusMessage,
            };
            return res.end(JSON.stringify(message));
          }

          const statusCode = 200;
          res.writeHead(statusCode, 'OK', {
            'Content-Type': 'image/png',
          });
          res.end(data);
        }
      );
    }

    case '/favicon.ico': {
      return readFile(join(__dirname, IMAGE_PATH), (err, data) => {
        if (err) {
          console.log();
          console.log('Error: ', err);
          console.log();

          const statusCode = 500;
          const statusMessage = STATUS_CODES[statusCode];
          res.writeHead(statusCode, statusMessage, {
            'Content-Type': 'application/json',
          });
          const message = {
            error: statusMessage,
          };
          return res.end(JSON.stringify(message));
        }

        const statusCode = 200;
        res.writeHead(statusCode, 'OK', {
          'Content-Type': 'image/png',
        });
        res.end(data);
      });
    }

    default: {
      console.log();
      console.log({ url: req.url });
      console.log();

      const statusCode = 404;
      const statusMessage = STATUS_CODES[statusCode];
      res.writeHead(statusCode, statusMessage, {
        'Content-Type': 'application/json',
      });
      return res.end(JSON.stringify({ message: statusMessage }));
    }
  }
});

findAvailablePort(3000)
  .then((port) => {
    server.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch(() => console.error("Error: Couldn't start the server."));
