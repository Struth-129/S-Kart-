import { combineReducers } from 'redux';
import categoryReducer from './category.reducer';


const rootReducer = combineReducers({
    category: categoryReducer,
})

export default rootReducer;