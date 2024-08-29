import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
import { firebaseConfig } from './config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

console.log('Firebase app initialized:', app);
console.log('Firebase storage initialized:', storage);






document.getElementById('fileInput').addEventListener('change', function() {
    const displayArea = document.getElementById("displayArea");
    const dragText = document.querySelector('.drag-text');  
    const selectButtonLabel = document.querySelector('label[for="fileInput"]'); 
    const files = this.files;
    selectButtonLabel.style.display = 'none';
    dragText.style.display = 'none';  
    displayArea.innerHTML = '';

    const uploadButton = document.createElement('button');
    uploadButton.id = "uploadButton";
    uploadButton.textContent = "Upload";
    uploadButton.className = "button uploadButton";
    console.log('Upload button created:', uploadButton);

    displayArea.appendChild(uploadButton);

    if (this.files.length === 1) {
        displayOneFile(this.files[0]);
    } else if (this.files.length > 1) {
        displayFolder(this.files);
    }

 document.addEventListener('DOMContentLoaded', (event) => {
   uploadButton.addEventListener('click', function() {
        console.log('Upload button clicked');
        if (files.length === 1) { // Use 'this.files' here
            uploadToFirestore(this.files[0]); 
        } else if (this.files.length > 1) { 
            Array.from(files).forEach((file, index) => {
                console.log(`Uploading file ${index + 1} of ${this.files.length}:`, file.name);
                uploadToFirestore(file, index);
            });
        }
    });
});
});


function displayOneFile(file) {
    const displayArea = document.getElementById("displayArea");

    const fileNameBox = document.createElement('div');
    fileNameBox.className = 'file-name';
    fileNameBox.textContent = file.name;
    displayArea.appendChild(fileNameBox);
}

function displayFolder(files) {
    const displayArea = document.getElementById("displayArea");

    Array.from(files).forEach(file => {
        const fileNameBox = document.createElement('div');
        fileNameBox.className = 'file-name';
        fileNameBox.textContent = file.name;
        displayArea.appendChild(fileNameBox);
    });
}

// Function to handle the file upload to Firebase
function uploadToFirestore(file, index) {
    console.log('Uploading:', file.name);

    // Creating a reference to the file path
    const storageRef = ref(storage, `images/${index}_${file.webkitRelativePath || file.name}`);

    // Upload the file
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log(`Uploaded ${file.name} successfully!`);
    }).catch((error) => {
        console.error(`Failed to upload ${file.name}:`, error);
    });
}
 
 
 
