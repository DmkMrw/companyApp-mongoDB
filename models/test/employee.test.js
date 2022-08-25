const Employee = require('../employee.model.js');
const expect = require('chai').expect;


// describe('Employee', () => {

//   it('should throw an error if there is no arg', () => {
//     const emp = new Employee({}); // create new Department, but don't set `name` attr value

//     emp.validate(err => {
//       expect(err.errors.firstName).to.exist;
//       expect(err.errors.lastName).to.exist;
//       expect(err.errors.department).to.exist;
//     });
//   });

//   it('should throw an error if arguments are not a string', () => {
//   const cases = [{}, []];
//   for(let arg of cases) {
//     const emp = new Employee({ arg });

//       emp.validate(err => {
//         expect(err.errors.firstName).to.exist;
//         expect(err.errors.lastName).to.exist;
//         expect(err.errors.department).to.exist;
//       });
//     }
//   });

//   it('should not throw an error if args are okay', () => {

//     const cases = [
//       { firstName: 'John', lastName: 'Doe', department: 'IT' },
//       { firstName: 'Amanda', lastName: 'Watson', department: 'IT' },
//     ];

//     for(let arg of cases) {
//       const emp = new Employee( arg );

//       emp.validate(err => {
//         expect(err).to.not.exist;
//       });
//     }
//   });
// });