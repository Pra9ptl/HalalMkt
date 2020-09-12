import * as actionTypes from "../actionTypes/orderHistoryActionType";
import { db } from "../../utility/firebase";
import { or } from "react-native-reanimated";
import { Alert } from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";

export const getAllOrders = email => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });
    db
      .collection("Order")
      .where("UserID", "==", email)
      .orderBy("OrderDate", 'asc')
      .get()
      .then(result => {
        const list = result.docChanges().map(result => result.doc.data());
        const orderIds = result.docChanges().map(result => result.doc.id);
        const newList = list.map((i, index) => {
          i.id = orderIds[index];
          return i;
        });
        dispatch({ type: actionTypes.ORDERS_LIST, payload: newList });
        dispatch({ type: actionTypes.START_LOADING, payload: false });
      })
      .catch(error => {
        dispatch({ type: actionTypes.ORDER_HISTORY_ERROR, payload: error });
      });
  };
};

export const getVendorAllOrders = email => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });
    // getData();
    db
      .collection("Order")
      .where("VendorId", "==", email)
      .orderBy("OrderDate")
      .get()
      .then(result => {
        const list = result.docChanges().map(result => result.doc.data());
        const orderIds = result.docChanges().map(result => result.doc.id);

        const newList = list.map((i, index) => {
          i.id = orderIds[index];
          return i;
          //   return {
          //     ...i,
          //     id: orderIds[index]
          //   };
        });
        dispatch({ type: actionTypes.ORDERS_LIST, payload: newList });
        dispatch({ type: actionTypes.START_LOADING, payload: false });
      })
      .catch(error => {
        dispatch({ type: actionTypes.ORDER_HISTORY_ERROR, payload: error });
        dispatch({ type: actionTypes.START_LOADING, payload: false });
      });
  };
};

export const updateOrderStatus = (order, statusToChange, nav) => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });
    // getData();

    console.log("Order", order);

    if (statusToChange === "complete") {
      console.log("Complete");
      db
        .collection("Stock")
        .where("Email", "==", order.VendorId)
        .get()
        .then(res => {



          const newLamb =
            parseFloat(res.docChanges().map(s => s.doc.data().Lamb)) -
            parseFloat(order.Lamb);
          const newGoat =
            parseFloat(res.docChanges().map(s => s.doc.data().Goat)) -
            parseFloat(order.Goat);
          const newCow =
            parseFloat(res.docChanges().map(s => s.doc.data().Cow)) -
            parseFloat(order.Cow);

          const newCowShare =
            parseFloat(res.docChanges().map(s => s.doc.data().CowShare)) -
            parseFloat(order.CowShare);

          db
            .collection("Stock")
            .doc(res.docChanges().map(s => s.doc.id).toString())
            .update({
              Lamb: newLamb,
              Goat: newGoat,
              Cow: newCow,
              CowShare: newCowShare
            }).then(() => {
              console.log("Updated");
              dispatch({ type: actionTypes.START_LOADING, payload: false });
            }
            ).catch(error => {
              dispatch({ type: actionTypes.ORDER_HISTORY_ERROR, payload: error });
            });

        });
    }

    db
      .collection("Order")
      .doc(order.id.toString())
      .update({
        Status: statusToChange
      })
      .then(() => {
        nav.goBack();
      })
      .catch(error => {
        dispatch({ type: actionTypes.ORDER_HISTORY_ERROR, payload: error });
      });
  };
};

export const getAllUsers = () => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });
    db
      .collection("User")
      .where("Type", "==", "user")
      .get()
      .then(result => {
        const list = result.docChanges().map(result => result.doc.data());
        dispatch({ type: actionTypes.All_USERS, payload: list });
      })
      .catch(error => {
        dispatch({ type: actionTypes.VENDORS_LIST_ERROR, payload: error });
        dispatch({ type: actionTypes.START_LOADING, payload: false });
      });
  };
};
