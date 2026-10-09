
document.addEventListener("DOMContentLoaded", function () {
    const authModal = document.getElementById("authModal");
    const loginPanel = document.getElementById("loginPanel");
    const registerPanel = document.getElementById("registerPanel");
    const authModalLabel = document.getElementById("authModalLabel");
    const formMessage = document.getElementById("formMessage");

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    function showMessage(message, type) {
        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.className = "alert alert-" + type + " mt-3 mb-0";
        formMessage.hidden = false;
    }

    function clearMessage() {
        if (!formMessage) return;

        formMessage.textContent = "";
        formMessage.hidden = true;
        formMessage.className = "alert mt-3 mb-0";
    }

    function showLogin() {
        if (loginPanel) loginPanel.hidden = false;
        if (registerPanel) registerPanel.hidden = true;

        if (authModalLabel) {
            authModalLabel.textContent = "Login to AuthPortal";
        }

        clearMessage();
    }

    function showRegister() {
        if (loginPanel) loginPanel.hidden = true;
        if (registerPanel) registerPanel.hidden = false;

        if (authModalLabel) {
            authModalLabel.textContent = "Register with AuthPortal";
        }

        clearMessage();
    }

    document.querySelectorAll("[data-auth-view]").forEach(function (button) {
        button.addEventListener("click", function () {
            if (button.dataset.authView === "register") {
                showRegister();
            } else {
                showLogin();
            }
        });
    });

    const showRegisterButton = document.getElementById("showRegister");
    const showLoginButton = document.getElementById("showLogin");

    if (showRegisterButton) {
        showRegisterButton.addEventListener("click", showRegister);
    }

    if (showLoginButton) {
        showLoginButton.addEventListener("click", showLogin);
    }

    document.querySelectorAll("[data-toggle-password]").forEach(function (button) {
        button.addEventListener("click", function () {
            const inputId = button.dataset.togglePassword;
            const passwordInput = document.getElementById(inputId);

            if (!passwordInput) return;

            const shouldShow = passwordInput.type === "password";
            passwordInput.type = shouldShow ? "text" : "password";

            button.innerHTML = shouldShow
                ? '<i class="bi bi-eye-slash"></i>'
                : '<i class="bi bi-eye"></i>';

            button.setAttribute(
                "aria-label",
                shouldShow ? "Hide password" : "Show password"
            );

            button.setAttribute("aria-pressed", String(shouldShow));
        });
    });

    function validateField(input) {
        if (!input) return true;

        input.classList.toggle("is-invalid", !input.checkValidity());
        input.classList.toggle("is-valid", input.checkValidity());

        return input.checkValidity();
    }

    if (loginForm) {
        loginForm.querySelectorAll("input[required]").forEach(function (input) {
            input.addEventListener("input", function () {
                validateField(input);
                clearMessage();
            });
        });

        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            clearMessage();

            const email = document.getElementById("loginEmail");
            const password = document.getElementById("loginPassword");

            const emailValid = validateField(email);
            const passwordValid = validateField(password);

            if (!emailValid || !passwordValid) {
                showMessage(
                    "Please enter a valid email address and password.",
                    "danger"
                );

                const firstInvalid = loginForm.querySelector(":invalid");
                if (firstInvalid) firstInvalid.focus();

                return;
            }

            showMessage(
                "Login form validated successfully. This is a demo only; no real account authentication is performed.",
                "success"
            );
        });
    }

    if (registerForm) {
        registerForm.querySelectorAll("input[required]").forEach(function (input) {
            input.addEventListener("input", function () {
                validateField(input);
                clearMessage();
            });
        });

        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            clearMessage();

            const name = document.getElementById("registerName");
            const email = document.getElementById("registerEmail");
            const password = document.getElementById("registerPassword");
            const confirmPassword = document.getElementById("confirmPassword");
            const agreeTerms = document.getElementById("agreeTerms");

            const fieldsValid = [
                validateField(name),
                validateField(email),
                validateField(password),
                validateField(confirmPassword),
                validateField(agreeTerms)
            ].every(Boolean);

            if (!fieldsValid) {
                showMessage(
                    "Please complete all required fields correctly.",
                    "danger"
                );

                const firstInvalid = registerForm.querySelector(":invalid");
                if (firstInvalid) firstInvalid.focus();

                return;
            }

            if (password.value !== confirmPassword.value) {
                confirmPassword.classList.add("is-invalid");
                confirmPassword.classList.remove("is-valid");

                showMessage(
                    "Passwords do not match. Please enter the same password in both fields.",
                    "danger"
                );

                confirmPassword.focus();
                return;
            }

            confirmPassword.classList.remove("is-invalid");
            confirmPassword.classList.add("is-valid");

            showMessage(
                "Registration form validated successfully. This is a demo only; no account has been created.",
                "success"
            );
        });
    }

    const forgotPassword = document.getElementById("forgotPassword");

    if (forgotPassword) {
        forgotPassword.addEventListener("click", function (event) {
            event.preventDefault();

            showMessage(
                "Password recovery is a demo feature and is not connected to an account system.",
                "info"
            );
        });
    }

    if (authModal) {
        authModal.addEventListener("hidden.bs.modal", function () {
            clearMessage();
        });
    }
});
