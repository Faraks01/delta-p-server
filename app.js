const express = require("express");
const path = require("path");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const helmet = require('helmet');
const app = express();
const fileUpload = require('express-fileupload');
require('./config/passport-setup');

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(cookieParser());
app.use(session({ secret: 'zzh7bnk', cookie: { maxAge: 7200000, httpOnly: false }, resave: false, saveUninitialized: false }));


// Passport:
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/vault", require("./routes/vault"));
app.use("/auth", require("./routes/auth"));

app.use(express.static(path.join(__dirname, "build")));
app.get('/*', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

module.exports = app;
