console.log("MAIN JS LOADED ✔");

/* =========================================
   SAAS LOADER ARCHITECTURE (CLEAN)
========================================= */

(function () {

    const loader = document.getElementById("page-loader");

    function hideLoader() {
        if (!loader) return;

        loader.classList.add("hide");

        setTimeout(() => {
            loader.remove();
        }, 400);
    }

    // 1. fastest possible hide
    window.addEventListener("load", hideLoader);

    // 2. safety fallback (if load is slow)
    setTimeout(hideLoader, 2500);

})();
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-ready");
});
/* =========================================
   STRIPE DASHBOARD CURSOR SYSTEM
========================================= */

const dashboard = document.querySelector(".dashboard-glow");

if (dashboard) {
  let raf;

  dashboard.addEventListener("mousemove", (e) => {
    cancelAnimationFrame(raf);

    raf = requestAnimationFrame(() => {
      const rect = dashboard.getBoundingClientRect();

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      dashboard.style.setProperty("--x", `${x}%`);
      dashboard.style.setProperty("--y", `${y}%`);
    });
  });
}
/* =========================================
   AI LIVE FEED SYSTEM (STRIPE STYLE)
========================================= */

const aiMessages = [
  "Lead qualification active",
  "Auto-follow-ups enabled",
  "CRM syncing contacts",
  "Detecting high-value prospects",
  "Optimizing conversion pipeline",
  "Analytics engine online"
];

const aiFeed = document.getElementById("ai-feed");

if (aiFeed) {
  let index = 0;

  setInterval(() => {
    const msg = document.createElement("p");
    msg.className = "ai-line";
    msg.textContent = "✓ " + aiMessages[index];

    aiFeed.prepend(msg);

    // limit DOM size (performance + realism)
    if (aiFeed.children.length > 5) {
      aiFeed.removeChild(aiFeed.lastChild);
    }

    index = (index + 1) % aiMessages.length;
  }, 2500);
}

/* =========================================
   CRM DRAG & DROP ENGINE
========================================= */

const deals = document.querySelectorAll(".deal-card");
const columns = document.querySelectorAll(".kanban-column");

let draggedItem = null;

// DRAG START
deals.forEach(deal => {
    deal.addEventListener("dragstart", () => {
        draggedItem = deal;
        setTimeout(() => deal.style.display = "none", 0);
    });

    deal.addEventListener("dragend", () => {
        draggedItem = null;
        setTimeout(() => deal.style.display = "block", 0);
    });
});

// COLUMN EVENTS
columns.forEach(col => {

    col.addEventListener("dragover", (e) => {
        e.preventDefault();
        col.classList.add("drag-over");
    });

    col.addEventListener("dragleave", () => {
        col.classList.remove("drag-over");
    });

    col.addEventListener("drop", () => {
        col.classList.remove("drag-over");

        if (draggedItem) {
            col.appendChild(draggedItem);
        }
    });

});
async function login(email, password) {
    const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "admin.html";
    } else {
        alert("Login failed");
    }
}
const token = localStorage.getItem("token");

async function getLeads() {
    const res = await fetch("http://localhost:5000/api/crm", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await res.json();
    console.log(data);
}