const express = require('express');
const router = express.Router();

const { requireSignin,userMiddleware } = require('../common-middleware');
const { addItemToCart } = require('../controller/cart');

router.post('/user/cart/addToCart',requireSignin,userMiddleware,addItemToCart);

module.exports = router;