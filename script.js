// Tab switching function
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`button[onclick="showTab('${tabName}')"]`).classList.add('active');
}

// Handle registration form
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const message = document.getElementById('register-message');
    
    // Basic validation
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
        message.textContent = 'Please fill in all fields.';
        return;
    }
    if (password !== confirmPassword) {
        message.textContent = 'Passwords do not match.';
        return;
    }
    
    // Simulate storing user (insecure - for demo only)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username || user.email === email);
    
    if (userExists) {
        message.textContent = 'Username or email already exists.';
        return;
    }
    
    users.push({ username, email, password }); // Plaintext password - NEVER do this in production!
    localStorage.setItem('users', JSON.stringify(users));
    
    message.style.color = 'green';
    message.textContent = 'Registration successful! You can now login.';
    
    // Clear form
    document.getElementById('registerForm').reset();
});

// Handle login form
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const message = document.getElementById('login-message');
    
    // Basic validation
    if (username === '' || password === '') {
        message.textContent = 'Please fill in both fields.';
        return;
    }
    
    // Simulate login check (insecure - for demo only)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        message.style.color = 'green';
        message.textContent = 'Login successful! Redirecting...';
        // Simulate redirect (in a real app, use window.location.href)
        setTimeout(() => {
            alert('Welcome, ' + username + '!');
        }, 1000);
    } else {
        message.style.color = 'red';
        message.textContent = 'Invalid username or password.';
    }
});
