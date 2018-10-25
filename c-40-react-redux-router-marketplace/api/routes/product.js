var express = require('express');
var router = express.Router();
var Product = require('../models/product');

Product.deleteMany({}, (err)=>{
  if(err) console.log('Clear data failed');
});
let data = new Product({
  id: Date.now(),
  title: "Canon EOS m3",
  rate: 5,
  description: "Canon EOS m3 is a camera mirroless and good for vlog",
  price: 6500000,
  brand: "Canon",
  detailProduct: "Canon EOS m3 is a camera mirroless and good for vlog"
})
data.save().then(item => {
  console.log('Initial data Successfully');
}).catch(err => {
  console.log('Initial data failed');
  console.log(err.message);
})

// READ
router.get('/', (req, res) => {
  Product.find().then(data => {
    res.json(data);
  }).catch(err => {
    res.json({
      error: true,
      message: `something went wrong : ${err.message}`
    })
  })
})

// ADD
router.post('/', (req, res) => {
  let data = new Product({
    id: Date.now(),
    title: req.body.title,
    rate: req.body.rate,
    description: req.body.description,
    price: req.body.price,
    brand: req.body.brand,
    detailProduct: req.body.detailProduct
  })
  data.save().then(item => {
    res.json(item);
  }).catch(err => {
    res.json({
      error: true,
      message: `something went wrong : ${err.message}`
    })
  })
})

module.exports = router;
