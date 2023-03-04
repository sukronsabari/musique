/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <meta name="theme-color" content="#F9F9F9" />
        {/* mengaktifkan modus layar penuh */}
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* warna status bar */}
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <meta name="apple-mobile-web-app-title" content="MusiQue" />

        <meta property="og:type" content="Application Music" />
        <meta property="og:title" content="Kumpulan music hits" />
        <meta
          property="og:description"
          content="Dengarkan lagu favorit anda disini"
        />
        <meta property="og:url" content="https://musique.vercel.app/" />
        <meta
          property="og:image"
          content="https://i.ibb.co/2dKpZW4/tesss.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
