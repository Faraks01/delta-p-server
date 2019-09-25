const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// Get page content from json
router.get("/pageContent", (req, res) => {

	fs.readFile(path.resolve('assets', 'pageContent.json'), 'utf8', (err, data) => {
		if (err) {
			// If pageContent is not exist get data from _pageContent
			fs.readFile(path.resolve('assets', '_pageContent.json'), 'utf8', (err, data) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.set({ 'content-type': 'application/json; charset=utf-8' });
					res.end(data);
				}
			})
		} else {
			res.set({ 'content-type': 'application/json; charset=utf-8' });
			res.end(data);
		}
	})

});

// Rewrite page content from json
router.post("/pageContent", jsonParser, (req, res) => {

	fs.readFile(path.resolve('assets', 'pageContent.json'), 'utf8', (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			let file = JSON.stringify(
				{
					...JSON.parse(data),
					...req.body
				}
			);

			fs.writeFile(path.resolve('assets', 'pageContent.json'), file, 'utf8', (err) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.end();
				}
			})
		}
	});

});

module.exports = router;