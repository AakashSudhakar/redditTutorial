// server.js (redditTutorial)
// (C) 2017, Aakash Sudhakar


// ===================================================================================
// ========================== INSTALLATIONS & DECLARATIONS ===========================
// ===================================================================================


const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

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


app.use(bodyParser.urlencoded({ extended: true }));     // Initialize bodyParser

app.engine(".handlebars", exphbs({
    defaultLayout: "main"
}));
app.set('view engine', 'handlebars');




// ===================================================================================
// ====================================== MAIN =======================================
// ===================================================================================


require("./controllers/posts.js")(app);                 // Requires posts.js module
require('./controllers/comments.js')(app);              // Requires comments.js module

let port = 3000;

app.listen(port, () => {
    console.log("Example app listening on port 3000");
});
