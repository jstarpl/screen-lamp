self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("v1").then(function (cache) {
      return cache.addAll(["/", "/index.html"]);
    })
  );
});

function storeInCache(event, response) {
  // response may be used only once
  // we need to save clone to put one copy in cache
  // and serve second one
  let responseClone = response.clone();

  caches.open("v1").then(function (cache) {
    cache.put(event.request, responseClone);
  });
  return response;
}

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request)
      .then((response) => storeInCache(event, response))
      .catch(() => caches.match(event.request).then((response) => {
        if (response !== undefined) {
          return response
        } else {
          caches.match("/")
        }
      }))
  );
});
