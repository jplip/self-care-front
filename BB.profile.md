---
layout: base
title: Profile
permalink: /profile
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
    <script>
    const userNameFromLocalStorage = localStorage.getItem('loggedInUserName');
    const userNameElement = document.getElementById('user-name');

    if (userNameFromLocalStorage) {
        userNameElement.textContent = userNameFromLocalStorage;
    }
   </script>
    <script src="{{site.baseurl}}/assets/script.js"></script>
</body>
</html>
