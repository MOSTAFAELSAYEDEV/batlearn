import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmdDfMoVstzxs_XoaYxJIFlo93vJLcQn4",
    authDomain: "batlearn-a7fde.firebaseapp.com",
    projectId: "batlearn-a7fde",
    storageBucket: "batlearn-a7fde.firebasestorage.app",
    messagingSenderId: "647689213644",
    appId: "1:647689213644:web:ffce2fada284d91887d469"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
