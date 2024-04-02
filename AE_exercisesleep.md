---
layout: base
title: Exercise/Sleep
permalink: /tracking/
--- 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exercise</title>
</head>
<body>
<div class="purple-form">
        <div id="binaryDurationBadge" class="binary-badge"></div>
        <form id="exerciseForm">
            <label for="exerciseType">Exercise Type:</label>
            <input type="text" id="exerciseType" name="exerciseType" placeholder="Enter exercise type" required>
            <label for="duration">Duration (in minutes):</label>
            <input type="number" id="duration" name="duration" placeholder="Enter duration" required>
            <label for="exerciseDate">Date of Exercise:</label>
            <input type="date" id="exerciseDate" name="exerciseDate" required>
            <input type="submit" value="Submit">
        </form>
    </div>
    <script>
        const userIDFromLocalStorage = localStorage.getItem('loggedInUserId');
        console.log(userIDFromLocalStorage);
        const userNameFromLocalStorage = localStorage.getItem('loggedInUserName');
        document.getElementById('exerciseForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const exerciseType = document.getElementById('exerciseType').value;
            const duration = document.getElementById('duration').value;
            const exerciseDate = document.getElementById('exerciseDate').value;
            fetch(`http://127.0.0.1:8086/api/users/${userIDFromLocalStorage}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const originalExerciseData = Array.isArray(data.exercise) ? data.exercise : [];
                    const originalSleepData = Array.isArray(data.sleep) ? data.sleep : [];
                    const exercise = {
                        "exerciseType": exerciseType,
                        "duration": duration,
                        "exerciseDate": exerciseDate
                    }
                    const updatedExerciseData = [...originalExerciseData, exercise];
                    const data2 = {
                        "id": userIDFromLocalStorage,
                        "name": userNameFromLocalStorage,
                        "uid": "life",
                        "dob": "10/12/13",
                        "age": "16",
                        "exercise": updatedExerciseData,
                        "sleep": originalSleepData
                    };
                    var jsonData = JSON.stringify(data2);
                    fetch(`http://127.0.0.1:8086/api/users/${userIDFromLocalStorage}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: jsonData
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Server response:', data);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    </script>
    <iframe src="https://jplip.github.io/self-care-front/exercisegraph/" width="800" height="600" frameborder="0"></iframe>
</body>
</html>

<meta charset="UTF-8">
<title>Sleep Tracker</title>
<div id="selectedAscii"></div>
<div class="purple-form">
    <form id="sleepForm">
        <label for="sleepHours">Hours of Sleep:</label>
        <input type="number" id="sleepHours" name="sleepHours" placeholder="Enter hours of sleep" required>
        <label for="quality">Quality of Sleep:</label>
        <select id="quality" name="quality" required>
            <option value="" disabled selected>Select quality</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
        </select>
        <label for="sleepDate">Date:</label>
        <input type="date" id="sleepDate" name="sleepDate" required>
        <input type="submit" value="Submit">
    </form>
</div>

<script>
    // const userIDFromLocalStorage = localStorage.getItem('loggedInUserId');
    // const userNameFromLocalStorage = localStorage.getItem('loggedInUserName');
    console.log(userIDFromLocalStorage);
    document.getElementById('sleepForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const sleepHours = document.getElementById('sleepHours').value;
        const quality = document.getElementById('quality').value;
        const sleepDate = document.getElementById('sleepDate').value;
        fetch(`http://127.0.0.1:8086/api/users/${userIDFromLocalStorage}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const originalSleepData = Array.isArray(data.sleep) ? data.sleep : [];
                    console.log(originalSleepData)
                    const originalExerciseData = Array.isArray(data.exercise) ? data.exercise : [];
                    const sleep = {
                        "sleepHours": sleepHours,
                        "quality": quality, 
                        "sleepDate": sleepDate
                    }
                    const updatedSleepData = [...originalSleepData, sleep];
                    console.log(updatedSleepData);
                    const data2 = {
                        "id": userIDFromLocalStorage,
                        "name": userNameFromLocalStorage, 
                        "uid": "life",
                        "dob": "10/12/13",
                        "age": "16",
                        "exercise": originalExerciseData,
                        "sleep": updatedSleepData
                    };
                    var jsonData = JSON.stringify(data2);
                    fetch(`http://127.0.0.1:8086/api/users/${userIDFromLocalStorage}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: jsonData
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Server response:', data);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
     </script>
 <iframe src="https://jplip.github.io/self-care-front/sleepgraph/" width="800" height="600" frameborder="0"></iframe>
    
<html>







