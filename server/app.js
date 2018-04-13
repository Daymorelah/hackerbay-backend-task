import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

const app = express();
const port = 2121;

if (app.get('env') !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) => {
  res.status(200).send({ message: 'welcome to the backend task' });
});

app.listen(port, (err) => {
  if (err) {
    throw (err);
  } else {
    console.log(`Server is up and runnig on port ${port} ...`);
  }
});

export default app;
