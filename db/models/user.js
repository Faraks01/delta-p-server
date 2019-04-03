const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema and Model
const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

UserSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
  return bcrypt.hashSync(plainTextPassword, 10)
  }
}

UserSchema.pre('save', function(next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======');
    next();
	} else {
		console.log('models/user.js hashPassword in pre save');
    this.password = this.hashPassword(this.password);
		console.log(console.log(this.password));
    next();
	}
})

const User = mongoose.model("user", UserSchema);

module.exports = User;
