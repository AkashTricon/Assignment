var sinon = require('sinon')
var chai =require('chai')
var expect = chai.expect
var supertest = require('supertest')
var app = require('../../app');
var server = supertest(app);
var contactModel = require('../../model')
var testContact = {
    _id: "5c10af1dd1a0880560b68769",
    name: "akash",
    email:"akash@gmail.com",
    address: "test address"
}

var updatedTestData= {
    name: "akshay",
    email: "plivo@gmail.com",
    address: "HAL"
}

describe('## 1. Tests for creating Contact book app', () => {
    beforeEach(() => {
        sinon.stub(contactModel.contactModel.prototype, 'save')
        contactModel.contactModel.prototype.save.withArgs().yieldsAsync(null,testContact)
    });
    afterEach(() => {
        contactModel.contactModel.prototype.save.restore();
    });
    it('Should return success', done => {
      server
        .post('/v1/contacts')
        .send({
            name: "akash",
            email: "akash@plivo.com"
            }
        )
        .then(res => {
            expect(res.status).to.equal(200);
          })
        .then(done);
    });
  });

  describe('## 1. Tests for Get Contact by Id', () => {
    beforeEach(() => {
        sinon.stub(contactModel.contactModel, 'findOne')
        contactModel.contactModel.findOne.withArgs({_id: testContact._id}).yieldsAsync(null,testContact)
    });
    afterEach(() => {
        contactModel.contactModel.findOne.restore();
    });
    it('Should return get contact by contactId', done => {
      server
        .get('/v1/contacts/5c10af1dd1a0880560b68769')
        .then(res => {
            expect(res.status).to.equal(200);
          })
        .then(done);
    });
  });
  
  describe('## 1. Tests for Get Contact by name', () => {
    beforeEach(() => {
        sinon.stub(contactModel.contactModel, 'findOne')
        contactModel.contactModel.findOne.withArgs({name: testContact.name}).yieldsAsync(null,testContact)
    });
    afterEach(() => {
        contactModel.contactModel.findOne.restore();
    });
    it('Should return get contact by name', done => {
      server
        .get('/v1/contacts/name/akash')
        .then(res => {
            expect(res.status).to.equal(200);
          })
        .then(done);
    });
  });
  
  describe('## 1. Tests for Get Contact by email', () => {
    beforeEach(() => {
        sinon.stub(contactModel.contactModel, 'findOne')
        contactModel.contactModel.findOne.withArgs({email: testContact.email}).yieldsAsync(null,testContact)
    });
    afterEach(() => {
        contactModel.contactModel.findOne.restore();
    });
    it('Should return get contact by email', done => {
      server
        .get('/v1/contacts/email/akash@gmail.com')
        .then(res => {
            expect(res.status).to.equal(200);
          })
        .then(done);
    });
  });
  
  describe('## 1. Tests for getting all contact', () => {
    beforeEach(() => {
        sinon.stub(contactModel.contactModel, 'find')
        contactModel.contactModel.find.withArgs().yieldsAsync(null,[testContact])
    });
    afterEach(() => {
        contactModel.contactModel.find.restore();
    });
    it('Should return success', done => {
      server
        .get('/v1/contacts')
        .then(res => {
            expect(res.status).to.equal(200);
          })
        .then(done);
    });
  });
  describe('## 1. Tests for Delete contact by Id', () => {
    beforeEach(() => {
        sinon.stub(contactModel.contactModel, 'remove')
        contactModel.contactModel.remove.withArgs({_id: testContact._id}).yieldsAsync(null,null)
    });
    afterEach(() => {
        contactModel.contactModel.remove.restore();
    });
    it('Should return success for  deleting contact', done => {
      server
        .get('/v1/contacts')
        .then(res => {
            expect(res.status).to.equal(200);
          })
        .then(done);
    });
  });

  describe('## 1. Tests for update contact by Id', () => {
    beforeEach(() => {
        sinon.stub(contactModel.contactModel, 'update')
        contactModel.contactModel.update.withArgs({_id: testContact._id},updatedTestData).yieldsAsync(null,null)
    });
    afterEach(() => {
        contactModel.contactModel.update.restore();
    });
    it('Should return success for  deleting contact', done => {
      server
        .get('/v1/contacts')
        .then(res => {
            expect(res.status).to.equal(200);
          })
        .then(done);
    });
  });