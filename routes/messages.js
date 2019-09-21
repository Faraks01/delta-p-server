const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer();
const nodemailer = require('nodemailer');
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");
const Feedback = require("../db/models/feedback");

// ES6 Promises
mongoose.Promise = global.Promise;

async function sendMail(data) {

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'deltap233233@gmail.com',
			pass: 'rfvbn765'
		}
	});

	// send mail with defined transport object
	let {_id, name, phone, email, message, attachments = {}} = data;
	let info = await transporter.sendMail({
		from: '"noreply" <deltap233233@gmail.com>', // sender address
		to: 'faraks01@gmail.com, info@delta-p.msk.ru', // list of receivers
		subject: `Сообщение: ${_id}`, // Subject line
		text: `Имя: ${name}, Телефон: ${phone}, Почта: ${email}, Сообщение: ${message}`, // plain text body
		attachments
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

// Delete from mongodb
router.post("/remove", jsonParser, function (req, res) {
	Feedback.deleteOne(req.body)
		.then(() => {
			res.end();
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

// POST in mongodb
router.post("/add", upload.any(), async (req, res) => {
	let form = JSON.parse(req.body.form);
	let feedback = new Feedback(form);
	try {
		let feedback_instance = await feedback.save();

		let attachments = req.files.map(({originalname, buffer}) => ({
			filename: originalname,
			content: buffer
		}));

		try {
			await sendMail({...form, _id: feedback_instance._id, attachments});
		} catch (e) {
			console.error(e);
		}

		res.end();
	} catch (e) {
		res.status(500).send(e);
	}
});

// GET from mongodb
router.get("/collection",
	function (req, res) {
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
