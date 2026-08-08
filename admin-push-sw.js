self.addEventListener("push", event => {
    let payload = {};

    try {
        payload = event.data
            ? event.data.json()
            : {};
    } catch {
        payload = {
            title: "FORMA.IT Notification",
            body: event.data?.text() || ""
        };
    }

    const urgent =
        payload.urgent === true;

    const options = {
        body:
            payload.body ||
            "You have a new WhatsApp update.",

        tag:
            payload.tag ||
            "formait-admin-alert",

        renotify: true,
        requireInteraction: urgent,
        silent: false,

        vibrate: urgent
            ? [300, 150, 300, 150, 600]
            : [200],

        data: {
            url:
                payload.url ||
                "/admin.html",

            ...payload.data
        }
    };

    event.waitUntil(
        self.registration.showNotification(
            payload.title ||
            "FORMA.IT Admin",
            options
        )
    );
});

self.addEventListener(
    "notificationclick",
    event => {
        event.notification.close();

        const targetUrl =
            event.notification.data?.url ||
            "/admin.html";

        event.waitUntil(
            clients.matchAll({
                type: "window",
                includeUncontrolled: true
            }).then(openClients => {
                const existingClient =
                    openClients.find(client =>
                        client.url.includes(
                            "/admin.html"
                        )
                    );

                if (existingClient) {
                    existingClient.navigate(
                        targetUrl
                    );

                    return existingClient.focus();
                }

                return clients.openWindow(
                    targetUrl
                );
            })
        );
    }
);