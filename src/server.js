const express = require('express');
const cors = require('cors');
const userRouter = require("./api/router");
const app = express();

app.use(cors());

app.use('/api', userRouter);

app.listen(3001)