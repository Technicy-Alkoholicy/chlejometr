import path from 'path';
import colors from 'colors';

import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';

import mongoose from 'mongoose';

import sockets from './sockets/index.js';
import graphql from './graphql/index.js';

const app = express();
const MongoStore = connectMongo(session);

const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-igfew.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    const server = app.listen(port, () => console.log(`App listening on port: ${port}`.bold.green));

    app.use(
      session({
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        name: 'qid',
        secret: 'hfkhgjl',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production'
        }
      })
    );

    graphql(app);
    sockets(server);

    app.use(express.static(DIST_DIR));

    app.get('*', (req, res) => {
      res.sendFile(HTML_FILE);
    });
  })
  .catch(err => console.log(err));
