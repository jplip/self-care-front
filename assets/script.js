document.getElementById('image').addEventListener('change', handleImageUpload);
document.getElementById('profile-form').addEventListener('submit', handleSubmit);

let originalImageData;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function applyFilter(filter) {
    // Retrieve the image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Apply the selected filter to the image data on the canvas
    for (let i = 0; i < data.length; i += 4) {
        let r = originalImageData.data[i];
        let g = originalImageData.data[i + 1];
        let b = originalImageData.data[i + 2];

        switch (filter) {
            case 'grayscale':
                const gray = 0.3 * r + 0.59 * g + 0.11 * b;
                data[i] = data[i + 1] = data[i + 2] = gray;
                break;
            case 'invert':
                data[i] = 255 - r;
                data[i + 1] = 255 - g;
                data[i + 2] = 255 - b;
                break;
            case 'sepia':
                data[i] = 0.393 * r + 0.769 * g + 0.189 * b;
                data[i + 1] = 0.349 * r + 0.686 * g + 0.168 * b;
                data[i + 2] = 0.272 * r + 0.534 * g + 0.131 * b;
                break;
        }
    }

    // Put the modified image data back to the canvas
    ctx.putImageData(imageData, 0, 0);

    // Convert canvas data to blob and update original image file input
    canvas.toBlob(function(blob) {
        const newFile = new File([blob], file.name, { type: 'image/png' });
        const fileInput = document.getElementById('image');
        const newFileInput = document.createElement('input');
        newFileInput.type = 'file';
        newFileInput.files = [newFile];
        newFileInput.style.display = 'none';
        fileInput.parentNode.appendChild(newFileInput);
        fileInput.parentNode.removeChild(fileInput);
        document.getElementById('profile-form').appendChild(fileInput);
    }, 'image/png');
}


function resetImage() {
    if (originalImageData) {
        ctx.putImageData(originalImageData, 0, 0);
    }
}

async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('age', document.getElementById('age').value);
    formData.append('gender', document.getElementById('gender').value);
    formData.append('bio', document.getElementById('bio').value);
    formData.append('exerciseGoals', document.getElementById('exerciseGoals').value);
    formData.append('sleepGoals', document.getElementById('sleepGoals').value);

    const image = canvas.toDataURL('image/png');
    formData.append('image', image);

    const response = await fetch('/api/update_profile', {
        method: 'PUT',
        body: formData
    });

    const result = await response.json();
    console.log(result);
}

