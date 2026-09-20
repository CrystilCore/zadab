(function () {
  var x5ea1 = 1200;
  var n5448 = 4000;
  var u01c6 = null;
  var i7ad4 = null;

  function j56d1() {
    clearTimeout(u01c6);
    u01c6 = setTimeout(j1584, x5ea1 + Math.random() * (n5448 - x5ea1));
  }

  function j1584() {
    i7ad4.classList.remove("j1584");
    void i7ad4.offsetWidth; 
    i7ad4.classList.add("j1584");
  }

  function h19e5() {
    i7ad4 = document.querySelector(".bdfb1");
    if (!i7ad4) return;

    var ye0d7 = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (ye0d7 && ye0d7.matches) return;

    i7ad4.addEventListener("animationend", j56d1);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(u01c6);
      else j56d1();
    });

    j56d1();
  }

  window.d3be1 = h19e5;
})();
