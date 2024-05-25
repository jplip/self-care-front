---
permalink: /tracking/
--- 

![Alt text](images/exercise.png)
<html>
<style>
</style>
<body>
<div class="container">
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
    <script type="module">
    import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';
        const userIDFromLocalStorage = localStorage.getItem('loggedInUserId');
        console.log(userIDFromLocalStorage);
        const userNameFromLocalStorage = localStorage.getItem('loggedInUserName');
        document.getElementById('exerciseForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const exerciseType = document.getElementById('exerciseType').value;
            const duration = document.getElementById('duration').value;
            const exerciseDate = document.getElementById('exerciseDate').value;
            fetch(`https://well.stu.nighthawkcodingsociety.com/api/users/${userIDFromLocalStorage}`)
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
                        "exercise": updatedExerciseData,
                        "sleep": originalSleepData
                    };
                    var jsonData = JSON.stringify(data2);
                    fetch(`https://well.stu.nighthawkcodingsociety.com/api/users/${userIDFromLocalStorage}`, {
                        ...options,
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
    <iframe src="{{site.baseurl}}/exercisegraph" width="400" height="100" frameborder="0"></iframe>
</body>
</html>


 ![Alt text](images/sleep.png)

<meta charset="UTF-8">
<title>Sleep Tracker</title>

 ![Alt text](legend.png)
<div class="container">
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

<script type="module">
    import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';
    const userIDFromLocalStorage = localStorage.getItem('loggedInUserId');
   const userNameFromLocalStorage = localStorage.getItem('loggedInUserName');
    console.log(userIDFromLocalStorage);
    document.getElementById('sleepForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const sleepHours = document.getElementById('sleepHours').value;
        const quality = document.getElementById('quality').value;
        const sleepDate = document.getElementById('sleepDate').value;
        fetch(`https://well.stu.nighthawkcodingsociety.com/api/users/${userIDFromLocalStorage}`)
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
                        "exercise": originalExerciseData,
                        "sleep": updatedSleepData
                    };
                    var jsonData = JSON.stringify(data2);
                    fetch(`https://well.stu.nighthawkcodingsociety.com/api/users/${userIDFromLocalStorage}`, {
                        ...options,
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
 <iframe src="{{site.baseurl}}/sleepgraph" width="800" height="600" frameborder="0"></iframe>
    
<html>






