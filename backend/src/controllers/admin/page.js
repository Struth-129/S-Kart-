const API = `http://localhost:8000`
const Page = require('../../models/page')

exports.createPage = (req,res) => {
    const { banners,products } = req.files;
    if(banners.length > 0){
        req.body.banners = banners.map((banner,index)=>({
            img: `${API}/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }
    if(products.length > 0){
        req.body.products = products.map((product,index)=>({
            img: `${API}/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }

    req.body.createdBy = req.user._id
    
    const Page = new Page(req.body);
    page.save((error,page)=>{
        if(error) return res.status(400).json({error})
        if(page){
            return res.status(200).json({page});
        }
    })
    
    res.status(200).json({
        body: req.body
    })
}