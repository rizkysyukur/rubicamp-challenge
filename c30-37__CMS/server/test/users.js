const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');

const User = require('../models/user');
const should = chai.should();

chai.use(chaiHTTP);

describe('user', function(){

  beforeEach(function(done){
    let user = new User({
      email : "anandareftina@gmail.com",
      password : "1234"
    })
    user.save(function(err){
      done();
    })
  })

  afterEach(function(done){
    User.collection.drop();
    done();
  })

  it("Seharusnya menyimpan data dan menampilkan email dan kode token dengan metode POST", function(done){
    chai.request(server)
    .post('/api/users/register')
    .send({
      email: "rizkysyukur@gmail.com",
      password: "1234",
      retypepassword: "1234"
    }).end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('data');
      res.body.should.have.property('token');
      res.body.data.should.be.a('object');
      res.body.token.should.be.a('string');
      res.body.data.email.should.equal("rizkysyukur@gmail.com");
      done();
    })
  })

  it("Seharusnya sistem mengecek lalu valid dan mengembalikan email dan kode token dengan metode POST", function(done){
    chai.request(server)
    .post('/api/users/login')
    .send({
      email: "anandareftina@gmail.com",
      password: "1234",
    }).end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('data');
      res.body.should.have.property('token');
      res.body.data.should.be.a('object');
      res.body.token.should.be.a('string');
      res.body.data.email.should.equal("anandareftina@gmail.com");
      done();
    })
  })

  it("Seharusnya sistem memverifikasi token dan mengembalikan hasil verifikasi berupa false dengan metode POST", function(done){
    chai.request(server)
    .post('/api/users/check')
    .send({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYW5kYXJlZnRpbmFAZ21haWwuY29uIiwicGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNTM1OTU1MDAxLCJleHAiOjE1MzYwNDE0MDF9.jar4pawlkkAQln-Wn_8UmUWzUoppK_EiI4zLSntkf6Y",
    }).end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('valid');
      res.body.valid.should.equal(false);
      done();
    })
  })

  it("Seharusnya menghancurkan token dan mengembalikan nilai logout sama dengen true dengen metode GET", function(done){
    chai.request(server)
    .get('/api/users/destroy')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('logout');
      res.body.logout.should.equal(true);
      done();
    })
  })
})
