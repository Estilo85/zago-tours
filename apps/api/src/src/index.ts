import { config } from 'dotenv';
import { createServer } from './server';

// Load environment
config();

const port = process.env.PORT || 3000;
const server = createServer();

server.listen(port, () => {
  console.log(`⚡️ [server]: API server is running on port ${port}`);
  console.log(
    `🌍 [server]: Environment: ${process.env.NODE_ENV || 'development'}`
  );
});
