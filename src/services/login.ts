import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { FIREBASE_APIKEY as apiKey, FIREBASE_AUTH_DOMAIN as authDomain, FIREBASE_PROJECT_ID as projectId, FIREBASE_STORAGE_BUCKET as storageBucket, FIREBASE_MESSAGIN_SENDER_ID as messagingSenderId, FIREBASE_APP_ID as appId } from '../config';

export const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const signOutFn = () => {
  return signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Saliste');

  }).catch((error) => {
    // An error happened.
    console.log('De acá no sale nadie');
  });
};

export const signIn = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      return result.user;
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(error);
    });
};