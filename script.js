// ==========================================
// BOTHMAS SHUTTLE - MAIN SCRIPT.JS
// Login, Registration & Dashboard Redirects
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------
    // GET ELEMENTS
    // ------------------------------------------

    const container = document.getElementById("container");

    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");


    // ------------------------------------------
    // SLIDE BETWEEN LOGIN & REGISTER
    // ------------------------------------------

    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            container.classList.add("active");
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            container.classList.remove("active");
        });
    }


    // ------------------------------------------
    // REGISTER NEW ACCOUNT
    // ------------------------------------------

    if (registerForm) {

        registerForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const name = document
                .getElementById("reg-name")
                .value
                .trim();

            const email = document
                .getElementById("reg-email")
                .value
                .trim()
                .toLowerCase();

            const password = document
                .getElementById("reg-password")
                .value;

            const role = document
                .getElementById("reg-role")
                .value;


            // ------------------------------------------
            // VALIDATION
            // ------------------------------------------

            if (!name || !email || !password || !role) {

                alert("Please complete all registration fields.");

                return;
            }


            if (password.length < 6) {

                alert("Password must contain at least 6 characters.");

                return;
            }


            // ------------------------------------------
            // CHECK IF ACCOUNT EXISTS
            // ------------------------------------------

            const existingUser = localStorage.getItem(email);

            if (existingUser) {

                alert(
                    "An account with this email already exists.\n\n" +
                    "Please sign in instead."
                );

                return;
            }


            // ------------------------------------------
            // CREATE USER
            // ------------------------------------------

            const userData = {

                name: name,

                email: email,

                password: password,

                role: role,

                createdAt: new Date().toISOString()

            };


            // ------------------------------------------
            // SAVE USER
            // ------------------------------------------

            localStorage.setItem(
                email,
                JSON.stringify(userData)
            );


            // ------------------------------------------
            // SUCCESS MESSAGE
            // ------------------------------------------

            const roleName =
                role.charAt(0).toUpperCase() +
                role.slice(1);


            alert(
                "Account successfully created!\n\n" +
                "Name: " + name + "\n" +
                "Role: " + roleName + "\n\n" +
                "You can now sign in."
            );


            // ------------------------------------------
            // CLEAR FORM
            // ------------------------------------------

            registerForm.reset();


            // ------------------------------------------
            // SWITCH TO LOGIN
            // ------------------------------------------

            container.classList.remove("active");


            // Automatically put registered email
            // into the login field

            const loginEmail =
                document.getElementById("login-email");

            if (loginEmail) {

                loginEmail.value = email;

            }

        });

    }


    // ------------------------------------------
    // LOGIN
    // ------------------------------------------

    if (loginForm) {

        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();


            const email = document
                .getElementById("login-email")
                .value
                .trim()
                .toLowerCase();

            const password = document
                .getElementById("login-password")
                .value;


            // ------------------------------------------
            // VALIDATE
            // ------------------------------------------

            if (!email || !password) {

                alert(
                    "Please enter your email and password."
                );

                return;
            }


            // ------------------------------------------
            // FIND ACCOUNT
            // ------------------------------------------

            const savedUserJson =
                localStorage.getItem(email);


            if (!savedUserJson) {

                alert(
                    "No account was found with this email.\n\n" +
                    "Please create an account first."
                );

                return;
            }


            // ------------------------------------------
            // READ USER
            // ------------------------------------------

            let savedUser;

            try {

                savedUser =
                    JSON.parse(savedUserJson);

            } catch (error) {

                alert(
                    "There was a problem reading your account."
                );

                return;
            }


            // ------------------------------------------
            // CHECK PASSWORD
            // ------------------------------------------

            if (savedUser.password !== password) {

                alert(
                    "Incorrect password.\n\n" +
                    "Please check your password and try again."
                );

                return;
            }


            // ------------------------------------------
            // SAVE CURRENT USER
            // ------------------------------------------

            sessionStorage.setItem(
                "currentUser",
                JSON.stringify(savedUser)
            );


            // ------------------------------------------
            // LOGIN SUCCESS
            // ------------------------------------------

            const roleName =
                savedUser.role.charAt(0).toUpperCase() +
                savedUser.role.slice(1);


            alert(
                "Welcome back, " +
                savedUser.name +
                "!\n\n" +
                "Logged in as: " +
                roleName
            );


            // ------------------------------------------
            // REDIRECT BASED ON ROLE
            // ------------------------------------------

            if (savedUser.role === "passenger") {

                window.location.href =
                    "passenger.html";

            }

            else if (savedUser.role === "driver") {

                window.location.href =
                    "driver.html";

            }

            else {

                alert(
                    "Your account role is invalid."
                );

                sessionStorage.removeItem(
                    "currentUser"
                );

            }

        });

    }


    // ------------------------------------------
    // FORGOT PASSWORD
    // ------------------------------------------

    const forgotPassword =
        document.querySelector(
            '.sign-in a[href="#"]'
        );


    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            (e) => {

                e.preventDefault();

                const email = prompt(
                    "Enter the email address associated with your account:"
                );


                if (!email) {
                    return;
                }


                const cleanEmail =
                    email.trim().toLowerCase();


                const savedUserJson =
                    localStorage.getItem(cleanEmail);


                if (!savedUserJson) {

                    alert(
                        "No account was found with that email."
                    );

                    return;
                }


                // NOTE:
                // This is only a prototype.
                // A real application needs a backend
                // password-reset system.

                alert(
                    "Password reset is not available in this prototype.\n\n" +
                    "For security, a production version should send a password-reset link to the user's email."
                );

            }
        );

    }

});