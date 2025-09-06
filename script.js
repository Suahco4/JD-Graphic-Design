document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');
    
    // Simple validation
    if (username === '' || password === '') {
        message.textContent = 'Please fill in both fields.';
        return;
    }
    
    // Mock login check (for demo only - insecure!)
    if (username === 'user' && password === 'pass123') {
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
