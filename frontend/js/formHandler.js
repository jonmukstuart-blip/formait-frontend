import { API_CONFIG } from "./config.js";

/**
 * Enterprise Form Submission Controller
 * Dispatches safe JSON payloads straight to the live database API cluster channels.
 */
export async function handlePipelineSubmission(event) {
    event.preventDefault();
    
    const formElement = event.target;
    const submitButton = formElement.querySelector("button[type='submit']") || document.getElementById("submitLeadBtn");
    
    // Save previous button state text context safely before toggling styles
    const originalButtonText = submitButton ? submitButton.textContent : "ADD NEW PIPELINE RECORD";
    
    if (submitButton) {
        submitButton.textContent = "WRITING TO MONGODB...";
        submitButton.disabled = true;
        submitButton.classList.add("opacity-70", "cursor-wait");
    }

    try {
        // Target explicit form field input DOM elements dynamically
        const nameField = document.getElementById("leadNameInput") || formElement.querySelector("input[name='name']");
        const emailField = document.getElementById("leadEmailInput") || formElement.querySelector("input[name='email']");
        const statusField = document.getElementById("leadStatusSelect") || formElement.querySelector("select[name='status']");
        const messageField = document.getElementById("leadMessageInput") || formElement.querySelector("textarea[name='message']");

        // Assemble structural body data payload
        const payload = {
            name: nameField?.value?.trim() || "Anonymous Visitor",
            email: emailField?.value?.trim() || "visitor@formait.com",
            status: statusField?.value || "New",            message: messageField?.value?.trim() || "Manually injected via Admin CRM Dashboard Control Panel."
        };

        // Dispatch stream through port 5000 endpoint gate
        const response = await fetch(`${API_CONFIG.BASE_URL}/leads`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Mongoose database tier rejected the payload transaction.");
        }

        // Clean UI layout states upon complete execution path resolution
        alert("Success: Pipeline Record committed to MongoDB securely!");
        formElement.reset();

    } catch (error) {
        console.error("[CRM INTEGRATION ERROR] Transaction stalled:", error.message);
        alert(`Sync Blocked: ${error.message}`);
    } finally {
        // 🚀 THE BULLETPROOF RESET: Drops button out of permanent lock status regardless of server success/fail outcomes
        if (submitButton) {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            submitButton.classList.remove("opacity-70", "cursor-wait");
        }
    }
}

/**
 * Global form hook bootstrapper mapping
 */
export function initFormPipelineBindings() {
    const pipelineForm = document.getElementById("leadForm") || document.querySelector(".crm-pipeline-form");
    if (!pipelineForm) return;

    pipelineForm.removeEventListener("submit", handlePipelineSubmission); // Prevent double injection event stack duplicates
    pipelineForm.addEventListener("submit", handlePipelineSubmission);
    console.log("[SYSTEM] Frontend pipeline submission form bindings initialized successfully.");
}
