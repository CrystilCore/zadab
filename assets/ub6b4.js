(function () {
  var x7384 = 1200;
  var h16b2 = 4000;
  var n5fac = null;
  var e0b13 = null;

  function h1317() {
    clearTimeout(n5fac);
    n5fac = setTimeout(f112e, x7384 + Math.random() * (h16b2 - x7384));
  }

  function f112e() {
    e0b13.classList.remove("f112e");
    void e0b13.offsetWidth; 
    e0b13.classList.add("f112e");
  }

  function o27c3() {
    e0b13 = document.querySelector(".lf0b5");
    if (!e0b13) return;

    var k3282 = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (k3282 && k3282.matches) return;

    e0b13.addEventListener("animationend", h1317);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(n5fac);
      else h1317();
    });

    h1317();
  }

  window.k0e25 = o27c3;
})();
