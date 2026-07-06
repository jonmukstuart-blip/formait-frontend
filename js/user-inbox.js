async function loadUserMessages(email) {
    if (!email) {
        alert("Please enter your email");
        return;
    }

    const res = await fetch(`${API_BASE}/api/messages`);
    const messages = await res.json();

    const userMessages = messages.filter(m => m.email === email);

    const container = document.getElementById("messagesContainer");

    if (userMessages.length === 0) {
        container.innerHTML = "<p class='text-zinc-500'>No messages found.</p>";
        return;
    }

    container.innerHTML = userMessages.map(msg => `
        <div class="border border-zinc-800 p-4 rounded-lg">

            <p class="font-bold text-white">${msg.name}</p>
            <p class="text-zinc-400 mt-1">${msg.message}</p>

            <div class="mt-3">
                <p class="text-xs text-zinc-500">Status: ${msg.status}</p>
            </div>

            ${
                msg.adminReplies?.length
                ? `
                    <div class="mt-4 p-3 bg-zinc-900 rounded">
                        <p class="text-green-400 text-xs font-bold mb-2">Admin Replies:</p>

                        ${msg.adminReplies.map(r => `
                            <div class="border-l-2 border-blue-500 pl-3 mb-2">
                                <p class="text-sm text-white">${r.text}</p>
                                <p class="text-[10px] text-zinc-500">
                                    ${new Date(r.createdAt).toLocaleString()}
                                </p>
                            </div>
                        `).join("")}
                    </div>
                `
                : `<p class="text-xs text-zinc-500 mt-2">No reply yet</p>`
            }

        </div>
    `).join("");
}