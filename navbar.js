const darkToggle = document.getElementById("dark-toggle");
const mobileDarkToggle = document.getElementById("mobile-dark-toggle");
const body = document.body;

// ======================
// Dark Mode
// ======================

if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
}

updateIcons();

function updateIcons() {
    const isDark = body.classList.contains("dark-mode");

    if (darkToggle) {
        darkToggle.textContent = isDark ? "☀️" : "🌙";
    }

    if (mobileDarkToggle) {
        mobileDarkToggle.textContent = isDark ? "☀️" : "🌙";
    }
}

function toggleDarkMode() {
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");

    localStorage.setItem(
        "darkMode",
        isDark ? "enabled" : "disabled"
    );

    updateIcons();
}

if (darkToggle) {
    darkToggle.addEventListener("click", toggleDarkMode);
}

if (mobileDarkToggle) {
    mobileDarkToggle.addEventListener("click", toggleDarkMode);
}

// ======================
// Mobile Menu
// ======================

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("close-btn");
const menuOverlay = document.getElementById("menu_overlay");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        mobileMenu?.classList.add("active");
        menuOverlay?.classList.add("active");
        document.body.style.overflow = "hidden";
    });
}

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        mobileMenu?.classList.remove("active");
        menuOverlay?.classList.remove("active");
        document.body.style.overflow = "";
    });
}

if (menuOverlay) {
    menuOverlay.addEventListener("click", () => {
        mobileMenu?.classList.remove("active");
        menuOverlay?.classList.remove("active");
        document.body.style.overflow = "";
    });
}

// ======================
// User Navbar Handler
// ======================

function userNavbarHandler() {
    const token = JSON.parse(localStorage.getItem("token"));

    const loginBtn = document.getElementById("loginBtn");
    const profileDropdown = document.getElementById("profileDropdown");
    const profileSection = document.getElementById("profileSection");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const logoutBtn = document.getElementById("logoutBtn");

    if (token) {
        if (loginBtn) loginBtn.style.display = "none";
        if (profileDropdown) profileDropdown.style.display = "block";

        const user = JSON.parse(localStorage.getItem("user"));

        if (user?.name && profileSection) {
            profileSection.textContent =
                user.name.charAt(0).toUpperCase();
        }
    } else {
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (profileDropdown) profileDropdown.style.display = "none";
    }

    if (profileSection) {
        profileSection.addEventListener("click", (e) => {
            e.stopPropagation();

            if (dropdownMenu) {
                dropdownMenu.classList.toggle("show");
            }
        });
    }

    document.addEventListener("click", () => {
        if (dropdownMenu) {
            dropdownMenu.classList.remove("show");
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "index.html";
        });
    }
}

// Global scope me available
window.userNavbarHandler = userNavbarHandler;

// Auto Run
document.addEventListener("DOMContentLoaded", () => {
    userNavbarHandler();
});