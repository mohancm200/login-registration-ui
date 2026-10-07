// =====================================================
// TASK 2 - STEP 2
// RESPONSIVE NAVIGATION
// =====================================================


// Confirm JavaScript is connected

console.log(
    "Task 2 Step 2 loaded successfully."
);


// =====================================================
// CLOSE MOBILE NAVBAR AFTER CLICKING A LINK
// =====================================================

const navbarLinks = document.querySelectorAll(
    ".navbar-nav .nav-link"
);

const navbarCollapse = document.querySelector(
    ".navbar-collapse"
);

navbarLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (
            navbarCollapse &&
            navbarCollapse.classList.contains("show")
        ) {

            const bootstrapCollapse =
                bootstrap.Collapse.getInstance(
                    navbarCollapse
                );

            if (bootstrapCollapse) {
                bootstrapCollapse.hide();
            }

        }

    });

});


// =====================================================
// AUTH MODAL EVENT
// =====================================================

const authModal = document.getElementById(
    "authModal"
);

if (authModal) {

    authModal.addEventListener(
        "shown.bs.modal",
        function () {

            console.log(
                "Authentication modal opened."
            );

        }
    );

}