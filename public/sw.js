if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const o=e=>n(e,i),r={module:{uri:i},exports:t,require:o};s[i]=Promise.all(c.map((e=>r[e]||o(e)))).then((e=>(a(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/c3Duslj0YsM5p7ExfUvUM/_buildManifest.js",revision:"432e4c61da0fcd2a1bb958084ee99014"},{url:"/_next/static/c3Duslj0YsM5p7ExfUvUM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/254-809c8fc502fff887.js",revision:"809c8fc502fff887"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-0bd9ec80e456f666.js",revision:"0bd9ec80e456f666"},{url:"/_next/static/chunks/pages/404-cfc920cea89be596.js",revision:"cfc920cea89be596"},{url:"/_next/static/chunks/pages/500-a020de7b634cd8d1.js",revision:"a020de7b634cd8d1"},{url:"/_next/static/chunks/pages/_app-d2c448e1e4d7dbf0.js",revision:"d2c448e1e4d7dbf0"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/index-dfc07b7db49db9dc.js",revision:"dfc07b7db49db9dc"},{url:"/_next/static/chunks/pages/search/%5BsearchTerm%5D-fcdd6eb48e142d04.js",revision:"fcdd6eb48e142d04"},{url:"/_next/static/chunks/pages/songs/%5Bsongid%5D-bc5bcd53574aa6c2.js",revision:"bc5bcd53574aa6c2"},{url:"/_next/static/chunks/pages/topchart-895d950a10805c88.js",revision:"895d950a10805c88"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-59c5c889f52620d6.js",revision:"59c5c889f52620d6"},{url:"/_next/static/css/1b1cf59279a9b628.css",revision:"1b1cf59279a9b628"},{url:"/_next/static/css/ab94ab36f2b34b44.css",revision:"ab94ab36f2b34b44"},{url:"/_next/static/css/e2c46227e800ac24.css",revision:"e2c46227e800ac24"},{url:"/_next/static/media/image404.5c845029.svg",revision:"6dc62b3b0f8f183325f41e155569586f"},{url:"/_next/static/media/nocoverart.08f3ca92.jpg",revision:"557d28be7d832f626d8510b1ed2bfbbd"},{url:"/favicon.ico",revision:"709fb73a2541a1cc5db14a5abc4fec9e"},{url:"/icons/icon-128x128.png",revision:"0aafaefd0a5014e08aa53a7d66731a5f"},{url:"/icons/icon-144x144.png",revision:"93a2558488c35c24875122fa04f51c86"},{url:"/icons/icon-152x152.png",revision:"f5f9fd241fddedca2a4f5a1effaf351c"},{url:"/icons/icon-192x192.png",revision:"a5814513d9b00167e2db146a03ea117d"},{url:"/icons/icon-384x384.png",revision:"fda15c1ac1c831db43a9459e360e8336"},{url:"/icons/icon-512x512.png",revision:"58279966385f04eabb17f139306523a4"},{url:"/icons/icon-72x72.png",revision:"b170af0427ed031db1dfb21b4740d66c"},{url:"/icons/icon-96x96.png",revision:"0034775c21fa3958ff141d42ea242eb0"},{url:"/manifest.json",revision:"499906488d6e9f24761444965442e688"},{url:"/nocoverart.jpg",revision:"557d28be7d832f626d8510b1ed2bfbbd"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));