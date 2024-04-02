---
layout: base
title: Login
permalink: /login/
--- 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
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
        .form-control {
            margin-bottom: 15px;
        }
        .form-control label {
            font-weight: bold;
        }
        .form-control input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .form-control input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
        }
        .form-control input[type="submit"]:hover {
            background-color: #45a049;
        }
        .error-message {
            color: red;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Login</h1>
        <form id="loginForm" class="form-control">
            <div>
                <label for="uid">Username:</label>
                <input type="text" id="uid" name="uid" required>
            </div>      
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>     
            <input type="submit" value="Login">
            <div id="error" class="error-message"></div>
        </form>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            const uid = document.getElementById('uid').value;
            const password = document.getElementById('password').value;
            const loginData = {
                uid: uid,
                password: password
            };
            fetch('http://127.0.0.1:8086/api/users/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    if (response.status === 401) {
                        throw new Error('Wrong username or password. Please retype.');
                    } else if (response.status === 404) {
                        throw new Error('Username or password not found. Please register first.');
                    } else {
                        throw new Error('Login failed');
                    }
                }
            })
            .then(data => {
               const loggedInUserName = data.name;
               const loggedInUserId = data.id;
               console.log(loggedInUserName);
               localStorage.setItem('loggedInUserName', loggedInUserName);
               localStorage.setItem('loggedInUserId', loggedInUserId);
               window.location.href = '/dashboard';
            })
            .catch(error => {
                document.getElementById('error').textContent = error.message;
            });
        });
    </script>
</body>
</html>



