self.addEventListener("push", event => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {}

  const title = data.title || "AIMRELAX-PUBG";

  const options = {
    body: data.body || "Դուք ունեք նոր ծանուցում։",
    icon: data.icon || "/aimrelax-pubg.github.io/icon-192.png",
    badge: data.badge || "/aimrelax-pubg.github.io/icon-192.png",
    data: {
      url: data.url || "/aimrelax-pubg.github.io/"
    },
    vibrate: [200, 100, 200],
    tag: data.tag || "aimrelax-notification"
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  const url =
    event.notification.data?.url ||
    "/aimrelax-pubg.github.io/";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(list => {

      for (const client of list) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }

      return clients.openWindow(url);
    })
  );
});
