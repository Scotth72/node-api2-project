const express = require('express');

const server = express();
const postRouter = require('./Router/postRouter');

const port = 5000;
server.use(express.json());
server.use('/api/posts', postRouter);

// server.get('/', (req, res) => {
// 	res.send('Hello from Express');
// });

server.listen(port, () => console.log(`server listening on port ${port}`));
