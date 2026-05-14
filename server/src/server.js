import app from './app.js';
import { config } from './config/env.js';
import { testConnection } from './config/db.js';

const startServer = async () => {
  await testConnection();
  
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

startServer();
