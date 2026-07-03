import { API_CONFIG } from "./config.js";

/**
 * 🤖 Forma.IT Cognitive Engine AI Thread Controller
 * Handles user execution prompts and streams dynamic responses into the viewport layout.
 */
export async function dispatchAiPrompt(event) {
    const wrapper = event.target.closest(".mt-8.glow-card");
    const inputField = wrapper ? wrapper.querySelector("input[type='text']") : null;
    const sendButton = wrapper ? wrapper.querySelector(".chat-send-btn") : null;
    const scroller = wrapper ? wrapper.querySelector(".ai-chat-scroller") : null;

    if (!inputField || !inputField.value.trim() || inputField.disabled) return;

    const userPrompt = inputField.value.trim();
    const originalBtnText = sendButton ? sendButton.textContent : "EXECUTE";

    // 1. Render User Message Node immediately into layout viewport
    const userMessageNode = document.createElement("div");
    userMessageNode.className = "flex items-start gap-3 max-w-[85%] ml-auto flex-row-reverse";
    userMessageNode.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-black flex items-center justify-center flex-shrink-0">USR</div>
        <div class="bg-blue-500/10 border border-blue-500/20 rounded-2xl rounded-tr-none px-4 py-3 text-sm text-blue-300 leading-relaxed font-mono">
            ${userPrompt}
        </div>
    `;
    scroller.appendChild(userMessageNode);
    scroller.scrollTop = scroller.scrollHeight; // Focus container to bottom

    // Toggle interactive disabled writing states across elements
    inputField.value = "";
    inputField.disabled = true;
    if (sendButton) {
        sendButton.textContent = "THINKING...";
        sendButton.disabled = true;
    }

    // 2. Render Placeholder AI Loader Box Node
    const aiResponseNode = document.createElement("div");
    aiResponseNode.className = "flex items-start gap-3 max-w-[85%] animate-pulse";
    aiResponseNode.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-blue-500 text-black text-[10px] font-black flex items-center justify-center flex-shrink-0">AI</div>
        <div class="bg-zinc-900/80 border border-zinc-800/40 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-zinc-500 loading-dots">
            Analyzing metadata parameters...
        </div>
    `;
    scroller.appendChild(aiResponseNode);

    try {
        const token = localStorage.getItem("token");
        
        // Dispatch transmission across your port 5000 server routes channel bounds
        const response = await fetch(`${API_CONFIG.BASE_URL}/crm/ai-execute`, {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ prompt: userPrompt })
        });

        const data = await response.json();
        
        // Remove animation pulse classes and inject clean response data string fields
        aiResponseNode.classList.remove("animate-pulse");
        const bodyContentBox = aiResponseNode.querySelector(".loading-dots");
        if (bodyContentBox) {
            bodyContentBox.classList.remove("text-zinc-500");
            bodyContentBox.classList.add("text-zinc-300", "leading-relaxed");
            bodyContentBox.textContent = data.reply || "Prompt compiled with empty string text allocation outcome.";
        }

    } catch (error) {
        console.error("[COGNITIVE ENGINE CRASH]", error.message);
        aiResponseNode.remove(); // Drop error artifacts
        alert("Cognitive loop connection error occurred. Check your server execution streams.");
    } finally {
        // Reset element parameters completely
        inputField.disabled = false;
        inputField.focus();
        if (sendButton) {
            sendButton.textContent = originalBtnText;
            sendButton.disabled = false;
        }
        scroller.scrollTop = scroller.scrollHeight;
    }
}

/**
 * Hook listeners setup matrix to input deck interactions
 */
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("chat-send-btn")) {
            dispatchAiPrompt(e);
        }
    });

    document.body.addEventListener("keydown", (e) => {
        if (e.target.placeholder && e.target.placeholder.startsWith("Ask AI") && e.key === "Enter") {
            dispatchAiPrompt(e);
        }
    });
});
