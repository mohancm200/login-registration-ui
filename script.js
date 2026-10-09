
"use strict";

// Task 2 - Step 3, Commit 3: Form Validation

console.log("AuthPortal form validation loaded.");

// Close the mobile navbar after clicking a navigation link.
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

// Authentication elements.
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

// Prevent credentials from appearing in the URL.
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearMessage();

    if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
    }

    showMessage(
        "Login form validation successful. Real login requires a backend.",
        "success"
    );
});

// Validate password confirmation as the user types.
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

// Prevent credentials from appearing in the URL during registration.
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearMessage();

    validatePasswordMatch();

    if (!registerForm.checkValidity()) {
        registerForm.reportValidity();
        return;
    }

    showMessage(
        "Registration form validation successful. Real account creation requires a backend.",
        "success"
    );
});

// Demonstration for Forgot Password.
document.getElementById("forgotPassword").addEventListener("click", function (event) {
    event.preventDefault();
    showMessage(
        "Password recovery will be implemented in a future step.",
        "info"
    );
});

// Reset forms when the modal closes.
authModal.addEventListener("hidden.bs.modal", function () {
    loginForm.reset();
    registerForm.reset();
    confirmPassword.setCustomValidity("");
    showLogin();
});

// Responsive screen-size check.
function checkScreenSize() {
    console.log(
        window.innerWidth < 768
            ? "Mobile / small-screen layout active."
            : "Tablet / desktop layout active."
    );
}

checkScreenSize();
window.addEventListener("resize", checkScreenSize);
