if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let a={};const r=e=>n(e,c),d={module:{uri:c},exports:a,require:r};s[c]=Promise.all(t.map((e=>d[e]||r(e)))).then((e=>(i(...e),a)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/427-3a97729d53329a81.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/516.c531e85b96617f2d.js",revision:"c531e85b96617f2d"},{url:"/_next/static/chunks/79-c13a440c7c37501f.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/app/(auth)/register/page-44c0b92f397721b8.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/app/layout-15e615960815eb4f.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/app/newpost/%5BnewpostId%5D/page-727f53bcc7c714f3.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/app/newpost/page-a3c8655894cddac8.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/app/not-found-63d5120bc3445b8e.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/app/page-3cd147e706ddd5ea.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/app/posts/%5BpostID%5D/page-60faeaa011f98519.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/app/posts/page-ca215f9645805728.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/app/profile/%5Busername%5D/page-fdfa19435bb5dad5.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/main-810795c35d191d47.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/main-app-ef3872fac78d2de8.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/pages/_app-907dedfd0e4177db.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/pages/_error-b5ee443ea3f1b36c.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-461b9510b7755500.js",revision:"edyRXYPd76KjICcilsyUj"},{url:"/_next/static/css/37a9a574b848cd0e.css",revision:"37a9a574b848cd0e"},{url:"/_next/static/css/4a491729b28d2585.css",revision:"4a491729b28d2585"},{url:"/_next/static/css/a526cf0fc2de5c7f.css",revision:"a526cf0fc2de5c7f"},{url:"/_next/static/edyRXYPd76KjICcilsyUj/_buildManifest.js",revision:"a2fca4e7c42d36e6bd2b18d2c2583e62"},{url:"/_next/static/edyRXYPd76KjICcilsyUj/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:s})=>{if(!e)return!1;const n=s.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e,sameOrigin:s})=>!!s&&!e.pathname.startsWith("/api/")),new e.NetworkFirst({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
