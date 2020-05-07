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
		if (!info.title || !info.contents) {
			return res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
		}
	}
});

router.post('/:id/comments', (res, req) => {
	const id = req.params.id;

	db
		.findById(id)
		.then((posts) => {
			const findPost = posts.find((post) => post.id == id);

			if (!findPost) {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			} else {
				if (!req.body.text) {
					res.statusCode(400).json({ errorMessage: 'Please provide text for the comment.' });
				} else {
					db.insertComment(req.body).then((comment) => {
						res.status(201).json(comment);
					});
				}
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error while saving the comment to the database' });
		});
});

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

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	db.findById(id).then((post) => {
		const findPost = post.find((post) => post.id == id);

		if (!findPost) {
			res.status(404).json({ message: 'The post with the specified ID does not exist.' });
		} else {
			db
				.remove(id)
				.then((removePost) => {
					res.json(removePost);
				})
				.catch((err) => {
					res.status(500).json({ error: 'The post could not be removed' });
				});
		}
	});
});

router.put('/:id', (req, res) => {});

module.exports = router;
