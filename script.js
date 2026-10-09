
"use strict";

// Task 2 - Step 4, Commit 3: Loading Feedback

const navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

navbarLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            const instance = bootstrap.Collapse.getInstance(navbarCollapse);
            if (instance) instance.hide();
        }
    });
});

const authModal = document.getElementById("authModal");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const modalTitle = document.getElementById("authModalLabel");
const formMessage = document.getElementById("formMessage");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");

let submissionInProgress = false;

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

document.getElementById("showRegister").addEventListener("click", showRegister);
document.getElementById("showLogin").addEventListener("click", showLogin);

document.querySelectorAll("[data-auth-view]").forEach(function (button) {
    button.addEventListener("click", function () {
        button.dataset.authView === "register" ? showRegister() : showLogin();
    });
});

// Show/hide password buttons.
document.querySelectorAll("[data-toggle-password]").forEach(function (button) {
    button.addEventListener("click", function () {
        const input = document.getElementById(button.dataset.togglePassword);
        const icon = button.querySelector("i");
        const show = input.type === "password";

        input.type = show ? "text" : "password";
        icon.classList.toggle("bi-eye", !show);
        icon.classList.toggle("bi-eye-slash", show);
        button.setAttribute("aria-label", show ? "Hide password" : "Show password");
        button.setAttribute("aria-pressed", String(show));
    });
});

// Bootstrap form validation.
function validateForm(form) {
    form.classList.add("was-validated");
    return form.checkValidity();
}

// Loading state for submit buttons.
function setLoading(button, loading) {
    button.disabled = loading;
    button.querySelector(".button-label").classList.toggle("d-none", loading);
    button.querySelector(".button-loading").classList.toggle("d-none", !loading);
}

function finishLoading(button) {
    setLoading(button, false);
    submissionInProgress = false;
}

// Login form.
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (submissionInProgress) return;

    clearMessage();

    if (!validateForm(loginForm)) {
        showMessage("Please correct the highlighted fields.", "danger");
        return;
    }

    submissionInProgress = true;

    const button = document.getElementById("loginSubmit");
    setLoading(button, true);

    // Demo only: no server request is being made.
    window.setTimeout(function () {
        finishLoading(button);
        showMessage(
            "Demo complete: your form passed validation. Real login requires a backend.",
            "success"
        );
    }, 900);
});

// Confirm password validation.
function validatePasswordMatch() {
    confirmPassword.setCustomValidity(
        confirmPassword.value !== registerPassword.value
            ? "Passwords do not match."
            : ""
    );
}

registerPassword.addEventListener("input", validatePasswordMatch);
confirmPassword.addEventListener("input", validatePasswordMatch);

// Registration form.
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (submissionInProgress) return;

    clearMessage();
    validatePasswordMatch();

    if (!validateForm(registerForm)) {
        showMessage("Please correct the highlighted fields before registering.", "danger");
        return;
    }

    submissionInProgress = true;

    const button = document.getElementById("registerSubmit");
    setLoading(button, true);

    // Demo only: no account is created or stored.
    window.setTimeout(function () {
        finishLoading(button);
        showMessage(
            "Demo complete: your registration form passed validation. Real account creation requires a backend.",
            "success"
        );
    }, 900);
});

// Clear feedback when the user edits a field.
document.querySelectorAll("#loginForm input, #registerForm input").forEach(function (input) {
    input.addEventListener("input", clearMessage);
});

// Forgot password demonstration.
document.getElementById("forgotPassword").addEventListener("click", function (event) {
    event.preventDefault();
    showMessage("Password recovery will be implemented in a future step.", "info");
});

// Reset forms and password visibility when the modal closes.
authModal.addEventListener("hidden.bs.modal", function () {
    loginForm.reset();
    registerForm.reset();

    loginForm.classList.remove("was-validated");
    registerForm.classList.remove("was-validated");
    confirmPassword.setCustomValidity("");

    document.querySelectorAll("[data-toggle-password]").forEach(function (button) {
        const input = document.getElementById(button.dataset.togglePassword);
        const icon = button.querySelector("i");

        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
        button.setAttribute("aria-label", "Show password");
        button.setAttribute("aria-pressed", "false");
    });

    showLogin();
});

// Screen size information.
function checkScreenSize() {
    console.log(
        window.innerWidth < 768
            ? "Mobile / small-screen layout active."
            : "Tablet / desktop layout active."
    );
}

checkScreenSize();
window.addEventListener("resize", checkScreenSize);
