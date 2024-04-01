---
permalink: /diary
---
<style>
/* Add some styling for the surrounding box */
  #diary-title-container {
    background-image: url('https://files.catbox.moe/1m85ow.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    color: black; /* Black text */
    padding: 50px 20px;
    text-align: center;
  }
  #diary {
    width: 70%; /* Adjust width as needed */
    margin: 0 auto; /* Center the textarea */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  /* Center text inside diary-container */
  .diary-container {
    text-align: center;
  }
  /* Style the data container */
  .data-container {
    border: 2px solid #ccc; /* Border style */
    padding: 20px; /* Padding inside the container */
    margin: 20px auto; /* Center the container */
    max-width: 600px; /* Maximum width of the container */
  }
  .diary-buttons {
    padding: 10px 20px; /* Padding around the button text */
    background-color: #007bff; /* Button background color */
    color: white; /* Button text color */
    border: none; /* Remove button border */
    border-radius: 5px; /* Rounded corners */
    cursor: pointer; /* Show pointer cursor on hover */
    transition: background-color 0.3s ease; /* Smooth transition for background color */
  }
  /* Hover effect for the button */
  .diary-buttons:hover {
      background-color: #0056b3; /* Darker background color on hover */
  }
</style>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body class='sandiego-background'>
    <header class="header">
        <button onclick="goHome()" >......</button>
        <button onclick="goWeather()">......</button>
        <button onclick="goActivities()">.......</button>
    </header>
    <div id='diary-title-container'>
        <h1 class='title'>Personal Diary</h1>
    </div>
    <br>
    <br>
    <div class="diary-container">
        <h2 id="subtitle">Diary:</h2>
        <form>
            <textarea id="diary" class="input" placeholder="(Day), (Time): (Activity)"></textarea><br>
        </form>
        <button class="diary-buttons" onclick="diary()">New Entry</button>
        <br>
        <br>
        <button class="diary-buttons" onclick="fetchDiary()">Load Personal Diary</button>
        <p id="error"></p>
    <div class="data-container">
        <h2 id='subtitle'>Your Diary:</h2>
        <div id="data"></div>
    </div>
    </div>
<script>
</script>