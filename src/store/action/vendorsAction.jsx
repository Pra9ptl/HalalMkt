import * as actionTypes from "../actionTypes/vendorActionType";
import { db } from "../../utility/firebase";

export const getAllActiveVendors = stType => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });

    if (stType === "All") {
      db
        .collection("User")
        .where("IsActive", "==", 1)
        .where("Type", "==", "vendor")
        .get()
        .then(result => {
          const list = result.docChanges().map(result => result.doc.data());
          dispatch({ type: actionTypes.VENDORS_LIST, payload: list });
          dispatch({ type: actionTypes.START_LOADING, payload: false });
        })
        .catch(error => {
          dispatch({ type: actionTypes.VENDORS_LIST_ERROR, payload: error });
          dispatch({ type: actionTypes.START_LOADING, payload: false });
        });
    } else {
      db
        .collection("User")
        .where("IsActive", "==", 1)
        .where("Type", "==", "vendor")
        .where("StockType", "==", stType)
        .get()
        .then(result => {
          const list = result.docChanges().map(result => result.doc.data());
          dispatch({ type: actionTypes.VENDORS_LIST, payload: list });
          dispatch({ type: actionTypes.START_LOADING, payload: false });
        })
        .catch(error => {
          dispatch({ type: actionTypes.VENDORS_LIST_ERROR, payload: error });
          dispatch({ type: actionTypes.START_LOADING, payload: false });
        });
    }
  };
};

export const getVendorStock = vEmail => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });
    db
      .collection("Stock")
      .where("Email", "==", vEmail)
      .get()
      .then(result => {
        const list = result.docChanges().map(result => result.doc.data());
        dispatch({ type: actionTypes.VENDORS_STOCK, payload: list });
        dispatch({ type: actionTypes.START_LOADING, payload: false });
      })
      .catch(error => {
        dispatch({ type: actionTypes.VENDORS_LIST_ERROR, payload: error });
        dispatch({ type: actionTypes.START_LOADING, payload: false });
      });
  };
};

export const updateVendorStock = (vEmail, updateVal) => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });

    db
      .collection("Stock")
      .where("Email", "==", vEmail)
      .get()
      .then(result => {
        // const list = result.docChanges().map(result => result.doc.data());
        const id = result.docChanges()[0].doc.id;
        db
          .collection("Stock")
          .doc(id)
          .update({
            Lamb: updateVal.lamb,
            LambCost: updateVal.lCost,
            Goat: updateVal.goat,
            GoatCost: updateVal.gCost,
            Cow: updateVal.cow,
            CowCost: updateVal.cCost,
            CowShare: updateVal.cowShare,
            CowShareCost: updateVal.csCost
          })
          .then(() => {
            dispatch({ type: actionTypes.START_LOADING, payload: false });
          })
          .catch(error => {
            dispatch({ type: actionTypes.AUTH_ERROR, payload: error });
            dispatch({ type: actionTypes.START_LOADING, payload: false });
          });
      })
      .catch(error => {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: error });
        dispatch({ type: actionTypes.START_LOADING, payload: false });
      });
  };
};

export const placeOrder = (order, callback) => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });
    db
      .collection("Order")
      .add(order)
      .then(() => {
        callback("Success");
        dispatch({ type: actionTypes.START_LOADING, payload: false });
      })
      .catch(error => {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: error });
        dispatch({ type: actionTypes.START_LOADING, payload: false });
      });
  };
};



export const getAllVendors = () => {
    return dispatch => {
      dispatch({ type: actionTypes.START_LOADING, payload: true });
        db
          .collection("User")
          .where("Type", "==", "vendor")
          .get()
          .then(result => {
            const list = result.docChanges().map(result => result.doc.data());
            dispatch({ type: actionTypes.VENDORS_LIST, payload: list });
            dispatch({ type: actionTypes.START_LOADING, payload: false });
          })
          .catch(error => {
            dispatch({ type: actionTypes.VENDORS_LIST_ERROR, payload: error });
            dispatch({ type: actionTypes.START_LOADING, payload: false });
          });
    };
  };