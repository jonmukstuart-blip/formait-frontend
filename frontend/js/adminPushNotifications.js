function getAdminPushApi() {
    const backend =
        window.API_BASE ||
        "https://formait-backend.onrender.com";

    return `${backend}/api/admin/push`;
}

function getAdminToken() {
    return (
        localStorage.getItem("token") ||
        localStorage.getItem("authToken")
    );
}

function convertVapidKey(base64String) {
    const padding =
        "=".repeat(
            (4 - base64String.length % 4) % 4
        );

    const normalized =
        (base64String + padding)
            .replace(/-/g, "+")
            .replace(/_/g, "/");

    const rawData =
        window.atob(normalized);

    return Uint8Array.from(
        [...rawData].map(character =>
            character.charCodeAt(0)
        )
    );
}

async function getPushRegistration() {
    return navigator.serviceWorker.register(
        "/admin-push-sw.js",
        {
            scope: "/"
        }
    );
}

async function updateAdminPushButton() {
    const button =
        document.getElementById(
            "adminPushButton"
        );

    if (!button) return;

    if (
        !("serviceWorker" in navigator) ||
        !("PushManager" in window) ||
        !("Notification" in window)
    ) {
        button.textContent =
            "Push unsupported";

        button.disabled = true;
        return;
    }

    if (
        Notification.permission ===
        "denied"
    ) {
        button.textContent =
            "🔕 Alerts blocked";

        return;
    }

    const registration =
        await getPushRegistration();

    const subscription =
        await registration.pushManager
            .getSubscription();

    button.textContent = subscription
        ? "🔔 Phone alerts active"
        : "🔔 Enable phone alerts";

    button.dataset.enabled =
        subscription ? "true" : "false";
}

window.enableAdminPushNotifications =
async function () {
    try {
        const token = getAdminToken();

        if (!token) {
            alert(
                "Please sign in again before enabling notifications."
            );

            return;
        }

        if (
            !("serviceWorker" in navigator) ||
            !("PushManager" in window) ||
            !("Notification" in window)
        ) {
            alert(
                "Push notifications are not supported on this device."
            );

            return;
        }

        const permission =
            await Notification
                .requestPermission();

        if (permission !== "granted") {
            alert(
                "Notification permission was not granted."
            );

            await updateAdminPushButton();
            return;
        }

        const registration =
            await getPushRegistration();

        const keyResponse = await fetch(
            `${getAdminPushApi()}/public-key`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        if (!keyResponse.ok) {
            throw new Error(
                "Unable to retrieve the push public key"
            );
        }

        const { publicKey } =
            await keyResponse.json();

        let subscription =
            await registration.pushManager
                .getSubscription();

        if (!subscription) {
            subscription =
                await registration.pushManager
                    .subscribe({
                        userVisibleOnly: true,

                        applicationServerKey:
                            convertVapidKey(
                                publicKey
                            )
                    });
        }

        const saveResponse = await fetch(
            `${getAdminPushApi()}/subscribe`,
            {
                method: "POST",

                headers: {
                    Authorization:
                        `Bearer ${token}`,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    subscription:
                        subscription.toJSON()
                })
            }
        );

        if (!saveResponse.ok) {
            const errorData =
                await saveResponse
                    .json()
                    .catch(() => ({}));

            throw new Error(
                errorData.message ||
                "Unable to save this device"
            );
        }

        await updateAdminPushButton();

        new Notification(
            "FORMA.IT alerts enabled",
            {
                body:
                    "This device will receive WhatsApp business notifications."
            }
        );

    } catch (error) {
        console.error(
            "[ADMIN PUSH ERROR]",
            error
        );

        alert(error.message);
    }
};

window.disableAdminPushNotifications =
async function () {
    try {
        const token = getAdminToken();

        const registration =
            await getPushRegistration();

        const subscription =
            await registration.pushManager
                .getSubscription();

        if (!subscription) {
            await updateAdminPushButton();
            return;
        }

        await fetch(
            `${getAdminPushApi()}/unsubscribe`,
            {
                method: "DELETE",

                headers: {
                    Authorization:
                        `Bearer ${token}`,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    endpoint:
                        subscription.endpoint
                })
            }
        );

        await subscription.unsubscribe();
        await updateAdminPushButton();

    } catch (error) {
        console.error(
            "[PUSH DISABLE ERROR]",
            error
        );
    }
};

window.toggleAdminPushNotifications =
async function () {
    const registration =
        await getPushRegistration();

    const subscription =
        await registration.pushManager
            .getSubscription();

    if (subscription) {
        const confirmed = confirm(
            "Disable phone notifications on this device?"
        );

        if (confirmed) {
            await window
                .disableAdminPushNotifications();
        }

        return;
    }

    await window
        .enableAdminPushNotifications();
};

document.addEventListener(
    "DOMContentLoaded",
    () => {
        updateAdminPushButton()
            .catch(error =>
                console.error(
                    "[PUSH BUTTON ERROR]",
                    error
                )
            );
    }
);