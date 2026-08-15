const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

// Slide window toggles
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Handle Sign Up (Saves data to localStorage)
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    // Check if user already exists
    const existingUser = localStorage.getItem(email);
    if (existingUser) {
        alert("An account with this email already exists! Please sign in.");
        return;
    }

    // Create user object
    const userData = {
        name: name,
        email: email,
        password: password,
        role: role
    };

    // Save to localStorage
    localStorage.setItem(email, JSON.stringify(userData));

    alert(`Account successfully created as a ${role.toUpperCase()}! You can now sign in.`);
    
    registerForm.reset();
    container.classList.remove("active"); // Switch to login view
});

// Handle Sign In (Verifies data from localStorage)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const savedUserJson = localStorage.getItem(email);

    if (!savedUserJson) {
        alert("No account found with this email. Please sign up first.");
        return;
    }

    const savedUser = JSON.parse(savedUserJson);

    if (savedUser.password !== password) {
        alert("Incorrect password. Please try again.");
        return;
    }

    alert(`Welcome back, ${savedUser.name}! You are logged in as a ${savedUser.role.toUpperCase()}.`);
    
    loginForm.reset();
});
