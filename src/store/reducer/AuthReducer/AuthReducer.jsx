import * as actionTypes from "../../actionTypes/authActionType";
import { initialState } from "./InitialAuthState";

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_REGISTER:
      return {
        isSignedIn: true,
        email: action.email,
        name: action.name,
        phone: action.phone,
        address: action.address,
        userType: action.userType,
        loading: false,
        error: ""
      };
    case actionTypes.AUTH_SIGNIN:
      return {
        isSignedIn: true,
        email: action.email,
        name: action.name,
        phone: action.phone,
        address: action.address,
        userType: action.userType,
        loading: false,
        error: ""
      };
    case actionTypes.AUTH_VENDOR_SIGNIN:
      return {
        isSignedIn: true,
        email: action.email,
        name: action.name,
        phone: action.phone,
        address: action.address,
        storeName: action.storeName,
        userType: action.userType,
        IsActive: action.IsActive,
        StockType: action.StockType,
        loading: false,
        error: ""
      };
    case actionTypes.START_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: ""
      };

    case actionTypes.BUSINESS_ACTIVE_STATUS:
      return {
        ...state,
        IsActive: action.payload
      };

    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case actionTypes.AUTH_PROFILE_UPDATE:
      return {
        ...state,
        name: action.name,
        phone: action.phone,
        address: action.address,
        loading: false,
        error: ""
      };
    case actionTypes.AUTH_SIGNOUT:
      return {
        isSignedIn: false,
        email: "",
        name: "",
        phone: "",
        address: "",
        userType: "",
        loading: false,
        error: ""
      };
    case actionTypes.AUTH_CLEAR_STATE:
      return {
        isSignedIn: false,
        email: "",
        name: "",
        phone: "",
        address: "",
        userType: "",
        loading: false,
        error: ""
      };
    default:
      return state;
  }
};

export default AuthReducer;
