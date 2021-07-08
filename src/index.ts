import express from 'express';
import config from './config';
import Loaders from './loaders';
import Logger from './loaders/logger';
import { intializeScheduler, startScheduler } from './shared/scheduler';

async function startServer() {
  const app = express();

  await Loaders({ expressApp: app });

  await intializeScheduler();

  await startScheduler();

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
