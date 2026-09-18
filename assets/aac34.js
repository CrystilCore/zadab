(function () {
  var we771 = 1200;
  var f2718 = 4000;
  var f464d = null;
  var aad5f = null;

  function c2437() {
    clearTimeout(f464d);
    f464d = setTimeout(b43f3, we771 + Math.random() * (f2718 - we771));
  }

  function b43f3() {
    aad5f.classList.remove("b43f3");
    void aad5f.offsetWidth; 
    aad5f.classList.add("b43f3");
  }

  function n6275() {
    aad5f = document.querySelector(".d1484");
    if (!aad5f) return;

    var eaa1c = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (eaa1c && eaa1c.matches) return;

    aad5f.addEventListener("animationend", c2437);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(f464d);
      else c2437();
    });

    c2437();
  }

  window.q992f = n6275;
})();
