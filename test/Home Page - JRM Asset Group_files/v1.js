(function () {
  function domReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      setTimeout(fn, 0);
    }
  }

  let iframeminheight = 364;

  const options = document.currentScript.dataset;
  const iframe = document.createElement("iframe");
  iframe.classList.add('letterbird-embed');

  if (!options.letterbirduser) {
    console.error("No Letterbird user provided. Please add the data-letterbirduser parameter to your script tag!");
    return;
  }
  if (!options.targetelement && document.currentScript.parentElement.nodeName === "HEAD") {
    console.error("Letterbird embed script detected in <head> tag without targetelement specified.");
    return;
  }

  let iframeurl = "https://letterbird.";
  iframeurl += options.tld || "co";
  iframeurl += `/${options.letterbirduser}`
  iframeurl += `?origin=${window.origin}`

  let queryparams = [];
  if (options.showheader === "true") {
    iframeminheight = 436;
  }
  else {
    queryparams.push("hideheader=1");
  }

  if (options.name) queryparams.push(`name=${encodeURIComponent(options.name)}`);
  if (options.email) queryparams.push(`email=${encodeURIComponent(options.email)}`);
  if (options.subject) queryparams.push(`subject=${encodeURIComponent(options.subject)}`);
  if (options.body) queryparams.push(`body=${encodeURIComponent(options.body)}`);
  if (options.placeholder) queryparams.push(`placeholder=${encodeURIComponent(options.placeholder)}`);

  if (queryparams.length) {
    iframeurl += `&${queryparams.join("&")}`;
  }

  iframe.src = iframeurl;

  const css = document.createElement("style");
  css.innerHTML = `iframe.letterbird-embed { width: 100%; max-width: ${options.width || "616px"}; min-width: 240px; min-height: ${iframeminheight}px; aspect-ratio: auto; display:block; margin-inline: auto; background-color: transparent; border: 0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, .05), 0 8px 32px rgba(0, 0, 0, .05), 0 32px 64px -8px rgba(0, 0, 0, .05); }`;
  document.head.appendChild(css);

  if (options.targetelement) {
    domReady(() => {
      let target = document.getElementById(options.targetelement);
      if (!target) {
        target = document.querySelector(options.targetelement);
      }
      try {
        target.appendChild(iframe);
      }
      catch (error) {
        console.error(`Target "${options.targetelement}" does not return a matching element.`);
      }
    });
  }
  else {
    document.currentScript.parentNode.insertBefore(iframe, document.currentScript);
  }

  window.addEventListener("message", (evt) => {
    if (evt.origin !== new URL(iframe.src).origin) return;
    iframe.setAttribute("height", parseInt(evt.data, 10) + "px");
  })
})();
