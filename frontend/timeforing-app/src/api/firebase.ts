// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  GoogleAuthProvider,
  getAuth,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";

import { setAppState, type user } from "../store/store";
import guestIcon from "../assets/guest_icon.webp";
import { initializeUser } from "../store/store";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  projectId: "***REMOVED***",
  storageBucket: "***REMOVED***.appspot.com",
  messagingSenderId: "***REMOVED***",
  appId: "1:***REMOVED***:web:cf6de4e3ba34603b2741aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.addScope("email");
provider.addScope("profile");
provider.addScope("openid");

const auth = getAuth();
// auth.languageCode = 'it';
// // To apply the default browser preference instead of explicitly setting it.
auth.useDeviceLanguage();

export function signInGoogle() {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;

      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      setAppState({
        user: <user>{
          user_id: user.uid,
          name: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
        },
      });
      await initializeUser();
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode, errorMessage, email, credential);
    });
}

export function signInGuest() {
  signInAnonymously(auth)
    .then(async (result) => {
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      setAppState({
        user: <user>{
          user_id: user.uid,
          name: "guest",
          email: "none",
          profile_picture: guestIcon,
        },
      });
      await initializeUser();
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode, errorMessage, email, credential);
    });
}
