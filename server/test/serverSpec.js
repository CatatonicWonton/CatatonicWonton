process.env.NODE_ENV = 'test';

var supertest = require('supertest');
var server = require('../server.js');
var db = require('../db.js');
var sequelize = db.sequelize;
var Models = db.Models;
var expect = require('chai').expect;
var request = supertest(server);

describe('', function () {

  describe('Class routes', function () {

    before(function (done) {
      // Clears out database
      sequelize
        .sync({force: true})
        .then(function () {
          return Models.Teacher.create({
            firstName: 'Sir',
            lastName: 'Derp',
            username: 'Derp',
            password: 'password'
          });
        })
        .then(function () {
          done();
        });
    });

    it('should make classes', function (done) {
      request
        .post('/api/class')
        .send({
          name: 'Class1',
          user: {
            _id: 1,
            accountType: 'Teacher',
            username: 'Derp'
          } 
        })
        .end(function (err, res) {
          Models.Class
            .count()
            .then(function (count) {
              expect(count).to.equal(1);
              done();
            });
        });
    });

    it('should get classes', function (done) {
      request
        .get('/api/class/1')
        .end(function (err, res) {
          expect(res.body.name).to.equal('Class1');
          done();
        });
    });


    it('should get classes from user', function (done) {
      request
        .get('/api/class')
        .end(function (err, res) {
          expect(res.body).to.be.a('array');
          expect(res.body[0].id).to.equal(1);
          done();
        });
    });

    it('should remove classes', function (done) {
      request
        .del('/api/class/1')
        .end(function (err, res) {
          Models
            .Class
            .findById(1)
            .then(function (Class) {
              expect(Class).to.equal(null);
              done();
            });
        });
    });

    after(function (done) {
      // Clears out database
      sequelize
        .sync({force: true})
        .then(function () {
          done();
        })
    });

  });

  describe('Page routes', function () {

    before(function (done) {
      // Clears out database
      sequelize
        .sync({force: true})
        .then(function () {
          return Models.Project.create({
            name: 'Project1',
            subject: 'Subject'
          });
        })
        .then(function () {
          done();
        });
    });

    it('should make page', function (done) {
      request
        .post('/api/page/1')
        .send({
          title: 'Bio',
          content: 'This is the intro',
          index: '1',
          solution: 'true',
          user: {
            _id: 1,
            accountType: 'Teacher',
            username: 'Derp'
          } 
        })
        .end(function (err, res) {
          Models.Page
            .count()
            .then(function (count) {
              expect(count).to.equal(1);
              done();
            })
        });
    });

    it('should get pages', function (done) {
      request
        .get('/api/page/1')
        .end(function (err, res) {
          expect(res.body.index).to.equal(1);
          done();
        });
    });


    it('should edit page', function (done) {
      request
        .put('/api/page/1')
        .send({
          index: '2'
        })
        .end(function (err, res) {
          expect(res.body.index).to.equal(2);
          done();
        });
    });

    it('should remove page', function (done) {
      request
        .del('/api/page/1')
        .end(function (err, res) {
          Models
            .Page
            .findById(1)
            .then(function (page) {
              expect(page).to.equal(null);
              done();
            });
        });
    });

    after(function (done) {
      // Clears out database
      sequelize
        .sync({force: true})
        .then(function () {
          done();
        })
    });

  });

  describe('Project routes', function () {

    before(function (done) {
      // Clears out database
      sequelize
        .sync({force: true})
        .then(function () {
          return Models.Teacher.create({
            firstName: 'Sir',
            lastName: 'Derp',
            username: 'Derp',
            password: 'password'
          });
        })
        .then(function () {
          done();
        });
    });

    it('should make project', function (done) {
      request
        .post('/api/projects')
        .send({
          name: 'Project1',
          subject: 'Subject',
          user: {
            _id: 1,
            accountType: 'Teacher',
            username: 'Derp'
          } 
        })
        .end(function (err, res) {
          Models.Project
            .count()
            .then(function (count) {
              expect(count).to.equal(1);
              done();
            })
        });
    });

    it('should get project', function (done) {
      request
        .get('/api/projects/1')
        .end(function (err, res) {
          expect(res.body.name).to.equal('Project1');
          done();
        });
    });

    it('should edit project', function (done) {
      request
        .put('/api/projects/1')
        .send({
          subject: 'Chem'
        })
        .end(function (err, res) {
          expect(res.body.subject).to.equal('Chem');
          done();
        });
    });

    it('should remove project', function (done) {
      request
        .del('/api/projects/1')
        .end(function (err, res) {
          Models
            .Project
            .findById(1)
            .then(function (page) {
              expect(page).to.equal(null);
              done();
            });
        });
    });

    after(function (done) {
      sequelize
        .sync({force: true})
        .then(function () {
          done();
        });
    });

  });

  describe('Student routes', function () {

    before(function (done) {
      // Clears out database
      sequelize
        .sync({force: true})
        .then(function () {
          return Models.Student.create({
            firstName: 'Student',
            lastName: '1',
            username: 'Student1',
            password: 'password'
          });
        })
        .then(function () {
          done();
        });
    });

    it('should get student', function (done) {
      request
        .get('/api/student/1')
        .end(function (err, res) {
          expect(res.body.firstName).to.equal('Student');
          done();
        });
    });

    it('should edit student', function (done) {
      request
        .put('/api/student/1')
        .send({
          firstName: 'NewName',
          user: {
            _id: 1,
            accountType: 'Teacher',
            username: 'Derp'
          }
        })
        .end(function (err, res) {
          Models.Student
            .findById(1)
            .then(function (model) {
              expect(model.firstName).to.equal('NewName');
              done();
            });
        });
    });

    it('should remove student', function (done) {
      request
        .del('/api/student/1')
        .end(function (err, res) {
          Models
            .Student
            .findById(1)
            .then(function (student) {
              expect(student).to.equal(null);
              done();
            });
        });
    });

    after(function (done) {
      // Clears out database
      sequelize
        .sync({force: true})
        .then(function () {
          done();
        })
    });

  });

  describe('Student Project routes', function () {

    before(function (done) {
      // Clears out database
      sequelize
        .sync({force: true})
        .then(function () {

          return Models.Class.create({
            name: 'Class1'
          })
          .then(function (testClass) {
            return Promise.all([
              Models.Project.create({
                name: 'Project1',
                subject: 'Test'
              }),

              Models.Student.create({
                firstName: 'Student',
                lastName: '2',
                username: 'Student1',
                password: 'password'
              })
              .then(function (student) {
                testClass.addStudent(student);
              }),

              Models.Student.create({
                firstName: 'Student',
                lastName: '1',
                username: 'Student2',
                password: 'password'
              })
              .then(function (student) {
                testClass.addStudent(student);
              })
            ]);
          })
        })
        .then(function () {
          done();
        });
    });

    it('should assign project to student', function (done) {
      request
        .post('/api/studentProject/student/1')
        .send({
          ProjectId: 1,
          user: {
            _id: 1,
            accountType: 'Teacher',
            username: 'Derp'
          } 
        })
        .end(function (err, res) {
          Models.StudentProject
            .count()
            .then(function (count) {
              expect(count).to.equal(1);
              done();
            })
        });
    });

    it('should assign project to class', function (done) {
      request
        .post('/api/studentProject/class/1')
        .send({
          ProjectId: 1,
          user: {
            _id: 1,
            accountType: 'Teacher',
            username: 'Derp'
          } 
        })
        .end(function (err, res) {
          Models.StudentProject
            .count()
            .then(function (count) {
              expect(count).to.equal(2);
              done();
            });
        });
    });

    it('should remove project from student', function (done) {
      request
        .del('/api/studentProject/student/1')
        .send({
          ProjectId: '1'
        })
        .end(function (err, res) {
          Models.StudentProject
            .count()
            .then(function (count) {
              expect(count).to.equal(1);
              done();
            })
        });
    });

    it('should remove project from class', function (done) {
      request
        .del('/api/studentProject/class/1/1')
        .end(function (err, res) {
          Models.StudentProject
            .count()
            .then(function (count) {
              expect(count).to.equal(0);
              done();
            });
        });
    });

    after(function (done) {
      sequelize
        .sync({force: true})
        .then(function () {
          done();
        });
    });

  });

  describe('Student Class routes', function () {

    before(function (done) {
      // Clears out database
      sequelize
        .sync({force: true})
        .then(function () {
          return Models.Student.create({
            firstName: 'Sir',
            lastName: 'Derp',
            username: 'Derp',
            password: 'password'
          });
        })
        .then(function () {
          return Models.Class.create({
            name: 'Class1'
          });
        })
        .then(function () {
          done();
        });
    });
    
    it('should add student to class', function (done) {
      request
        .post('/api/studentClass/1')
        .send({
          StudentId: 1,
          user: {
            _id: 1,
            accountType: 'Teacher',
            username: 'Derp'
          } 
        })
        .end(function (err, res) {
          Models.StudentClass
            .count()
            .then(function (count) {
              expect(count).to.equal(1);
              done();
            })
        });
    });

    it('should remove student from class', function (done) {
      request
        .put('/api/projects/1')
        .send({
          subject: 'Chem'
        })
        .end(function (err, res) {
          expect(res.body.subject).to.equal('Chem');
          done();
        });
    });

    it('should remove project', function (done) {
      request
        .del('/api/projects/1')
        .end(function (err, res) {
          Models
            .Project
            .findById(1)
            .then(function (page) {
              expect(page).to.equal(null);
              done();
            });
        });
    });

    after(function (done) {
      sequelize
        .sync({force: true})
        .then(function () {
          done();
        });
    });

  });

});