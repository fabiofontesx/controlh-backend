const express = require('express');
const routes = require('./routes');

require('dotenv').config();

require('./database');

const app = express();
app.use(express.json())
app.use(routes);

const server = app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
server.setTimeout(10000);