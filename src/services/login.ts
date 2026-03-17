import { initializeApp } from 'firebase/app';
import { API_URL, SOSPATAS_API_KEY } from '@/config';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { FIREBASE_APIKEY as apiKey, FIREBASE_APP_ID as appId, FIREBASE_AUTH_DOMAIN as authDomain, FIREBASE_MESSAGIN_SENDER_ID as messagingSenderId, FIREBASE_PROJECT_ID as projectId, FIREBASE_STORAGE_BUCKET as storageBucket } from '@/config';
import { getUserById } from './getUsers';

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
    .then(async (result) => {
      const { displayName, uid, photoURL } = result.user;
      const user = {
        name: displayName ?? 'Usuario',
        id: uid,
        photo: photoURL ?? 'public/avatar.png'
      };

      const userExists = await checkUsersExistence(user.id);
      console.log(userExists);

      if (!userExists) {
        await registNewUser(user);

      }

      return user;
    }).catch((error) => {
      console.log(error);
    });
};

const registNewUser = async (data: { name: string, id: string, photo: string; }) => {
  const { name: displayName, id, photo: photoURL } = data;

  const payload = {
    displayName,
    id,
    photoURL
  };

  try {
    const registedUser = await fetch(`${API_URL}/users/`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'x-api-key': SOSPATAS_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    await registedUser.json();
  } catch (err) {
    console.log(err);
  }
};

const checkUsersExistence = async (id: string) => {
  const user = await getUserById(id);
  return user.length > 0 ? true : false;
};