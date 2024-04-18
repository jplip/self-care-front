---
layout: base
title: Quote Repository
permalink: /quote-repo/
---

<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Quote Repository</title>
   <link rel="stylesheet" href="{{site.baseurl}}/assets/css/style.css"> 
   <style>
   body {
       background-color: #fae5de;
       font-family: Arial, sans-serif;
       margin: 0;
       padding: 0;
   }

   .container {
       max-width: 600px;
       margin: 50px auto;
       padding: 20px;
       background-color: #fff;
       border-radius: 8px;
       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   }

   h1 {
       text-align: center;
   }

   textarea {
       width: 100%;
       height: 200px;
       padding: 10px;
       margin-bottom: 20px;
       border: 1px solid #ccc;
       border-radius: 5px;
       resize: none;
   }

   button {
       display: block;
       width: 100%;
       padding: 10px;
       background-color: #c96f7f;
       color: #fff;
       border: none;
       border-radius: 5px;
       cursor: pointer;
   }

   button:hover {
       background-color: #b85f6f;
   }
   </style>
</head>
<body>
   <div class="container" id="animation">
       <h1>Motivational Quote Repository</h1>
       <label for="quote">Motivational Quote:</label>
       <input type="text" id="quote" placeholder="Enter your quote">

       <label for="quote-author">Quote By:</label>
       <input type="text" id="quote-author" placeholder="Enter the quote author">

       <label for="opinion">Your Opinion:</label>
       <textarea id="opinion" placeholder="Write your opinion on the quote"></textarea>

       <button onclick="submitQuote()">Submit</button>
   </div>

   <script src="{{site.baseurl}}/assets/js/three.r134.min.js"></script>
   <script src="{{site.baseurl}}/assets/js/vanta.clouds.min.js"></script>
   <script>
       function submitQuote() {
           const quote = document.getElementById('quote').value;
           const quoteAuthor = document.getElementById('quote-author').value;
           const opinion = document.getElementById('opinion').value;

           if (!quote || !quoteAuthor || !opinion) {
               alert("Please fill in all fields");
               return;
           }

           const quoteObject = {
               quote: quote,
               quote_author: quoteAuthor,
               opinion: opinion
           };

           fetch('http://localhost:8086/quote-repository', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify(quoteObject),
           })
           .then(response => response.json())
           .then(data => {
               alert(data.message);
           })
           .catch(error => {
               console.error('Error:', error);
               alert('An error occurred while submitting the quote.');
           });

           document.getElementById('quote').value = '';
           document.getElementById('quote-author').value = '';
           document.getElementById('opinion').value = '';
       }

       // Initialize clouds animation
       VANTA.CLOUDS ({
           el: "#animation",
           mouseControls: true,
           touchControls: true,
           gyroControls: false,
           skyColor: 0xf9d1d1,
           cloudColor: 0xbba2a8,
           cloudShadowColor: 0x905167,
           sunColor: 0x845d66,
           sunGlareColor: 0x5e2610,
           speed: 0.80
       });
   </script>
</body>
</html>