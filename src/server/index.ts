import * as bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
const cors = require('cors');

import stations from './routes/stations';
import journeys from './routes/journeys';

export const app = express();
const buildPath = path.join(process.cwd() + '/build');
app.use(cors({
  origin:'https://localhost:5000',
  credentials:true
}))

/**
 * Express routes and middlewares
 */
app.use(express.static(buildPath));
app.get('/', (_, res) => res.sendFile(path.join(buildPath, 'index.html')));

app.use(bodyParser.json({ limit: '300kb' }));
// app.use((req, res, next) => {
//   res.setHeader('Allow-Control-Allow-Origin', '*');
// res.setHeader('Allow-Control-Allow-Headers', 'Origin,X-Requested-With, Content-Type,Accept, Authorization');
// res.setHeader('Allow-Control-Allow-Methods', 'GET, POST,PATCH,DELETE');
//   next();
// })
app.get('/ping', (_, res) => res.send('pong'));
app.get('/stations', stations);
app.get('/journeys', journeys);

/**
 * App server
 */
const tlsServerOptions = {
  key: fs.readFileSync('dev-certs/server-key.pem'),
  cert: fs.readFileSync('dev-certs/server-crt.pem'),
};
const port = process.env.EXPRESS_PORT || 8443;
export const server = https
  .createServer(tlsServerOptions, app)
  .listen(port, () => {
    console.log(`Express server listening on port: ${port}`);
  });
