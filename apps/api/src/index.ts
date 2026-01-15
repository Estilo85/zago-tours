import 'dotenv/config';
import { createServer } from './server';

const port = process.env.PORT || 3000;
const server = createServer();

server.listen(port, () => {
  console.log(`⚡️ [server]: API server is running on port ${port}`);
  console.log(
    `🌍 [server]: Environment: ${process.env.NODE_ENV || 'development'}`
  );
});
