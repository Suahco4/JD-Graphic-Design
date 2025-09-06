// Toggle between forms
function showLogin() {
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    clearMessage();
}

function showRegister() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
    clearMessage();
}

// Clear message
function clearMessage() {
    document.getElementById('message').textContent = '';
}

// Display message
function displayMessage(msg, color = 'red') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = msg;
    messageEl.style.color = color;
}

// Load users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Registration handler
document.getElementById('reg-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (!username || !email || !password || !confirmPassword) {
        displayMessage('All fields are required.');
        return;
    }

    if (password !== confirmPassword) {
        displayMessage('Passwords do not match.');
        return;
    }

    const users = getUsers();
    if (users.some(user => user.username === username)) {
        displayMessage('Username already exists.');
        return;
    }

    users.push({ username, email, password }); // In real apps, hash the password!
    saveUsers(users);
    displayMessage('Registration successful! You can now login.', 'green');
    showLogin(); // Switch to login after registration
});

// Login handler
document.getElementById('log-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('log-username').value.trim();
    const password = document.getElementById('log-password').value;

    if (!username || !password) {
        displayMessage('All fields are required.');
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        displayMessage('Login successful!', 'green');
        // In a real app, redirect or set session here
        alert(`Welcome, ${username}!`);
    } else {
        displayMessage('Invalid username or password.');
    }
});
