const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  
  it('should throw an error if no "firstName", "lastName" or "department" arg', () => {
    const emp = new Employee({});
    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });

  it('should throw an error if "firstName", "lastName" or "department" is not a string', () => {
    const emp = new Employee({firstName: {}, lastName: [], department: {}});
    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });

  it('should NOT throw an error if "firstName", "lastName" and "department" is correct', () => {
    const cases = [
      { firstName: 'John', lastName:'Doe', department: 'IT' },
      { firstName: 'Amanda', lastName:'Doe', department: 'Marketing' },
      { firstName: 'John', lastName:'Doe', department: 'IT' }
    ];
    for(let type of cases) {
      const emp = new Employee(type);    
      emp.validate(err => {
        expect(err).to.not.exist;  // nie chcemy, aby jakikolwiek błąd się pojawił (to.not.exist)
      });
    }
  });
});
