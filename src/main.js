if (
    window.location.pathname.includes("admin") &&
    !localStorage.getItem("token")
) {
    window.location.href = "login.html";
}
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

document.addEventListener("DOMContentLoaded", () => {
  const deals = document.querySelectorAll(".deal-card");
  const columns = document.querySelectorAll(".kanban-column");

  let draggedItem = null;

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
});


document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SIMPLE REVEAL SYSTEM
  ========================= */

  const reveals = document.querySelectorAll(".reveal");

  function reveal() {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  reveal();

  /* =========================
     GSAP (SAFE INIT)
  ========================= */

  if (typeof gsap !== "undefined") {

    gsap.registerPlugin(ScrollTrigger);

    // floating AI card
    gsap.to("#aiChatPanel", {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // AI section entrance
    gsap.from(".ai-text", {
      scrollTrigger: {
        trigger: ".ai-section",
        start: "top 80%"
      },
      opacity: 0,
      x: -60,
      duration: 1
    });

    gsap.from("#aiChatPanel", {
      scrollTrigger: {
        trigger: ".ai-section",
        start: "top 80%"
      },
      opacity: 0,
      x: 60,
      duration: 1
    });

    // typing animation
    gsap.to("#typing span", {
      opacity: 0.3,
      y: -3,
      stagger: 0.2,
      repeat: -1,
      yoyo: true
    });
    

    // AI response reveal
    setTimeout(() => {
      gsap.to("#typing", { opacity: 0, duration: 0.3 });
      gsap.to("#aiResponse", { opacity: 1, y: 0, duration: 0.8 });
    }, 2500);

  }

});
// FLOAT PHONE

gsap.to("#phoneMockup",{
    y:-12,
    duration:3,
    repeat:-1,
    yoyo:true,
    ease:"sine.inOut"
});

// FLOAT DESKTOP

gsap.to("#desktopMockup", {
    y: -12,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});
gsap.to(".strategy-phone", {
    y: -10,
    rotation: 2,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});
("#aiPhone",{
    y:-12,
    duration:3.5,
    repeat:-1,
    yoyo:true,
    ease:"sine.inOut"
});

gsap.from(".stat-card",{
    scrollTrigger:{
        trigger:".desktop-frame",
        start:"top 80%"
    },
    opacity:0,
    y:20,
    stagger:0.1,
    duration:0.6
});
gsap.to(".desktop-frame",{

    y:-12,

    duration:4,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});

gsap.to(".ai-phone",{

    y:-8,

    rotation:-2,

    duration:4,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});

gsap.registerPlugin(ScrollTrigger);

/**
 * forma.IT GROUP - Core UI & Animation Infrastructure (2026)
 * Handles Page Loading, Responsive SVG Hub-and-Spoke Vectors, and Bento Mouse Glow Effects.
 */

document.addEventListener("DOMContentLoaded", () => {
    initPageLoader();
    initInteractiveHub();
    initBentoMouseGlow();
});

/**
 * 1. PAGE LOADER ENGINE
 * Gracefully dismisses the screen block when global layout paint states complete.
 */
function initPageLoader() {
    const loader = document.getElementById("page-loader");
    if (loader) {
        window.addEventListener("load", () => {
            loader.classList.add("fade-out");
            setTimeout(() => loader.remove(), 600);
        });
    }
}

/**
 * 2. RESPONSIVE HUB-AND-SPOKE VECTOR SYSTEM
 * Calculates precise coordinates between the central node and satellite endpoints,
 * generating responsive, animated connection vectors.
 */
function initInteractiveHub() {
    const container = document.querySelector(".services-visual");
    const centerNode = document.querySelector(".ai-core-center");
    const satelliteNodes = document.querySelectorAll(".service-node");

    if (!container || !centerNode || satelliteNodes.length === 0) return;

    // Inject a pristine SVG overlay canvas dynamically into the background layer
    let svgContainer = document.getElementById("hub-vector-canvas");
    if (!svgContainer) {
        svgContainer = document.createElementNS("http://w3.org", "svg");
        svgContainer.setAttribute("id", "hub-vector-canvas");
        svgContainer.style.position = "absolute";
        svgContainer.style.top = "0";
        svgContainer.style.left = "0";
        svgContainer.style.width = "100%";
        svgContainer.style.height = "100%";
        svgContainer.style.zIndex = "10";
        svgContainer.style.pointerEvents = "none";
        container.appendChild(svgContainer);
    }

    // Clean out existing CSS hardcoded background fallbacks to hand control over to math engine
    const staticLines = document.querySelectorAll(".service-line");
    staticLines.forEach(line => line.remove());

    function recalculateConnections() {
        svgContainer.innerHTML = ""; // Clear canvas
        
        const containerRect = container.getBoundingClientRect();
        const centerRect = centerNode.getBoundingClientRect();
        
        // Find core absolute hub center coordinates relative to parent container
        const centerX = (centerRect.left + centerRect.width / 2) - containerRect.left;
        const centerY = (centerRect.top + centerRect.height / 2) - containerRect.top;

        satelliteNodes.forEach((node, index) => {
            const nodeRect = node.getBoundingClientRect();
            
            // Map individual satellite relative centers
            const nodeX = (nodeRect.left + nodeRect.width / 2) - containerRect.left;
            const nodeY = (nodeRect.top + nodeRect.height / 2) - containerRect.top;

            // Generate an elegant SVG vector path group
            const pathGroup = document.createElementNS("http://w3.org", "g");

            // Base Background Guide Vector Line (Deep Cyber Slate)
            const baseLine = document.createElementNS("http://w3.org", "line");
            baseLine.setAttribute("x1", nodeX);
            baseLine.setAttribute("y1", nodeY);
            baseLine.setAttribute("x2", centerX);
            baseLine.setAttribute("y2", centerY);
            baseLine.setAttribute("stroke", "rgba(59, 130, 246, 0.15)");
            baseLine.setAttribute("stroke-width", "1.5");
            pathGroup.appendChild(baseLine);

            // Active Pulsing Data Vector (Cyber Blue)
            const activeLine = document.createElementNS("http://w3.org", "line");
            activeLine.setAttribute("x1", nodeX);
            activeLine.setAttribute("y1", nodeY);
            activeLine.setAttribute("x2", centerX);
            activeLine.setAttribute("y2", centerY);
            activeLine.setAttribute("stroke", "rgba(59, 130, 246, 0.6)");
            activeLine.setAttribute("stroke-width", "2");
            activeLine.setAttribute("stroke-dasharray", "8, 16");
            
            // Append fluid running metadata stream vector animations
            const animation = document.createElementNS("http://w3.org", "animate");
            animation.setAttribute("attributeName", "stroke-dashoffset");
            animation.setAttribute("values", index % 2 === 0 ? "48;0" : "0;48"); // Alternate flows inward/outward
            animation.setAttribute("dur", "2.5s");
            animation.setAttribute("repeatCount", "indefinite");
            
            activeLine.appendChild(animation);
            pathGroup.appendChild(activeLine);
            svgContainer.appendChild(pathGroup);
        });
    }

    // Initialize layout math calculations immediately
    recalculateConnections();

    // Attach passive throttling observer configurations to prevent structural computational overheads
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(recalculateConnections, 60);
    });
}

/**
 * 3. BENTO GRID INTELLIGENT MOUSE GLOW TRACKING
 * Calculates and injects exact cursor coordinate variables inside localized CSS contexts
 * for the high-end radial "flashlight" blur hover state overlays.
 */
function initBentoMouseGlow() {
    const cards = document.querySelectorAll(".service-card");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            
            // Extract the micro relative tracking points within the bounds of this single element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Inject native high-performance hardware accelerated properties straight to component runtime
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

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
document.querySelectorAll(".dashboard-glow").forEach(el => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});
fetch("http://localhost:5000/api/crm/messages")
  .then(res => res.json())
  .then(leads => {
    if (typeof renderPipeline === "function") {
      renderPipeline(leads);
    }
  })
  .catch(err => console.log("CRM load error:", err));
  
  document.addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--x", e.clientX + "px");
  document.documentElement.style.setProperty("--y", e.clientY + "px");
});


/* ==========================================================================
   AI CHAT INTERACTION ENGINE (REPLACES STATIC HARDCODED PLACEHOLDERS)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const inputWrapper = document.querySelector(".chat-input-wrapper");

  const aiResponses = {
      "hello": "Hello! I am the forma.IT automation assistant. How can I help optimize your business systems today?",
      "hi": "Hello! I am the forma.IT automation assistant. How can I help optimize your business systems today?",
      "dashboard": "I can help configure live operational dashboards. Let's align your tracking nodes.",
      "layout": "I can help configure live operational dashboards. Let's align your tracking nodes.",
      "automate": "We design custom API pipelines and workflow hooks to automate manual invoices.",
      "invoice": "We design custom API pipelines and workflow hooks to automate manual invoices.",
      "default": "Analyzing that data point now. Your user acquisition efficiency looks optimal!"
  };

  if (inputWrapper) {
    const inputField = inputWrapper.querySelector("input");
    const sendBtn = inputWrapper.querySelector(".chat-send-btn");
    const scroller = document.querySelector(".ai-chat-scroller");

    const sendMessage = () => {
      if (!inputField || !inputField.value.trim() || !scroller) return;
      
      const userText = inputField.value.trim();
      
      // 1. Inject real user question bubble into DOM
      const userBubble = document.createElement("div");
      userBubble.className = "chat-message user-msg";
      userBubble.textContent = userText;
      scroller.appendChild(userBubble);
      
      // Clear field and shift scroll state downwards
      inputField.value = "";
      scroller.scrollTop = scroller.scrollHeight;
      
      // 2. Filter input matching key rules
      const lowerText = userText.toLowerCase();
      let finalReply = aiResponses.default;
      
      for (const key in aiResponses) {
          if (lowerText.includes(key) && key !== "default") {
              finalReply = aiResponses[key];
              break;
          }
      }
      
      // 3. Inject responsive AI text block bubble after computational delay
      setTimeout(() => {
          const aiBubble = document.createElement("div");
          aiBubble.className = "chat-message ai-msg";
          aiBubble.textContent = finalReply;
          scroller.appendChild(aiBubble);
          
          // Force auto-scroll layout shift to reveal bubble
          scroller.scrollTop = scroller.scrollHeight;
      }, 450);
    };

    // Button click trigger
    sendBtn.addEventListener("click", sendMessage);

    // Keyboard Enter trigger
    inputField.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
          sendMessage();
      }
    });
  }
});

/**
 * 4. GSAP SCROLLTRIGGER ORCHESTRATION ENGINE
 * Handles advanced, high-performance scroll triggers for bento blocks 
 * and delivery milestone components.
 */
function initScrollAnimations() {
    // Check if GSAP and ScrollTrigger are loaded correctly from CDN
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.warn("GSAP or ScrollTrigger CDN assets missing.");
        return;
    }

    // Register ScrollTrigger plugin with GSAP core
    gsap.registerPlugin(ScrollTrigger);

    // Sequence 01: Staggered entry for Bento Grid Card Elements
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".grid",          // Fires when the parent grid enters the viewport
            start: "top 82%",         // Starts animation when grid top hits 82% viewport height
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 45,
        duration: 0.85,
        stagger: 0.15,                 // 150ms delay between each card's entry path
        ease: "power3.out",
        clearProps: "all"             // Clears inline styles after completion to keep hover effects crisp
    });

    // Sequence 02: Progressive delivery pipeline streaming
    const pipelineTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".grid-delivery-flow",
            start: "top 75%",
            toggleActions: "play none none none"
        }
    });

    // Animate individual delivery step milestone cards
    pipelineTimeline.from(".delivery-step", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
    }, 0);

    // Animate the continuous horizontal timeline stream connector line
    pipelineTimeline.fromTo(".delivery-stream-line", 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 1.2, ease: "power1.inOut" },
        0.2
    );
}

// Extend your DOMContentLoaded event tracker to include the new scroll triggers
document.addEventListener("DOMContentLoaded", () => {
    // Keep existing initializers intact
    if (typeof initPageLoader === "function") initPageLoader();
    if (typeof initInteractiveHub === "function") initInteractiveHub();
    if (typeof initBentoMouseGlow === "function") initBentoMouseGlow();
    
    // Fire animation engine
    initScrollAnimations();
});

async function loadStats() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/crm", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  // Example mapping (adjust to your backend)
  document.getElementById("totalLeads").textContent = data.length;
  document.getElementById("activeProjects").textContent = 18; // placeholder
  document.getElementById("conversionRate").textContent = "42%";
}

window.addEventListener("DOMContentLoaded", loadStats);

async function loadLeads() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/crm", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const leads = await res.json();

  const table = document.getElementById("leadsTable");
  table.innerHTML = "";

  leads.forEach(lead => {
    const row = document.createElement("tr");
    row.className = "border-t border-zinc-900";

    row.innerHTML = `
      <td class="py-3">${lead.name || "Unnamed"}</td>
      <td class="text-blue-400">${lead.status || "New"}</td>
      <td>$${lead.value || 0}</td>
    `;

    table.appendChild(row);
  });
}

window.addEventListener("DOMContentLoaded", loadLeads);

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

gsap.from(".glow-card", {
  opacity: 0,
  y: 20,
  stagger: 0.1,
  duration: 0.6
});

// Base API URL configuration
const API_BASE_URL = "http://localhost:5000/api/crm";

async function loadDashboard() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const res = await fetch(API_BASE_URL, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch CRM data");
        const leads = await res.json();

        // 1. RENDER LEADS TABLE
        const table = document.getElementById("leadsTable");
        if (table) {
            table.innerHTML = "";
            leads.forEach(lead => {
                const row = document.createElement("tr");
                row.className = "border-b border-zinc-900/50 hover:bg-zinc-900/20 transition-colors";
                row.innerHTML = `
                    <td class="py-3.5 font-medium">${lead.name || "Unnamed"}</td>
                    <td class="py-3.5"><span class="px-2 py-0.5 rounded text-xs ${lead.status === 'Qualified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}">${lead.status || "New"}</span></td>
                    <td class="py-3.5 text-zinc-300">$${(lead.value || 0).toLocaleString()}</td>
                    <td class="py-3.5 text-right">
                        ${lead.status !== "Qualified" ? `<button onclick="qualifyLead('${lead._id || lead.id}')" class="text-xs bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-2 py-1 rounded text-zinc-400 hover:text-white transition">Promote</button>` : '—'}
                    </td>
                `;
                table.appendChild(row);
            });
        }

        // 2. COMPUTE METRICS & KPIs
        const total = leads.length;
        const qualified = leads.filter(l => l.status === "Qualified").length;
        const conversion = total ? Math.round((qualified / total) * 100) : 0;

        document.getElementById("totalLeads").textContent = total;
        document.getElementById("activeProjects").textContent = qualified;
        document.getElementById("conversionRate").textContent = `${conversion}%`;

        // 3. RENDER RECENT ACTIVITY FEED
        const feed = document.getElementById("activityFeed");
        if (feed) {
            feed.innerHTML = "";
            leads.slice(0, 5).forEach(lead => {
                feed.innerHTML += `
                    <div class="flex items-start gap-2 border-l-2 border-zinc-800 pl-3 py-1">
                        <p class="text-zinc-400"><span class="text-white font-medium">${lead.name}</span> moved into <span class="text-blue-400">${lead.status || "New"}</span></p>
                    </div>
                `;
            });
        }

        // Trigger Success Entry UI Alert via GSAP
        triggerSyncAlert();

    } catch (err) {
        console.error("Dashboard Engine Error:", err);
    }
}

// UPDATE LEAD ACTION FUNCTION
async function qualifyLead(id) {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status: "Qualified" })
        });
        if (res.ok) loadDashboard(); // Hot reload metrics without refreshing window
    } catch (err) {
        console.error("Error modifying lead status:", err);
    }
}

// DYNAMIC SEARCH EVENT
const searchInput = document.getElementById("searchLead");
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        document.querySelectorAll("#leadsTable tr").forEach(row => {
            row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
        });
    });
}

// LOGOUT LOGIC
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.onclick = () => {
        localStorage.clear();
        window.location.href = "login.html";
    };
}

// GSAP NOTIFICATION TOAST
function triggerSyncAlert() {
    const el = document.getElementById("notification");
    if (el) {
        gsap.to(el, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
        setTimeout(() => {
            gsap.to(el, { x: 300, opacity: 0, duration: 0.4, ease: "power2.in" });
        }, 3000);
    }
}

// INITIALIZE LINE CHART
if (document.getElementById("revenueChart")) {
    new Chart(document.getElementById("revenueChart"), {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr"],
            datasets: [{
                label: "Revenue Growth ($k)",
                data: [20, 40, 35, 60],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.05)",
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { 
                y: { grid: { color: "#18181b" } }, 
                x: { grid: { display: false } } 
            }
        }
    });
}


// Run dashboard loading pipeline when DOM is parsed
window.addEventListener("DOMContentLoaded", loadDashboard);

async function loadLeads() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/crm/leads", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  console.log(data);
  renderPipeline(data);
}

function renderPipeline(leads) {
  const table = document.getElementById("leadsTable");
  if (!table) return;

  table.innerHTML = "";

  leads.forEach(lead => {
    const row = document.createElement("tr");

    row.className = "border-t border-zinc-900";

    row.innerHTML = `
      <td class="py-3">${lead.name}</td>
      <td>${lead.status}</td>
      <td>${lead.value}</td>
    `;

    table.appendChild(row);
  });
}

window.addEventListener("DOMContentLoaded", loadLeads);

async function loadLeads() {

  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/crm/leads", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await res.json();
  console.log("LEADS:", data);

  renderPipeline(data);
}
fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "admin@test.com",
    password: "123456"
  })
})
.then(res => res.json())
.then(data => {
  localStorage.setItem("token", data.token);
  console.log("TOKEN SAVED");
});

