import { validateMediaPayload } from "./mediaVault.js";

/**
 * GSAP Media Asset Pipeline Engine
 * Safely handles DOM injection, progressive asset loading tracks, and staggered canvas reveals.
 */
export function renderMediaTimeline(validatedFiles) {
    const trackContainer = document.getElementById("mediaTimelineTrack") || document.querySelector(".media-vault-grid");
    
    // 1. Structural Guardrail Check
    if (!trackContainer) {
        console.error("GSAP Engine Error: Active timeline animation target container layout is missing from DOM.");
        return;
    }

    // Clear previous timeline nodes safely
    trackContainer.innerHTML = "";

    // 2. Build and Inject Safe DOM Fragments
    const fragment = document.createDocumentFragment();
    
    validatedFiles.forEach((file, index) => {
        const itemNode = document.createElement("div");
        itemNode.className = "media-timeline-card opacity-0 bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col gap-3 shadow-xl relative overflow-hidden transform-gpu";
        itemNode.setAttribute("data-asset-index", index);

        // Generate Human Readable Byte Metric
        const sizeInKB = (file.size / 1024).toFixed(1);
        
        itemNode.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <span class="text-xs font-mono text-emerald-400 uppercase tracking-wider">${file.type.split('/')[1]}</span>
                <span class="text-xs font-mono text-slate-400">${sizeInKB} KB</span>
            </div>
            <div class="truncate text-sm font-semibold text-slate-200" title="${file.name}">
                ${file.name}
            </div>
            <!-- Tailwind Loading Track Component managed by dynamic calculations -->
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mt-auto">
                <div class="media-progress-bar bg-emerald-500 h-1.5 w-0 rounded-full" data-target-id="${index}"></div>
            </div>
        `;
        
        fragment.appendChild(itemNode);
    });

    trackContainer.appendChild(fragment);

    // 3. Multi-Track Sequential Animation Timeline
    // Ensure gsap and ScrollTrigger dependencies exist globally on window before thread initiation
    if (typeof gsap === "undefined") {
        console.warn("GSAP Engine Warning: gsap core asset file is not loaded in current document window thread scope.");
        return;
    }

    // Initialize contextual isolated timeline pool
    const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
    });

    // Step A: Staggered entrance cascade animation for validated layout items
    tl.to(".media-timeline-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: {
            amount: 0.4,
            grid: "auto",
            from: "start"
        },
        startAt: { y: 25, scale: 0.95 }
    });

    // Step B: Progressive linear loading simulation across all item elements inside the cluster
    tl.to(".media-progress-bar", {
        width: "100%",
        duration: 1.2,
        stagger: 0.15,
        ease: "power1.inOut"
    }, "-=0.3");

    // Step C: Highlighting operational state completion context
    tl.to(".media-timeline-card", {
        borderColor: "rgba(16, 185, 129, 0.3)", // Tailwind Emerald-500 border highlight tint
        duration: 0.4,
        stagger: 0.08
    }, "-=0.8");
}

/**
 * Complete integration patch linking validation engine loop to the layout view track.
 */
export function hookMediaTimelineUploader() {
    const nativeInput = document.getElementById("mediaFileInput") || document.querySelector("input[type='file']");
    if (!nativeInput) return;

    nativeInput.addEventListener("change", (event) => {
        try {
            // Run incoming file lists through validation matrix constraints
            const cleanAssets = validateMediaPayload(event.target.files);
            
            // Hand off clean array variables directly to GSAP scheduler engine
            renderMediaTimeline(cleanAssets);
        } catch (error) {
            console.error("Intake Execution Interrupted:", error.message);
            // Display clean visual structural alert feedback to end dashboard operator
            const alertBox = document.getElementById("mediaVaultAlertZone");
            if (alertBox) {
                alertBox.textContent = error.message;
                alertBox.classList.remove("hidden");
                gsap.fromTo(alertBox, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
            }
        }
    });
}
