import * as actionTypes from "../../actionTypes/vendorActionType";
import { initialState } from "./IntialVendorState";

const VendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: ""
      };
    case actionTypes.VENDORS_LIST:
      return {
        ...state,
        vendorList: action.payload
      };

    case actionTypes.VENDORS_STOCK:
      return {
        ...state,
        stock: action.payload
      };
    case actionTypes.VENDORS_LIST_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default VendorReducer;
