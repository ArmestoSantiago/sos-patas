import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { FIREBASE_APIKEY as apiKey, FIREBASE_APP_ID as appId, FIREBASE_AUTH_DOMAIN as authDomain, FIREBASE_MESSAGIN_SENDER_ID as messagingSenderId, FIREBASE_PROJECT_ID as projectId, FIREBASE_STORAGE_BUCKET as storageBucket } from '@/config';

export const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};

export const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const signOutFn = async () => {
  return signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Saliste');
  }).catch(() => {
    console.log('De acá no sale nadie');
  });
};

export const signIn = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const { displayName, uid, photoURL } = result.user;
      const user = {
        name: displayName ?? 'Usuario',
        id: uid,
        photo: photoURL ?? 'public/avatar.png'
      };
      return user;
    }).catch((error) => {
      console.log(error);
    });
};