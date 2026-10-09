
"use strict";

// Task 2 - Step 3, Commit 4: Show/Hide Password

console.log("AuthPortal authentication interface loaded.");

// Mobile navigation.
const navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

navbarLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            const collapseInstance =
                bootstrap.Collapse.getInstance(navbarCollapse);

            if (collapseInstance) {
                collapseInstance.hide();
            }
        }
    });
});

// Form and modal elements.
const authModal = document.getElementById("authModal");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const modalTitle = document.getElementById("authModalLabel");
const formMessage = document.getElementById("formMessage");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");

function clearMessage() {
    formMessage.textContent = "";
    formMessage.hidden = true;
    formMessage.className = "alert mt-3 mb-0";
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = "alert alert-" + type + " mt-3 mb-0";
    formMessage.hidden = false;
}

function showLogin() {
    loginPanel.hidden = false;
    registerPanel.hidden = true;
    modalTitle.textContent = "Login to AuthPortal";
    clearMessage();
}

function showRegister() {
    loginPanel.hidden = true;
    registerPanel.hidden = false;
    modalTitle.textContent = "Create an Account";
    clearMessage();
}

// Switch between Login and Registration.
document.getElementById("showRegister").addEventListener("click", showRegister);
document.getElementById("showLogin").addEventListener("click", showLogin);

document.querySelectorAll("[data-auth-view]").forEach(function (button) {
    button.addEventListener("click", function () {
        if (button.dataset.authView === "register") {
            showRegister();
        } else {
            showLogin();
        }
    });
});

// Show or hide each password field.
document.querySelectorAll("[data-toggle-password]").forEach(function (button) {
    button.addEventListener("click", function () {
        const inputId = button.dataset.togglePassword;
        const passwordInput = document.getElementById(inputId);
        const icon = button.querySelector("i");

        if (!passwordInput || !icon) {
            return;
        }

        const shouldShow = passwordInput.type === "password";

        passwordInput.type = shouldShow ? "text" : "password";
        icon.classList.toggle("bi-eye", !shouldShow);
        icon.classList.toggle("bi-eye-slash", shouldShow);

        button.setAttribute(
            "aria-label",
            shouldShow ? "Hide password" : "Show password"
        );

        button.setAttribute("aria-pressed", String(shouldShow));
    });
});

// Login form validation.
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearMessage();

    if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
    }

    showMessage(
        "Login form validated successfully. Real authentication requires a backend.",
        "success"
    );
});

// Validate password confirmation while typing.
function validatePasswordMatch() {
    if (confirmPassword.value === "") {
        confirmPassword.setCustomValidity("");
        return;
    }

    if (registerPassword.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords do not match.");
    } else {
        confirmPassword.setCustomValidity("");
    }
}

registerPassword.addEventListener("input", validatePasswordMatch);
confirmPassword.addEventListener("input", validatePasswordMatch);

// Registration form validation.
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearMessage();

    validatePasswordMatch();

    if (!registerForm.checkValidity()) {
        registerForm.reportValidity();
        return;
    }

    showMessage(
        "Registration form validated successfully. Real account creation requires a backend.",
        "success"
    );
});

// Forgot password demonstration.
document.getElementById("forgotPassword").addEventListener("click", function (event) {
    event.preventDefault();

    showMessage(
        "Password recovery will be implemented in a future step.",
        "info"
    );
});

// Reset forms when modal closes.
authModal.addEventListener("hidden.bs.modal", function () {
    loginForm.reset();
    registerForm.reset();

    document.querySelectorAll("[data-toggle-password]").forEach(function (button) {
        const input = document.getElementById(button.dataset.togglePassword);
        const icon = button.querySelector("i");

        if (input) {
            input.type = "password";
        }

        if (icon) {
            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");
        }

        button.setAttribute("aria-label", "Show password");
        button.setAttribute("aria-pressed", "false");
    });

    confirmPassword.setCustomValidity("");
    showLogin();
});

// Screen-size check.
function checkScreenSize() {
    console.log(
        window.innerWidth < 768
            ? "Mobile / small-screen layout active."
            : "Tablet / desktop layout active."
    );
}

checkScreenSize();
window.addEventListener("resize", checkScreenSize);
