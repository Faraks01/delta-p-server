const express = require("express");
const router = express.Router();
const passport = require('passport');

router.post('/sign_in',
    passport.authenticate('local'),
    (req, res) => {
        let userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
);

router.get('/sign_out', function (req, res) {
    req.logout();
    res.end();
});

router.get('/check',
    (req, res) => {
        res.end(JSON.stringify(req.user));
    }
)

module.exports = router;