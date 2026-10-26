(function () {
  var c9e20 = 1200;
  var xdd7b = 4000;
  var td93b = null;
  var fb126 = null;

  function n1a39() {
    clearTimeout(td93b);
    td93b = setTimeout(c5673, c9e20 + Math.random() * (xdd7b - c9e20));
  }

  function c5673() {
    fb126.classList.remove("c5673");
    void fb126.offsetWidth; 
    fb126.classList.add("c5673");
  }

  function z8dd7() {
    fb126 = document.querySelector(".ne399");
    if (!fb126) return;

    var v32ff = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (v32ff && v32ff.matches) return;

    fb126.addEventListener("animationend", n1a39);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(td93b);
      else n1a39();
    });

    n1a39();
  }

  window.vd984 = z8dd7;
})();
