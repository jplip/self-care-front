



document.getElementById('image').addEventListener('change', handleImageUpload);


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
   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
   const data = imageData.data;


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


   ctx.putImageData(imageData, 0, 0);
}


function resetImage() {
   if (originalImageData) {
       ctx.putImageData(originalImageData, 0, 0);
   }
}






// Helper function to convert Blob to Base64 string
async function blobToBase64(blob) {
   return new Promise((resolve, reject) => {
       const reader = new FileReader();
       reader.onloadend = function() {
           const base64String = btoa(reader.result);
           resolve(base64String);
       };
       reader.onerror = function() {
           reject(new Error('Error reading blob'));
       };
       reader.readAsBinaryString(blob);
   });
}
