import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error:null
};

const buildNewCategories=(parentId,categories, category)=>{
    let myCategories=[];

    if(parentId == undefined){
        return [
            ...categories,
            {
                _id: categories._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ] 
    }

    for(let cat of categories){
        if(cat._id == parentId){
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId,[...cat.children,{
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }],category): []
            });
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId,cat.children,category): []
            });
        }
    }return myCategories;
}

export default (state = initState,action )=>{
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_SUCCESS:
            const category = action.payload.category
            const updateCategories = buildNewCategories(category.parentId,state.categories,category);
            console.log(updateCategories)
            state = {
                ...state,
                categories: updateCategories,
                loading: false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_FAILURE:
            state = {
                ...initState
            }
            break;    
    }
    return state;
}