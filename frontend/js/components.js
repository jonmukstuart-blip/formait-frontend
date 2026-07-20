async function loadComponents(){

    try {

        const whatsapp = await fetch("./src/components/whatsapp-button.html");

        if(!whatsapp.ok){
            throw new Error("WhatsApp component failed to load");
        }

        const html = await whatsapp.text();

        document.body.insertAdjacentHTML(
            "beforeend",
            html
        );
        initializeDraggableWhatsApp();

        console.log("✅ WhatsApp button injected");

    } catch(error){

        console.error(
            "❌ Component injection error:",
            error
        );

    }

}

function initializeDraggableWhatsApp() {
    const button = document.querySelector(".whatsapp-float");

    if (!button) return;

    let holdTimer = null;
    let dragging = false;
    let suppressClick = false;

    let pointerOffsetX = 0;
    let pointerOffsetY = 0;

let savedPosition = null;

try {
    savedPosition = JSON.parse(
        localStorage.getItem("whatsappButtonPosition") || "null"
    );
} catch (error) {
    localStorage.removeItem("whatsappButtonPosition");
}

    function clampPosition(left, top) {
        const rect = button.getBoundingClientRect();

        const maximumLeft =
            window.innerWidth - rect.width - 10;

        const maximumTop =
            window.innerHeight - rect.height - 10;

        return {
            left: Math.max(10, Math.min(left, maximumLeft)),
            top: Math.max(10, Math.min(top, maximumTop))
        };
    }

    function applyPosition(left, top) {
        const position = clampPosition(left, top);

        button.style.left = `${position.left}px`;
        button.style.top = `${position.top}px`;
        button.style.right = "auto";
        button.style.bottom = "auto";
    }

    if (
        savedPosition &&
        Number.isFinite(savedPosition.left) &&
        Number.isFinite(savedPosition.top)
    ) {
        applyPosition(
            savedPosition.left,
            savedPosition.top
        );
    }

    button.addEventListener("pointerdown", event => {
        if (event.button !== undefined && event.button !== 0) {
            return;
        }

        const rect = button.getBoundingClientRect();

        pointerOffsetX = event.clientX - rect.left;
        pointerOffsetY = event.clientY - rect.top;

        holdTimer = setTimeout(() => {
            dragging = true;
            suppressClick = true;

            button.classList.add("whatsapp-dragging");

            applyPosition(rect.left, rect.top);

            button.setPointerCapture?.(event.pointerId);

            if (navigator.vibrate) {
                navigator.vibrate(40);
            }
        }, 450);
    });

    button.addEventListener("pointermove", event => {
        if (!dragging) return;

        event.preventDefault();

        applyPosition(
            event.clientX - pointerOffsetX,
            event.clientY - pointerOffsetY
        );
    });

    function finishDragging(event) {
        clearTimeout(holdTimer);
        holdTimer = null;

        if (!dragging) return;

        dragging = false;
        button.classList.remove("whatsapp-dragging");

        button.releasePointerCapture?.(event.pointerId);

        const rect = button.getBoundingClientRect();

        localStorage.setItem(
            "whatsappButtonPosition",
            JSON.stringify({
                left: rect.left,
                top: rect.top
            })
        );
    }

    button.addEventListener("pointerup", finishDragging);
    button.addEventListener("pointercancel", finishDragging);

    button.addEventListener("click", event => {
        if (!suppressClick) return;

        event.preventDefault();
        event.stopPropagation();

        suppressClick = false;
    });

    window.addEventListener("resize", () => {
        const rect = button.getBoundingClientRect();

        if (button.style.left) {
            applyPosition(rect.left, rect.top);
        }
    });
}

document.addEventListener(
    "DOMContentLoaded",
    loadComponents
);