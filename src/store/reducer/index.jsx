import AuthReducer from "./AuthReducer/AuthReducer";
import OrderHistoryReducer from './OrderHistoryReducer/OrderHistoryReducer';
import VendorReducer from './VendorReducer/VendorReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    AuthReducer,
    OrderHistoryReducer,
    VendorReducer,
});