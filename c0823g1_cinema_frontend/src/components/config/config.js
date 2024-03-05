import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyC_s2yYtCEqi0h5NenIr7zd_qZITfKoKlI",
    authDomain: "c08-cinema-24ac2.firebaseapp.com",
    projectId: "c08-cinema-24ac2",
    storageBucket: "c08-cinema-24ac2.appspot.com",
    messagingSenderId: "816911925461",
    appId: "1:816911925461:web:d342dbe71877472898a25c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};