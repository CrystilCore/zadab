(function () {
  var ge89f = 1200;
  var e1220 = 4000;
  var tf233 = null;
  var p64ac = null;

  function hc91c() {
    clearTimeout(tf233);
    tf233 = setTimeout(h19dc, ge89f + Math.random() * (e1220 - ge89f));
  }

  function h19dc() {
    p64ac.classList.remove("h19dc");
    void p64ac.offsetWidth; 
    p64ac.classList.add("h19dc");
  }

  function o3e40() {
    p64ac = document.querySelector(".b9d03");
    if (!p64ac) return;

    var wd431 = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (wd431 && wd431.matches) return;

    p64ac.addEventListener("animationend", hc91c);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(tf233);
      else hc91c();
    });

    hc91c();
  }

  window.r7aea = o3e40;
})();
