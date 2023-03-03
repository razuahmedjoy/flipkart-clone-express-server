const Category = require('../../models/category');
const Product = require('../../models/product');


const createCategoryList = (categories, parentId = null) => {
    const categoryList = [];

    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)

    }
    else {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategoryList(categories, cate._id)
        })
    }

    return categoryList;
}


exports.initialData = async (req, res) => {

    try {
        const categories = await Category.find({});
        const products = await Product.find({})
            .select('_id name price quantity slug description productPictures category')
            .populate('category')
        res.status(200).json({
            success: true,
            categories: createCategoryList(categories),
            products
        })

    }
    catch (e) {
        res.status(400).json({
            success: false,
            error: e.message
        })
    }

}