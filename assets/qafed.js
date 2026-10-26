(function () {
  var v517a = 1200;
  var f1afb = 4000;
  var m7cef = null;
  var a18a5 = null;

  function k87b3() {
    clearTimeout(m7cef);
    m7cef = setTimeout(nab03, v517a + Math.random() * (f1afb - v517a));
  }

  function nab03() {
    a18a5.classList.remove("nab03");
    void a18a5.offsetWidth; 
    a18a5.classList.add("nab03");
  }

  function i00f2() {
    a18a5 = document.querySelector(".jf057");
    if (!a18a5) return;

    var vb321 = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (vb321 && vb321.matches) return;

    a18a5.addEventListener("animationend", k87b3);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(m7cef);
      else k87b3();
    });

    k87b3();
  }

  window.c3a92 = i00f2;
})();
