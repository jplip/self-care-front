---
permalink: /therapy
---
<style>
    .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    }
    .header button {
    background-color: white;
    color: black;
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    }
    .header button:hover {
    background-color: black;
    color: white;
    }
    .title-container {
    background-image: url('https://files.catbox.moe/1o92g3.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    color: black; /* Black text */
    padding: 50px 20px;
    text-align: center;
    }

    .container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    text-align: justify;
    }

    .title {
    margin-bottom: 20px;
    background-color: rgba(255, 255, 255, 0.7); /* Opaque white background */
    display: inline-block;
    padding: 10px 20px;
    border-radius: 10px;
    text-align: center;
    }

    .subtitle {
    margin-top: 30px;
    text-align: center;
    }

    .paragraph {
    margin-bottom: 20px;
    }
    /* Styling for therapy */
    #therapy-title-container {
    background-image: url('https://files.catbox.moe/8uvnzn.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    color: black; /* Black text */
    padding: 50px 20px;
    text-align: center;
    }
    table {
    border-collapse: collapse;
    width: 100%;
    }
    th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    }
    tr:nth-child(even) {
    background-color: #f2f2f2;
    }
    input[type=text] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    }
    img {
        width: 20px; /* Adjust width as needed */
        height: 20px; /* Adjust height as needed */
    }
</style>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Locations for Therapy</title>
</head>
<body class='sandiego-background'>
    <header class="header">
        <button onclick="goHome()" >......</button>
        <button onclick="goWeather()">.......</button>
        <button onclick="goItinerary()">.......</button>
    </header>

<div id='therapy-title-container'>
    <h1 class='title'>Where to Find Therapy:</h1>
</div>

<input type="text" id="searchInput" onkeyup="searchTable()" placeholder="Search for therapy...">
    <table id="therapy-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Family Friendly</th>
                <th>Adult Friendly</th>
                <th>Indoors</th>
                <th>Outdoors</th>
            </tr>
        </thead>
        <tbody>
            <!-- Table body will be populated dynamically -->
        </tbody>
    </table>

<script>
function searchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("therapy-table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0]; // Change index to match the column you want to search
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}

function displayTherapyTable() {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    };
    fetch("http://127.0.0.1:8086/api/therapy/", options)
    // Local: http://127.0.0.1:8010/api/therapy/
    // Deployed: https://SanDiegoTravel.stu.nighthawkcodingsociety.com/api/therapy/
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
            const tableBody = document.querySelector("#therapy-table tbody");
            tableBody.innerHTML = ""; // Clear the existing table data
            data.forEach(therapy => {
                const row = tableBody.insertRow();
                const nameCell = row.insertCell(0);
                const familyFriendlyCell = row.insertCell(1);
                const adultFriendlyCell = row.insertCell(2);
                const indoorsCell = row.insertCell(3);
                const outdoorsCell = row.insertCell(4);
                
                nameCell.textContent = therapy.name;
                familyFriendlyCell.innerHTML = therapy.family === "True" ? '<img src="https://files.catbox.moe/u818q8.png">' : '<img src="https://files.catbox.moe/jcffjn.png">';
                adultFriendlyCell.innerHTML = therapy.adult === "True" ? '<img src="https://files.catbox.moe/u818q8.png">' : '<img src="https://files.catbox.moe/jcffjn.png">';
                indoorsCell.innerHTML = therapy.indoors === "True" ? '<img src="https://files.catbox.moe/u818q8.png">' : '<img src="https://files.catbox.moe/jcffjn.png">';
                outdoorsCell.innerHTML = therapy.outdoors === "True" ? '<img src="https://files.catbox.moe/u818q8.png">' : '<img src="https://files.catbox.moe/jcffjn.png">';
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error);
        });
}
window.onload = displayTherapyTable;

function goHome() {
    window.location.href = "http://127.0.0.1:4200/travel_project/home";
}
function goWeather() {
    window.location.href = "http://127.0.0.1:4200/travel_project/weather";
}
function goItinerary() {
    window.location.href = "http://127.0.0.1:4200/travel_project/itinerary";
}
</script>