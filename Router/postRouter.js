const express = require('express');
const router = express.Router();

const db = require('../data/db');

// router.get('/', (req, res) => {
// 	res.status(200).send(' Hello from GET');
// });

router.get('/', (req, res) => {
	res.send('getting back data from router');
});

module.exports = router;
