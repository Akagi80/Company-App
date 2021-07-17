const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value
    dep.validate(err => {
      expect(err.errors.name).to.exist;
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

  it('should throw an error if "name" is too short or too long', () => {
    const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip']; // we test various cases, some of them are too short, some of them are too long
    for(let name of cases) {
      const dep = new Department({ name });
  
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  
  it('should NOT throw an error if "name" is correct', () => {
    const cases = ['Abcde', 'Abcdefg', 'Lorem Ipsum, Lorem'];
    for(let name of cases) {
      const dep = new Department({ name });
    
      dep.validate(err => {
        expect(err).to.not.exist;  // nie chcemy, aby jakikolwiek błąd się pojawił (to.not.exist)
      });
      }
  });


  after(() => {
    mongoose.models = {};
  });
});
