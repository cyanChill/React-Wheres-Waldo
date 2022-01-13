import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

/* Firebase Stuff */
firebase.initializeApp({
  apiKey: "AIzaSyCNTqqi0LpjoE4ncpLokHdixCR96wXXJBw",
  authDomain: "the-odin-project-31cd8.firebaseapp.com",
  projectId: "the-odin-project-31cd8",
  storageBucket: "the-odin-project-31cd8.appspot.com",
  messagingSenderId: "399134823311",
  appId: "1:399134823311:web:9278f1813af4b6e199b1fa",
});

const firestore = firebase.firestore();

/* Some fetch functions to access documents in a specific colleciton */
const fetchDocData = async (collection, docId) => {
  const docRef = firestore.collection(collection).doc(docId);
  const docData = await new Promise((resolve, reject) => {
    docRef.get().then((doc) => {
      if (doc.exists) {
        resolve(doc.data());
      } else {
        resolve(null);
      }
    });
  });

  return docData;
};

const docExists = async (collection, docId) => {
  const docRef = firestore.collection(collection).doc(docId);
  const exists = await new Promise((resolve, reject) => {
    docRef.get().then((doc) => {
      resolve(doc.exists);
    });
  });

  return exists;
};

export default firestore;
export { fetchDocData, docExists };
