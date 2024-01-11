import express from 'express';
import cors from 'cors';

import config from './config';
import routes from './routes/index.route';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/', routes);

// console.log(`Server is running at port:${config.serverPort}`);

app.listen(config.serverPort, () => {
  console.log('server is running at port:' + config.serverPort);
});
