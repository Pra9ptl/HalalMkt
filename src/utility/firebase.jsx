import * as firebase from "firebase/app";
import "firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7n5Mi_wsd8qloOlx53ydMEzJ2sgmKiB8",
  authDomain: "halalmkt.firebaseapp.com",
  databaseURL: "https://halalmkt.firebaseio.com",
  projectId: "halalmkt",
  storageBucket: "halalmkt.appspot.com",
  messagingSenderId: "516294043833",
  appId: "1:516294043833:web:f896bfec75e51ffc8f9368",
  measurementId: "G-ZPJQ54N898"
};

// if (!firebase.app.length) {
firebase.initializeApp(firebaseConfig);
// }

const auth = firebase.auth();
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore();

export { auth, db };
