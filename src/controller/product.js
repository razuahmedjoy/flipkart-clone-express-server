const Product = require('../models/product');
const shortid = require('shortid');

const slugify = require('slugify');

exports.createProduct = (req, res) => {

    const { name, description, price, category,quantity } = req.body;

    let productPictures = [];
    if (req.files.length > 0) {
        productPictures = req.files.map(file => ({ img: file.filename }))
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price: price,
        description,
        productPictures,
        category,
        quantity,
        createdBy: req.user._id

    })
    product.save((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(201).json({ product })
        }
    })

}