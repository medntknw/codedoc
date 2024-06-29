const express = require('express');
const http = require('http');
const cors = require('cors');
const WebSocket = require('ws');
const Y = require('yjs');
const { setupWSConnection } = require('y-websocket/bin/utils');

const app = express();
const allowedOrigins = ['http://localhost', 'https://codedoc-frontend.vercel.app'];
app.use(cors(
  {
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type",
    credentials: true
  }
));
app.use(express.json());
const server = http.createServer(app);
const msecs = 240000
server.setTimeout(msecs)
const wss = new WebSocket.Server({ server });

const rooms = new Map();

wss.on('connection', (ws, req) => {
  const roomId = req.url.split('/')[2];
  if (!rooms.has(roomId)) {
    const doc = new Y.Doc();
    rooms.set(roomId, doc);
  }
  const doc = rooms.get(roomId);
  setupWSConnection(ws, req, {doc});
});

app.get('/test', (req, res) => {
  res.send('Hello!');
});

server.listen(1234, () => {
  console.log('Server is listening on port 1234');
});
