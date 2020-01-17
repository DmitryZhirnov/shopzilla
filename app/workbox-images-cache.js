workbox.routing.registerRoute(
    /https:\/\/i.picsum.photos\/id\/.*/,
    new workbox.strategies.CacheFirst({
      plugins: [
        new workbox.rangeRequests.Plugin(),
      ],
    }),
    'GET'
  );
