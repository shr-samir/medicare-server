import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  serverPort: process.env.SERVER_PORT || 3000,

  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET
  },
};

export default serverConfig;
