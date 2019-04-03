const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;
const User = require("../db/models/user.js");
const bcrypt = require('bcryptjs');


// ES6 Promises
mongoose.Promise = global.Promise;

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password"
		},
		function(username, password, done) {
			User.findOne({username: username})
				.then(user => {
					if (user) {
						bcrypt.compareSync(password, user.password)
							? done(null, user)
							: done(null, false, {message: "Wrong password!"});
					} else {
						done(null, false, {message: "Wrong username!"});
					}
				})
				.catch(done => console.error(done));
		}
	)
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  User.findById(id)
		.then(user => {
			done(null, user)
		})
		.catch(error => {
			done(error)
		})
});
