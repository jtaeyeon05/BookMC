import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

function App() {
  const [value, setValue] = useState("");

  const isWritten = value !== "";
  const FaviconPath = isWritten
    ? "/assets/favicons-written"
    : "/assets/favicons";
  const FaviconIconPath = isWritten ? "/favicon-written.ico" : "/favicon.ico";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const savedValue = params.get("v");

    if (savedValue) {
      try {
        const decompressedValue = decompressFromEncodedURIComponent(savedValue);
        if (decompressedValue != null) {
          setValue(decompressedValue);
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (value) {
      params.set("v", compressToEncodedURIComponent(value));
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`,
      );
    } else {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [value]);

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
          href={`${FaviconPath}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href={`${FaviconPath}/favicon_64x64.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${FaviconPath}/favicon_32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${FaviconPath}/favicon_16x16.png`}
        />
      </Helmet>

      <div className="flex flex-col items-start w-dvw h-dhv p-4 gap-2 text-lg overflow-hidden">
        <button
          type="button"
          className="px-2 py-1 bg-button-background text-button-content border-2 border-button-outline cursor-pointer"
          onClick={async () => {
            if (navigator?.clipboard)
              navigator.clipboard.writeText(window.location.href);
          }}
        >
          복사
        </button>

        <textarea
          className="w-full min-h-16 p-2 bg-book-paper border-2 border-content"
          translate="no"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </div>
    </HelmetProvider>
  );
}

export default App;
