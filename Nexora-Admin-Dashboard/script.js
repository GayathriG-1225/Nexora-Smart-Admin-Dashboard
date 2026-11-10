
// NEXORA ADMIN DASHBOARD

// TOAST MESSAGE
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// REVENUE CHART

const revenueCanvas = document.getElementById("revenueChart");

const revenueChart = new Chart(revenueCanvas, {
    type: "line",

    data: {
        labels: [
            "Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"
        ],

        datasets: [{
            label: "Revenue",
            data: [
                25000, 32000, 28000, 45000,
                38000, 55000, 48000, 65000,
                58000, 75000, 82000, 95000
            ],

            borderColor: "#8b72f5",
            backgroundColor: "rgba(139,114,245,0.12)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 7
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "#f0f0f5"
                },
                ticks: {
                    callback: value => "₹" + value / 1000 + "k"
                }
            },

            x: {
                grid: {
                    display: false
                }
            }
        }
    }
});


// WEEKLY / MONTHLY CHART SWITCH

const periodSelect = document.getElementById("periodSelect");

periodSelect.addEventListener("change", function() {

    if (this.value === "weekly") {

        revenueChart.data.labels = [
            "Mon", "Tue", "Wed", "Thu",
            "Fri", "Sat", "Sun"
        ];

        revenueChart.data.datasets[0].data = [
            12000, 18000, 15000, 22000,
            28000, 35000, 32000
        ];

    } else {

        revenueChart.data.labels = [
            "Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"
        ];

        revenueChart.data.datasets[0].data = [
            25000, 32000, 28000, 45000,
            38000, 55000, 48000, 65000,
            58000, 75000, 82000, 95000
        ];
    }

    revenueChart.update();

    showToast("Revenue chart updated!");
});

// SALES DISTRIBUTION CHART

new Chart(document.getElementById("salesChart"), {

    type: "doughnut",

    data: {
        labels: ["Products", "Services", "Others"],

        datasets: [{
            data: [55, 30, 15],

            backgroundColor: [
                "#8b72f5",
                "#48a0ed",
                "#f4a259"
            ],

            borderWidth: 0,
            hoverOffset: 10
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        cutout: "72%",

        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// ADD USER FUNCTIONALITY

const addUserBtn = document.getElementById("addUserBtn");

addUserBtn.addEventListener("click", function() {

    const name = prompt("Enter user name:");

    if (!name || !name.trim()) {
        showToast("Please enter a valid name.");
        return;
    }

    const email = prompt("Enter email address:");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast("Please enter a valid email.");
        return;
    }

    const role = prompt(
        "Enter user role (Developer / Designer / Manager / Analyst):",
        "Developer"
    );

    if (!role || !role.trim()) {
        showToast("Please enter a role.");
        return;
    }

    const table = document.getElementById("userTable");

    const initials = name.trim()
        .split(/\s+/)
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <div class="user-cell">
                <div class="user-avatar avatar-one">
                    ${initials}
                </div>

                <div>
                    <strong></strong>
                    <small></small>
                </div>
            </div>
        </td>

        <td></td>

        <td>${new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })}</td>

        <td>
            <span class="status active-status">Active</span>
        </td>

        <td>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    // Safely insert user-provided information
    row.querySelector("strong").textContent = name.trim();
    row.querySelector("small").textContent = email.trim();
    row.children[1].textContent = role.trim();

    table.prepend(row);

    showToast("New user added successfully!");
});

// DELETE USER FUNCTIONALITY

document.getElementById("userTable").addEventListener(
    "click",
    function(event) {

        if (event.target.classList.contains("delete-btn")) {

            const confirmation = confirm(
                "Are you sure you want to delete this user?"
            );

            if (confirmation) {
                event.target.closest("tr").remove();

                showToast("User deleted successfully!");
            }
        }
    }
);

// SEARCH USER FUNCTIONALITY

const globalSearch = document.getElementById("globalSearch");

globalSearch.addEventListener("input", function() {

    const searchValue = this.value.toLowerCase().trim();

    const rows = document.querySelectorAll("#userTable tr");

    rows.forEach(row => {

        const userDetails = row.textContent.toLowerCase();

        row.style.display = userDetails.includes(searchValue)
            ? ""
            : "none";
    });
});

// SIDEBAR NAVIGATION

const sidebar = document.getElementById("sidebar");

document.getElementById("menuToggle").addEventListener(
    "click",
    function() {
        sidebar.classList.toggle("open");
    }
);

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", function() {

        document.querySelectorAll(".nav-link").forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        sidebar.classList.remove("open");

        showToast(
            this.querySelector("span").textContent + " selected"
        );
    });
});

// NOTIFICATION

document.getElementById("notificationBtn").addEventListener(
    "click",
    function() {
        showToast("You have 3 new notifications!");
    }
);

// SUPPORT BUTTON

document.getElementById("helpBtn").addEventListener(
    "click",
    function() {
        showToast("Welcome! How can we help you today?");
    }
);


// INITIAL MESSAGE

showToast("Welcome to Nexora Dashboard!");
