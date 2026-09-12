(function () {
  var ob53d = 1200;
  var jc3d0 = 4000;
  var p80ef = null;
  var qd597 = null;

  function p5751() {
    clearTimeout(p80ef);
    p80ef = setTimeout(q608f, ob53d + Math.random() * (jc3d0 - ob53d));
  }

  function q608f() {
    qd597.classList.remove("q608f");
    void qd597.offsetWidth; 
    qd597.classList.add("q608f");
  }

  function ke353() {
    qd597 = document.querySelector(".wb5c8");
    if (!qd597) return;

    var u2ddf = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (u2ddf && u2ddf.matches) return;

    qd597.addEventListener("animationend", p5751);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(p80ef);
      else p5751();
    });

    p5751();
  }

  window.ff594 = ke353;
})();
