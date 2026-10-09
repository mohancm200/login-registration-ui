
"use strict";

// Task 2 - Step 3: Login and Registration Forms

console.log("AuthPortal authentication interface loaded.");

// Close the mobile navbar after a navigation link is clicked.
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

// Get authentication elements.
const authModal = document.getElementById("authModal");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const modalTitle = document.getElementById("authModalLabel");
const formMessage = document.getElementById("formMessage");

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

// Switch between the login and registration panels.
document.getElementById("showRegister").addEventListener("click", showRegister);
document.getElementById("showLogin").addEventListener("click", showLogin);

// Open the correct panel when either Authentication card is selected.
document.querySelectorAll("[data-auth-view]").forEach(function (button) {
    button.addEventListener("click", function () {
        if (button.dataset.authView === "register") {
            showRegister();
        } else {
            showLogin();
        }
    });
});

// Reset the modal when closed.
authModal.addEventListener("hidden.bs.modal", function () {
    showLogin();
    document.getElementById("loginForm").reset();
    document.getElementById("registerForm").reset();
});

// Handle login without putting form values in the URL.
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    if (!this.checkValidity()) {
        this.reportValidity();
        return;
    }

    showMessage(
        "Login form validated successfully. Real authentication requires a backend.",
        "success"
    );
});

// Handle registration without putting form values in the URL.
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    if (!this.checkValidity()) {
        this.reportValidity();
        return;
    }

    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        showMessage("Passwords do not match. Please try again.", "danger");
        document.getElementById("confirmPassword").focus();
        return;
    }

    showMessage(
        "Registration form validated successfully. Account creation requires a backend.",
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
