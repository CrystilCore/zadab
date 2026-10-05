(function () {
  var y1e1a = 1200;
  var zf2e1 = 4000;
  var p3e34 = null;
  var ha6a1 = null;

  function db2c0() {
    clearTimeout(p3e34);
    p3e34 = setTimeout(a206b, y1e1a + Math.random() * (zf2e1 - y1e1a));
  }

  function a206b() {
    ha6a1.classList.remove("a206b");
    void ha6a1.offsetWidth; 
    ha6a1.classList.add("a206b");
  }

  function d932b() {
    ha6a1 = document.querySelector(".b63da");
    if (!ha6a1) return;

    var q2d17 = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (q2d17 && q2d17.matches) return;

    ha6a1.addEventListener("animationend", db2c0);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(p3e34);
      else db2c0();
    });

    db2c0();
  }

  window.a89c0 = d932b;
})();
