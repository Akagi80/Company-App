const Department = require('../department.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Department', () => {
  // tworzymy hook before aby testy uruchamiały sie dopiero po połączeniu z fikcyjną bazą 
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer(); //tworzymy nową testową bazę danych      
      const uri = await fakeDB.getConnectionString(); // pobieramy adres bazy testowej
      
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });  
    } catch(err) {
      console.log(err);
    }      
  });
});