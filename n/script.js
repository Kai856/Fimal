// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getStorage, ref } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxjhxw8VsuGcg_XG60UZ6yW0vL26dsaSs",
  authDomain: "fimal-2c299.firebaseapp.com",
  projectId: "fimal-2c299",
  storageBucket: "fimal-2c299.appspot.com",
  messagingSenderId: "326072839584",
  appId: "1:326072839584:web:6a854b1502c94a1cb508c5",
  measurementId: "G-YB4FY6EXSD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


// When select image button gets clicked, identifies fileInput and applies function
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fileInput').addEventListener('change', function() {
        const fileInput = this;
        const displayArea = document.getElementById("displayArea");
        const dragText = document.querySelector('.drag-text');

        // Turn on the display area
        displayArea.classList.add('active');
        dragText.style.display = 'none';

        // Clear the display area
        displayArea.innerHTML = '';

        if (fileInput.files.length === 1) {
            displayOneFile(fileInput.files[0]); // Handle single file
        } else if (fileInput.files.length > 1) {
            displayFolder(fileInput.files); // Handle multiple files
        }
    });
});


function displayOneFile(file) {
    console.log('got here');
    const displayArea = document.getElementById("displayArea");

    // Clear displayArea
    const fileNameBox = document.createElement('div');
    fileNameBox.className = 'file-name';
    fileNameBox.textContent = file.name;
    displayArea.appendChild(fileNameBox);
}

function displayFolder(files) {
    const displayArea = document.getElementById("displayArea");

    // Clear displayArea

    Array.from(files).forEach(file => {
        const fileNameBox = document.createElement('div');
        fileNameBox.className = 'file-name';
        fileNameBox.textContent = file.name;
        displayArea.appendChild(fileNameBox);
    });
}




// Function to handle the file upload to Firebase
function uploadToFirestore(file) {
    const storageRef = ref(storage, `Images/${file.webkitRelativePath || file.name}`);

    uploadBytes(storageRef, file).then((snapshot) => {
        console.log(`Uploaded ${file.name} successfully!`);
    }).catch((error) => {
        console.error(`Failed to upload ${file.name}:`, error);
    });
}
