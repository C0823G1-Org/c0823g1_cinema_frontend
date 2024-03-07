import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD7dKcxrDBquL3ZjhpCPzmy0stpTJlEwjo",
    authDomain: "movie-ticket-f0285.firebaseapp.com",
    projectId: "movie-ticket-f0285",
    storageBucket: "movie-ticket-f0285.appspot.com",
    messagingSenderId: "730633865034",
    appId: "1:730633865034:web:d656d05bb78f82caa163b3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};
export const storage = getStorage(app)