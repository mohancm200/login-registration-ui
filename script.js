
document.addEventListener("DOMContentLoaded", function () {
    const authModal = document.getElementById("authModal");
    const loginPanel = document.getElementById("loginPanel");
    const registerPanel = document.getElementById("registerPanel");
    const authModalLabel = document.getElementById("authModalLabel");
    const formMessage = document.getElementById("formMessage");

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    const registerPassword = document.getElementById("registerPassword");
    const confirmPassword = document.getElementById("confirmPassword");

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
        if (authModalLabel) authModalLabel.textContent = "Login to AuthPortal";
        clearMessage();
    }

    function showRegister() {
        if (loginPanel) loginPanel.hidden = true;
        if (registerPanel) registerPanel.hidden = false;
        if (authModalLabel) authModalLabel.textContent = "Register with AuthPortal";
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

    document.getElementById("showRegister")?.addEventListener("click", showRegister);
    document.getElementById("showLogin")?.addEventListener("click", showLogin);

    document.querySelectorAll("[data-toggle-password]").forEach(function (button) {
        button.addEventListener("click", function () {
            const input = document.getElementById(button.dataset.togglePassword);
            if (!input) return;

            const show = input.type === "password";
            input.type = show ? "text" : "password";
            button.innerHTML = show
                ? '<i class="bi bi-eye-slash"></i>'
                : '<i class="bi bi-eye"></i>';
            button.setAttribute("aria-label", show ? "Hide password" : "Show password");
            button.setAttribute("aria-pressed", String(show));
        });
    });

    function validateField(input) {
        if (!input) return false;

        const valid = input.checkValidity();
        input.classList.toggle("is-invalid", !valid);
        input.classList.toggle("is-valid", valid);
        return valid;
    }

    function validatePasswordMatch() {
        if (!registerPassword || !confirmPassword) return false;

        if (confirmPassword.value === "") {
            confirmPassword.classList.remove("is-valid", "is-invalid");
            return false;
        }

        const matches = registerPassword.value === confirmPassword.value;
        confirmPassword.classList.toggle("is-valid", matches);
        confirmPassword.classList.toggle("is-invalid", !matches);
        return matches;
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

            if (!validateField(email) || !validateField(password)) {
                showMessage("Please enter a valid email address and password.", "danger");
                loginForm.querySelector(":invalid")?.focus();
                return;
            }

            showMessage(
                "Login form validated successfully. This demo does not authenticate real accounts.",
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

        registerPassword?.addEventListener("input", function () {
            validateField(registerPassword);
            validatePasswordMatch();
            clearMessage();
        });

        confirmPassword?.addEventListener("input", function () {
            validatePasswordMatch();
            clearMessage();
        });

        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            clearMessage();

            const name = document.getElementById("registerName");
            const email = document.getElementById("registerEmail");
            const password = registerPassword;
            const confirmation = confirmPassword;
            const terms = document.getElementById("agreeTerms");

            const nameValid = validateField(name);
            const emailValid = validateField(email);
            const passwordValid = validateField(password);
            const termsValid = validateField(terms);
            const passwordsMatch = validatePasswordMatch();

            if (!nameValid || !emailValid || !passwordValid || !termsValid) {
                showMessage("Please complete all required fields correctly.", "danger");
                registerForm.querySelector(":invalid")?.focus();
                return;
            }

            if (!passwordsMatch) {
                showMessage("Passwords do not match. Please enter the same password twice.", "danger");
                confirmation?.focus();
                return;
            }

            showMessage(
                "Registration form validated successfully. This is a demo; no account has been created.",
                "success"
            );
        });
    }

    document.getElementById("forgotPassword")?.addEventListener("click", function (event) {
        event.preventDefault();
        showMessage("Password recovery is a demo feature and is not connected to an account system.", "info");
    });

    authModal?.addEventListener("hidden.bs.modal", clearMessage);
});
