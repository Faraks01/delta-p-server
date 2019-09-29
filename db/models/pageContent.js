const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema and Model
const PageContentSchema = new Schema({
	aboutSection: {
		title: String,
		description: String
	},
	feedbackSection: {
		title: String,
		submit_btn: String,
		upload_btn: String,
		form: {
			label_1: {
				title: String,
				errors: [String]
			},
			label_2: {
				title: String,
				errors: [String]
			},
			label_3: {
				title: String,
				errors: [String]
			},
			label_4: {
				title: String,
				errors: [String]
			}
		}
	},
	footer: {
		title: String,
		menu: [String]
	},
	homepageSection: {
		title: String,
		caption: String,
		description: String
	},
	infoSection: {
		title: String,
		text: String,
		cards: [
			{
				title: String,
				text_1: String,
				text_2: String
			}
		]
	},
	navbar: [String],
	workDirectionsSection: {
		part_1: {
			title: String,
			cards: [
				{
					title: String,
					caption: String,
					link: String,
					content: {
						title: String,
						content: String
					}
				}
			]
		},
		part_2: {
			title: String,
			list: [String]
		}
	}
});

module.exports = mongoose.model("pagecontent", PageContentSchema);
