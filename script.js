
"use strict";

// Task 2 - Step 3: Login and Registration Forms

console.log("AuthPortal authentication interface loaded.");

// Mobile navbar closes after selecting a navigation link.
const navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

navbarLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (
            navbarCollapse &&
            navbarCollapse.classList.contains("show")
        ) {
            const collapseInstance =
                bootstrap.Collapse.getInstance(navbarCollapse);

            if (collapseInstance) {
                collapseInstance.hide();
            }
        }
    });
});

// Authentication modal and panels.
const authModal = document.getElementById("authModal");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const modalTitle = document.getElementById("authModalLabel");
const formMessage = document.getElementById("formMessage");

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = "alert alert-" + type + " mt-3 mb-0";
    formMessage.hidden = false;
}

function clearMessage() {
    formMessage.textContent = "";
    formMessage.hidden = true;
    formMessage.className = "alert mt-3 mb-0";
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

// Open the modal directly in the selected view.
document.querySelectorAll("[data-auth-view]").forEach(function (button) {
    button.addEventListener("click", function () {
        if (button.dataset.authView === "register") {
            showRegister();
        } else {
            showLogin();
        }
    });
});

// Reset modal to Login when it is closed.
authModal.addEventListener("hidden.bs.modal", function () {
    showLogin();
});

// Login form demo.
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    if (!this.checkValidity()) {
        this.reportValidity();
        return;
    }

    showMessage(
        "Login form validated successfully. Real authentication will be added with a backend.",
        "success"
    );
});

// Registration form demo.
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    if (!this.checkValidity()) {
        this.reportValidity();
        return;
    }

    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        document.getElementById("confirmPassword").setCustomValidity(
            "Passwords do not match."
        );
        document.getElementById("confirmPassword").reportValidity();
        document.getElementById("confirmPassword").setCustomValidity("");
        return;
    }

    showMessage(
        "Registration form validated successfully. Account creation will be connected to a backend later.",
        "success"
    );
});

// Demo message for Forgot Password.
document.getElementById("forgotPassword").addEventListener("click", function (event) {
    event.preventDefault();
    showMessage("Password recovery will be implemented in a future step.", "info");
});

// Screen size check.
function checkScreenSize() {
    console.log(
        window.innerWidth < 768
            ? "Mobile / small-screen layout active."
            : "Tablet / desktop layout active."
    );
}

checkScreenSize();
window.addEventListener("resize", checkScreenSize);
