const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');

const router = express.Router();

const { createCategory, getCategories } = require('../controller/category');

const multer = require('multer');
const shortid = require('shortid')
const path = require('path');




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname),'uploads/category'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,uniqueSuffix + "-"+ file.originalname)
    }
})

const upload = multer({ storage });

router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage'),createCategory);
router.get('/category/getall',getCategories);


module.exports = router;