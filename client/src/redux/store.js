import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { getProductReducer , getProductDetailsReducer} from './reducer/productReducer';
import {cartReducer} from './reducer/cartReducer';

const reducer = combineReducers({ 
    cart: cartReducer,
    getProducts: getProductReducer,
    getProductDetails : getProductDetailsReducer
});

const middleware = [thunk];

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;