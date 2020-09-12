import * as actionTypes from "../../actionTypes/orderHistoryActionType";
import { initialState } from "./InitialOrderHistoryState";

const OrderHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: ""
      };
    case actionTypes.ORDERS_LIST:
      return {
        ...state,
        ordersList: action.payload
      };
    case actionTypes.ORDER_HISTORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actionTypes.All_USERS:
      return {
        ...state,
        loading: false,
        error: "",
        users: action.payload
      };
    default:
      return state;
  }
};

export default OrderHistoryReducer;
