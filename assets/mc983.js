(function () {
  var k1eba = 1200;
  var a3054 = 4000;
  var p00fd = null;
  var j545d = null;

  function g7b59() {
    clearTimeout(p00fd);
    p00fd = setTimeout(nd10a, k1eba + Math.random() * (a3054 - k1eba));
  }

  function nd10a() {
    j545d.classList.remove("nd10a");
    void j545d.offsetWidth; 
    j545d.classList.add("nd10a");
  }

  function wc9ad() {
    j545d = document.querySelector(".w18b3");
    if (!j545d) return;

    var s17ce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (s17ce && s17ce.matches) return;

    j545d.addEventListener("animationend", g7b59);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(p00fd);
      else g7b59();
    });

    g7b59();
  }

  window.m95d1 = wc9ad;
})();
