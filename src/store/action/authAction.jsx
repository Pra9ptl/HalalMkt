import * as actionTypes from "../actionTypes/authActionType";
import { auth, db } from "../../utility/firebase";
import AsyncStorage from "@react-native-community/async-storage";

const storeData = async (e, p, t) => {
  try {
    const data = {
      loggedIn: e !== "" && p!=="" && t !== "" && true,
      email: e,
      password: p,
      userType: t
    };

    await AsyncStorage.setItem("userData", JSON.stringify(data));
  } catch (e) {
    // saving error
  }
};

export const signInAction = (email, password) => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        db
          .collection("User")
          .where("Email", "==", email)
          .get()
          .then(result => {
            result.docChanges().map(user => {
              const u = user.doc.data().Type;

              if (u === "user") {
                dispatch({
                  type: actionTypes.AUTH_SIGNIN,
                  email: user.doc.data().Email,
                  name: user.doc.data().Name,
                  phone: user.doc.data().PhoneNumber,
                  address: user.doc.data().Address,
                  userType: u
                });
              }
              if (u === "vendor") {
                dispatch({
                  type: actionTypes.AUTH_VENDOR_SIGNIN,
                  email: user.doc.data().Email,
                  name: user.doc.data().Name,
                  phone: user.doc.data().PhoneNumber,
                  address: user.doc.data().Address,
                  storeName: user.doc.data().StoreName,
                  userType: u,
                  IsActive: user.doc.data().IsActive,
                  StockType: user.doc.data().StockType
                });
              }
              // setUserT(result.docChanges()[0].doc.data().type);
              storeData(email, password, u);
            });
          })
          .catch(error => {
            dispatch({ type: actionTypes.AUTH_ERROR, payload: error.message });
            storeData("", "", "");
          });

      })
      .catch(e => {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: e.message });
        storeData("", "", "");
      });
  };
};

export const signUpAction = (email, password, name, phone, address) => {
  return dispatch => {

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        // dispatch({ type: LOADER_AUTH ,payload:false });

        db
          .collection("User")
          .doc()
          .set({
            Address: address,
            Email: email,
            IsActive: 1,
            Name: name,
            PhoneNumber: phone,
            type: "user"
          })
          .then(() => {
            dispatch({ type: actionTypes.START_LOADING, payload: false });
          })
          .catch(error => {
            dispatch({ type: actionTypes.AUTH_ERROR, payload: error.message });
            dispatch({ type: actionTypes.START_LOADING, payload: false });
            storeData("", "", "");
          });

        dispatch({
          type: actionTypes.AUTH_REGISTER,
          email: response.user.email,
          name: name,
          phone: phone,
          address: address,
          userType: "user"
        });

        storeData(email, password, "user");
      })
      .catch(error => {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: error.message });
        dispatch({ type: actionTypes.START_LOADING, payload: false });
        storeData("", "", "");
      });
  };
};

export const profileUpdate = (email, name, phone, address) => {

  console.log("Profile Update")

  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });

    db
      .collection("User")
      .where("Email", "==", email)
      .get()
      .then(result => {
        // const list = result.docChanges().map(result => result.doc.data());
        const id = result.docChanges().map(d => d.doc.id);
        console.log("response data", id);

        console.log("Data", email, name, phone, address)
        db
          .collection("User")
          .doc(id.toString())
          .update({
            Name: name,
            PhoneNumber: phone,
            Address: address
          })
          .then(() => {
            console.log("User Updated")
            dispatch({
              type: actionTypes.AUTH_PROFILE_UPDATE,
              name: name,
              phone: phone,
              address: address
            });
            dispatch({ type: actionTypes.START_LOADING, payload: false });
          })
          .catch(error => {
            dispatch({ type: actionTypes.START_LOADING, payload: false });
            dispatch({ type: actionTypes.AUTH_ERROR, payload: error });
          });
      })
      .catch(error => {
        dispatch({ type: actionTypes.START_LOADING, payload: false });
        dispatch({ type: actionTypes.AUTH_ERROR, payload: error });
      });
  };
};

export const updateServerPassword = (newPassword, uType, callback) => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });
    auth.currentUser.updatePassword(newPassword).then(() => {
      storeData(auth.currentUser.email, newPassword, uType);
      dispatch({ type: actionTypes.START_LOADING, payload: false });
      callback();
    });
  };
};

export const vendorProfileUpdate = (email, name, storenm, phone, address) => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });

    db
      .collection("User")
      .where("Email", "==", email)
      .get()
      .then(result => {
        // const list = result.docChanges().map(result => result.doc.data());
        const id = result.docChanges().map(d => d.doc.id);
        db
          .collection("User")
          .doc(id)
          .update({
            Name: name,
            PhoneNumber: phone,
            Address: address,
            StoreName: storenm
          })
          .then(() => {
            dispatch({
              type: actionTypes.AUTH_PROFILE_UPDATE,
              name: name,
              phone: phone,
              address: address,
              storeName: storenm
            });
          })
          .catch(error => {
            dispatch({ type: actionTypes.AUTH_ERROR, payload: error });
          });
      })
      .catch(error => {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: error });
      });
  };
};

export const switchIsActiveStatus = (vEmail, status) => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });
    db.collection("User").where("Email", "==", vEmail).get().then(result => {
      const id = result.docChanges().map(d => d.doc.id);
      db
        .collection("User")
        .doc(id.toString())
        .update({
          IsActive: status === true ? 1 : 0
        })
        .then(() => {
          dispatch({
            type: actionTypes.BUSINESS_ACTIVE_STATUS,
            payload: status === true ? 1 : 0
          });
        })
        .catch(error => {
          dispatch({ type: actionTypes.AUTH_ERROR, payload: error });
        });
    });
  };
};

export const signOutAction = () => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });
    dispatch({ type: actionTypes.AUTH_SIGNOUT });
    auth.signOut().catch(error => {
      dispatch({ type: actionTypes.AUTH_ERROR, payload: error });
    });
    AsyncStorage.removeItem("userData");
    dispatch({ type: actionTypes.START_LOADING, payload: false });
  };
};

export const clearState = () => {
  return dispatch => {
    dispatch({ type: actionTypes.START_LOADING, payload: true });
    dispatch({ type: actionTypes.AUTH_CLEAR_STATE });
    dispatch({ type: actionTypes.START_LOADING, payload: false });
  };
};
