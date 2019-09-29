const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");
const pageContent = require("../db/models/pageContent.js");

// ES6 Promises
mongoose.Promise = global.Promise;

// Get page content from json
router.get("/pageContent", async (req, res) => {
	try {
		let data = await pageContent.find();
		if (data.length) {
			res.send(data[0]);
		} else {
			fs.readFile(path.resolve('assets', '_pageContent.json'), 'utf8', async (err, data) => {
				if (err) {
					res.status(500).send(err);
				} else {
					let pageContentInstance = new pageContent(JSON.parse(data));

					try {
						res.send(await pageContentInstance.save());
					} catch (e) {
						res.status(500).send(e);
					}
				}
			})
		}
	} catch (e) {
		res.status(500).send(e);
	}
});

// Rewrite page content from json
router.post("/pageContent", jsonParser, async (req, res) => {

	try {
		await pageContent.replaceOne(
			{_id: req.body._id},
			req.body
		);
		res.send(req.body);
	} catch (e) {
		console.error(e);
		res.status(500).send(e);
	}

});

module.exports = router;