import firebase from "firebase/app";
import "firebase/auth";
import "firebase/messaging";

import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);
// firebase
//   .firestore()
//   .enablePersistence()
//   .catch((err) => {
//     if (err.code == "failed-precondition") {
//       // Multiple tabs open, persistence can only be enabled
//       // in one tab at a a time.
//       // ...
//     } else if (err.code == "unimplemented") {
//       // The current browser does not support all of the
//       // features required to enable persistence
//       // ...
//     }
//   });
