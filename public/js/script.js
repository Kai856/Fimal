import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
import { storage } from './config.js';

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
    const files = event.target.files;
    if (!files.length) {
        alert('Please select an image to upload.');
        return;
    }
    
    for (const file of files) {
        const imageRef = ref(storage, file.name);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        displayImageInGallery(url);
    }
}

function displayImageInGallery(url) {
    const gallery = document.getElementById('gallery');
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Uploaded Image';
    img.className = 'uploaded-image';
    gallery.appendChild(img);
}