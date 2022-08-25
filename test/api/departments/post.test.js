const Department = require('../../../models/department.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/departments', () => {

  it('/ should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/departments').send({ name: '#Department #1' });
    const newDepartment = await Department.findOne({ name: '#Department #1' });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(newDepartment).to.not.be.null;
  });
  after(async () => {
    await Department.deleteMany();
  });
});