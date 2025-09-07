  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBsM5EPJ1GfkZar_uytBNF7z9VmeLrOxPA",
    authDomain: "demoauthapp-d2e93.firebaseapp.com",
    projectId: "demoauthapp-d2e93",
    storageBucket: "demoauthapp-d2e93.firebasestorage.app",
    messagingSenderId: "210801715910",
    appId: "1:210801715910:web:cdc4843156427aeb0145c7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Function to show registration form
function showRegister() {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('signin-form').style.display = 'none';
}

// Function to show sign-in form
function showSignIn() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('signin-form').style.display = 'block';
}

// Handle registration
document.getElementById('reg-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageEl = document.getElementById('reg-message');
    
    if (!username || !email || !password) {
        messageEl.textContent = 'All fields are required.';
        messageEl.className = 'message error';
        return;
    }
    
    try {
        // Create user with Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Store additional data in Firestore
        await db.collection('users').doc(user.uid).set({
            username: username,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        messageEl.textContent = 'Registration successful! You can now sign in.';
        messageEl.className = 'message success';
        
        // Clear form
        document.getElementById('reg-form').reset();
    } catch (error) {
        messageEl.textContent = error.message; // e.g., "Email already in use"
        messageEl.className = 'message error';
    }
});

// Handle sign-in
document.getElementById('signin-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value.trim();
    const messageEl = document.getElementById('signin-message');
    
    if (!email || !password) {
        messageEl.textContent = 'All fields are required.';
        messageEl.className = 'message error';
        return;
    }
    
    try {
        // Sign in with Firebase Auth
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Fetch username from Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
            const data = userDoc.data();
            messageEl.textContent = `Welcome back, ${data.username}!`;
            messageEl.className = 'message success';
        } else {
            messageEl.textContent = 'User data not found.';
            messageEl.className = 'message error';
        }
        
        // In a real app, redirect or set session here
    } catch (error) {
        messageEl.textContent = error.message; // e.g., "Invalid credentials"
        messageEl.className = 'message error';
    }
    
    // Clear form
    document.getElementById('signin-form').reset();
});
