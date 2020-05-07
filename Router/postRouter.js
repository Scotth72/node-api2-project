const express = require('express');
const db = require('../data/db');
const router = express.Router();

// router.post('/', (req, res) => {
// 	const info = req.body;
// 	console.log(req.body);
// 	if (info.title && info.contents) {
// 		db
// 			.insert(info)
// 			.then((post) => {
// 				res.status(201).json(post);
// 			})
// 			.catch((err) => {
// 				res.status(500).json({ error: 'There was an error while saving the post to the database' });
// 			});
// 	} else {
// 		res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
// 	}
// });

// router.post('/api/post/:id/comments', (req,req) => {

// });

router.get('/', (req, res) => {
	// res.json({ query: res.query });
	db
		.find(req.query)
		.then((posts) => {
			console.log(req.query);
			res.status(200).json(posts);
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error while saving the comment to the database' });
		});
});

router.get('/:id', (req, res) => {
	db
		.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(500).json({ error: 'The post information could not be retrieved.' });
			}
		})
		.catch((error) => {
			res.status(404).json({ message: 'The post with the specified ID does not exist.' });
		});
});

router.get('/:id/comments', (req, res) => {
	db.findById(req.params.id).then((id) => {
		db
			.findPostComments(req.params.id)
			.then((comments) => {
				res.status(200).json(comments);
			})
			.catch((err) => {
				res.status(500).json({ error: 'The comments information could not be retrieved.' });
			});
	});
});

module.exports = router;
