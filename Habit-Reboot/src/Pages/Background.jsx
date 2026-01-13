import { useEffect } from "react";

export default function Background() {
  useEffect(() => {
    const init = () => {
      if (window.UnicornStudio && !window.UnicornStudio.__inited) {
        window.UnicornStudio.init();
        window.UnicornStudio.__inited = true;
      }
    };

    if (window.UnicornStudio) {
      requestAnimationFrame(init);
      return;
    }


    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.1/dist/unicornStudio.umd.js";
    script.async = true;

    script.onload = () => {
      requestAnimationFrame(init);
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div
      data-us-project="iR8bQLy45K3TMJtS3ksF"
      style={{
        
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
    />
  );
}
