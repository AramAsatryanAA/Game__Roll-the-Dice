// Check if the browser supports "Webp" and adding the appropriate class "webp" or "no-webp" for HTML
export function isSupportedWebp() {
  // 1 --- Check if the browser supports "Webp"
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  // 2 --- Adding the appropriate class "webp" or "no-webp" for HTML
  testWebP(function (support) {
    const className = support === true ? "webp" : "no-webp";

    document.documentElement.classList.add(className);
  });
}
