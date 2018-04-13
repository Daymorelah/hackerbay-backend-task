import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './Routes';

const app = express();
const port = 2121;

if (app.get('env') !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.listen(port, (err) => {
  if (err) {
    throw (err);
  } else {
    console.log(`Server is up and runnig on port ${port} ...`);
  }
});

export default app;
