// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxjhxw8VsuGcg_XG60UZ6yW0vL26dsaSs",
  authDomain: "fimal-2c299.firebaseapp.com",
  projectId: "fimal-2c299",
  storageBucket: "fimal-2c299.appspot.com",
  messagingSenderId: "326072839584",
  appId: "1:326072839584:web:6a854b1502c94a1cb508c5",
  measurementId: "G-YB4FY6EXSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function onPageLoaded() {
    // Write your javascript code here
    console.log("page loaded");
}

document.addEventListener('DOMContentLoaded', function() {
    // Listen for clicks on elements with the class 'play-button'
    document.querySelectorAll('.play-button').forEach(function(button) {
        button.addEventListener('click', function() {
            // When a play button is clicked, simulate a click on the <a> tag within the same .video-container
            this.parentNode.querySelector('a').click();
        });
    });
});

