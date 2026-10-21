/* =========================================
   MAARUTHI AUTOMATION
   AUTHENTICATION SYSTEM
========================================= */

const MAARUTHI_USERNAME = "ameer";
const MAARUTHI_PASSWORD = "23mi003";

/* =========================================
   CHECK LOGIN
========================================= */

function isLoggedIn() {
    return sessionStorage.getItem("maaruthiLoggedIn") === "true";
}

/* =========================================
   PROTECT ALL WEBSITE PAGES
========================================= */

function protectPage() {
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    // Login page should always remain accessible
    if (currentPage === "login.html" || currentPage === "") {
        return;
    }

    if (!isLoggedIn()) {
        window.location.replace("login.html");
    }
}

/* =========================================
   LOGIN
========================================= */

function loginUser(username, password) {

    if (
        username === MAARUTHI_USERNAME &&
        password === MAARUTHI_PASSWORD
    ) {
        sessionStorage.setItem("maaruthiLoggedIn", "true");
        sessionStorage.setItem("maaruthiUsername", username);

        return true;
    }

    return false;
}

/* =========================================
   LOGOUT
========================================= */

function logoutUser() {

    sessionStorage.removeItem("maaruthiLoggedIn");
    sessionStorage.removeItem("maaruthiUsername");

    window.location.replace("login.html");
}

/* =========================================
   GET LOGGED-IN USER
========================================= */

function getLoggedInUsername() {
    return sessionStorage.getItem("maaruthiUsername") || "";
}

/* =========================================
   AUTO PROTECTION
========================================= */

protectPage();