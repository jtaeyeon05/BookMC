import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const [isFaviconWritten, setIsFaviconWritten] = useState(false);
  const [count, setCount] = useState(0);

  const FaviconPath = isFaviconWritten
    ? "/assets/favicons-written"
    : "/assets/favicons";
  const FaviconIconPath = isFaviconWritten
    ? "/favicon-written.ico"
    : "/favicon.ico";

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="icon" sizes="any" href={FaviconIconPath} />
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${FaviconPath}/favicon.svg`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${FaviconIconPath}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href={`${FaviconIconPath}/favicon_64x64.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${FaviconIconPath}/favicon_32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${FaviconIconPath}/favicon_16x16.png`}
        />
      </Helmet>

      <div>
        <div>Hello World!: {count}</div>
        <button type="button" onClick={() => setCount((prev) => prev + 1)}>
          Increase
        </button>
        <button
          type="button"
          onClick={() => setIsFaviconWritten((prev) => !prev)}
        >
          Change the Favicon ({isFaviconWritten ? "W" : "D"})
        </button>
      </div>
    </HelmetProvider>
  );
}

export default App;
