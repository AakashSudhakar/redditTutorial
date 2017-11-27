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
const request = chai.request();
const it = mocha.it();

chai.use(chaiHttp);


// ===================================================================================
// ===================================== TESTS =======================================
// ===================================================================================


describe("Site", () => {
    it("Should have a live home page", (done) => {
        request("localhost:3000")
            .get("/")
            .end((err, res) => {
                res.status.should.be.equal(200);
                done();
            });
    });
});