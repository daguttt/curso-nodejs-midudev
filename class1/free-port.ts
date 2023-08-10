import { createConnection, createServer } from 'node:net';

function getRandomPortFromTempServer() {
  return new Promise<number>((resolve, reject) => {
    const tempServer = createServer();
    tempServer.listen(0, () => {
      const addressInfo = tempServer.address();

      if (typeof addressInfo === 'string')
        return reject(new Error('IPC connection unsupported'));

      if (!addressInfo)
        return reject(new Error('No address info is set'));

      const { port } = addressInfo;
      tempServer.close(() => resolve(port));
    });
  });
}

function findAvailablePort(desiredPort: number) {
  return new Promise<number>((resolve, reject) => {
    const socket = createConnection({ port: desiredPort }, () => {
      getRandomPortFromTempServer()
        .then((randomPort) => resolve(randomPort))
        .catch((err: Error) => err);
      socket.destroy();
    });
    socket.on('error', (err: Error & { code: 'ECONNREFUSED' }) => {
      if (err.code !== 'ECONNREFUSED') reject(err);
      resolve(desiredPort);
    });
  });
}

export { findAvailablePort };
