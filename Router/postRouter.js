const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.post('/', (req, res) => {
	const info = req.body;
	console.log(req.body);
	if (info.title && info.contents) {
		db
			.insert(info)
			.then((post) => {
				res.status(201).json(post);
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error while saving the post to the database' });
			});
	} else {
		res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
	}

	// router.post('/api/post/:id/comments', (req,req) => {

	// });

	router.get('/api/posts', (req, res) => {});
});

module.exports = router;
