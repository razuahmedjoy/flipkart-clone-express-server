const express = require('express');
const { requireSignin } = require('../../common-middleware');
const { signup, signin,signout } = require('../../controller/admin/auth');
const router = express.Router();
const User = require('../../models/user');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');

router.post('/admin/signin',validateSigninRequest,isRequestValidated,signin)
router.post('/admin/signup',validateSignupRequest,isRequestValidated,signup)
router.post('/admin/signout',signout)


router.post('/profile',(req,res)=>{
    res.status(200).json({user:'profile'})
})

module.exports = router;