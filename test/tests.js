// test/tests.js (redditTutorial)


// ===================================================================================
// ========================== INSTALLATIONS & DECLARATIONS ===========================
// ===================================================================================

const chai = require("chai");
const chaiHttp = require("chai-http");
const mocha = require("mocha");
const assert = chai.assert();
const should = chai.should();
const describe = mocha.describe();
const it = mocha.it();

chai.use(chaiHttp);