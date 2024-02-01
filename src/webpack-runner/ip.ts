import {networkInterfaces} from 'node:os';

export function getLocalIp(): string {
  return (
    Object.values(networkInterfaces())
      .flat()
      .find(net => net !== undefined && net.family === 'IPv4' && net.address.startsWith('192.168.'))
      ?.address ?? '127.0.0.1'
  );
}
