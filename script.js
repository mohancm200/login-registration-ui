// =====================================================
// TASK 2 - LOGIN & REGISTRATION UI
// RESPONSIVE PROJECT
// =====================================================


// Confirm that JavaScript is connected
console.log("Task 2 Login & Registration UI loaded successfully.");


// =====================================================
// NAVBAR CLOSE ON MOBILE
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
                bootstrap.Collapse.getInstance(navbarCollapse);

            if (bootstrapCollapse) {
                bootstrapCollapse.hide();
            }

        }

    });

});