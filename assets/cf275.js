(function () {
  var zf936 = 1200;
  var x1cab = 4000;
  var m8c41 = null;
  var w158e = null;

  function x08a3() {
    clearTimeout(m8c41);
    m8c41 = setTimeout(hf219, zf936 + Math.random() * (x1cab - zf936));
  }

  function hf219() {
    w158e.classList.remove("hf219");
    void w158e.offsetWidth; 
    w158e.classList.add("hf219");
  }

  function yd390() {
    w158e = document.querySelector(".a6563");
    if (!w158e) return;

    var z47c0 = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (z47c0 && z47c0.matches) return;

    w158e.addEventListener("animationend", x08a3);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(m8c41);
      else x08a3();
    });

    x08a3();
  }

  window.w3e25 = yd390;
})();
