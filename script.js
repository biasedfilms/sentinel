const passwordInput = document.getElementById("password");
const strengthDisplay = document.getElementById("strength");
const strengthFill = document.getElementById("strength-fill");
const warning = document.getElementById("warning");
const patternWarning = document.getElementById("pattern-warning");
const entropyDisplay = document.getElementById("entropy");

const requirements = {
    length8: document.getElementById("length8"),
    length12: document.getElementById("length12"),
    lowercase: document.getElementById("lowercase"),
    uppercase: document.getElementById("uppercase"),
    number: document.getElementById("number"),
    special: document.getElementById("special")
};

function hasRepeatedCharacters(password) {
    return /(.)\1{2,}/.test(password);
}

function hasSequentialPattern(password) {
    const sequences = [
        "0123456789",
        "9876543210",
        "abcdefghijklmnopqrstuvwxyz",
        "zyxwvutsrqponmlkjihgfedcba"
    ];

    const lowerPassword = password.toLowerCase();

    for (const sequence of sequences) {
        for (let length = 3; length <= 5; length++) {
            for (let i = 0; i <= sequence.length - length; i++) {

                const pattern = sequence.substring(i, i + length);

                if (lowerPassword.includes(pattern)) {
                    return true;
                }
            }
        }
    }

    return false;
}

function hasKeyboardPattern(password) {
    const keyboardPatterns = [
        "qwerty",
        "asdfgh",
        "zxcvbn",
        "qwert",
        "asdf",
        "zxcv",
        "yuiop",
        "ghjk",
        "bnm"
    ];

    const lowerPassword = password.toLowerCase();

    for (const pattern of keyboardPatterns) {
        if (lowerPassword.includes(pattern)) {
            return true;
        }
    }

    return false;
}

function calculateEntropy(password) {
    let characterSetSize = 0;

    if (/[a-z]/.test(password)) {
        characterSetSize += 26;
    }

    if (/[A-Z]/.test(password)) {
        characterSetSize += 26;
    }

    if (/[0-9]/.test(password)) {
        characterSetSize += 10;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        characterSetSize += 32;
    }

    if (characterSetSize === 0) {
        return 0;
    }

    return password.length * Math.log2(characterSetSize);
}

passwordInput.addEventListener("input", function () {

    const password = passwordInput.value;

    // Reset when empty
    if (password.length === 0) {

        strengthDisplay.textContent = "Enter a password";
        strengthFill.style.width = "0%";
        warning.textContent = "";
        patternWarning.textContent = "";
        entropyDisplay.textContent = "";

        for (const key in requirements) {
            requirements[key].classList.remove("valid");
        }

        return;
    }

    // Check whether password is commonly used
    const isCommonPassword = commonPasswords.includes(
        password.toLowerCase()
    );

    const repeatedCharacters = hasRepeatedCharacters(password);
    const sequentialPattern = hasSequentialPattern(password);
    const keyboardPattern = hasKeyboardPattern(password);

    // Check password requirements
    const checks = {
        length8: password.length >= 8,
        length12: password.length >= 12,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    const entropy = calculateEntropy(password);

    if (entropy < 28) {
        entropyDisplay.textContent =
            `Estimated entropy: ${entropy.toFixed(1)} bits — Extremely weak`;
    } else if (entropy < 40) {
        entropyDisplay.textContent =
            `Estimated entropy: ${entropy.toFixed(1)} bits — Weak`;
    } else if (entropy < 60) {
        entropyDisplay.textContent =
            `Estimated entropy: ${entropy.toFixed(1)} bits — Moderate`;
    } else if (entropy < 80) {
        entropyDisplay.textContent =
            `Estimated entropy: ${entropy.toFixed(1)} bits — Strong`;
    } else {
        entropyDisplay.textContent =
            `Estimated entropy: ${entropy.toFixed(1)} bits — Very strong`;
    }

    // Update requirement indicators
    for (const key in checks) {
        requirements[key].classList.toggle(
            "valid",
            checks[key]
        );
    }

    // Calculate score
    let score = 0;

    if (checks.length8) {
        score++;
    }

    if (checks.length12) {
        score++;
    }

    if (checks.lowercase) {
        score++;
    }

    if (checks.uppercase) {
        score++;
    }

    if (checks.number) {
        score++;
    }

    if (checks.special) {
        score++;
    }

        // Calculate final score
    let finalScore = score;

    // Apply security penalties
    if (isCommonPassword) {
        finalScore -= 3;
    }

    if (repeatedCharacters) {
        finalScore -= 1;
    }

    if (sequentialPattern) {
    finalScore -= 1;
    }

    if (keyboardPattern) {
        finalScore -= 1;
    }

    if (entropy < 28) {
        finalScore -= 2;
    } else if (entropy < 40) {
        finalScore -= 1;
    }

    // Prevent score from going below zero
    finalScore = Math.max(0, finalScore);

    // Update strength bar
    strengthFill.style.width = `${(finalScore / 6) * 100}%`;

    // Update strength text
    if (finalScore <= 2) {
        strengthDisplay.textContent = `Very Weak (${finalScore}/6)`;
    } else if (finalScore === 3) {
        strengthDisplay.textContent = `Weak (${finalScore}/6)`;
    } else if (finalScore === 4) {
        strengthDisplay.textContent = `Moderate (${finalScore}/6)`;
    } else if (finalScore === 5) {
        strengthDisplay.textContent = `Strong (${finalScore}/6)`;
    } else {
        strengthDisplay.textContent = `Very Strong (${finalScore}/6)`;
    }

    // Update common password warning
    if (isCommonPassword) {
        warning.textContent = "⚠ This is a commonly used password.";
    } else {
        warning.textContent = "";
    }
    const patternMessages = [];

    if (repeatedCharacters) {
        patternMessages.push("Repeated characters detected.");
    }

    if (sequentialPattern) {
        patternMessages.push("Sequential pattern detected.");
    }

    if (keyboardPattern) {
        patternMessages.push("Keyboard pattern detected.");
    }

    patternWarning.textContent = patternMessages.join(" ");

});