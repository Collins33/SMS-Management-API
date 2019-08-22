process.env.ENVIRONMENT = "testing";
const Contact = require("../api/models/contacts");
const Sms = require("../api/models/sms");
const app = require("../app");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("SMS management", () => {
  beforeEach(done => {
    Sms.remove({}, err => {
      if (err) console.log(err);
    });
    Contact.remove({}, err => {
      if (err) console.log(err);
    });
    done();
  });

  describe("/GET sms routes", () => {
    it("should return a list of created sms", done => {
      chai
        .request(app)
        .get("/api/v1/sms")
        .end((req, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("/POST sms route", () => {
    it("should create a message", done => {
      const newContact = {
        name: "collins",
        number: "09876545567"
      };
      chai
        .request(app)
        .post("/api/v1/contacts/")
        .send(newContact)
        .end((err, res) => {
          const receiverId = res.body.createdContact._id;
          const smsCreated = {
            message: "Tumefika",
            receiverContactId: String(receiverId),
            senderContactId: String(receiverId),
            status: "sent"
          };
          chai
            .request(app)
            .post("/api/v1/sms/")
            .send(smsCreated)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        });
    });
  });

  describe("/POST sms controller error", () => {
    it("should thow error if the receiver does not exist", done => {
      const smsCreated = {
        message: "Tumefika",
        receiverContactId: "5d4a8995e3fd9f0004e81877",
        senderContactId: "5d4a8995e3fd9f0004e81877",
        status: "sent"
      };
      chai
        .request(app)
        .post("/api/v1/sms/")
        .send(smsCreated)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
