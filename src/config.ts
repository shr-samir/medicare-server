import dotenv from 'dotenv';

dotenv.config();

const config = {
  serverPort: process.env.SERVER_PORT || 3000,
};

export default config;