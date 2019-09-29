const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema and Model
const PageContentSchema = new Schema({
	"aboutSection": {
		"title": String,
		"description": String
	},
	"feedbackSection": {
		"title": String,
		"submit_btn": String,
		"upload_btn": String,
		"form": {
			"label_1": {
				"title": String,
				"errors": Array
			},
			"label_2": {
				"title": String,
				"errors": Array
			},
			"label_3": {
				"title": String,
				"errors": Array
			},
			"label_4": {
				"title": String,
				"errors": Array
			}
		}
	},
	"footer": {
		"title": String,
		"menu": Array
	},
	"homepageSection": {
		"title": String,
		"caption": Array,
		"description": String
	},
	"infoSection": {
		"title": String,
		"text": String,
		"cards": [
			{
				"title": String,
				"text_1": String,
				"text_2": String
			}
		]
	},
	"navbar": Array,
	"workDirectionsSection": {
		"part_1": {
			"title": String,
			"cards": [
				{
					"title": String,
					"caption": String,
					"link": String,
					"content": {
						"title": String,
						"content": String
					}
				}
			]
		},
		"part_2": {
			"title": String,
			"list": Array
		}
	}
});

const pageContentModel = mongoose.model("pageContent", PageContentSchema);

module.exports = pageContentModel;
