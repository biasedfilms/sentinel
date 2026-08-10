<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Password Strength Checker</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

    <main class="container">

        <h1>SENTINEL</h1>

        <p class="subtitle">
            Password Security Analysis System.
        </p>

        <div class="system-status">
            ● SECURITY ENGINE ONLINE
        </div>

        <label for="password">Password</label>

        <input
            type="password"
            id="password"
            placeholder="Enter your password"
            autocomplete="off"
        >

        <div class="strength-container">

            <div class="strength-bar">
                <div id="strength-fill"></div>
            </div>

            <div id="strength">
                Enter a password
            </div>

            <ul id="requirements">
                <li id="length8">At least 8 characters</li>
                <li id="length12">At least 12 characters</li>
                <li id="lowercase">Contains lowercase letter</li>
                <li id="uppercase">Contains uppercase letter</li>
                <li id="number">Contains number</li>
                <li id="special">Contains special character</li>
            </ul>

            <div id="warning"></div>
            <div id="pattern-warning"></div>
            <div id="entropy"></div>

        </div>

    </main>

    <footer>
    © 2026 Mikael Kalesaran. All rights reserved.
    </footer>

    <script src="common-passwords.js"></script>
    <script src="script.js"></script>

</body>
</html>