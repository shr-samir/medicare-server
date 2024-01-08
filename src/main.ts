import express from 'express';
import config from './config';
import routes from './routes';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

// console.log(`Server is running at port:${config.serverPort}`);

app.listen(config.serverPort, () => {
  console.log('server is running at port:' + config.serverPort);
});
