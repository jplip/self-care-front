---
layout: base
title: Profile
permalink: /profile
---
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Profile Image Editor</title>

<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .container {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .pixel {
        width: 20px;
        height: 20px;
        display: inline-block;
        border: 1px solid black;
    }
    input[type="number"] {
        width: 60px;
        padding: 5px;
        margin-right: 10px;
    }
    button {
        padding: 8px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    button:hover {
        background-color: #45a049;
    }
</style>

<div class="container">
    <h1>Profile Image Editor</h1>
    <div id="profileImageContainer"></div>
    <br>
    <label>Row:</label>
    <input type="number" id="rowInput">
    <label>Column:</label>
    <input type="number" id="colInput">
    <br>
    <label>Red:</label>
    <input type="number" id="redInput">
    <label>Green:</label>
    <input type="number" id="greenInput">
    <label>Blue:</label>
    <input type="number" id="blueInput">
    <br>
    <button onclick="changePixelColor()">Change Pixel Color</button>
</div>

<script>
    const profileImageContainer = document.getElementById('profileImageContainer');
    const profileImage = [
        [[255, 0, 0], [255, 255, 255], [0, 0, 255]],
        [[255, 255, 0], [0, 255, 0], [255, 0, 255]],
        [[0, 255, 255], [128, 128, 128], [0, 0, 0]]
    ];

    function displayProfileImage() {
        profileImageContainer.innerHTML = ''; // Clear previous content
        profileImage.forEach(row => {
            row.forEach(pixel => {
                const pixelDiv = document.createElement('div');
                pixelDiv.className = 'pixel';
                pixelDiv.style.backgroundColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                profileImageContainer.appendChild(pixelDiv);
            });
            profileImageContainer.appendChild(document.createElement('br')); // Line break after each row
        });
    }

    function changePixelColor() {
        const row = parseInt(document.getElementById('rowInput').value);
        const col = parseInt(document.getElementById('colInput').value);
        const red = parseInt(document.getElementById('redInput').value);
        const green = parseInt(document.getElementById('greenInput').value);
        const blue = parseInt(document.getElementById('blueInput').value);

        if (isNaN(row) || isNaN(col) || isNaN(red) || isNaN(green) || isNaN(blue)) {
            alert('Please enter valid numbers.');
            return;
        }

        if (row < 0 || row >= profileImage.length || col < 0 || col >= profileImage[0].length) {
            alert('Invalid pixel location.');
            return;
        }

        profileImage[row][col] = [red, green, blue];
        displayProfileImage();
    }

    // Initial display of the profile image
    displayProfileImage();
</script>
