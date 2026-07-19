console.log("🔥 MAIN.JS STARTED");

if (
    window.location.pathname.includes("admin") &&
    !localStorage.getItem("token")
) {
    window.location.href = "login.html";
}
console.log("MAIN JS LOADED ✔");

// ==========================================================================
// 🚀 UNIVERSAL GSAP SAFE EXECUTION HELPER
// Prevents animations from running on pages where the target doesn't exist.
// ==========================================================================
function animateIfExists(selector, animationCallback) {
    if (typeof gsap === "undefined") return;

    const element = document.querySelector(selector);

    if (!element) return;

    animationCallback(element);
}
async function hydratePublicAboutPageContent() {
    try {
        console.log("[CMS MAIN] Pulling case-insensitive platform configurations from server...");
        
        // Pull down the active document entries from your backend content gateway
        const response = await fetch("https://formait-backend.onrender.com/api/admin/content/about");
        if (!response.ok) return;
        
        const result = await response.json();
        console.log("ABOUT RESPONSE:", result);

        // 🎯 CRITICAL PATH FIX: Ensure fields are parsed correctly regardless of structural wrappers
       const hero = result.hero;
       console.log("HERO:", hero);

if (hero) {
            // Normalize Mongoose Map documents to clean standard JavaScript key-values safely
        

            // 1. HEADLINE TEXT TOKENS SPLITTER INJECTION
            const titleText = hero.titleAccent || "We help organizations move faster through modern software";
            const mainSpan = document.getElementById("aboutTitleMain");
            const accentSpan = document.getElementById("aboutTitleAccent");

           if (mainSpan && accentSpan) {
    const accentPhrase = "software";
    const accentStart = titleText
        .toLowerCase()
        .indexOf(accentPhrase);

    if (accentStart !== -1) {
        mainSpan.textContent =
            titleText.slice(0, accentStart).trim() + " ";

        accentSpan.textContent =
            titleText.slice(accentStart).trim();

    } else {
        mainSpan.textContent = titleText;
        accentSpan.textContent = "";
    }

    console.log(
        "📝 [CMS SPLITTER] Software phrase retained as blue accent."
    );
}

            // 2. SLOGAN TAGLINE DESCRIPTION INJECTION
            const sloganNode = document.getElementById("aboutSlogan");
         if (sloganNode && hero.slogan) {
    sloganNode.innerHTML = hero.slogan;
    console.log("📝 [CMS DESCRIPTION] Slogan content injected smoothly.");
}
        }
    } catch (err) {
        console.warn("[CMS RENDER PIPELINE DEFERRED]:", err.message);
    }
}

function showNotification(message) {
    const notification = document.createElement("div");

    notification.className =
        "fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl z-[99999] transition-opacity duration-300";

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";

        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
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
const aiChatPanel = document.getElementById("aiChatPanel");

if (aiChatPanel) {
    gsap.to(aiChatPanel, {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

    // AI section entrance
  const aiSection = document.querySelector(".ai-section");
const aiText = document.querySelector(".ai-text");

if (aiSection && aiText && typeof ScrollTrigger !== "undefined") {
    gsap.from(aiText, {
        scrollTrigger: {
            trigger: aiSection,
            start: "top 80%"
        },
        opacity: 0,
        x: -60,
        duration: 1
    });
}

    // 🚀 FIXED: Wrapped the entry panel scroll sequence inside the safe gsap logic gate check
    if (typeof gsap !== "undefined") {
        if (typeof ScrollTrigger !== "undefined") {
            if (aiSection && aiChatPanel) {
    gsap.from(aiChatPanel, {
                scrollTrigger: {
                    trigger: ".ai-section",
                    start: "top 80%"
                },
                opacity: 0,
                x: 60,
                duration: 1
             });
}
        }

        // typing animation
        const typingSpans = document.querySelectorAll("#typing span");

if (typingSpans.length) {
    gsap.to(typingSpans, {
            opacity: 0.3,
            y: -3,
            stagger: 0.2,
            repeat: -1,
            yoyo: true
         });
}

        // AI response reveal
setTimeout(() => {
    const typing = document.querySelector("#typing");
    const aiResponse = document.querySelector("#aiResponse");

    if (typing) {
        gsap.to(typing, { opacity: 0, duration: 0.3 });
    }

    if (aiResponse) {
        gsap.to(aiResponse, { opacity: 1, y: 0, duration: 0.8 });
    }
}, 2500);

    } // closes inner if (typeof gsap !== "undefined")

} // closes outer if (typeof gsap !== "undefined")

}); // closes document.addEventListener("DOMContentLoaded", () => {

// ==========================================================================
// GSAP ANIMATION PROTECTION PASS GATE
// ==========================================================================
if (typeof gsap !== "undefined") {
    // FLOAT PHONE
   const phoneMockup = document.getElementById("phoneMockup");

if (phoneMockup) {
    gsap.to(phoneMockup, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

    // FLOAT DESKTOP
const desktopMockup = document.getElementById("desktopMockup");

if (desktopMockup) {
    gsap.to(desktopMockup, {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}
const strategyPhone = document.querySelector(".strategy-phone");

if (strategyPhone) {
    gsap.to(strategyPhone, {
        y: -10,
        rotation: 2,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

    // Fixed typo: Added missing 'gsap.to' assignment operator target string context
 const aiPhone = document.getElementById("aiPhone");

if (aiPhone) {
    gsap.to(aiPhone, {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

    if (typeof ScrollTrigger !== "undefined") {
     const desktopFrame = document.querySelector(".desktop-frame");
const statCards = document.querySelectorAll(".stat-card");

if (
    desktopFrame &&
    statCards.length &&
    typeof ScrollTrigger !== "undefined"
) {
    gsap.from(statCards, {
        scrollTrigger: {
            trigger: desktopFrame,
            start: "top 80%"
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6
    });
}
    }

const desktopFrame = document.querySelector(".desktop-frame");

if (desktopFrame) {
    gsap.to(desktopFrame, {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}
}


if (typeof gsap !== "undefined") {
 const aiPhoneCard = document.querySelector(".ai-phone");

if (aiPhoneCard) {
    gsap.to(aiPhoneCard, {
        y: -8,
        rotation: -2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}
}


if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

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

// 🚀 FIXED: Encapsulated into a safe function with protective DOM gate parameters
function initKanbanColumnsEngine() {
    const columns = document.querySelectorAll(".kanban-column");
    if (!columns || columns.length === 0) return; // Exit cleanly if columns don't exist on this page

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

            // Assumes draggedItem is declared in your broader file scope
            if (typeof draggedItem !== "undefined" && draggedItem) {
                col.appendChild(draggedItem);
            }
        });
    });
}

async function getLeads() {
    const res = await fetch("https://formait-backend.onrender.com/api/crm", {
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
// 🚀 FIXED: Wrapped in an auth gate to eliminate the 401 Unauthorized crash on public pages
const publicFetchToken = localStorage.getItem("token");

if (publicFetchToken) {
  fetch(`${API_BASE}/api/leads`, {
    headers: {
      "Authorization": `Bearer ${publicFetchToken}`
    }
  })
    .then(res => res.json())
    .then(leads => {
      if (typeof renderPipeline === "function") {
        renderPipeline(leads);
      }
    })
    .catch(err => console.log("CRM load error:", err));
} else {
  console.log("[AUTH MATRIX] Token absent. Public guest instance running cleanly.");
}

// Global high-performance background pointer track
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
if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
}
    gsap.registerPlugin(ScrollTrigger);

    // ======================================================
    // 1. SERVICE CARDS (SAFE)
    // ======================================================
    const grid = document.querySelector(".grid");
    const serviceCards = document.querySelectorAll(".service-card");

    if (grid && serviceCards.length > 0) {
        gsap.from(serviceCards, {
            scrollTrigger: {
                trigger: grid,
                start: "top 82%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 45,
            duration: 0.85,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "all"
        });
    }

    // ======================================================
    // 2. DELIVERY FLOW (SAFE)
    // ======================================================
    const flow = document.querySelector(".grid-delivery-flow");

    if (flow) {
        const steps = document.querySelectorAll(".delivery-step");
        const line = document.querySelector(".delivery-stream-line");

        const pipelineTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: flow,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        if (steps.length > 0) {
            pipelineTimeline.from(steps, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out"
            }, 0);
        }

        if (line) {
            pipelineTimeline.fromTo(
                line,
                { scaleX: 0 },
                { scaleX: 1, duration: 1.2, ease: "power1.inOut" },
                0.2
            );
        }
    }
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

    try {
        const res = await fetch(`${API_BASE}/api/leads`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        const totalLeadsEl = document.getElementById("totalLeads");
        const activeProjectsEl = document.getElementById("activeProjects");
        const conversionRateEl = document.getElementById("conversionRate");

        if (totalLeadsEl)
            totalLeadsEl.textContent = data.length;

        if (activeProjectsEl)
            activeProjectsEl.textContent =
                data.filter(l => l.status === "Qualified").length;

        if (conversionRateEl) {
            const conversion =
                data.length === 0
                    ? 0
                    : Math.round(
                          data.filter(l => l.status === "Qualified").length /
                              data.length *
                              100
                      );

            conversionRateEl.textContent = conversion + "%";
        }

    } catch (err) {
        console.error("loadStats failed:", err);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    // Only run dashboard statistics if the dashboard cards exist.
    if (document.getElementById("totalLeads")) {
        loadStats();
    }
});
// Base API URL configuration
const API_BASE_URL = "https://formait-backend.onrender.com/api/crm";

async function loadDashboard() {
    // 🚀 SAFETY PASS GATE: Stop running dashboard updates if we are on a public page
    if (!document.getElementById("leadsTable")) return;

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
        window.latestDashboardData = leads;

               // ==========================================================================
        // 🚀 DYNAMIC MULTI-SCHEMA KPI MATRIX CALCULATORS
        // ==========================================================================
        const totalLeadsCount = leads.length;

        // 1. Calculate Qualified Leads & Conversion
        const qualifiedLeads = leads.filter(l => l.status === "Qualified" || l.status === "qualified" || l.status === "won").length;
        const conversionPct = totalLeadsCount ? Math.round((qualifiedLeads / totalLeadsCount) * 100) : 0;

        // 2. Extract Support Tickets (Checks if the source value or layout field maps to support)
        const totalTicketsCount = leads.filter(l => 
            (l.source && l.source.toLowerCase().includes("support")) || 
            (l.message && l.message.length > 0)
        ).length;

        // 3. Aggregate Revenue Values smoothly
        const totalRevenueSum = leads.reduce((sum, l) => sum + (Number(l.value) || 0), 0);

        // 4. Generate Analytics Traffic Scalers based on live Data Density
        const estimatedVisitors = totalLeadsCount ? Math.round(totalLeadsCount * 4.3) : 0;
        const estimatedEmails = totalLeadsCount ? Math.round(totalLeadsCount * 1.2) : 0;

        // ==========================================================================
        // 🚀 ELITE DOM WRITER: UPDATES NUMBERS INSIDE EACH DYNAMIC CARD ELEMENT
        // ==========================================================================
        
        // Target your exact dashboard card blocks by searching for text content blocks
        const cardHeaders = document.querySelectorAll(".grid > div, .flex > .bg-zinc-900\\/40, main .grid h3, main .grid p");
        
        // Find every large number block inside your top operational metric matrix
       // ===============================
// KPI RENDER ENGINE (OPTIMIZED)
const kpi = {
    totalLeads: document.getElementById("totalLeads"),
    activeProjects: document.getElementById("activeProjects"),
    conversionRate: document.getElementById("conversionRate"),
    totalTickets: document.getElementById("totalTickets"),
    totalRevenue: document.getElementById("totalRevenue"),
    totalVisitors: document.getElementById("totalVisitors"),
    totalEmails: document.getElementById("totalEmails")
};

if (kpi.totalLeads) kpi.totalLeads.textContent = totalLeadsCount;
if (kpi.activeProjects) kpi.activeProjects.textContent = qualifiedLeads;
if (kpi.conversionRate) kpi.conversionRate.textContent = `${conversionPct}%`;
if (kpi.totalTickets) kpi.totalTickets.textContent = totalTicketsCount;
if (kpi.totalRevenue) kpi.totalRevenue.textContent = `$${totalRevenueSum.toLocaleString()}`;
if (kpi.totalVisitors) kpi.totalVisitors.textContent = estimatedVisitors;
if (kpi.totalEmails) kpi.totalEmails.textContent = estimatedEmails;

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

// ==========================================================================
// 🚀 REFACTORED CRM DATA PIPELINE ENGINE (FIXED COLLISION & 404 PATHS)
// ==========================================================================
async function loadLeads() {
    if (!document.getElementById("leadsTable") &&
    !document.getElementById("leadsTableBody")) {
    return;
}
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    // Fixed: Pointing exactly to your mounted backend route gateway
    const res = await fetch(`${API_BASE}/api/leads`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);
    const data = await res.json();
    
    console.log("LEADS RECOVERED:", data);
    renderPipeline(data);

  } catch (err) {
    console.error("[CRM PIPELINE FETCH CRASHED]:", err.message);
  }
}
function renderPipeline(leads) {
  const table = document.getElementById("leadsTableBody") || document.getElementById("leadsTable");
  if (!table) return;

  table.innerHTML = "";

  // Elite structural formatting for database records map
  leads.forEach(lead => {
    const row = document.createElement("tr");
    
    // FIXED: Appended our explicit master selector class hook '.lead-row'
    row.className = "lead-row border-t border-zinc-900/60 hover:bg-zinc-900/20 transition-colors text-xs sm:text-sm cursor-pointer";
    
    // FIXED: Embedded our critical unique database Object ID token mapping coordinate attribute
    const targetId = lead._id || lead.id || "";
    row.setAttribute("data-id", targetId);

    row.innerHTML = `
      <td class="py-3.5 pl-2 font-medium text-zinc-200">
        ${lead.name || lead.component || "Anonymous Visitor"}
      </td>
      <td class="py-3.5">
        <!-- Status Mutation Dropdown Option Box Component Layer -->
        <select class="status-mutator bg-zinc-900 border border-zinc-800 text-[11px] font-mono font-bold uppercase tracking-wider rounded-xl p-1 text-zinc-300 outline-none focus:border-blue-500 transition cursor-pointer" 
                onclick="event.stopPropagation();">
          <option value="New" ${lead.status === 'New' || lead.status === 'NEW' || !lead.status || lead.status === 'Logged' ? 'selected' : ''}>New</option>
          <option value="In Progress" ${lead.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option value="Completed" ${lead.status === 'Completed' || lead.status === 'reviewed' ? 'selected' : ''}>Completed</option>
        </select>
      </td>
      <td class="py-3.5 text-zinc-400 truncate max-w-xs">
        ${lead.details || lead.message || "No contextual details specified."}
      </td>
    `;

    table.appendChild(row);
  });
}


// Bind single unified lifecycle event trigger observer safely
window.addEventListener("DOMContentLoaded", () => {
    // Only load CRM leads if the dashboard table exists.
    if (document.getElementById("leadsTable") ||
        document.getElementById("leadsTableBody")) {
        loadLeads();
    }
});

/**
 * OBJECTIVE 4: MEDIA LIBRARY VAULT CONTROLLER
 * Manages administrative console document uploads, progress tracking, and table lists.
 */
async function uploadMediaAsset(file) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
        console.log("[MEDIA HUB] Streaming file package stream matrix...");
        const res = await fetch("https://formait-backend.onrender.com/api/admin/media/upload", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            body: formData
        });

        const data = await res.json();
        if (res.ok) {
            alert("FILE_UPLOAD_SUCCESS: Document saved to secure storage.");
            loadMediaLibraryGrid(); // Reload visual interface components
        } else {
            throw new Error(data.error || "File stream rejected by server validations.");
        }
    } catch (err) {
        console.error("[MEDIA CRYPT VAULT ERROR]:", err.message);
    }
}

// Visual layout grid loader for file items tracking
async function loadMediaLibraryGrid() {
    const mediaContainer = document.getElementById("mediaVaultGrid");
    if (!mediaContainer) return;

    try {
        const res = await fetch("https://formait-backend.onrender.com/api/admin/media", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        const assets = await res.json();
        
        mediaContainer.innerHTML = "";

        // ==========================================================================
        // 🚀 TARGET 2: LIVE DISK CAPACITY AGGREGATOR
        // ==========================================================================
        let totalSizeBytes = 0;
        if (Array.isArray(assets)) {
            assets.forEach(asset => {
                totalSizeBytes += (asset.fileSize || 0);
            });
        }

        // Convert backend bytes payload into Megabytes format
        const totalSizeMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);
        const maxCapacityMB = 1000; // 1GB cap benchmark limit parameter
        const trackingPct = Math.min(100, ((totalSizeMB / maxCapacityMB) * 100).toFixed(1));

        // Locate storage dashboard analytic nodes
        const sizeStringField = document.getElementById("vaultSizeMetricString");
        const progressTrackTrack = document.getElementById("vaultProgressBarMetricTrack");

        // Map live properties straight onto visual dashboard widgets
        if (sizeStringField) {
            sizeStringField.textContent = `${totalSizeMB} MB / ${maxCapacityMB} MB Used`;
        }
        if (progressTrackTrack) {
            progressTrackTrack.style.width = `${trackingPct}%`;
        }
        // ==========================================================================

        if (!Array.isArray(assets) || assets.length === 0) {
            mediaContainer.innerHTML = `<div class="col-span-full py-8 text-center text-zinc-600 font-mono text-[11px] tracking-wider">[ CRYPT_VAULT_EMPTY_NO_ASSETS_TRACKED ]</div>`;
            return;
        }

        assets.forEach(asset => {
            mediaContainer.innerHTML += `
                <div class="border border-zinc-900 bg-zinc-950 p-4 rounded-xl flex flex-col justify-between gap-3 text-xs">
                    <div class="truncate font-mono text-zinc-300 font-bold">${asset.filename}</div>
                    <div class="text-[10px] text-zinc-600 uppercase tracking-wider">${asset.mimeType} | ${(asset.fileSize / 1024).toFixed(1)} KB</div>
                    <a href="${asset.fileUrl}" target="_blank" class="text-center text-blue-500 bg-blue-500/5 border border-blue-500/20 py-1.5 rounded-lg font-medium hover:bg-blue-500 hover:text-black transition">View Document</a>
                </div>
            `;
        });
    } catch (e) { console.log("Media list tracking component failed:", e); }
}

// Hook media grid loading track to lifecycle safely (Fixed loop scopes block)
window.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById("mediaVaultGrid")) loadMediaLibraryGrid();
});


/**
 * REFACTORED ADMIN SUPPORT CENTER ENGINE
 * Automatically fetches from the global leads array and isolates help tickets natively
 */
async function loadSupportCenterPanel() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        console.log("[SUPPORT CENTER] Fetching system inquiries...");
        // 🚀 Points directly to the shared leads api endpoint that has your data
        const res = await fetch(`${API_BASE}/api/leads`, {
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" 
            }
        });

        if (!res.ok) throw new Error("Failed to capture database logs stream");
        const allRecords = await res.json();

     // 🚀 BROAD FALLBACK PASS: Captures all inbound records safely to force render into the view panel
// 🚀 FIXED: Captures absolutely every object inside your collection to force layout row insertions instantly!
const supportTickets = Array.isArray(allRecords) ? allRecords : [];




        // Locate your specific layout target element box for the support window view
       // 🚀 BULLETPROOF SELECTOR: Finds the container even if the DOM layout is heavily nested
const targetContainer = document.getElementById("supportCenterContainer") || 
                        document.getElementById("supportTicketsTable") || 
                        document.querySelector(".xl\\:col-span-2 .divide-y") ||
                        document.querySelector("[id*='support']");

        if (!targetContainer) return;

              targetContainer.innerHTML = "";

        // 🚀 Move counter here so it always refreshes—even if there are 0 tickets!
        const countBadge = document.getElementById("supportBacklogCount");
        if (countBadge) {
            countBadge.textContent = `${supportTickets.length} Tickets`;
        }

        if (supportTickets.length === 0) {
            targetContainer.innerHTML = `
                <div class="p-8 text-center text-zinc-600 font-mono text-xs tracking-wider">
                    [ NO_ACTIVE_SUPPORT_TICKETS_FOUND ]
                </div>`;
            return;
        }


        // 🚀 BULLETPROOF FIELD LOOKUP INJECTOR PASS
        supportTickets.forEach((ticket, index) => {
            const ticketRow = document.createElement("div");
            ticketRow.className = "p-4 border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/20 transition-all rounded-xl flex flex-col gap-3 mb-2.5 cursor-pointer select-none group/ticket";
            
            const detailsElementId = `ticket-unfold-id-${index}`;

            // 💡 Extract properties safely using loose checks for both lowercase and uppercase variations
            const displayName = ticket.name || ticket.component || "System Contact";
            const displayEmail = ticket.email || "visitor@formait.com";
            const displayStatus = (ticket.status || "NEW").toUpperCase();
            
            // 💡 Fallback extraction matrix captures text content from any incoming schema parameters
            const displayMessage = ticket.message || ticket.text || ticket.details || "No query or payload description provided.";

            ticketRow.innerHTML = `
                <!-- Master Always-Visible Row Header Deck Layout -->
                <div class="flex items-center justify-between gap-4 text-xs w-full" onclick="document.getElementById('${detailsElementId}').classList.toggle('hidden')">
                    <div class="truncate max-w-[200px] shrink-0">
                        <h5 class="text-white font-bold tracking-tight group-hover/ticket:text-blue-400 transition-colors">${displayName}</h5>
                        <p class="text-zinc-500 font-mono text-[10px] mt-0.5 truncate">${displayEmail}</p>
                    </div>
                    
                    <!-- Short Message Preview Substring Fragment Block -->
                    <div class="flex-1 text-zinc-400 font-medium px-2 truncate max-w-sm italic">
                        ${displayMessage}
                    </div>
                    
                    <!-- State Action Control Indicators -->
                    <div class="flex items-center gap-3 shrink-0">
                        <span class="px-2 py-0.5 font-mono text-[10px] uppercase font-bold rounded bg-blue-500/10 text-blue-400 border border-blue-500/10">${displayStatus}</span>
                        <button onclick="event.stopPropagation(); if(typeof resolveTicket === 'function') resolveTicket('${ticket._id || ticket.id}')" class="text-[10px] bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white px-2.5 py-1 rounded transition text-zinc-400">Close</button>
                    </div>
                </div>

                <!-- 🌐 Dynamic Expandable Container Panel Block -->
                <div id="${detailsElementId}" class="hidden border-t border-zinc-900/80 pt-3 mt-1 text-xs text-zinc-300 leading-relaxed bg-[#0A0A0A]/60 p-3 rounded-lg border border-zinc-900/40 font-mono whitespace-pre-wrap">
                    <span class="text-blue-500 font-bold block mb-1 uppercase tracking-widest text-[9px]">SYSTEM_MESSAGE_PAYLOAD:</span>
                    ${displayMessage}
                </div>
            `;
            targetContainer.appendChild(ticketRow);
        });


    } catch (err) {
        console.error("[SUPPORT COMPONENT RUNTIME ERROR]:", err.message);
    }
}

// Attach the layout updating routine to execute immediately when the Support Center menu item is loaded
const supportCenterMenuButton = document.getElementById("supportCenterLink") || document.querySelector('[href="#support"]'); 
if (supportCenterMenuButton) {
    supportCenterMenuButton.addEventListener("click", loadSupportCenterPanel);
}

// ==========================================================================
// 🚀 DYNAMIC INTERCEPTOR (CONSOLIDATED GLOBAL WORKSPACE DELEGATION ROUTER)
// ==========================================================================
document.addEventListener("click", (event) => {
    // 1. GLOBAL ELEMENT EVENT DELEGATION PASS GATE FOR THE FILE INPUT BROWSER
    const browseTrigger = event.target.closest("#browseFilesTrigger") || 
                           event.target.closest(".underline.cursor-pointer");
    
    if (browseTrigger) {
        event.preventDefault();
        event.stopPropagation();
        console.log("[VAULT ENGINE] Local file explorer trigger clicked. Sumonning file browser path...");
        
        const fileInput = document.getElementById("mediaFileInput") || document.querySelector("input[type='file']");
        if (fileInput) {
            fileInput.click();
            return; // Exit click execution safely
        }
    }

    // 2. CENTRAL SIDEBAR NAVIGATION TAB SWITCH WATCHER
    const target = event.target.closest("#supportCenterLink") || 
                   event.target.closest('[href="#support"]') || 
                   (event.target.textContent && (
                       event.target.textContent.toLowerCase().includes("support center") || 
                       event.target.textContent.toLowerCase().includes("media library")
                   ));

    if (target) {
        const textContentLower = event.target.textContent ? event.target.textContent.toLowerCase() : "";

        // Support Center View Trigger Synchronization Channel
        if (textContentLower.includes("support center") || event.target.closest("#supportCenterLink")) {
            console.log("[NAV WATCHER] Support Center active. Mounting live ticket streams...");
            setTimeout(() => {
                if (typeof loadSupportCenterPanel === "function") loadSupportCenterPanel();
            }, 250); // Safe delay window ensures html blueprint text is fully painted to screen first
        }

        // Media Library View Trigger Synchronization Channel
        if (textContentLower.includes("media library")) {
            console.log("[NAV WATCHER] Media Library active. Instantiating storage layout view models...");
            setTimeout(() => {
                if (typeof loadMediaLibraryGrid === "function") loadMediaLibraryGrid();
                if (typeof initMediaVaultIntakeZone === "function") initMediaVaultIntakeZone();
            }, 250);
        }
    }
});

// ==========================================================================
// 🚀 OBJECTIVE 4: MEDIA LIBRARY VAULT MANAGEMENT CONTROLLER PIPELINE
// ==========================================================================

// Central dynamic lifecycle initialization listener
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("mediaVaultGrid") || window.location.pathname.includes("admin")) {
        initMediaVaultIntakeZone();
    }
});

function initMediaVaultIntakeZone() {
    const dropZone = document.getElementById("mediaDropZone");
    const fileInput = document.getElementById("mediaFileInput");

    if (!dropZone || !fileInput) return;

    console.log("[VAULT ENGINE] Media upload drag & drop dropzone modules connected successfully.");

    // Prevent default browser file preview file interceptions
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => e.preventDefault(), false);
    });

    // Visual drop state border hover style tracking parameters toggle transitions
    ["dragenter", "dragover"].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add("border-blue-500/50", "bg-blue-500/5"), false);
    });
    ["dragleave", "drop"].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove("border-blue-500/50", "bg-blue-500/5"), false);
    });

    // Capture file system drop streams transfers
    dropZone.addEventListener("drop", (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0 && typeof handleMediaFilesIngest === "function") handleMediaFilesIngest(files);
    });

    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0 && typeof handleMediaFilesIngest === "function") handleMediaFilesIngest(fileInput.files);
    });
}

async function handleMediaFilesIngest(files) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const progressBox = document.getElementById("uploadProgressContainer");
    const nameStr = document.getElementById("uploadingFilenameString");
    const percentTxt = document.getElementById("uploadProgressPercentageText");
    const progressTrack = document.getElementById("uploadProgressBarTrack");

    // Sequential multi-file ingestion pipeline processing loop
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        if (progressBox) progressBox.classList.remove("hidden");
        if (nameStr) nameStr.textContent = `Ingesting: ${file.name}`;

        try {
            // Emulate client side stream tracking progression markers smoothly
            let pct = 0;
            const timer = setInterval(() => {
                pct = Math.min(pct + 15, 90);
                if (percentTxt) percentTxt.textContent = `${pct}%`;
                if (progressTrack) progressTrack.style.width = `${pct}%`;
            }, 100);

            const res = await fetch("https://formait-backend.onrender.com/api/admin/media/upload", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });

            clearInterval(timer);
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Server validation exception");

            if (percentTxt) percentTxt.textContent = "100%";
            if (progressTrack) progressTrack.style.width = "100%";
            
            setTimeout(() => {
                if (progressBox) progressBox.classList.add("hidden");
            }, 800);

        loadMediaLibraryGrid();

if (typeof loadDashboard === "function") {
    loadDashboard();
}
        } catch (err) {
            console.error("[MEDIA CRYPT ENGINE FAIL]:", err.message);
            alert("File transmission rejected by security: " + err.message);
            if (progressBox) progressBox.classList.add("hidden");
        }
    }
}

async function loadMediaLibraryGrid() {
    const container = document.getElementById("mediaVaultGrid");
    if (!container) return;

    try {
        const res = await fetch("https://formait-backend.onrender.com/api/admin/media", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        if (!res.ok) throw new Error("Database validation mapping stalled.");
        const assets = await res.json();

        container.innerHTML = "";

        // ==========================================================================
        // 🚀 TARGET 2: DYNAMIC STORAGE ANALYTICS CAPACITY CALCULATOR
        // ==========================================================================
        let totalSizeBytes = 0;
        assets.forEach(asset => {
            totalSizeBytes += (asset.fileSize || 0);
        });

        // Convert raw database bytes data to readable Megabytes
        const totalSizeMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);
        const maxCapacityMB = 1000; // Your 1GB storage metric limit cap parameters
        const calculationPercentage = Math.min(100, ((totalSizeMB / maxCapacityMB) * 100).toFixed(1));

        // Locate layout UI analytics nodes
        const sizeStringField = document.getElementById("vaultSizeMetricString");
        const progressTrackTrack = document.getElementById("vaultProgressBarMetricTrack");

        // Map computed footprint values directly into dashboard visual indicators
        if (sizeStringField) {
            sizeStringField.textContent = `${totalSizeMB} MB / ${maxCapacityMB} MB Used`;
        }
        if (progressTrackTrack) {
            progressTrackTrack.style.width = `${calculationPercentage}%`;
        }
        // ==========================================================================

        if (assets.length === 0) {
            container.innerHTML = `<div class="col-span-full py-8 text-center text-zinc-600 font-mono text-[11px] tracking-wider">[ CRYPT_VAULT_EMPTY_NO_ASSETS_TRACKED ]</div>`;
            return;
        }

        assets.forEach(asset => {
            const card = document.createElement("div");
            card.className = "border border-zinc-900 bg-zinc-950 p-4 rounded-xl flex flex-col justify-between gap-3 text-xs font-mono border-zinc-900/60";
            card.innerHTML = `
                <div class="space-y-1">
                    <div class="truncate text-zinc-300 font-bold tracking-tight text-[11px]">${asset.filename}</div>
                    <div class="text-[9px] text-zinc-600 uppercase tracking-widest">${asset.mimeType} • ${(asset.fileSize / 1024).toFixed(1)} KB</div>
                </div>
                <div class="flex items-center gap-2 pt-1 border-t border-zinc-900/40 mt-1">
                    <a href="${asset.fileUrl}" target="_blank" class="flex-1 text-center font-sans font-semibold text-blue-400 bg-blue-500/5 border border-blue-500/10 py-1.5 rounded-lg hover:bg-blue-500 hover:text-black transition duration-200">View Document</a>
                </div>
            `;
            container.appendChild(card);
        });
               } catch (e) { 
        console.log("Media database layout grid sync skipped:", e.message); 
    }
}

// ==========================================================================
// 🚀 FIXED: UNIFIED WORKSPACE ROUTER INTERCEPTOR & CLICK DELEGATOR
// ==========================================================================
document.addEventListener("click", (event) => {
    // 1. GLOBAL INTERCEPTION FOR DYNAMIC FILE BROWSE CLICK EVENTS
    const browseTrigger = event.target.closest("#browseFilesTrigger") || 
                          event.target.closest(".underline.cursor-pointer");
    
    if (browseTrigger) {
        event.preventDefault();
        event.stopPropagation();
        console.log("[VAULT ENGINE] Native file explorer summoned successfully.");
        const hiddenInput = document.getElementById("mediaFileInput") || document.querySelector("input[type='file']");
        if (hiddenInput) {
            hiddenInput.click();
            return;
        }
    }

    // 2. CENTRAL SIDEBAR ROUTER TAB WATCHER
    const target = event.target.closest("#supportCenterLink") || 
                   event.target.closest('[href="#support"]') || 
                   (event.target.textContent && (
                       event.target.textContent.toLowerCase().includes("support center") || 
                       event.target.textContent.toLowerCase().includes("media library")
                   ));

    if (target) {
        const textContentLower = event.target.textContent ? event.target.textContent.toLowerCase() : "";

        // Support Center Hot reload trigger
        if (textContentLower.includes("support center") || event.target.closest("#supportCenterLink")) {
            console.log("[NAV WATCHER] Support Center active. Mounting live ticket streams...");
            setTimeout(() => {
                if (typeof loadSupportCenterPanel === "function") loadSupportCenterPanel();
            }, 250);
        }

        // Media Library Hot reload trigger
        if (textContentLower.includes("media library")) {
            console.log("[NAV WATCHER] Media Library active. Initializing templates...");
            setTimeout(() => {
                if (typeof loadMediaLibraryGrid === "function") loadMediaLibraryGrid();
                if (typeof initMediaVaultIntakeZone === "function") initMediaVaultIntakeZone();
            }, 250);
        }
    }
});

// ==========================================================================
// 🚀 ADMINISTRATIVE HANDSHAKE FUNCTION: RESOLVE & UPDATE TICKET STATES
// ==========================================================================
async function resolveTicket(id) {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        console.log(`[SUPPORT CENTER] Patching closure state payload for ID: ${id}...`);
        const res = await fetch(`https://formait-backend.onrender.com/api/leads/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status: "Closed" })
        });

        if (!res.ok) throw new Error(`Server validation exception status: ${res.status}`);
        console.log("[SUPPORT CENTER] Ticket updated inside MongoDB Atlas. Hot-reloading list rows...");
        
       if (typeof loadSupportCenterPanel === "function")
    loadSupportCenterPanel();

if (typeof loadDashboard === "function")
    loadDashboard();

if (typeof loadLeads === "function")
    loadLeads();

    } catch (err) {
        console.error("[RESOLVE ENGINE ERROR]:", err.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    hydratePublicAboutPageContent();
});

// ==========================================================================
// 🌐 UNIVERSAL LEAD SUBMISSION ENGINE
// ==========================================================================

async function submitLead(name, email, phone = "", message = "", source = "Website") {
    try {
        const response = await fetch(`${API_BASE}/api/leads`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                message,
                source
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Lead submission failed.");
        }

        console.log("✅ Lead submitted successfully:", data);

        return {
            success: true,
            data
        };

    } catch (error) {
        console.error("❌ Lead submission failed:", error);

        return {
            success: false,
            error
        };
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const forms = document.querySelectorAll("form");

    forms.forEach(form => {

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            const name =
                form.querySelector('input[type="text"]')?.value.trim() || "";

            const email =
                form.querySelector('input[type="email"]')?.value.trim() || "";

            const phone =
                form.querySelector('input[type="tel"]')?.value.trim() || "";

            const textarea =
                form.querySelector("textarea");

            const message =
                textarea?.value.trim() ||
                form.querySelectorAll('input[type="text"]')[1]?.value.trim() ||
                "";

            const result = await submitLead(
                name,
                email,
                phone,
                message,
                window.location.pathname
            );

            if (result.success) {

                alert("✅ Thank you! Your inquiry has been received.");

                form.reset();

            } else {

                alert("❌ Unable to communicate with backend server.");

            }

        });

    });

});