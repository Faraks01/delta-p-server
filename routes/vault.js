const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");
const Feedback = require("../db/models/feedback");

// ES6 Promises
mongoose.Promise = global.Promise;

// Delete from mongodb
router.post("/remove", jsonParser, function(req, res) {
	Feedback.deleteOne(req.body)
		.then(() => {
			res.end();
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

// POST in mongodb
router.post("/add", jsonParser, function(req, res) {
	let feedback = new Feedback(req.body);
	feedback
		.save()
		.then(() => {
			res.end();
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

// Save file
router.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let file = req.files.file;
	let str = "./db/uploaded-files/" + file.name;
//
  file.mv(str, function(err) {
    if (err) return res.status(500).send(err);
    res.send('File uploaded!');
  });
});

// GET from mongodb
router.get("/collection",
	function(req, res) {
		if (req.body) {
			Feedback.find()
				.then(result => {
					res.send(result);
				})
				.catch(err => {
					if (err) console.error(err);
					res.end();
				});
		} else {
			res.status(403).send();
		}
	}
);

module.exports = router;
