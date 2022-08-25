const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employee', () => {
  before(async () => {

    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({ firstName: 'Joe', lastName: 'Doe', department: 'IT'});
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'TECH' });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with findOne method.', async () => {
      const employeeTest1 = await Employee.findOne({ firstName: 'Joe' });
      const expectedFirstName = 'Joe';
      expect(employeeTest1.firstName).to.be.equal(expectedFirstName);

      const employeeTest2 = await Employee.findOne({ lastName: 'Doe' });
      const expectedLastName = 'Doe';
      expect(employeeTest2.lastName).to.be.equal(expectedLastName);

      const employeeTest3 = await Employee.findOne({ department: 'TECH' });
      const expectedDepartment = 'TECH';
      expect(employeeTest3.department).to.be.equal(expectedDepartment);
    });

    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'John', lastName: 'Smith', department: 'Goverment' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Joe', lastName: 'Doe', department: 'IT'});
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'TECH' });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'Joe' }, { $set: { firstName: 'James' }});
      const updatedEmployee = await Employee.findOne({ firstName: 'James' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Amanda' });
      employee.firstName = 'Sarah';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: 'Sarah' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { department: 'Updated!' } });
      const employees = await Employee.find();
      expect(employees[0].department).to.be.equal('Updated!');
      expect(employees[1].department).to.be.equal('Updated!');
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Joe', lastName: 'Doe', department: 'IT'});
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'TECH' });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'Joe' });
      const removedEmployee = await Employee.findOne({ firstName: 'Joe' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const document = Employee.findOne({ firstName: 'Amanda'});
      await document.remove();
      const removedDocument = await Employee.findOne({ firstName: 'Amanda' });
      expect(removedDocument).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);

    });

  });
});