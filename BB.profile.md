---
layout: base
title: Profile
permalink: /profiley
---

<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Profile Page</title>
   <style>
       .profile-container {
           max-width: 600px;
           margin: 0 auto;
           padding: 20px;
       }
       .profile-image {
           width: 100%;
           max-width: 300px;
       }
       .filter-buttons {
           margin-top: 10px;
       }
       .filter-buttons button {
           margin-right: 10px;
       }
   </style>
</head>
<body>
<h1>Welcome, <span id="user-name"></span>!</h1>
   <div class="profile-container">
       <h2>Profile Page</h2>
       <div id="image-container"></div>
       <form id="profile-form">
           <label for="age">Age:</label>
           <input type="number" id="age" name="age"><br><br>
            <label for="gender">Gender:</label>
            <select id="gender" name="gender" required>
               <option value="male">Male</option>
               <option value="female">Female</option>
           </select><br>
           <label for="bio">Bio:</label>
           <textarea id="bio" name="bio"></textarea><br><br>
           <label for="exerciseGoals">Exercise Goals:</label>
           <input type="text" id="exerciseGoals" name="exerciseGoals"><br><br>
           <label for="sleepGoals">Sleep Goals:</label>
           <input type="text" id="sleepGoals" name="sleepGoals"><br><br>
           <label for="image">Profile Image:</label>
           <input type="file" id="image" accept="image/*"><br><br>
           <canvas id="canvas" class="profile-image"></canvas><br><br>
           <div class="filter-buttons">
               <button type="button" onclick="applyFilter('grayscale')">Grayscale</button>
               <button type="button" onclick="applyFilter('invert')">Invert</button>
               <button type="button" onclick="applyFilter('sepia')">Sepia</button>
               <button type="button" onclick="resetImage()">Reset</button>
           </div><br><br>
           <button type="submit">Submit</button>
       </form>
   </div>
  <script type="module">
   import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';
   const userNameFromLocalStorage = localStorage.getItem('loggedInUserName');
   const userIDFromLocalStorage = localStorage.getItem('loggedInUserId');
   const userNameElement = document.getElementById('user-name');

   if (userNameFromLocalStorage) {
       userNameElement.textContent = userNameFromLocalStorage;
   }
   async function handleSubmit(event) {
   event.preventDefault();



   const formData = {
       id: userIDFromLocalStorage,
       age: document.getElementById('age').value,
       gender: document.getElementById('gender').value,
       bio: document.getElementById('bio').value,
       exerciseGoals: document.getElementById('exerciseGoals').value,
       sleepGoals: document.getElementById('sleepGoals').value,
   };


   canvas.toBlob(async (blob) => {
       try {
           const base64String = await blobToBase64(blob);
           formData.image_path = base64String;


           const response = await fetch(`https://well.stu.nighthawkcodingsociety.com/api/users/${userIDFromLocalStorage}`, {
               ...options,
               method: 'PUT',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(formData)
           });


           if (!response.ok) {
               const errorText = await response.text();
               throw new Error(`Server error: ${errorText}`);
           }


           const contentType = response.headers.get('content-type');
           if (contentType && contentType.includes('application/json')) {
               const result = await response.json();
               console.log(result);
           } else {
               const resultText = await response.text();
               throw new Error(`Unexpected response type: ${resultText}`);
           }
       } catch (error) {
           console.error('Error during form submission:', error);
       }
   }, 'image/png');
}


   async function fetchAndDisplayImage() {
           try {
               // Fetch JSON response
               const response = await fetch(`https://well.stu.nighthawkcodingsociety.com/api/users/${userIDFromLocalStorage}`); // Updated API endpoint
               if (!response.ok) {
                   throw new Error('Failed to fetch image: ' + response.status + ' ' + response.statusText);
               }
               const data = await response.json();
               const base64String = data.image_path;


               // Log the received base64 string for debugging
               console.log('Received base64 string:', base64String);


               // Validate base64 string format
               if (!base64String || !/^[A-Za-z0-9+/=]+$/.test(base64String)) {
                   throw new Error('Received string is not a valid base64 encoded string');
               }


               // Convert base64 string to blob
               const byteCharacters = atob(base64String);
               const byteNumbers = new Array(byteCharacters.length);
               for (let i = 0; i < byteCharacters.length; i++) {
                   byteNumbers[i] = byteCharacters.charCodeAt(i);
               }
               const byteArray = new Uint8Array(byteNumbers);
               const blob = new Blob([byteArray], { type: 'image/png' }); // Adjust the type if needed


               // Create image element and display the blob
               const img = document.createElement('img');
               img.src = URL.createObjectURL(blob);


               // Append image to a container
               const imageContainer = document.getElementById('image-container');
               imageContainer.appendChild(img);
           } catch (error) {
               console.error('Error fetching image:', error);
           }
       }


       // Call the async function when the DOM content is loaded
       document.addEventListener('DOMContentLoaded', fetchAndDisplayImage);
       document.getElementById('profile-form').addEventListener('submit', handleSubmit);


  </script>
   <script src="{{site.baseurl}}/assets/script.js"></script>
</body>
</html>
