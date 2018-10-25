const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');

const Data = require('../models/data');
const should = chai.should();

chai.use(chaiHTTP);

describe('data', function(){

  beforeEach(function(done){
    let data = new Data({
      letter : "A",
      frequency : 1.1
    })
    data.save(function(err){
      done();
    })
  })

  afterEach(function(done){
    Data.collection.drop();
    done();
  })

  it("Seharusnya sistem mengenbalikan nilai letter dan frequency dengan metode POST", function(done){
    chai.request(server)
    .post('/api/data/search')
    .send({
      letter: "A",
      frequency: 1.1,
    }).end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('letter');
      res.body[0].should.have.property('frequency');
      res.body[0].letter.should.equal("A");
      res.body[0].frequency.should.equal(1.1);
      done();
    })
  })

  it("Seharusnya sistem mengenbalikan nilai letter dan frequency dengan metode GET", function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('letter');
      res.body[0].should.have.property('frequency');
      res.body[0].letter.should.equal("A");
      res.body[0].frequency.should.equal(1.1);
      done();
    })
  })

  it("Seharusnya sistem mengenbalikan berhasil mengubah data dengan metode PUT", function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err, res){
      chai.request(server)
      .put('/api/data/' + res.body[0]._id)
      .send({
        letter: "B",
        frequency: 5.5
      }).end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        response.body.success.should.equal(true);
        response.body.message.should.equal("data has been updated");
        response.body.data.letter.should.equal("B");
        response.body.data.frequency.should.equal(5.5);
        done();
      })
    })
  })

  it('seharusnya menambahkan satu data dengan metode POST', function(done){
    chai.request(server)
    .post('/api/data')
    .send({
      letter: 'hello',
      frequency: 100.5
    }).end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.should.have.property('message');
      res.body.should.have.property('data');
      res.body.success.should.equal(true);
      res.body.message.should.equal("data has been added");
      res.body.data.letter.should.equal("hello");
      res.body.data.frequency.should.equal(100.5);
      done();
    })
  })

  it('seharusnya menghapus satu data berdasarkan id dengan metode DELETE', function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err, res){
      chai.request(server)
      .delete('/api/data/' + res.body[0]._id)
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        response.body.success.should.equal(true);
        response.body.message.should.equal("data has been deleted");
        response.body.data.letter.should.equal("A");
        response.body.data.frequency.should.equal(1.1);
        done();
      })
    })
  })

  it('seharusnya menampilkan data berdasarkan id dengan metode GET', function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err, res){
      chai.request(server)
      .get('/api/data/' + res.body[0]._id)
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        response.body.success.should.equal(true);
        response.body.message.should.equal("data found");
        response.body.data.letter.should.equal("A");
        response.body.data.frequency.should.equal(1.1);
        done();
      })
    })
  })
})
