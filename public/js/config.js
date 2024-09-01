import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";

export const firebaseConfig = {
  apiKey: "AIzaSyAxjhxw8VsuGcg_XG60UZ6yW0vL26dsaSs",
  authDomain: "fimal-2c299.firebaseapp.com",
  databaseURL: "https://fimal-2c299-default-rtdb.firebaseio.com",
  projectId: "fimal-2c299",
  storageBucket: "fimal-2c299.appspot.com",
  messagingSenderId: "326072839584",
  appId: "1:326072839584:web:6a854b1502c94a1cb508c5",
  measurementId: "G-YB4FY6EXSD"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);