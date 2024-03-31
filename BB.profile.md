---
layout: base
title: Profile
permalink: /profile/
--- 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Image Editor</title>
    <style>
        .pixel {
            width: 20px;
            height: 20px;
            display: inline-block;
            border: 1px solid black;
        }
    </style>
</head>
<body>
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
</body>
</html>
