
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

    let submissionInProgress = false;

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

    function setLoading(buttonId, loading) {
        const button = document.getElementById(buttonId);
        if (!button) return;

        button.disabled = loading;
        button.querySelector(".button-label")?.classList.toggle("d-none", loading);
        button.querySelector(".button-loading")?.classList.toggle("d-none", !loading);
    }

    function simulateSubmission(buttonId, message) {
        if (submissionInProgress) return;

        submissionInProgress = true;
        setLoading(buttonId, true);
        showMessage("Please wait while we process your form...", "info");

        window.setTimeout(function () {
            setLoading(buttonId, false);
            showMessage(message, "success");
            submissionInProgress = false;
        }, 1000);
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
            if (submissionInProgress) return;

            clearMessage();

            const emailValid = validateField(document.getElementById("loginEmail"));
            const passwordValid = validateField(document.getElementById("loginPassword"));

            if (!emailValid || !passwordValid) {
                showMessage("Please enter a valid email address and password.", "danger");
                loginForm.querySelector(":invalid")?.focus();
                return;
            }

            simulateSubmission(
                "loginSubmit",
                "Demo complete: your login form passed validation. No real authentication was performed."
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
            if (submissionInProgress) return;

            clearMessage();

            const nameValid = validateField(document.getElementById("registerName"));
            const emailValid = validateField(document.getElementById("registerEmail"));
            const passwordValid = validateField(registerPassword);
            const termsValid = validateField(document.getElementById("agreeTerms"));
            const passwordsMatch = validatePasswordMatch();

            if (!nameValid || !emailValid || !passwordValid || !termsValid) {
                showMessage("Please complete all required fields correctly.", "danger");
                registerForm.querySelector(":invalid")?.focus();
                return;
            }

            if (!passwordsMatch) {
                showMessage("Passwords do not match. Please enter the same password twice.", "danger");
                confirmPassword?.focus();
                return;
            }

            simulateSubmission(
                "registerSubmit",
                "Demo complete: your registration form passed validation. No account has been created."
            );
        });
    }

    document.getElementById("forgotPassword")?.addEventListener("click", function (event) {
        event.preventDefault();
        showMessage("Password recovery is a demo feature and is not connected to an account system.", "info");
    });

    authModal?.addEventListener("hidden.bs.modal", clearMessage);

    // AJAX demonstration section: create it without changing index.html.
    const ajaxSection = document.createElement("section");
    ajaxSection.id = "ajaxDemo";
    ajaxSection.className = "container py-5";

    ajaxSection.innerHTML = `
        <div class="card border-0 shadow-sm rounded-4 p-4">
            <div class="text-center">
                <span class="text-primary fw-bold small">JAVASCRIPT FETCH API</span>
                <h2 class="h3 fw-bold mt-2">AJAX Demo</h2>
                <p class="text-secondary">
                    Load sample data without refreshing the webpage.
                </p>
                <button type="button" id="loadAjaxData" class="btn btn-primary">
                    <i class="bi bi-cloud-download me-2"></i>Load Demo Data
                </button>
            </div>
            <div id="ajaxResult" class="mt-4" role="status" aria-live="polite" hidden></div>
        </div>
    `;

    const footer = document.querySelector(".footer");
    if (footer) {
        footer.parentNode.insertBefore(ajaxSection, footer);
    } else {
        document.body.appendChild(ajaxSection);
    }

    const ajaxButton = document.getElementById("loadAjaxData");
    const ajaxResult = document.getElementById("ajaxResult");

    ajaxButton.addEventListener("click", async function () {
        ajaxButton.disabled = true;
        ajaxButton.innerHTML =
            '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Loading...';

        ajaxResult.hidden = false;
        ajaxResult.className = "alert alert-info mt-4";
        ajaxResult.textContent = "Requesting sample data. Please wait...";

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

            if (!response.ok) {
                throw new Error("The server returned an error.");
            }

            const data = await response.json();

            const heading = document.createElement("h5");
            heading.className = "fw-bold";
            heading.textContent = data.title;

            const paragraph = document.createElement("p");
            paragraph.className = "mb-0";
            paragraph.textContent = data.body;

            ajaxResult.replaceChildren(heading, paragraph);
            ajaxResult.className = "alert alert-success mt-4";
        } catch (error) {
            ajaxResult.className = "alert alert-danger mt-4";
            ajaxResult.textContent =
                "Unable to load sample data. Check your internet connection and try again.";
        } finally {
            ajaxButton.disabled = false;
            ajaxButton.innerHTML =
                '<i class="bi bi-cloud-download me-2"></i>Load Demo Data';
        }
    });
});
