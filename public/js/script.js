// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getStorage, ref } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
import { firebaseConfig} from '/js/config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// When select image button gets clicked, identifies fileInput and applies function
document.getElementById('fileInput').addEventListener('change', function() {
    const displayArea = document.getElementById("displayArea");
    const dragText = document.querySelector('.drag-text');   
    // turns on the display area 
    dragText.style.display = 'none';   
    // have fucntion to upload
    displayArea.innerHTML = '';

    const uploadButton = document.createElement('button');
    uploadButton.textContent = "Upload";
    uploadButton.className = "button upload-button";


    if (fileInput.files.length === 1) {
        displayOneFile(fileInput.files[0]); // Pass the single file object
    } else if (fileInput.files.length > 1) {
        displayFolder(fileInput.files); // Pass the FileList object (all files)
    }
 
});

function displayOneFile(file) {
    const displayArea = document.getElementById("displayArea");

    const fileNameBox = document.createElement('div');
    fileNameBox.className = 'file-name';
    fileNameBox.textContent = file.name;
    displayArea.appendChild(fileNameBox);
}

function displayFolder(files) {
    console.log('got here');
    const displayArea = document.getElementById("displayArea");


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
