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

    // Save the currently logged-in user to session storage so other pages can read it
    sessionStorage.setItem('currentUser', JSON.stringify(savedUser));

    alert(`Welcome back, ${savedUser.name}! You are logged in as a ${savedUser.role.toUpperCase()}.`);
    
    // Redirect based on whether they are a Driver or a Passenger
    if (savedUser.role === 'driver') {
        window.location.href = "driver-dashboard.html"; // Create this file next for drivers
    } else {
        window.location.href = "passenger-dashboard.html"; // Create this file next for passengers
    }
});
