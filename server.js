// server.js (redditTutorial)
// (C) 2017, Aakash Sudhakar


// ===================================================================================
// ========================== INSTALLATIONS & DECLARATIONS ===========================
// ===================================================================================


const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();


// ===================================================================================
// ============================== INITIALIZERS: MONGODB ==============================
// ===================================================================================


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/redditclone", { useMongoClient: true });
mongoose.connection.on("error", console.error.bind(console, "MongoDB Connection Error: "));
mongoose.set("debug", true);


// ===================================================================================
// ============================== INITIALIZERS: EXPRESS ==============================
// ===================================================================================


app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: true }));     // Initialize bodyParser
app.engine(".handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// ===================================================================================
// ============================ VERIFY USER AUTHENTICATION ===========================
// ===================================================================================


let verifyUserAuth = (req, res, next) => {
    console.log("Verifying user authentication...\n");

    // Check if user has JWT token and decode it if it exists
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } 
    else {
        let tokenEncrypted = req.cookies.nToken;
        let tokenDecrypted = jwt.decode(tokenEncrypted, { complete: true }) || {};

        req.user = tokenDecrypted.payload;
    }
    next();
};

app.use(verifyUserAuth);


// ===================================================================================
// ====================================== MAIN =======================================
// ===================================================================================


require("./controllers/posts.js")(app);                 // Requires posts.js module
require("./controllers/comments.js")(app);              // Requires comments.js module
require("./controllers/user.js")(app);                  // Requires users.js module

app.get("/", (req, res) => {
    Post
        .find((err, posts) => {
            let currentUser;

            if (req.user) {
                currentUser = req.user.id;
            }
            else {
                currentUser = 0;
            }
        })
        .then((posts, currentUser) => {
            res.render("home", { post, currentUser });
        })
        .catch((err) => {
            console.error(err.message);
        });
});

app.get("/posts/new", (req, res) => {
    Post
        .find((err, posts) => {
            let currentUser;

            if (req.user) {
                currentUser = req.user.id;
            }
            else {
                currentUser = 0;
            }
        })
        .then((posts, currentUser) => {
            res.render("posts-new", { currentUser });            
        })  
        .catch((err) => {
            console.error(err.message);
        })
});

app.get("/posts/:id", (req, res) => {
    Post
        .findById(req.params.id)
        .populate("author")
        .exec((err, post) => {
            let currentUser;

            if (req.user) {
                currentUser = req.user.id;
            }
            else {
                currentUser = 0;
            }
        })
        .then((post, currentUser) => {
            console.log(`COMMENTS\n${post.comments}\n${post.subreddit}`);
            
            res.render("posts-show", { post, currentUser, comments: post.comments });
        })
        .catch((err) => {
            console.error(err.message);
        })
});

app.get("/r/:subreddit", (req, res) => {
    Post
        .find({ subreddit: req.params.subreddit })
        .exec((err, posts) => {
            let currentUser;

            if (req.user) {
                currentUser = req.user.id;
            }
            else {
                currentUser = 0;
            }
        })
        .then((posts, currentUser) => {
            res.render("posts-index", { posts, currentUser });
        })
        .catch((err) => {
            console.error(err.message);
        });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/sign-up", (req, res) => {
    res.render("sign-up");
});

app.post("/sign-up", (req, res, next) => {
    let user = new User(req.body);

    user.save((err) => {
        if (err) {
            return res.status(400).send({ err });
        }

        res.redirect("/");
    });
});

let port = 3000;
app.listen(port, () => {
    console.log("Example app listening on port 3000");
});
