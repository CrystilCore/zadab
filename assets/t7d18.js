(function () {
  var y5dfd = 1200;
  var zdc73 = 4000;
  var cf8b9 = null;
  var fda3e = null;

  function pb2c0() {
    clearTimeout(cf8b9);
    cf8b9 = setTimeout(n3c24, y5dfd + Math.random() * (zdc73 - y5dfd));
  }

  function n3c24() {
    fda3e.classList.remove("n3c24");
    void fda3e.offsetWidth; 
    fda3e.classList.add("n3c24");
  }

  function q090e() {
    fda3e = document.querySelector(".pb25e");
    if (!fda3e) return;

    var nba12 = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (nba12 && nba12.matches) return;

    fda3e.addEventListener("animationend", pb2c0);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(cf8b9);
      else pb2c0();
    });

    pb2c0();
  }

  window.i7ff2 = q090e;
})();
