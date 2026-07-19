const API_CONFIG = {
    BASE_URL: `${window.API_BASE || "https://formait-backend.onrender.com"}/api`
};

// Global cache storage to keep track of live data arrays
window.DashboardCache = window.DashboardCache || {
    leads: [],
    messages: [],
    media: []
};

/**
 * Main Reactive Entry Point
 * Pulls down clean arrays from port 5000 and redraws active elements.
 */
window.refreshActiveTab = async function(targetTabId = document.querySelector(".tab-trigger.bg-blue-500")?.getAttribute("data-tab") || "dashboard") {
    const token = localStorage.getItem("token");
    const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

    try {
        // A. REFRESH DASHBOARD & LEADS
        if (targetTabId === "dashboard" || targetTabId === "leads") {
            const res = await fetch(`${API_CONFIG.BASE_URL}/leads`, { headers });
            if (res.ok) {
               window.DashboardCache.leads = await res.json();
                
                // 🎯 FIXED: Direct fallback matrix aligning with 'renderPipeline'
               if (typeof renderPipeline === "function") {
    renderPipeline(window.DashboardCache.leads);

} else if (typeof renderLeadsPipeline === "function") {
    renderLeadsPipeline(window.DashboardCache.leads);
}

if (typeof loadDashboardMetrics === "function") {
    loadDashboardMetrics(window.DashboardCache.leads);
}
            }
        }
        
        // B. REFRESH MESSAGES (SUPPORT CENTER / EMAIL)
        if (targetTabId === "messages" || targetTabId === "support" || targetTabId === "email") {
            const res = await fetch(`${API_CONFIG.BASE_URL}/messages`, { headers });
            if (res.ok) {
                window.DashboardCache.messages = await res.json();
                
                // 🎯 FIXED: Aligns perfectly with your live Support Center calculator
                if (typeof loadSupportCenterPanel === "function") {
                    loadSupportCenterPanel();
                } else if (typeof renderMessagesFeed === "function") {
                    renderMessagesFeed(DashboardCache.messages);
                }
            }
        }

        // C. REFRESH MEDIA VAULT LAYOUT
        if (targetTabId === "media") {
            const res = await fetch(`${API_CONFIG.BASE_URL}/media`, { headers });
            if (res.ok) {
                const mediaData = await res.json();
                DashboardCache.media = mediaData.data || [];
                if (typeof renderMediaTimeline === "function") renderMediaTimeline(DashboardCache.media);
            }
        }

        // D. REFRESH ACTIVITY AUDIT LOGS
        if (targetTabId === "logs") {
            const res = await fetch(`${API_CONFIG.BASE_URL}/crm/activity`, { headers });
            if (res.ok) {
                const logsData = await res.json();
                if (typeof renderActivityLogs === "function") renderActivityLogs(logsData);
            }
        }
    } catch (err) {
        console.error(`[SPA REFRESH STALL] Failed data sync for view [${targetTabId}]:`, err.message);
    }
};

// ==========================================================================
// 👥 TABS 1 & 2: LEADS INTERACTIVE TABLE AND FIELD MUTATOR BUTTONS
// ==========================================================================
/**
 * 👥 1. Recent Leads Layout List Renderer
 * Targets your exact layout grid and table ID context cleanly.
 */
// ==========================================================================
// 🎯 DUAL-ALIGNMENT PIPELINE RENDERER (ELIMINATES VISUAL VANISHING ERRORS)
// ==========================================================================
window.renderLeadsPipeline = function(leads) {
    // Catch both variations of your HTML table container element references safely
    const tableBody = document.getElementById("leadsTableBody") || document.getElementById("leadsTable");
    if (!tableBody) {
        console.warn("⚠️ [RENDER FAULT] Target table viewport container element untraceable in current page DOM structure.");
        return;
    }

    // Handle empty data array states gracefully inside your database buffer
    if (!leads || leads.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3" class="py-8 text-center text-zinc-600 text-xs font-mono uppercase tracking-wider">
                    No active pipeline records detected in database buffer.
                </td>
            </tr>`;
        return;
    }

    // Paint true high-density interface rows mapping all required event isolation boundaries
    tableBody.innerHTML = leads.map(lead => {
        const targetId = lead._id || lead.id || "";
        
        return `
            <tr class="lead-row group hover:bg-zinc-900/10 transition duration-150 cursor-pointer select-none" data-id="${targetId}">
                <!-- COLUMN A: LEAD DETAILS -->
                <td class="py-4 pr-4 pl-2">
                    <div class="text-sm font-semibold text-zinc-100 group-hover:text-blue-400 transition truncate max-w-[240px]" title="${lead.name || ''}">
                        ${lead.name || 'Al Chat Bot User'}
                    </div>
                    <div class="text-xs text-zinc-500 font-mono mt-1 truncate max-w-[240px]" title="${lead.email || ''}">
                        ${lead.email || "client-node@forma.it"}
                    </div>
                </td>

                <!-- COLUMN B: PIPELINE STAGE SELECTION INPUT -->
                <td class="py-4">
                    <!-- FIXED: Re-injecting the interactive dropdown component block with event isolation -->
                    <select class="status-mutator bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-lg px-2.5 py-1 text-xs font-mono tracking-wide focus:border-blue-500 focus:outline-none cursor-default transition uppercase" 
                            data-id="${targetId}" onclick="event.stopPropagation();">
                        <option value="New" ${lead.status === 'New' || lead.status === 'NEW' || !lead.status || lead.status === 'Logged' ? 'selected' : ''}>🆕 New</option>
                        <option value="Contacted" ${lead.status === 'Contacted' ? 'selected' : ''}>📞 Contacted</option>
                        <option value="Qualified" ${lead.status === 'Qualified' ? 'selected' : ''}>🔥 Qualified</option>
                        <option value="Won" ${lead.status === 'Won' ? 'selected' : ''}>🏆 Won</option>
                    </select>
                </td>

                <!-- COLUMN C: VALUE MAPPING & PURGE DECK -->
                <td class="py-4 text-right pl-4">
                    <div class="flex items-center justify-end gap-3">
                        <span class="text-xs font-mono text-zinc-400 tracking-tight pr-2">
                            ${lead.source || lead.valueMapping || "Website Contact Form"}
                        </span>
                        <button class="delete-lead-btn p-1.5 text-zinc-600 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition duration-200 cursor-pointer" 
                                data-id="${targetId}" title="Purge Lead Document" onclick="event.stopPropagation();">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
};

// 🎯 THE CORE ALIGNMENT BRACE: Force both legacy and modern rendering hooks to point to this clean component function
window.renderPipeline = window.renderLeadsPipeline;



/**
 * 💬 2. Global Activity Timeline Log Renderer
 * Populates your vertical left-bordered audit timeline track cleanly.
 */
window.renderActivityLogs = function(logs) {
    const activityFeed = document.getElementById("activityFeed");
    if (!activityFeed) return;

    if (!logs || logs.length === 0) {
        activityFeed.innerHTML = `
            <p class="text-zinc-600 text-xs font-mono uppercase tracking-wider text-center py-4">
                No system activity logs found.
            </p>`;
        return;
    }

    activityFeed.innerHTML = logs.map(log => `
        <div class="relative pl-8 group">
            <!-- Timeline node node circle spacer element -->
            <div class="absolute left-2.5 top-1.5 w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-blue-500 border border-zinc-950 transition duration-150 ring-4 ring-zinc-950"></div>
            <div>
                <div class="flex items-center justify-between gap-4 text-xs">
                    <span class="font-bold text-zinc-200 group-hover:text-zinc-100 transition">${log.type || "System Event"}</span>
                    <span class="font-mono text-[10px] text-zinc-500">${new Date(log.createdAt).toLocaleTimeString()}</span>
                </div>
                <p class="text-xs text-zinc-500 font-mono mt-1 leading-relaxed">
                    ${log.message || "Operation metadata transaction processed."}
                </p>
            </div>
        </div>
    `).join("");
};


// ==========================================================================
// 💬 TAB 3: REAL-TIME OPERATIONS INBOUND MESSAGES FEED
// ==========================================================================
window.renderMessagesFeed = function(messages) {
    const feedTrack = document.getElementById("messagesFeedContainer");
    if (!feedTrack) return;

    if (messages.length === 0) {
        feedTrack.innerHTML = `<p class="text-zinc-600 text-xs font-mono uppercase tracking-wider text-center py-8">Message stream layer buffer empty.</p>`;
        return;
    }

    feedTrack.innerHTML = messages.map(msg => `
        <div class="bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden group">
            <div class="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span class="text-xs font-bold text-blue-400 font-mono tracking-wide">${msg.name || "System Alert"}</span>
                <span class="text-[10px] font-mono text-zinc-500">${new Date(msg.createdAt).toLocaleTimeString()}</span>
            </div>
            <p class="text-xs text-zinc-300 font-mono leading-relaxed">${msg.message || "No query text payload provided."}</p>
        </div>
    `).join("");
}

/// ==========================================================================
// 🔗 SYSTEM MONITOR CORE CONFIGURATION & LOG INFRASTRUCTURE
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

    const leadsTable = document.getElementById("leadsTableBody") || document.getElementById("leadsTable");
    const activityFeed = document.getElementById("activityFeed");

    // Safe Markdown utility converter parsing code line breaks cleanly for view drawers
    const parseTextMarkdown = (t) => {
        if (!t) return "No data payload records trace logged.";
        return t
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br>");
    };

    // Live Activity Feed Component Writer
    const pushLocalActivityLog = (descriptionText) => {
        if (!activityFeed) return;
        const container = document.createElement("div");
        container.className = "flex items-start gap-4 relative pl-8 group animate-fade-in";
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        container.innerHTML = `
            <div class="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-blue-500 flex items-center justify-center z-10 shrink-0 group-hover:scale-110 transition-transform">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            </div>
            <div class="bg-zinc-900/30 border border-zinc-900/50 hover:border-zinc-800/80 p-4 rounded-2xl w-full text-left transition-all">
                <div class="flex items-center justify-between gap-4 mb-1">
                    <span class="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Pipeline Event Monitor</span>
                    <span class="text-[10px] font-mono text-zinc-600">${timestamp}</span>
                </div>
                <p class="text-xs text-zinc-300 leading-relaxed font-mono">${descriptionText}</p>
            </div>`;

        if (activityFeed.children.length >= 5) activityFeed.lastElementChild.remove();
        activityFeed.insertBefore(container, activityFeed.firstChild);
    };

    window.pushLocalActivityLog = pushLocalActivityLog; // Expose globally for separate runtime scripts
    // ==========================================================================
    // 🚀 UNIVERSAL PIPELINE ROUTING ENGINE (UNFOLDS LEADS & SUPPORT MESSAGES)
    // ==========================================================================
if (leadsTable && !leadsTable.dataset.boundClick) {

    leadsTable.dataset.boundClick = "true";

    leadsTable.addEventListener("click", async (e) => {
            if (
                e.target.classList.contains("status-mutator") || 
                e.target.closest(".delete-lead-btn") ||
                e.target.closest("textarea") ||
                e.target.closest("input") ||
                // Allow row tracking even if clicking near close/reply buttons inside expanded drawers
                (e.target.closest("button") && !e.target.closest(".lead-row")) 
            ) {
                return;
            }

            // 2. Adaptive Row Selection: Captures BOTH structural table rows (<tr>) and list containers (<div>)
            const targetRow = e.target.closest(".lead-row") || e.target.closest("tr[data-id]") || e.target.closest("div[data-id]");
            if (!targetRow) return;

            // 3. Extract the unique database Object ID token mapping cleanly
            const leadId = targetRow.getAttribute("data-id") || targetRow.querySelector("[data-id]")?.getAttribute("data-id");
            if (!leadId || leadId === "undefined") {
                console.warn("⚠️ Administrative trace failure: data-id attribute absent on clicked DOM node.");
                return;
            }

            // Wipe pre-existing duplicate screen overlays from view immediately
            const oldModal = document.getElementById("adminFullscreenInspectionOverlay");
            if (oldModal) oldModal.remove();

                      try {
                // ==========================================================================
                // 🎯 4. DYNAMIC ENDPOINT STRATEGY WITH AUTOMATED RETRY FAILOVER
                // ==========================================================================
                const isSupportMessage = targetRow.innerHTML.includes("reply-drawer-") || 
                                         targetRow.closest("#supportCenterContainer") ||
                                         targetRow.querySelector("button[onclick*='purgeSupportTicket']");
                
let targetEndpoint = isSupportMessage 
    ? `${API_CONFIG.BASE_URL}/messages/${leadId}`
    : `${API_CONFIG.BASE_URL}/leads/${leadId}`;

                console.log(`[PIPELINE INTEGRATION] Connecting secure fetch vector to: ${targetEndpoint}`);
                let response = await fetch(targetEndpoint, { method: "GET", headers });
                
                // ⚡ FAILOVER LIFELINE VALUE: If the guessed collection returns 404, hot-swap endpoints instantly!
if (!response.ok) {
    throw new Error(`Record lookup failed: ${response.status}`);
}

                // If both the primary and fallback routes fail, securely exit the loop
                if (!response.ok) throw new Error(`Dual-Gateway collection route lookup failed: ${response.status}`);
                const data = await response.json();

                // ==========================================================================
                // 🎯 5. BUILD UNIFIED DATA MATRIX (SAFE PROPERTY PARSING)
                // ==========================================================================
                let extractedAiResponse = "No direct automated response trace logged.";
                if (data.aiResponse) {
                    extractedAiResponse = data.aiResponse;
                } else if (data.adminReplies && data.adminReplies.length > 0) {
                    // Defensively pull out string data context from the first array array index
                    const primaryReplyNode = data.adminReplies[0];
                    extractedAiResponse = typeof primaryReplyNode === "object" 
                        ? (primaryReplyNode.replyText || primaryReplyNode.message || JSON.stringify(primaryReplyNode)) 
                        : primaryReplyNode;
                } else if (data.reply) {
                    extractedAiResponse = data.reply;
                }

                const lead = {
                    _id: data._id,
                    name: data.name || "AI Workspace Parameter",
                    email: data.email || "client-node@forma.it",
                    engineeringVector: data.engineeringVector || data.priority || "Cognitive Assistant Line",
                    createdAt: data.createdAt || Date.now(),
                    status: data.status || data.priority || "New",
                    message: data.message || data.details || "No additional text payload records trace logged.",
                    aiResponse: extractedAiResponse
                };


                // 6. Create Fullscreen Overlay Canvas
                const modal = document.createElement("div");
                modal.id = "adminFullscreenInspectionOverlay";
                modal.className = "fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6 opacity-0 transition-opacity duration-300 antialiased";
                
                const timestampFormatted = new Date(lead.createdAt).toLocaleString();
                const isProcessed = lead.status === "reviewed" || lead.status === "PROCESSED" || lead.status === "Completed" || lead.isMarkedGreen;

                modal.innerHTML = `
                    <div class="bg-zinc-950 border border-zinc-900 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] transform scale-95 transition-transform duration-300">
                        
                        <!-- Modal Header Section Bar -->
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

                        <!-- Modal Central Informational Canvas -->
                        <div class="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-left custom-sidebar-scroll">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[11px]">
                                <div class="bg-zinc-900/20 border border-zinc-900 p-3 rounded-xl"><span class="text-zinc-500 font-bold block uppercase tracking-wider mb-0.5">Route/Priority Vector</span><span class="text-zinc-300 text-xs uppercase">${lead.engineeringVector}</span></div>
                                <div class="bg-zinc-900/20 border border-zinc-900 p-3 rounded-xl"><span class="text-zinc-500 font-bold block uppercase tracking-wider mb-0.5">Client Mail Gateway</span><span class="text-zinc-300 text-xs block truncate" title="${lead.email}">${lead.email}</span></div>
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

                            <!-- Quick Action Reply Workspace -->
                            <div class="space-y-2 pt-2">
                                <h4 class="text-xs font-black uppercase text-zinc-500 tracking-widest font-mono">Executive Response Command Deck</h4>
                                <div class="flex flex-col sm:flex-row gap-2">
                                    <input type="text" id="crmActionReplyInput" class="flex-1 bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs outline-none text-white focus:border-blue-500 transition placeholder-zinc-700" placeholder="Type an immediate outbound message reply vector...">
                                    <button id="crmDispatchReplyBtn" class="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-xl text-black font-black text-xs uppercase tracking-wider transition cursor-pointer">Reply</button>
                                </div>
                            </div>
                        </div>

                        <!-- Management Control Panel Action Footer Bar -->
                        <div class="p-4 border-t border-zinc-900 bg-zinc-900/20 flex flex-wrap justify-between items-center gap-2">
                            <button id="crmExecuteDeleteBtn" class="px-4 py-2.5 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 text-rose-400 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer">
                                Purge Record
                            </button>
                            
                            <button id="crmToggleReviewBtn" class="px-5 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer ${isProcessed ? 'bg-zinc-900 border border-zinc-800 text-zinc-500' : 'bg-emerald-500 hover:bg-emerald-600 text-black'}" ${isProcessed ? 'disabled' : ''}>
                                ${isProcessed ? 'Marked Processed' : 'Approve & Review (Mark Green)'}
                            </button>
                        </div>
                    </div>`;

                document.body.appendChild(modal);
                // Run entry transition frames smoothly
                setTimeout(() => {
                    modal.classList.remove("opacity-0");
                    const modalInteriorCard = modal.querySelector(".scale-95");
                    if (modalInteriorCard) modalInteriorCard.classList.remove("scale-95");
                }, 10);

                // Unified overlay exit animator helper
                const closeModalWindow = () => {
                    modal.classList.add("opacity-0");
                    const card = modal.querySelector(".transform");
                    if (card) card.classList.add("scale-95");
                    setTimeout(() => modal.remove(), 300);
                };

                // Bind close layout controls immediately
                document.getElementById("closeInspectionModalBtn").onclick = closeModalWindow;
                modal.onclick = (e) => { if (e.target === modal) closeModalWindow(); };

                // A. Handle Outbound Dynamic Message Transmission
modal.querySelector("#crmDispatchReplyBtn").onclick = async () => {

    const replyInput = modal.querySelector("#crmActionReplyInput");

    const msgVal = replyInput.value.trim();

    if (!msgVal) return;


    try {

const replyPayload = new FormData();

replyPayload.append("replyText", msgVal);

const res = await fetch(
    `${API_CONFIG.BASE_URL}/messages/${lead._id}/reply`,
    {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: replyPayload
    }
);


        if(!res.ok){
            throw new Error(`Reply failed ${res.status}`);
        }


        pushLocalActivityLog(
            `Outbound CRM reply dispatched to <${lead.email}>.`
        );


        replyInput.value="";

        alert("Reply sent successfully");


    } catch(err){

        console.error("[REPLY ERROR]",err);

        alert("Reply failed: "+err.message);

    }

};

                // B. Handle Database Record Purging Operations
                document.getElementById("crmExecuteDeleteBtn").onclick = async () => {
                    if (!confirm("Permanently purge this item file from Atlas servers?")) return;
                    const routePath = isSupportMessage ? 'messages' : 'leads';
                    
                    try {
                        const res = await fetch(`${API_CONFIG.BASE_URL}/${routePath}/${lead._id}`, { method: "DELETE", headers });
                        if (!res.ok) throw new Error(`Server returned error: ${res.status}`);
                        
                        targetRow.remove();
                        pushLocalActivityLog(`Administrative Purge: Record index [${lead._id}] destroyed.`);
                        closeModalWindow();
                    } catch (err) { 
                        alert(`Purge failed: ${err.message}`); 
                    }
                };

                // C. Handle Matrix Status Mutation Updates (Mark Green)
                const modalReviewBtn = document.getElementById("crmToggleReviewBtn");
                if (modalReviewBtn && !isProcessed) {
                    modalReviewBtn.onclick = async () => {
                        const routePath = isSupportMessage ? 'messages' : 'leads';
                        
                        try {
                            const res = await fetch(`${API_CONFIG.BASE_URL}/${routePath}/${lead._id}`, {
                                method: "PUT", 
                                headers, 
                                body: JSON.stringify({ status: "Resolved" })
                            });
                            if (!res.ok) throw new Error(`Mutation failed: ${res.status}`);
                            
                            // Transform status graphics into executive emerald processing modes
                            document.getElementById("modalStatusBadgeIndicator").className = "w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]";
                            modalReviewBtn.className = "px-5 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-500";
                            modalReviewBtn.textContent = "Marked Processed";
                            modalReviewBtn.setAttribute("disabled", "true");

                            // Refresh any visible matching options containers back on your list viewport grid
                            const inlineDropdown = targetRow.querySelector(".status-mutator");
                            if (inlineDropdown) inlineDropdown.value = "Completed";

                            pushLocalActivityLog(`Item [${lead._id}] approved and marked green.`);
                        } catch (err) { 
                            alert(`Mutation error: ${err.message}`); 
                        }
                    };
                }

            } catch (err) {
                console.error("❌ Fullscreen Unfold Sequence Failure:", err.message);
                alert(`Inspection pipeline failure tracking trace error: ${err.message}`);
            }
        });
    }
    });


        // ==========================================================================
        // 🔄 STATUS MUTATOR DROPDOWN HANDLER (WITH INTERACTIVE RESTORATION)
        // ==========================================================================
        leadsTable.addEventListener("change", async (e) => {
            if (e.target.classList.contains("status-mutator")) {
                const parentRow = e.target.closest("tr[data-id]") || e.target.closest(".lead-row");
                const targetId = e.target.getAttribute("data-id") || (parentRow ? parentRow.getAttribute("data-id") : null);
                const nextStatus = e.target.value;

                if (!targetId || targetId === "undefined") {
                    console.warn("⚠️ Mutation Aborted: Failed to extract a valid database object identifier coordinate.");
                    return;
                }

                try {
                    console.log(`[MUTATOR PIPELINE] Updating Lead ${targetId} state value vector to: ${nextStatus}`);
                    const res = await fetch(`${API_CONFIG.BASE_URL}/leads/${targetId}`, {
                        method: "PUT",
                        headers,
                        body: JSON.stringify({ status: nextStatus })
                    });
                    if (!res.ok) throw new Error(`HTTP Matrix error code: ${res.status}`);
                    
                    pushLocalActivityLog(`Lead row pipeline position updated to status state: [${nextStatus.toUpperCase()}].`);
                } catch (err) {
                    console.error("[MUTATION STALL]", err.message);
                }
            }
        });

        
window.loadDashboardMetrics = async function(leadsArray) {

    let leads = leadsArray;

    if (!leads) {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_CONFIG.BASE_URL}/leads`, {
                headers: { 
                    "Authorization": `Bearer ${token}` 
                }
            });

            leads = await res.json();

        } catch (err) {
            console.error("[METRICS ERROR] Fetch stall:", err.message);
            return;
        }
    }

    // keep the rest of your existing code here


    // 1. Calculate Real-Time Metrics Parameters
    const totalLeadsCount = leads.length;
    const totalEmailsCount = leads.filter(l => l.email && l.email.trim().length > 0).length;
    const totalTicketsCount = leads.filter(l => l.source === "Support Center" || (l.message && l.message.toLowerCase().includes("support"))).length;
    
    // Conversion mapping logic
    const qualifiedLeads = leads.filter(l => l.status === "Qualified" || l.status === "Won" || l.status === "CONTACTED").length;
    const conversionPct = totalLeadsCount ? Math.round((qualifiedLeads / totalLeadsCount) * 100) : 0;
    
    // Projected Revenue formula allocation
    const calculatedRevenue = qualifiedLeads * 500;

    // 2. Direct DOM Targeting via Explicit IDs (Bypasses parent node lookup errors)
    const nodes = {
        visitors: document.getElementById("totalVisitors"),
        leads: document.getElementById("totalLeads"),
        emails: document.getElementById("totalEmails"),
        tickets: document.getElementById("activeTickets"),
        revenue: document.getElementById("totalRevenue"),
        conversion: document.getElementById("conversionRate")
    };

    // Safely update DOM content if elements exist in active layout
    if (nodes.visitors) nodes.visitors.textContent = (totalLeadsCount * 4 || "248").toLocaleString();
    if (nodes.leads) nodes.leads.textContent = totalLeadsCount;
    if (nodes.emails) nodes.emails.textContent = totalEmailsCount;
    if (nodes.tickets) nodes.tickets.textContent = totalTicketsCount;
    if (nodes.revenue) nodes.revenue.textContent = `$${calculatedRevenue.toLocaleString()}`;
    if (nodes.conversion) nodes.conversion.textContent = `${conversionPct}%`;
};