let isInitialLoadDone = false;

const socket = io("https://formait-backend.onrender.com");

async function loadUserMessages(email) {
    if (!email) {
        alert("Please enter your email");
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/api/messages/public/${email}`);
        const messages = await res.json();

        if (!Array.isArray(messages)) {
            throw new Error("Invalid response from server");
        }

        const container = document.getElementById("messagesContainer");

        if (messages.length === 0) {
            container.innerHTML = "<p class='text-zinc-500'>No messages found.</p>";
            return;
        }

        container.innerHTML = messages.map(msg => `

            <div class="border border-zinc-800 p-4 rounded-lg mb-6 bg-black/20">

                <!-- STATUS -->
                <div class="flex justify-between items-center mb-3 text-xs">
                    <span class="text-zinc-500">
                        ${msg.status || "New"}
                    </span>

                    ${
                        msg.adminReplies?.length > 0
                        ? `<span class="text-green-400 font-bold">✔ Replied</span>`
                        : `<span class="text-yellow-400">⏳ Waiting</span>`
                    }
                </div>

                <!-- USER MESSAGE (RIGHT SIDE) -->
                <div class="flex justify-end mb-3">
                    <div class="bg-zinc-800 text-white px-3 py-2 rounded-xl max-w-xs break-words">
                        ${msg.message}
                        <div class="text-[10px] text-zinc-500 mt-1">
                            You
                        </div>
                    </div>
                </div>

                <!-- ADMIN REPLIES (LEFT SIDE) -->
                ${
                    msg.adminReplies?.length
                    ? msg.adminReplies.map(r => `
                        <div class="flex justify-start mb-2">
                            <div class="bg-blue-600 text-white px-3 py-2 rounded-xl max-w-xs break-words">
                                ${r.text}
                                <div class="text-[10px] opacity-60 mt-1">
                                    ${new Date(r.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    `).join("")
                    : `<p class="text-xs text-zinc-500">No reply yet</p>`
                }

            </div>

        `).join("");

        // AUTO SCROLL TO BOTTOM
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
        isInitialLoadDone = true;

    } catch (err) {
        console.error("Failed to load messages:", err);
        document.getElementById("messagesContainer").innerHTML =
            "<p class='text-red-400'>Failed to load messages</p>";
    }
}

// AUTO LOAD ON PAGE OPEN
document.addEventListener("DOMContentLoaded", () => {
    const email =
    localStorage.getItem("userEmail") ||
    document.getElementById("emailInput")?.value;

    if (email) {
        loadUserMessages(email);
    }
});

socket.on("messageUpdated", (data) => {
    const email =
        localStorage.getItem("userEmail") ||
        document.getElementById("emailInput")?.value;

    if (!email || !data.email) return;

    if (data.email !== email) return;

    // only refresh AFTER first load is done
    if (!isInitialLoadDone) return;

    loadUserMessages(email);
});