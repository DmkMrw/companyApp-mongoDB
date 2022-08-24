const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Department', () => {

  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value

    dep.validate(err => {
      expect(err.errors.name).to.exist;
    });
    after(() => {
      mongoose.models = {};
    });
  });

  it('should throw an error if "name" is not a string', () => {
  const cases = [{}, []];
  for(let name of cases) {
    const dep = new Department({ name });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "name" length is higher than 20 or lower than 5', () => {

    const cases = [ 'abc', 'abcdefghijklmnoprstuw'];
    for(let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should render correct if agr is prop', () => {

    const cases = [ 'Lorem ipsum', 'Lorem ipsum dolor'];
    for(let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });
});