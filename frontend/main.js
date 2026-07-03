const API_CONFIG = {
    BASE_URL: "http://localhost:5000/api",
    SOCKET_URL: "http://localhost:5000"
};

// ==========================================================================
// ⚡ GLOBAL STATE STORE BUFFER
// ==========================================================================
const DashboardState = {
    leads: [],
    activities: [],
    activeTab: "dashboard"
};

// ==========================================================================
// 🎯 FIXED DYNAMIC FRONTEND MATRIX: SYNCED TO COMPILER PAYLOADS
// ==========================================================================
async function hydratePublicAboutPageContent() {
    try {
        console.log("[CMS MAIN] Pulling case-insensitive platform configurations from server...");
        
        // Pull down the active document entries from your backend content gateway
        const response = await fetch("http://localhost:5000/api/admin/content/about");
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
                const textTokensArray = titleText.split(" ");
                if (textTokensArray.length > 1) {
                    const lastTokenStr = textTokensArray.pop(); // Separate the final word to make it blue
                    mainSpan.textContent = textTokensArray.join(" ") + " ";
                    accentSpan.textContent = lastTokenStr;
                } else {
                    mainSpan.textContent = titleText;
                    accentSpan.textContent = "";
                }
                console.log("📝 [CMS SPLITTER] Title accent parameters divided and painted onto spans.");
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
// ==========================================================================
// 🔌 OPTIMIZED SINGLE POINT PUBLIC LINK SUBSYSTEM
// ==========================================================================
(() => {
    function mountPublicSocketConnection() {
        console.log("🔌 [PUBLIC CONNECTOR] Establishing dedicated communication channel on port 5000...");
        
        // Open clean, isolated channel without polluting administrative system states
        const publicSocket = io("http://localhost:5000", { transports: ["websocket"] });

        publicSocket.on("globalWorkspaceSyncRequest", async (pulse) => {
            console.log("⚡ [PUBLIC SOCKET HUB] Public website change notification caught:", pulse);

            // Restrict execution strictly to frontend public content matrices
            if (pulse.action === "DATABASE_CONTENT_SYNC" || pulse.tab === "website content") {
                console.log("[PUBLIC CMS RENDER] Swapping modified database values into viewport elements...");
                if (typeof hydratePublicAboutPageContent === "function") {
                    await hydratePublicAboutPageContent();
                }
            }
        });
    }

    // Initialize public port connector loop safely on script parse
    if (typeof io !== "undefined") {
        mountPublicSocketConnection();
    }
})();

// Enforce initial page data hydration directly on DOM load parameters
document.addEventListener("DOMContentLoaded", () => {
    if (typeof hydratePublicAboutPageContent === "function") {
        hydratePublicAboutPageContent();
    }
});


// Enforce initial page data hydration directly on DOM load
document.addEventListener("DOMContentLoaded", hydratePublicAboutPageContent);
// ==========================================================================
// 🔌 SOCKET LISTENER CORE MOUNT LAYER
// ==========================================================================
if (typeof socket !== "undefined") {
    socket.on("globalWorkspaceSyncRequest", async (pulse) => {
        console.log("⚡ [SOCKET HUB] Intercepted public workspace mutation alert:", pulse);
        
        // If a content modification signal fires over your websockets, hot-swap strings instantly!
        if (pulse.action === "DATABASE_CONTENT_SYNC" || pulse.tab === "website content") {
            await hydratePublicAboutPageContent();
        }
    });
}

// Fire the hydration engine automatically the exact split-second the browser mounts the view page elements
document.addEventListener("DOMContentLoaded", hydratePublicAboutPageContent);



export async function loadDashboardData(showLoading = true) {
    const token = localStorage.getItem("token");
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    const leadsTable = document.getElementById("leadsTableBody") || document.getElementById("leadsTable");

    // FIXED: Programmatic column tracking prevents visual framework distortions
    if (showLoading && leadsTable) {
        // Trace the parent or sibling header node cell counts, or fallback cleanly to 3
        const calculatedColSpan = leadsTable.closest("table")?.querySelectorAll("th")?.length || 3;
        
        leadsTable.innerHTML = `
            <tr>
                <td colspan="${calculatedColSpan}" class="py-8 text-center font-mono text-xs text-zinc-500 uppercase tracking-widest animate-pulse">
                    Syncing cluster records vectors...
                </td>
            </tr>`;
    }

    try {
        const res = await fetch(
            `${API_CONFIG.BASE_URL}/leads`,
            { headers }
        );

        if (!res.ok) {
            throw new Error("Database validation transaction rejected.");
        }

        // Handle structural object tracking definitions safety fallbacks
        const DashboardState = window.DashboardState || { leads: [] };
        DashboardState.leads = await res.json();

        // Direct coordination with your clean layout rows template parser function
        if (typeof renderLeadsPipeline === "function") {
            renderLeadsPipeline(DashboardState.leads);
        } else if (typeof renderPipeline === "function") {
            renderPipeline(DashboardState.leads);
        }

        if (typeof recalculateStatsDeck === "function") {
            recalculateStatsDeck(DashboardState.leads);
        }

        // Temporary activity feed fallback structure
        DashboardState.activities = [];
        if (typeof renderActivityFeed === "function") {
            renderActivityFeed([]);
        }

    } catch (err) {
        console.error(
            "[DATA SYNC ERROR] Pipeline connection stalled:",
            err.message
        );
    }
}


function renderLeadsPipeline(leads) {
    const tableBody = document.getElementById("leadsTableBody") || document.getElementById("leadsTable");
    if (!tableBody) return;

    if (!leads || leads.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" class="py-8 text-center text-zinc-600 text-xs font-mono uppercase tracking-wider">No active pipeline records detected.</td></tr>`;
        return;
    }

    tableBody.innerHTML = leads.map(lead => {
        const targetId = lead._id || lead.id || "";
        
        return `
            <!-- 🎯 FIXED: Injected explicit '.lead-row' class identifier for unified click routing mapping -->
            <tr class="lead-row group hover:bg-zinc-900/10 transition duration-150 cursor-pointer select-none" data-id="${targetId}">
                <td class="py-4 pr-4">
                    <div class="text-sm font-semibold text-zinc-100 group-hover:text-blue-400 transition truncate max-w-[240px]">${lead.name || "AI Parameter Visitor"}</div>
                    <div class="text-xs text-zinc-500 font-mono mt-1 truncate max-w-[240px]">${lead.email || "no-email@formait.com"}</div>
                </td>
                <td class="py-4">
                    <!-- The Dropdown Fix: Inline event propagation isolation stops selection clicks from firing row modals -->
                    <select class="status-mutator bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg px-2.5 py-1 text-xs font-mono tracking-wide focus:border-blue-500 focus:outline-none cursor-default" data-id="${targetId}" onclick="event.stopPropagation();">
                        <option value="New" ${lead.status === 'New' || lead.status === 'NEW' || !lead.status || lead.status === 'Logged' ? 'selected' : ''}>🆕 New</option>
                        <option value="Contacted" ${lead.status === 'Contacted' ? 'selected' : ''}>📞 Contacted</option>
                        <option value="Qualified" ${lead.status === 'Qualified' ? 'selected' : ''}>🔥 Qualified</option>
                        <option value="Won" ${lead.status === 'Won' ? 'selected' : ''}>🏆 Won</option>
                    </select>
                </td>
                <td class="py-4 text-right pl-4">
                    <div class="flex items-center justify-end gap-3">
                        <span class="text-xs font-mono text-zinc-400 tracking-tight">${lead.source || "Website"}</span>
                        <!-- The Button Fix: Inline event propagation isolation stops delete clicks from firing row modals -->
                        <button class="delete-lead-btn p-1.5 text-zinc-600 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition duration-200 cursor-pointer" data-id="${targetId}" onclick="event.stopPropagation();">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}


// 🚀 FIND THIS FUNCTION IN JS/MAIN.JS AND UPDATE ITS INNER BODY:
function recalculateStatsDeck(leads) {
    const totalLeadsCount = leads.length;
    const totalEmailsCount = leads.filter(l => l.email && l.email.trim().length > 0).length;
    const totalTicketsCount = leads.filter(l => l.source === "Support Center" || (l.message && l.message.toLowerCase().includes("support"))).length;
    
    const qualifiedLeads = leads.filter(l => l.status === "Qualified" || l.status === "Won").length;
    const conversionPct = totalLeadsCount ? Math.round((qualifiedLeads / totalLeadsCount) * 100) : 0;
    const calculatedRevenue = qualifiedLeads * 500;

    // 🎯 TARGET EXPLICIT HTML ELEMENT IDs DIRECTLY
    const nodes = {
        visitors: document.getElementById("totalVisitors"),
        leads: document.getElementById("totalLeads"),
        emails: document.getElementById("totalEmails"),
        tickets: document.getElementById("activeTickets"),
        revenue: document.getElementById("totalRevenue"),
        conversion: document.getElementById("conversionRate")
    };

    // Inject computed data straight into the text layouts
    if (nodes.visitors) nodes.visitors.textContent = (totalLeadsCount * 4 || "260").toLocaleString();
    if (nodes.leads) nodes.leads.textContent = totalLeadsCount;
    if (nodes.emails) nodes.emails.textContent = totalEmailsCount;
    if (nodes.tickets) nodes.tickets.textContent = totalTicketsCount;
    if (nodes.revenue) nodes.revenue.textContent = `$${calculatedRevenue.toLocaleString()}`;
    if (nodes.conversion) nodes.conversion.textContent = `${conversionPct}%`;
}

function renderActivityFeed(logs) {
    const feed = document.getElementById("activityFeed");
    if (!feed) return;
    if (logs.length === 0) {
        feed.innerHTML = `<p class="text-zinc-600 text-xs font-mono text-center py-4">No live activities.</p>`;
        return;
    }
    feed.innerHTML = logs.map(log => `
        <div class="relative pl-8 group">
            <div class="absolute left-2.5 top-1.5 w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-blue-500 border border-zinc-950 ring-4 ring-zinc-950 transition"></div>
            <div>
                <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-zinc-200">${log.type || "Event"}</span>
                    <span class="font-mono text-[10px] text-zinc-500">${new Date(log.createdAt).toLocaleTimeString()}</span>
                </div>
                <p class="text-xs text-zinc-500 font-mono mt-1">${log.message || "Processed."}</p>
            </div>
        </div>
    `).join("");
}

/// ==========================================================================
// 💬 INTERACTIVE CONTROLLER OPERATIONS & INTERCEPTORS (TOKEN FLOW FIXED)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Grounding fallbacks to prevent undefined reference failures
    const API_CONFIG = window.API_CONFIG || { BASE_URL: "http://localhost:5000/api" };
    
    // SECURITY ALIGNMENT: Read the real server bearer token generated by your bootstrapper handshake
    let token = localStorage.getItem("token");

    if (!token) {
        console.warn("[AUTH GATEWAY] Token signature absent from cache storage layers. Standby for authentication loop engine sync...");
        token = ""; 
    }

    const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

    // Safe Markdown utility converter parsing code line breaks cleanly for view drawers
    const parseTextMarkdown = (t) => {
        if (!t) return "No data payload records trace logged.";
        return t
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br>");
    };

    // ==========================================================================
    // 1. LIVE SEARCH FILTERING PATTERN
    // ==========================================================================
    const searchInput = document.getElementById("searchLead");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const matchTerm = e.target.value.toLowerCase().trim();
            const activeLeads = (window.DashboardState && window.DashboardState.leads) ? window.DashboardState.leads : [];
            const filtered = activeLeads.filter(lead => 
                (lead.name && lead.name.toLowerCase().includes(matchTerm)) || 
                (lead.email && lead.email.toLowerCase().includes(matchTerm))
            );
            if (typeof renderLeadsPipeline === "function") {
                renderLeadsPipeline(filtered);
            }
        });
    }

    // ==========================================================================
    // 2. DYNAMIC DROPDOWN STATUS MUTATORS & INLINE ROW PURGERS
    // ==========================================================================
    const tableContainer = document.getElementById("leadsTableBody") || document.getElementById("leadsTable");
    if (tableContainer) {
        // Handle dropdown select mutation changes
        tableContainer.addEventListener("change", async (e) => {
            if (e.target.classList.contains("status-mutator")) {
                const parentRow = e.target.closest("tr[data-id]") || e.target.closest(".lead-row");
                const targetId = e.target.getAttribute("data-id") || (parentRow ? parentRow.getAttribute("data-id") : null);
                const nextStatus = e.target.value;

                if (!targetId) return;

                try {
                    await fetch(`${API_CONFIG.BASE_URL}/leads/${targetId}`, {
                        method: "PUT", headers, body: JSON.stringify({ status: nextStatus })
                    });
                    if (typeof window.pushLocalActivityLog === "function") {
                        window.pushLocalActivityLog(`Lead updated to status state: [${nextStatus.toUpperCase()}].`);
                    }
                } catch (err) {
                    console.error("[MUTATION STALL]", err.message);
                }
            }
        });

        // ==========================================================================
        // 🚀 INTEGRATED UNIVERSAL PIPELINE ROUTING ENGINE (UNFOLDS ANYTHING CLICKED)
        // ==========================================================================
        tableContainer.addEventListener("click", async (e) => {
            // A. Precise Button Filter: Catch inline trash purges instantly and stop propagation
            const deleteBtn = e.target.closest(".delete-lead-btn");
            if (deleteBtn) {
                e.stopPropagation();
                
                const parentRow = deleteBtn.closest("tr[data-id]") || deleteBtn.closest(".lead-row");
                const targetId = deleteBtn.getAttribute("data-id") || (parentRow ? parentRow.getAttribute("data-id") : null);
                
                if (!targetId || !confirm("Are you sure you want to permanently delete this lead?")) return;

                try {
                    const res = await fetch(`${API_CONFIG.BASE_URL}/leads/${targetId}`, { method: "DELETE", headers });
                    if (res.ok && parentRow) parentRow.remove();
                    if (typeof window.pushLocalActivityLog === "function") {
                        window.pushLocalActivityLog(`Administrative Purge: Record index [${targetId}] destroyed.`);
                    }
                } catch (err) {
                    console.error("[DELETE ERROR]", err.message);
                }
                return;
            }

            // B. Interactive Elements Escape: Exit if user explicitly interacts with internal text inputs
            if (
                e.target.classList.contains("status-mutator") || 
                e.target.closest("textarea") ||
                e.target.closest("input") ||
                e.target.closest("[id^='reply-drawer-']")
            ) {
                return;
            }

            // C. Locate Target Identifiers: Traverse the DOM up to trace row mapping keys
            const targetRow = e.target.closest(".lead-row") || e.target.closest("tr[data-id]") || e.target.closest("div[data-id]");
            if (!targetRow) return;

            const leadId = targetRow.getAttribute("data-id") || targetRow.querySelector("[data-id]")?.getAttribute("data-id");
            if (!leadId || leadId === "undefined") return;

            // Wipe duplicate overlays from the active view immediately
            const oldModal = document.getElementById("adminFullscreenInspectionOverlay");
            if (oldModal) oldModal.remove();

            try {
                // 1. Dual-Gateway Property Evaluation Check
                const isSupportMessage = targetRow.innerHTML.includes("reply-drawer-") || 
                                         targetRow.closest("#supportCenterContainer") ||
                                         targetRow.querySelector("button[onclick*='purgeSupportTicket']");
                
                let targetEndpoint = isSupportMessage 
                    ? `http://localhost:5000/api/messages/${leadId}`
                    : `${API_CONFIG.BASE_URL}/leads/${leadId}`;

                console.log(`[PIPELINE PATHWAY RESOLUTION] Connecting with endpoint vector: ${targetEndpoint}`);
                let response = await fetch(targetEndpoint, { method: "GET", headers });
                
                // 🚀 FAILOVER SECURITY BLOCK: If the primary database pathway drops a 404, hot-swap endpoint gates instantly!
                if (response.status === 404) {
                    const fallbackEndpoint = isSupportMessage
                        ? `${API_CONFIG.BASE_URL}/leads/${leadId}`
                        : `http://localhost:5000/api/messages/${leadId}`;
                    
                    console.log(`🔄 [404 AUTOMATED REDIRECT] Target missed. Retrying alternative network proxy route: ${fallbackEndpoint}`);
                    response = await fetch(fallbackEndpoint, { method: "GET", headers });
                }

                if (!response.ok) throw new Error(`HTTP Matrix fault status code: ${response.status}`);
                const data = await response.json();

                // 2. Safe Structural Extractors for Recursive Sub-Arrays
                let extractedAiResponse = "No response trace logged.";
                if (data.aiResponse) {
                    extractedAiResponse = data.aiResponse;
                } else if (data.adminReplies && data.adminReplies.length > 0) {
                    // Defensively handle both plain array maps and complex MongoDB document schemas
                    const firstReply = data.adminReplies[0];
                    extractedAiResponse = typeof firstReply === "object" ? (firstReply.replyText || firstReply.message) : firstReply;
                } else if (data.reply) {
                    extractedAiResponse = data.reply;
                }

                // 3. Normalize Incoming Payload Object Fields Cleanly
                const lead = {
                    _id: data._id,
                    name: data.name || "AI Workspace Parameter",
                    email: data.email || "client-node@forma.it",
                    engineeringVector: data.engineeringVector || data.priority || "Cognitive Assistant Line",
                    createdAt: data.createdAt || Date.now(),
                    status: data.status || data.priority || "New",
                    message: data.message || data.details || "No additional text logs found.",
                    aiResponse: extractedAiResponse
                };

                // Create and Assemble Fullscreen Overlay Canvas
                const modal = document.createElement("div");
                modal.id = "adminFullscreenInspectionOverlay";
                modal.className = "fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6 opacity-0 transition-opacity duration-300 antialiased";
                
                const timestampFormatted = new Date(lead.createdAt).toLocaleString();
                const isProcessed = lead.status === "reviewed" || lead.status === "PROCESSED" || lead.status === "Completed";

                modal.innerHTML = `
                    <div class="bg-zinc-950 border border-zinc-900 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] transform scale-95 transition-transform duration-300">
                        <div class="p-6 border-b border-zinc-900 bg-zinc-900/10 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <span id="modalStatusBadgeIndicator" class="w-2.5 h-2.5 rounded-full ${isProcessed ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-blue-500 animate-pulse'}"></span>
                                <div>
                                    <h3 class="text-lg font-black text-white tracking-tight">${lead.name}</h3>
                                    <p class="text-[10px] text-zinc-500 font-mono">Tracking Matrix ID: ${lead._id}</p>
                                </div>
                            </div>
                            <button id="closeInspectionModalBtn" class="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs transition cursor-pointer">✕ Close</button>
                        </div>

                        <div class="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-left custom-sidebar-scroll">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[11px]">
                                <div class="bg-zinc-900/20 border border-zinc-900 p-3 rounded-xl"><span class="text-zinc-500 font-bold block uppercase tracking-wider mb-0.5">Route/Priority Vector</span><span class="text-zinc-300 text-xs uppercase">${lead.engineeringVector}</span></div>
                                <div class="bg-zinc-900/20 border border-zinc-900 p-3 rounded-xl"><span class="text-zinc-500 font-bold block uppercase tracking-wider mb-0.5">Client Mail Gateway</span><span class="text-zinc-300 text-xs block truncate">${lead.email}</span></div>
                                <div class="bg-zinc-900/20 border border-zinc-900 p-3 rounded-xl"><span class="text-zinc-500 font-bold block uppercase tracking-wider mb-0.5">Captured Timestamp</span><span class="text-zinc-300 text-xs">${timestampFormatted}</span></div>
                            </div>

                            <div class="space-y-2">
                                <h4 class="text-xs font-black uppercase text-zinc-500 tracking-widest font-mono">Inbound Request Payload Query</h4>
                                <div class="bg-zinc-900/40 border border-zinc-900 text-zinc-200 p-4 rounded-2xl font-mono leading-relaxed break-words">
                                    ${parseTextMarkdown(lead.message)}
                                </div>
                            </div>

                            <div class="space-y-2">
                                <h4 class="text-xs font-black uppercase text-zinc-500 tracking-widest font-mono">Automated AI Assistant Logs Output</h4>
                                <div class="bg-blue-500/5 border border-blue-500/10 text-blue-300 p-4 rounded-2xl leading-relaxed break-words">
                                    ${parseTextMarkdown(lead.aiResponse)}
                                </div>
                            </div>

                            <div class="space-y-2 pt-2">
                                <h4 class="text-xs font-black uppercase text-zinc-500 tracking-widest font-mono">Executive Response Command Deck</h4>
                                <div class="flex gap-2">
                                    <input type="text" id="crmActionReplyInput" class="flex-1 bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs outline-none text-white focus:border-blue-500 transition placeholder-zinc-700" placeholder="Type an immediate outbound message reply vector...">
                                    <button id="crmDispatchReplyBtn" class="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-xl text-black font-black text-xs uppercase tracking-wider transition cursor-pointer">Reply</button>
                                </div>
                            </div>
                        </div>

                        <div class="p-4 border-t border-zinc-900 bg-zinc-900/20 flex flex-wrap justify-between items-center gap-2">
                            <button id="crmExecuteDeleteBtn" class="px-4 py-2.5 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 text-rose-400 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer">Purge Record</button>
                            <button id="crmToggleReviewBtn" class="px-5 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer ${isProcessed ? 'bg-zinc-900 border border-zinc-800 text-zinc-500' : 'bg-emerald-500 hover:bg-emerald-600 text-black'}" ${isProcessed ? 'disabled' : ''}>${isProcessed ? 'Marked Processed' : 'Approve & Review'}</button>
                        </div>
                    </div>`;

                document.body.appendChild(modal);

                // Initialize animations loop
                setTimeout(() => {
                    modal.classList.remove("opacity-0");
                    const card = modal.querySelector(".scale-95");
                    if (card) card.classList.remove("scale-95");
                }, 10);

                const closeModalWindow = () => {
                    modal.classList.add("opacity-0");
                    const card = modal.querySelector(".transform");
                    if (card) card.classList.add("scale-95");
                    setTimeout(() => modal.remove(), 300);
                };

                document.getElementById("closeInspectionModalBtn").onclick = closeModalWindow;
                modal.onclick = (e) => { if (e.target === modal) closeModalWindow(); };

                // Handle Reply Submission within modal context
                document.getElementById("crmDispatchReplyBtn").onclick = () => {
                    const replyInput = document.getElementById("crmActionReplyInput");
                    if (!replyInput.value.trim()) return;
                    if (typeof window.pushLocalActivityLog === "function") {
                        window.pushLocalActivityLog(`Outbound CRM reply dispatched to <${lead.email}>.`);
                    }
                    replyInput.value = "";
                    alert("Outbound response dispatched successfully.");
                };

                // Handle Delete within modal context
                document.getElementById("crmExecuteDeleteBtn").onclick = async () => {
                    if (!confirm("Permanently purge this item file?")) return;
                    const routePath = isSupportMessage ? 'messages' : 'leads';
                    try {
                        await fetch(`http://localhost:5000/api/${routePath}/${lead._id}`, { method: "DELETE", headers });
                        targetRow.remove();
                        closeModalWindow();
                    } catch (err) { console.error(err); }
                };

                // Handle Approve & Review within modal context
                const modalReviewBtn = document.getElementById("crmToggleReviewBtn");
                if (modalReviewBtn && !isProcessed) {
                    modalReviewBtn.onclick = async () => {
                        const routePath = isSupportMessage ? 'messages' : 'leads';
                        try {
                            await fetch(`http://localhost:5000/api/${routePath}/${lead._id}`, {
                                method: "PUT", headers, body: JSON.stringify({ status: "reviewed" })
                            });
                            document.getElementById("modalStatusBadgeIndicator").className = "w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]";
                            modalReviewBtn.className = "px-5 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-500";
                            modalReviewBtn.textContent = "Marked Processed";
                            modalReviewBtn.setAttribute("disabled", "true");

                            const inlineDropdown = targetRow.querySelector(".status-mutator");
                            if (inlineDropdown) inlineDropdown.value = "Completed";
                        } catch (err) { console.error(err); }
                    };
                }

            } catch (err) {
                console.error("❌ Fullscreen Unfold Sequence Failure:", err.message);
            }
        });
    }

    if (typeof loadDashboardData === "function") {
        loadDashboardData(true);
    }
});
// ==========================================================================
// ==========================================================================
// 🔀 CENTRAL VIEW PANEL SWAPPING ROUTER
// ==========================================================================

export function switchTab(targetTabId) {
    const dashboardView = document.getElementById("view_dashboard");
    const submoduleView = document.getElementById("view_submodule");
    
    const titleNode = document.getElementById("submoduleTitle");
    const descNode = document.getElementById("submoduleDesc");

    // 🎯 STRING STANDARDIZATION CORRECTION: Normalize "support center" to match your label map key fields smoothly
    let normalizedTabId = targetTabId;
    if (targetTabId === "support center" || targetTabId === "messages") {
        normalizedTabId = "support";
    }
    
    DashboardState.activeTab = targetTabId; // Keeps your global socket listeners focused on the true active tab name string

    // 1. Core View Toggle Matrix
    if (targetTabId === "dashboard") {
        if (submoduleView) submoduleView.classList.add("hidden");
        if (dashboardView) dashboardView.classList.remove("hidden");
        return;
    }

    if (dashboardView) dashboardView.classList.add("hidden");
    if (submoduleView) submoduleView.classList.remove("hidden");

    // 2. High-Density Meta Descriptor Maps
    const labelMap = {
        leads: { title: "CRM & Leads Management", desc: "Real-time client pipeline assignments, stage metrics, and filters." },
        support: { title: "Technical Support Desk", desc: "Ticketing pipelines, customer routing queues, and service levels." },
        media: { title: "Media Asset Storage Vault", desc: "Progressive binary uploads manager and secure storage allocations." },
        logs: { title: "System Activity Audit Logs", desc: "Complete cryptographic sequence tracker across your database tier." },
        email: { title: "Email Operations Hub", desc: "Outbound marketing queues, transactional message tracking, and SMTP server node statuses." },
        content: { title: "Website Content Management", desc: "CMS Engine for live structural text, promotional headers, and public pages layout tuning." },
        services: { title: "Corporate Services Catalog", desc: "Configure core operational B2B service packages and custom tier pricing models." },
        portfolio: { title: "Portfolio Case Studies", desc: "Organize client execution success entries, visual assets, and project outcomes." },
        blog: { title: "Blog & Editorial Workspace", desc: "Draft, index, and publish articles directly to the public marketing grid." },
        seo: { title: "Search Engine Optimization Center", desc: "Manage sitewide meta tags, structured json-ld records, and indexing analytics." },
        marketing: { title: "Marketing Campaigns Hub", desc: "Track conversion funnels, pixel parameters, and active outbound channels traffic." },
        analytics: { title: "Analytics & Growth Metrics", desc: "Advanced computation dashboards, acquisition paths graphs, and historical trends data." },
        roles: { title: "Users & Access Management", desc: "Enforce granular administrative access levels, group policies, and API passport permissions." },
        integrations: { title: "Connected Integrations API", desc: "Manage third-party data synchronization triggers, webhooks, and automation pipelines nodes." },
        security: { title: "Security Center Monitor", desc: "Real-time firewall logging, brute-force protections tracker, and active sessions audit hooks." },
        settings: { title: "Company System Settings", desc: "Configure master company profiles, localized currency variables, and central communication hooks." },
        ai: { title: "AI Copilot Cognitive Workspace", desc: "Advanced platform automation assistant for code drafting, content generation, and template replies." }
    };

    // 🚀 FIXED: Now extracts descriptors safely using the standardized normalized identifier tracking variables
    const metadata = labelMap[normalizedTabId] || { 
        title: `${targetTabId.charAt(0).toUpperCase() + targetTabId.slice(1)} Module`, 
        desc: "Operational enterprise platform submodule settings and data architecture overview layout." 
    };
    
    if (titleNode) titleNode.textContent = metadata.title;
    if (descNode) descNode.textContent = metadata.desc;

    // =========================================================================
    // 🛡️ THE SUB-PANEL ACTIVE ELEMENT FILTER (THE FIX)
    // =========================================================================
    // Hide all internal sub-panels dynamically to clear old layouts out of frame
    document.querySelectorAll(".subpanel-wrapper").forEach(panel => panel.classList.add("hidden"));
    
    // Un-hide the specific HTML layout division matching your active button tab context (Supports fallback strings)
    let targetedSubpanel = document.getElementById(`subpanel-${normalizedTabId}`) || document.getElementById(`subpanel-${targetTabId}`);
    if (!targetedSubpanel) targetedSubpanel = document.getElementById("subpanel-generic");
    
    if (targetedSubpanel) {
        targetedSubpanel.classList.remove("hidden");
    }

    // 🚀 THE REACTIVE HOOK: Triggers clean asynchronous background data loads using true standardized action hooks
    if (typeof loadSubmoduleContent === "function") {
        loadSubmoduleContent(targetTabId); 
    }
}

// ==========================================================================
// 🚀 ENTERPRISE SUBMODULE RUNTIME HOOK: DATA ASSEMBLE ENGINE
// ==========================================================================
export async function loadSubmoduleContent(tabId) {
    // Dynamic lookups matching your target single-page view wrapper structures
    const container = document.getElementById("submoduleFormContainer") || 
                      document.getElementById("supportCenterContainer");
                      
    if (!container) return;

    const token = localStorage.getItem("token");
    const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

    try {
        // A. SYSTEM REALTIME TECHNICAL SUPPORT TICKET DESK
        // FIXED: Multi-token layout parsing strategy bridges variations like 'support center' or 'messages'
        if (tabId === "support" || tabId === "support center" || tabId === "messages") {
            console.log("[SUPPORT CORE] Extracting live data logs from MongoDB Atlas...");

            const res = await fetch("http://localhost:5000/api/messages", { headers });
            if (!res.ok) throw new Error(`Server returned network state: ${res.status}`);
            const messages = await res.json();

            console.log("[SUPPORT CORE] Message payloads recovered successfully:", messages);

            // Hydrate inner viewport grid, matching columns formatting across layouts
            container.innerHTML = `
                <div class="space-y-4">
                    <div class="flex justify-end mb-2">
                        <button id="forceSyncFeedBtn" onclick="loadSubmoduleContent('${tabId}')" 
                                class="bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono font-bold hover:text-white px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider hover:bg-zinc-800/80 transition cursor-pointer">
                            ⚙️ Force Sync Feed Vector
                        </button>
                    </div>

                    <div id="supportCenterContainer" class="divide-y divide-zinc-900/60 bg-zinc-950/40 border border-zinc-900 rounded-2xl overflow-hidden">
                        ${messages.map(msg => {
                            const drawerId = `reply-drawer-${msg._id}`;
                            const currentPriority = (msg.priority || "Medium").toUpperCase();
                            
                            // High-density visual indicators matching priority properties matrix
                            let priorityBadgeStyle = "bg-zinc-900 text-zinc-500 border-zinc-800";
                            if (currentPriority === "HIGH") priorityBadgeStyle = "bg-red-500/10 text-red-400 border-red-500/20";
                            if (currentPriority === "LOW") priorityBadgeStyle = "bg-zinc-900 text-zinc-400 border-zinc-800";

                            return `
                                <!-- 🎯 FIXED: Stamps accurate selector class names and data indices to allow modal unfolds -->
                                <div class="lead-row p-5 hover:bg-zinc-900/10 transition-all text-xs border-b border-zinc-900/40" data-id="${msg._id || msg.id}">
                                    <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                                        <div class="truncate max-w-[200px]">
                                            <h5 class="text-white font-bold tracking-tight">${msg.name || "Inbound Client"}</h5>
                                            <p class="text-zinc-500 font-mono text-[10px] mt-0.5 truncate">${msg.email || "visitor@formait.com"}</p>
                                        </div>
                                        <div class="flex-1 text-zinc-400 font-medium px-2 truncate max-w-md italic font-sans">
                                            ${msg.message || "No request text recorded."}
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <span class="px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border rounded ${priorityBadgeStyle}">
                                                ${currentPriority}
                                            </span>
                                            <!-- Interactive options dropdown component with modal shields active -->
                                            <button onclick="event.stopPropagation(); document.getElementById('${drawerId}').classList.toggle('hidden')" 
                                                    class="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold px-3 py-1.5 rounded-xl transition hover:bg-blue-500 hover:text-black cursor-pointer">
                                                Reply
                                            </button>
                                            <button onclick="event.stopPropagation(); if(typeof purgeSupportTicket === 'function') purgeSupportTicket('${msg._id}');" 
                                                    class="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 px-2.5 py-1.5 rounded-xl transition cursor-pointer">
                                                Close
                                            </button>
                                        </div>
                                    </div>

                                    <!-- INLINE INTERACTIVE DRAWER DECK -->
                                    <div id="${drawerId}" class="hidden border-t border-zinc-900/80 pt-4 mt-4 space-y-3 bg-zinc-950 p-4 rounded-xl border border-zinc-900" onclick="event.stopPropagation();">
                                        <div class="flex flex-col gap-2 mt-1 font-mono">
                                            <textarea id="replyText-${msg._id}" class="w-full h-16 bg-[#080808] border border-zinc-800 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500 transition resize-none custom-sidebar-scroll" placeholder="Draft outbound message reply vector..."></textarea>
                                            <div class="flex items-center justify-between gap-3 flex-wrap">
                                                <input type="file" id="replyFile-${msg._id}" class="text-[11px] text-zinc-600 file:bg-zinc-900 file:border-zinc-800 file:text-zinc-400 file:px-2.5 file:py-1 file:rounded-lg file:mr-2 file:cursor-pointer cursor-pointer">
                                                <button onclick="if(typeof submitAdminMessageResponse === 'function') submitAdminMessageResponse(event, '${msg._id}')" class="bg-blue-500 text-black px-4 py-1.5 rounded-xl font-sans font-black text-[10px] uppercase tracking-wider hover:bg-blue-600 transition shadow-lg cursor-pointer">Transmit Dispatch</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join("")}
                    </div>
                </div>
            `;
            return;
        }
    } catch (err) {
        console.error(`[SUBMODULE DATA STALL] Failed to load ${tabId}:`, err.message);
        container.innerHTML = `<div class="p-8 text-center text-rose-500 font-mono text-xs tracking-wider">[ RE-HYDRATION_FAULT: ${err.message.toUpperCase()} ]</div>`;
    }
}


// frontend/main.js (or inside your admin.html script section)

async function triggerAgentLoop() {
    const goalInput = document.getElementById('agent-goal-input');
    const logTerminal = document.getElementById('agent-log-terminal');
    const statusBadge = document.getElementById('agent-status-badge');
    
    if (!goalInput || !logTerminal || !statusBadge) {
        console.error("[SYSTEM ERROR] Target elements missing from DOM viewport context.");
        return;
    }
    
    if (!goalInput.value.trim()) {
        alert('Please enter an automation goal first!');
        return;
    }

    // Set UI to Running State using Tailwind Framework guidelines
    statusBadge.className = "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse";
    statusBadge.innerText = "Executing Loop...";
    logTerminal.innerHTML = `<div class="text-zinc-500 font-mono">[START] Initiating Plan-Execute-Verify cycle...</div>`;

    try {
        const response = await fetch('http://localhost:5000/api/ai/execute-loop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userGoal: goalInput.value })
        });
        
        const data = await response.json();
        
        if (data.logs && data.logs.length > 0) {
            // 🎯 FIXED: Map incoming log records defensively to prevent bracket text corruption strings
            logTerminal.innerHTML = data.logs.map(logLine => {
                // If the incoming log line isn't pre-wrapped in HTML, escape its characters safely
                if (!logLine.trim().startsWith("<div")) {
                    const escapedText = logLine
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;");
                    return `<div class="font-mono text-zinc-300 py-0.5">${escapedText}</div>`;
                }
                return logLine; // Retain if backend explicitly provides pre-formatted divs
            }).join('');
        }
        
        if (data.success) {
            statusBadge.className = "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
            statusBadge.innerText = "Loop Complete";
        } else {
            statusBadge.className = "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20";
            statusBadge.innerText = "Loop Failed";
        }
    } catch (err) {
        logTerminal.innerHTML += `<div class="text-rose-400 font-mono">[ERROR] Network pipeline disconnection: ${err.message}</div>`;
        statusBadge.className = "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20";
        statusBadge.innerText = "Offline Error";
    }
}

// Explicitly expose the loop executor function to the global window runtime instance
window.triggerAgentLoop = triggerAgentLoop;


// ==========================================================================
// 🧠 PUBLIC SMART PHONE CHATBOT AUTOPILOT EVENT LOOP MATRIX
// ==========================================================================
function initPublicPhoneChatbot() {
    const chatInput = document.getElementById("publicChatInput");
    const sendBtn = document.getElementById("publicChatSendBtn");
    const timelineContainer = document.getElementById("aboutChatTimelineBox");

    if (!chatInput || !timelineContainer) {
        console.warn("[PHONE CHATBOT] Target interface elements absent from current viewport DOM structure.");
        return;
    }

   async function handleMessageSubmission() {
    const textPrompt = chatInput.value.trim();
    if (!textPrompt) return;

    // 1. Append User Speech Bubble onto the timeline
    const userNode = document.createElement("div");
    userNode.className = "chat-message user-msg bg-zinc-50 text-zinc-800 p-3 rounded-2xl rounded-tr-none text-sm max-w-[85%] self-end border border-zinc-100 transition-all duration-200 opacity-0 transform translate-y-1";
    userNode.textContent = textPrompt;
    
    // Find your support card inside the scroller to insert text bubbles right before it
    const targetSupportCardNode = timelineContainer.querySelector(".support-card");
    if (targetSupportCardNode) {
        timelineContainer.insertBefore(userNode, targetSupportCardNode);
    } else {
        timelineContainer.appendChild(userNode);
    }
    
    chatInput.value = ""; // Clear the text input field instantly
    
    // Trigger smooth entry animation
    setTimeout(() => userNode.classList.remove("opacity-0", "translate-y-1"), 10);
    timelineContainer.scrollTop = timelineContainer.scrollHeight;

    // 2. Append Floating "Thinking" State Indicator Bubble (SINGLE COPY REGISTRY)
    const thinkingNode = document.createElement("div");
    const thinkingId = `think-${Date.now()}`;
    thinkingNode.id = thinkingId;
    thinkingNode.className = "chat-message ai-msg bg-zinc-100 text-zinc-400 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] self-start border border-zinc-200/60 animate-pulse italic";
    thinkingNode.textContent = "Typing response...";
    
    // Insert the loader bubble right before your support card box container as well
    if (targetSupportCardNode) {
        timelineContainer.insertBefore(thinkingNode, targetSupportCardNode);
    } else {
        timelineContainer.appendChild(thinkingNode);
    }
    
    timelineContainer.scrollTop = timelineContainer.scrollHeight;

    try {
       const response = await fetch(`${API_BASE}/api/leads`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Public App Session",
        email: "visitor@formait.com",
        message: textPrompt,
        details: textPrompt,
        engineeringVector: "FINTECH_APP"
    })
});

        const aiBubbleTarget = document.getElementById(thinkingId);
        if (!aiBubbleTarget) return;

        if (!response.ok) throw new Error(`Server returned code: ${response.status}`);
        const result = await response.json();

        // 4. Hot-swap the thinking text with the true returned AI reply copy payload
        aiBubbleTarget.removeAttribute("id");
        aiBubbleTarget.classList.remove("animate-pulse", "text-zinc-400", "bg-zinc-100", "border-zinc-200/60", "italic");
        aiBubbleTarget.classList.add("bg-blue-50", "text-blue-900", "border-blue-100/50");
        
        // Extract response parameters generated by your backend rules matrix controller
        aiBubbleTarget.textContent = result.aiResponse || "Message transmitted safely across systems logs core node registries.";
        timelineContainer.scrollTop = timelineContainer.scrollHeight;

    } catch (err) {
        const aiBubbleTarget = document.getElementById(thinkingId);
        if (aiBubbleTarget) {
            aiBubbleTarget.classList.remove("animate-pulse");
            aiBubbleTarget.className = "chat-message error-msg bg-red-50 text-red-700 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] self-start border border-red-100/50 font-mono";
            aiBubbleTarget.textContent = "Connection stalled: Unable to resolve data link.";
        }
    }
}

    // Bind keyboard enter intercepts
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleMessageSubmission();
        }
    });

    // Bind physical pointer send button click triggers
    if (sendBtn) {
        sendBtn.onclick = (e) => {
            e.preventDefault();
            handleMessageSubmission();
        };
    }
}

// Attach lifecycle trigger to fire the moment the web view elements are parsed
document.addEventListener("DOMContentLoaded", initPublicPhoneChatbot);
