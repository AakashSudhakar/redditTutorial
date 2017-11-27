// authentication.js (redditTutorial/controllers)

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");


module.exports = (app) => {
    
      app.post('/login', (req, res, next) => {
        User
            .findOne({ username: req.body.username }, "+password", (err, user) => {
                if (!user) {
                    return res.status(401).send({ message: 'Wrong email or password' });
                };

                user.comparePassword(req.body.password, (err, isMatch) => {
                
                    if (!isMatch) {
                        return res.status(401).send({ message: 'Wrong email or password' });
                    }

                    let token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: "60 days" });
                    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                    res.redirect('/');
                });
            });
      });
    
        app.get('/logout', (req, res) => {
            res.clearCookie('nToken');
            res.redirect('/');
        });
    
        app.post('/sign-up', (req, res, next) => {
            let user = new User(req.body);
    
            user.save((err) => {
                if (err) {
                    return res.status(400).send({ err });
                }

                let token = jwt.sign({ id: user.id}, process.env.SECRET, { expiresIn: "60 days"});
                res.cookie('nToken', token, { maxAge: 900000, httpOnly: true});
                res.redirect('/');
            });
      });
}