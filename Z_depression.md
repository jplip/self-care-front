---
toc: true
layout: base
title: Depression
search_exclude: false
permalink: depression
courses: {compsci: {week: 26}}
---
<!-- Inputs -->
<div>
    <form>
        <p><label>
            Age:
            <input id="age">
        </label></p>
        <p><label>
            Stress Level:
            <input id="stress">
        </label></p>
        <p><label>
            Daily Exercise (Hours):
            <input id="exercise">
        </label></p>
        <p><label>
            Daily Sleep (Hours):
            <input id="sleep">
        </label></p>
    </form>
</div>

<!-- Has to stay outside the div above to function -->
<button onclick="predict()">Submit</button>
<p id="depressed"></p>


<script>
    function predict() {
        var data = {
            "age": parseFloat(document.getElementById("age").value),
            "stress": parseFloat(document.getElementById("stress").value),
            "exercise": parseFloat(document.getElementById("exercise").value),
            "sleep": parseFloat(document.getElementById("sleep").value),
        };
        var options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch("http://127.0.0.1:8086/api/predict/", options)
            .then(response => response.json())
            .then(result => {
                //used to get calculations of depression
                document.getElementById("depressed").innerHTML = result;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
</script>