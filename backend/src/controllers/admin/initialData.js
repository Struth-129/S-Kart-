const Category = require('../../models/category')
const Product = require('../../models/product');


function createCategories(categories,parentId = null){
    const categoriesList = [];
    let category;
    if(parentId==null){
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for(let cate of category){
        categoriesList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id)
        });
    }

    return categoriesList;
}
exports.initialData = async(req,res) =>{
    const categories = await Category.find({}).exec();
    const products = await Product.find({})
        .select('_id name price quantity slug description productPictures category')
        .populate({path: 'category', select: '_id name'})
        .exec();
    res.status(200).json({
        categories: createCategories(categories),
        products
    })
}