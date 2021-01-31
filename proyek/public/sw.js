importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

  if (workbox) {
    console.log("ok");
    const urlsToCache = [
    { url: '/', revision: '1' },
    { url: 'nav.html', revision: '1' },
    { url: 'manifest.json', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: 'detailteams.html', revision: '1' },
    { url: 'pages/about.html', revision: '1' },
    { url: 'pages/contact.html', revision: '1' },
    { url: 'pages/favorites.html', revision: '1' },
    { url: 'pages/home.html', revision: '1' },
    { url: 'pages/teams.html', revision: '1' },
    { url: 'css/about.css', revision: '1' },
    { url: 'css/contact.css', revision: '1' },
    { url: 'css/materialize.min.css', revision: '1' },
    { url: 'css/preloaders.css', revision: '1' },
    { url: 'css/style.css', revision: '1' },
    { url: 'js/api.js', revision: '1' },
    { url: 'js/idb.js', revision: '1' },
    { url: 'js/db.js', revision: '1' },
    { url: 'js/main.js', revision: '1' },
    { url: 'js/maindetail.js', revision: '1' },
    { url: 'js/materialize.min.js', revision: '1' },
    { url: 'js/nav.js', revision: '1' },
    { url: 'js/preloaders.js', revision: '1' },
    { url: 'js/scroll.js', revision: '1' },
    { url: 'images/favorit.jpg', revision: '1' },
    { url: 'images/homes.png', revision: '1' },
    { url: 'images/icos.png', revision: '1' },
    { url: 'images/jerseys.jpeg', revision: '1' },
    { url: 'images/logo.png', revision: '1' },
    { url: 'images/love.png', revision: '1' },
    { url: 'images/messi.jpg', revision: '1' },
    { url: 'images/navlogo.png', revision: '1' },
    { url: 'images/prefer.png', revision: '1' },
    { url: 'images/premier.png', revision: '1' },
    { url: 'images/ronaldo.jpg', revision: '1' },
    { url: 'images/socmed.jpg.png', revision: '1' },
    { url: 'images/widow.png', revision: '1' },
    { url: 'images/icons/icon-72x72.png', revision: '1' },
    { url: 'images/icons/icon-96x96.png', revision: '1' },
    { url: 'images/icons/icon-128x128.png', revision: '1' },
    { url: 'images/icons/icon-144x144.png', revision: '1' },
    { url: 'images/icons/icon-152x152.png', revision: '1' },
    { url: 'images/icons/icon-192x192.png', revision: '1' },
    { url: 'images/icons/icon-384x384.png', revision: '1' },
    { url: 'images/icons/icon-512x512.png', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1'},
  ];
    workbox.precaching.precacheAndRoute(urlsToCache, {
    ignoreUrlParametersMatching: [/.*/],
  });

  workbox.routing.registerRoute(
    /.*(?:png|svg|jpg|jpeg)$/,
    workbox.strategies.cacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 200,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 day
            }),
        ],
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'data-mengball',
      plugins: [
        new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 day
        }),
      ],
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp('https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'material-icons',
      plugins: [
        new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 day
        }),
      ],
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp('https://fonts.googleapis.com/icon?family=Material+Icons'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'fonts-google',
      plugins: [
        new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 day
        }),
      ],
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp('js/'),
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'js'
      })
  );
  
  workbox.routing.registerRoute(
    new RegExp('css/'),
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'css'
      })
  );
  
  workbox.routing.registerRoute(
    new RegExp('pages/'),
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
      })
  );
  } else {
    console.log("Fail");
  }
  
  self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'images/icons/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });