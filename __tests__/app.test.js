process.env.ENVIRONMENT = "testing";
const Contact = require("../api/models/contacts");
const app = require("../app");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("SMS management", () => {
  beforeEach(done => {
    Contact.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe("The welcome route", () => {
    it("should show a welcome message", done => {
      chai
        .request(app)
        .get("/")
        .end((req, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("/GET contacts routes", () => {
    it("should show a list of all contacts", done => {
      chai
        .request(app)
        .get("/api/v1/contacts/")
        .end((req, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("/POST contacts route", () => {
    it("should create a new contact", done => {
      const newContact = {
        name: "collins",
        number: "09876545567"
      };
      chai
        .request(app)
        .post("/api/v1/contacts/")
        .send(newContact)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });

  describe("/GET single contact route", () => {
    it("should display a single contact", done => {
      const newContact = {
        name: "collins",
        number: "09876545567"
      };
      chai
        .request(app)
        .post("/api/v1/contacts/")
        .send(newContact)
        .end((err, res) => {
          chai
            .request(app)
            .get("/api/v1/contacts/" + res.body.createdContact._id)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        });
    });
  });

  describe("/PUT update single contact route", () => {
    it("should edit a single contact", done => {
      const newContact = {
        name: "collins",
        number: "09876545567"
      };

      const updateContactName = {
        name: "colontino"
      };

      chai
        .request(app)
        .post("/api/v1/contacts/")
        .send(newContact)
        .end((err, res) => {
          chai
            .request(app)
            .put("/api/v1/contacts/" + res.body.createdContact._id)
            .send(updateContactName)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        });
    });
  });
});
