// Import Firebase and other necessary functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
import { firebaseConfig } from './config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

console.log('Firebase app initialized:', app);
console.log('Firebase storage initialized:', storage);

// Event listeners for drag-and-drop and file selection
document.getElementById('fileInput').addEventListener('change', handleFiles);
document.getElementById('drop-area').addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
    document.getElementById('drop-area').classList.add('dragover');
});
document.getElementById('drop-area').addEventListener('dragleave', () => {
    document.getElementById('drop-area').classList.remove('dragover');
});
document.getElementById('drop-area').addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('drop-area').classList.remove('dragover');

    const files = event.dataTransfer.files;
    handleFiles({ target: { files } });
});

async function handleFiles(event) {
    let files = event.target.files;
    const displayArea = document.getElementById("displayArea");
    const dragText = document.querySelector('.drag-text');  
    const selectButtonLabel = document.querySelector('label[for="fileInput"]'); 

    // Filter out .DS_Store and other unwanted hidden files
    files = Array.from(files).filter(file => !file.name.startsWith('.') && !file.name.includes('.DS_Store'));

    if (!files.length) {
        alert('No valid files to upload.');
        return;
    }

    selectButtonLabel.style.display = 'none';
    dragText.style.display = 'none';  
    displayArea.innerHTML = '';

    const uploadButton = document.createElement('button');
    uploadButton.id = "uploadButton";
    uploadButton.textContent = "Upload";
    uploadButton.className = "button uploadButton";
    console.log('Upload button created:', uploadButton);

    displayArea.appendChild(uploadButton);

    if (files.length === 1) {
        displayOneFile(files[0]);
    } else if (files.length > 1) {
        displayFolder(files);
    }

    uploadButton.addEventListener('click', async function(event) {
        console.log('Upload button clicked');
        displayArea.innerHTML = '';
        event.preventDefault();
    
        for (const file of files) {
            const folderName = file.webkitRelativePath.split('/')[0]; // Extract the first folder name from the path
            const storagePath = `images/${folderName}/${file.name}`; // Construct the storage path as images/foldername/filename
        
            await uploadToFirestore(file, storagePath);
            const url = await getDownloadURL(ref(storage, storagePath));  
            // Uncomment the line below to display the image in the gallery
            // displayImageInGallery(url);
        }

        // Commented out the entire block related to the ML model and server interaction
        /*
        const formData = new FormData();
        files.forEach(file => {
            formData.append('file', file);
        });

        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`HTTP error! status: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log("Server response data:", data);  // Debug print
            console.log("Prediction Result:", data.prediction);  // Debug print

            files.forEach((file, index) => {
                displayArea.innerHTML = '';
                const prediction = document.createElement('h2');
                prediction.id = 'result';
                prediction.textContent = `Prediction: ${data.prediction}`;
                displayArea.appendChild(prediction);
            });
        })
        .catch(error => console.error('Error:', error));
        */
    //});
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

async function uploadToFirestore(file) {
    console.log('Uploading:', file.name);

    // Creating a reference to the file path
    const storageRef = ref(storage, `images/${file.webkitRelativePath || file.name}`);  // Removed index from path

    // Upload the file
    await uploadBytes(storageRef, file);
    console.log(`Uploaded ${file.name} successfully!`);
}

// Uncomment this function to re-enable image display after upload
/*
function displayImageInGallery(url) {
    const gallery = document.getElementById('gallery');
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Uploaded Image';
    img.className = 'uploaded-image';
    gallery.appendChild(img);
}
*/
}
