const Department = require('../department.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Department', () => {
  // tworzymy hook before aby testy uruchamiały sie dopiero po połączeniu z fikcyjną bazą 
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer(); //tworzymy nową testową bazę danych      
      const uri = await fakeDB.getUri(); // pobieramy adres bazy testowej
      
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });  
    } catch(err) {
      console.log(err);
    }      
  });

  describe('Reading data', () => {

    before(async () => {  // dane testowe
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();
  
      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();
    });
  
    it('should return all the data with "find" method', async () => {
      const departments = await Department.find();
      const expectedLength = 2;
      expect(departments.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const department = await Department.findOne({ name: 'Department #1' });
      const expectedName = 'Department #1';
      expect(department.name).to.be.equal(expectedName);
    });

    after(async () => {
      await Department.deleteMany();
    });
  
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const department = new Department({ name: 'Department #1' });
      await department.save();
      expect(department.isNew).to.be.false; // Jeśli dokument nie był jeszcze zapisany w bazie danych, to jego atrybut isNew jest równy true
    });

    after(async () => {
      await Department.deleteMany();
    });
  
  });

  describe('Updating data', () => {

    beforeEach(async () => { // Dlaczego beforeEach a nie before? Dlatego, że każdy test będzie modyfikował dane, idealnie byłoby więc je przywracać do stanu początkowego przed każdym kolejnym testem
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();
    
      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();
    });

    afterEach(async () => { // Podobnie jak wyżej afterEach kazuje dane po każdym wykonanym teście
      await Department.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Department.updateOne({ name: 'Department #1' }, { $set: { name: '=Department #1=' }});  // Aktualizujemy 1 dokument
      const updatedDepartment = await Department.findOne({ name: '=Department #1=' }); // Sprawdzamy czy istnieje zaktualizowany dokument
      expect(updatedDepartment).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const department = await Department.findOne({ name: 'Department #1' });
      department.name = '=Department #1=';
      await department.save();
    
      const updatedDepartment = await Department.findOne({ name: '=Department #1=' });
      expect(updatedDepartment).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Department.updateMany({}, { $set: { name: 'Updated!' }});
      const departments = await Department.find({ name: 'Updated!' });
      expect(departments.length).to.be.equal(2); 
    });
  
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();
    
      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();
    });
    
    afterEach(async () => {
      await Department.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Department.deleteOne({ name: 'Department #1' }); // usuwamy dok
      const removeDepartment = await Department.findOne({ name: 'Department #1' }); // wyszukujemy dok
      expect(removeDepartment).to.be.null; // sprawdzamy czy zwraca nam null
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const department = await Department.findOne({ name: 'Department #1' }); // wyszukujemy 1 dok
      await department.remove(); // usuwamy dok
      const removedDepartment = await Department.findOne({ name: 'Department #1' }); // wyszukujemy usunięty dok
      expect(removedDepartment).to.be.null; // sprawdzamy czy zwraca nam null
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Department.deleteMany(); // usuwamy kilka dok
      const departments  = await Department.find(); // wyszukujemy doki
      expect(departments.length).to.be.equal(0); // sprawdzamy czy zwraca nam null
    });
  
  });
});
