const KNOWLEDGE_API =
    `${window.API_BASE}/api/admin/business-knowledge`;

let editingKnowledgeId = null;

function knowledgeHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
}

function escapeKnowledgeHTML(value = "") {
    const element = document.createElement("div");
    element.textContent = value;
    return element.innerHTML;
}

window.openKnowledgeBase = function () {
    document.getElementById("knowledgeBaseOverlay")?.remove();

    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div id="knowledgeBaseOverlay"
             style="
                position:fixed;
                inset:0;
                z-index:99999;
                background:#080808;
                color:white;
                overflow:auto;
                padding:40px;
             ">

            <div style="max-width:1200px;margin:auto;">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:35px;
                ">
                    <div>
                        <h1 style="font-size:32px;margin:0;">
                            Business Knowledge Base
                        </h1>

                        <p style="color:#888;margin-top:8px;">
                            Information your WhatsApp assistant uses when answering customers.
                        </p>
                    </div>

                    <button
                        onclick="closeKnowledgeBase()"
                        style="
                            background:#18181b;
                            color:white;
                            border:1px solid #333;
                            padding:12px 20px;
                            border-radius:10px;
                            cursor:pointer;
                        ">
                        Close
                    </button>
                </div>

                <div style="
                    background:#111;
                    border:1px solid #222;
                    border-radius:18px;
                    padding:25px;
                    margin-bottom:30px;
                ">

                    <h2 id="knowledgeFormTitle">
                        Add Knowledge
                    </h2>

                    <select id="knowledgeCategory"
                        style="width:100%;padding:14px;margin:10px 0;background:#090909;color:white;border:1px solid #333;border-radius:10px;">

                        <option value="company">Company Information</option>
                        <option value="service">Service</option>
                        <option value="pricing">Pricing</option>
                        <option value="faq">FAQ</option>
                        <option value="policy">Policy</option>
                        <option value="portfolio">Portfolio</option>
                    </select>

                    <input
                        id="knowledgeTitle"
                        placeholder="Title"
                        style="width:100%;padding:14px;margin:10px 0;background:#090909;color:white;border:1px solid #333;border-radius:10px;"
                    >

                    <textarea
                        id="knowledgeContent"
                        placeholder="Enter the information the chatbot should know..."
                        rows="6"
                        style="width:100%;padding:14px;margin:10px 0;background:#090909;color:white;border:1px solid #333;border-radius:10px;resize:vertical;"
                    ></textarea>

                    <input
                        id="knowledgeKeywords"
                        placeholder="Keywords: website, development, pricing"
                        style="width:100%;padding:14px;margin:10px 0;background:#090909;color:white;border:1px solid #333;border-radius:10px;"
                    >

                    <button
                        onclick="saveBusinessKnowledge()"
                        style="
                            margin-top:12px;
                            background:#3b82f6;
                            color:white;
                            border:0;
                            padding:14px 22px;
                            border-radius:10px;
                            font-weight:700;
                            cursor:pointer;
                        ">
                        Save Knowledge
                    </button>

                    <button
                        id="cancelKnowledgeEdit"
                        onclick="resetKnowledgeForm()"
                        style="
                            display:none;
                            margin-left:10px;
                            background:#27272a;
                            color:white;
                            border:0;
                            padding:14px 22px;
                            border-radius:10px;
                            cursor:pointer;
                        ">
                        Cancel
                    </button>
                </div>

                <div id="knowledgeRecords">
                    Loading knowledge...
                </div>

            </div>
        </div>
        `
    );

    loadBusinessKnowledge();
};

window.closeKnowledgeBase = function () {
    document.getElementById("knowledgeBaseOverlay")?.remove();
};

window.loadBusinessKnowledge = async function () {
    const container =
        document.getElementById("knowledgeRecords");

    if (!container) return;

    try {
        const response = await fetch(
            KNOWLEDGE_API,
            {
                headers: knowledgeHeaders()
            }
        );

        if (response.status === 401) {
            container.innerHTML =
                "Your login has expired. Please log in again.";
            return;
        }

        const records = await response.json();

        if (!response.ok) {
            throw new Error(
                records.error || "Could not load knowledge"
            );
        }

        if (!records.length) {
            container.innerHTML = `
                <div style="
                    border:1px dashed #333;
                    padding:35px;
                    border-radius:16px;
                    color:#888;
                    text-align:center;
                ">
                    No business knowledge added yet.
                </div>
            `;

            return;
        }

        container.innerHTML = records.map(record => `
            <div style="
                background:#111;
                border:1px solid #222;
                border-radius:16px;
                padding:22px;
                margin-bottom:14px;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    gap:20px;
                ">

                    <div style="flex:1;">

                        <div style="
                            color:#3b82f6;
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:.12em;
                            margin-bottom:8px;
                        ">
                            ${escapeKnowledgeHTML(record.category)}
                        </div>

                        <h3 style="margin:0 0 10px;">
                            ${escapeKnowledgeHTML(record.title)}
                        </h3>

                        <p style="
                            color:#aaa;
                            line-height:1.7;
                            white-space:pre-wrap;
                        ">${escapeKnowledgeHTML(record.content)}</p>

                    </div>

                    <div style="white-space:nowrap;">

                        <button
                            onclick="editBusinessKnowledge('${record._id}')"
                            style="
                                background:#18181b;
                                color:white;
                                border:1px solid #333;
                                padding:9px 13px;
                                border-radius:8px;
                                cursor:pointer;
                            ">
                            Edit
                        </button>

                        <button
                            onclick="deleteBusinessKnowledge('${record._id}')"
                            style="
                                background:#2a1010;
                                color:#ff7373;
                                border:1px solid #552020;
                                padding:9px 13px;
                                border-radius:8px;
                                cursor:pointer;
                            ">
                            Delete
                        </button>

                    </div>

                </div>

            </div>
        `).join("");

        window.businessKnowledgeRecords = records;

    } catch (error) {
        console.error("[KNOWLEDGE ERROR]", error);

        container.innerHTML =
            `Could not load knowledge: ${escapeKnowledgeHTML(error.message)}`;
    }
};

window.saveBusinessKnowledge = async function () {
    const category =
        document.getElementById("knowledgeCategory").value;

    const title =
        document.getElementById("knowledgeTitle").value.trim();

    const content =
        document.getElementById("knowledgeContent").value.trim();

    const keywords =
        document.getElementById("knowledgeKeywords")
            .value
            .split(",")
            .map(value => value.trim())
            .filter(Boolean);

    if (!title || !content) {
        alert("Title and content are required.");
        return;
    }

    const url = editingKnowledgeId
        ? `${KNOWLEDGE_API}/${editingKnowledgeId}`
        : KNOWLEDGE_API;

    const response = await fetch(url, {
        method: editingKnowledgeId
            ? "PUT"
            : "POST",

        headers: knowledgeHeaders(),

        body: JSON.stringify({
            category,
            title,
            content,
            keywords,
            active: true
        })
    });

    const data = await response.json();

    if (!response.ok) {
        alert(data.error || "Could not save knowledge");
        return;
    }

    resetKnowledgeForm();
    await loadBusinessKnowledge();
};

window.editBusinessKnowledge = function (id) {
    const record =
        window.businessKnowledgeRecords?.find(
            item => item._id === id
        );

    if (!record) return;

    editingKnowledgeId = id;

    document.getElementById("knowledgeCategory").value =
        record.category;

    document.getElementById("knowledgeTitle").value =
        record.title;

    document.getElementById("knowledgeContent").value =
        record.content;

    document.getElementById("knowledgeKeywords").value =
        (record.keywords || []).join(", ");

    document.getElementById("knowledgeFormTitle").textContent =
        "Edit Knowledge";

    document.getElementById(
        "cancelKnowledgeEdit"
    ).style.display = "inline-block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

window.resetKnowledgeForm = function () {
    editingKnowledgeId = null;

    document.getElementById("knowledgeTitle").value = "";
    document.getElementById("knowledgeContent").value = "";
    document.getElementById("knowledgeKeywords").value = "";

    document.getElementById("knowledgeFormTitle").textContent =
        "Add Knowledge";

    document.getElementById(
        "cancelKnowledgeEdit"
    ).style.display = "none";
};

window.deleteBusinessKnowledge = async function (id) {
    if (!confirm("Delete this knowledge entry?")) {
        return;
    }

    const response = await fetch(
        `${KNOWLEDGE_API}/${id}`,
        {
            method: "DELETE",
            headers: knowledgeHeaders()
        }
    );

    const data = await response.json();

    if (!response.ok) {
        alert(data.error || "Could not delete knowledge");
        return;
    }

    await loadBusinessKnowledge();
};