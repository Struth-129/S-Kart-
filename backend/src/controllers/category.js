const {default: slugify} = require('slugify');
const Category = require('../models/category');

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
            children: createCategories(categories, cate._id)
        });
    }
    return categoriesList;
}


exports.addCategory = (req,res)=>{
    let categoryUrl;   
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if(req.file){
        categoryUrl = 'http://localhost:8000/public/'+req.file.filename
        categoryObj.categoryImage = categoryUrl;
    }
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);
    cat.save((error, category)=>{
        if(error) return res.status(400).json({error}); 
        if(category){
            return res.status(200).json({ category })
        }
    })
}

exports.getCategories = (req,res) =>{
    Category.find({})
    .exec((error,categories)=>{
        if(error) return res.status(400).json({error});
        if(categories){
            const categoryList = createCategories(categories);
            res.status(200).json({ categoryList });
        }
    })
}

exports.updateCategories = async(req,res) => {
    const {_id,name,parentId,type} = req.body;
    const updatedCategories = [];
    if(name instanceof Array){
        // const {} = req.body;
        for(let i=0; i<name.length;i++){
            const category = {
                name: name[i],
                type: type[i]
            };
            if(parentId[i] !== ""){
                category.parentId = parentId[i];
            }
            const updatedCategory = await Category.findOneAndUpdate({_id:_id[i]},category,{new: true})
            updatedCategories.push(updatedCategory);
        }
            return res.status(201).json({updatedCategories: updatedCategories});
        
    }else{
        const category = {
            name,type}
            if(parentId!==""){
                category.parentId = parentId;
            }
            const updatedCategory = await Category.findOneAndUpdate({_id},category,{new: true})
            return res.status(201).json({ updatedCategory })
        }
    
    // res.status(200).json({body: req.body});
}