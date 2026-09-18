(function () {
  var ff32d = document.getElementById("wbd4f");
  if (!ff32d) return;

  var o1f3b = JSON.parse(ff32d.textContent);
  var g0771 = o1f3b[0];

  var l6d9a = document.getElementById("ja6cd");
  var v4fb8 = document.getElementById("scb22");
  var p9d41 = document.getElementById("ia4e0");
  var k3931 = document.getElementById("hec29");
  var icb1e = document.getElementById("x14b6");
  var f22b7 = document.getElementById("sc973");
  var m4a36 = document.getElementById("e087a");

  var jc1a8 = "h1c0a" + g0771;

  function nbf87(h65d1) {
    icb1e.textContent = h65d1 || "";
    icb1e.hidden = !h65d1;
  }

  function i3307(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    k3931.disabled = true;
    p9d41.disabled = true;
    nbf87(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function s42ed(yb74a, salt, rounds) {
    var pd843 = new TextEncoder();
    return crypto.subtle
      .importKey("raw", pd843.encode(yb74a), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: i3307(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function i35cb(key, n3434) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: i3307(n3434[3]) },
      key,
      i3307(n3434[4])
    );
  }

  function t4bb7(yb74a) {
    if (!m4a36) return Promise.resolve([]);
    var s66de = JSON.parse(m4a36.textContent);

    return Promise.all(
      s66de.map(function (n3434) {
        return s42ed(yb74a, n3434[1], n3434[2])
          .then(function (key) {
            return i35cb(key, n3434);
          })
          .then(function (ffa45) {
            return URL.createObjectURL(new Blob([ffa45], { type: n3434[0] }));
          });
      })
    );
  }

  function copyCode(event) {
    var button = event.currentTarget;
    var code = button.parentNode.querySelector("code");
    function say(text) {
      button.textContent = text;
      setTimeout(function () {
        button.textContent = "Copy";
      }, 1600);
    }
    function selectIt() {
      var range = document.createRange();
      range.selectNodeContents(code);
      var chosen = window.getSelection();
      chosen.removeAllRanges();
      chosen.addRange(range);
      say("Press Ctrl+C");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code.textContent).then(function () {
        say("Copied");
      }, selectIt);
    } else {
      selectIt();
    }
  }

  function he8d9(n4248, l0801) {
    f22b7.innerHTML = n4248;
    f22b7.hidden = false;
    if (l6d9a && l6d9a.parentNode) l6d9a.parentNode.removeChild(l6d9a);

    var f8cdc = document.getElementById("pe1d9");
    if (f8cdc) document.title = f8cdc.textContent;

    var v9864 = f22b7.querySelectorAll("[v6ab6]");
    for (var i = 0; i < v9864.length; i++) {
      var vb51a = l0801[Number(v9864[i].getAttribute("v6ab6"))];
      if (vb51a) v9864[i].src = vb51a;
    }

    var files = f22b7.querySelectorAll("[zbb11]");
    for (var f = 0; f < files.length; f++) {
      var target = l0801[Number(files[f].getAttribute("zbb11"))];
      if (target) files[f].href = target;
    }

    var copiers = f22b7.querySelectorAll(".tfcce");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (l0801[0]) {
      var bc66c = f22b7.querySelectorAll(".i7101");
      for (var s = 0; s < bc66c.length; s++) {
        bc66c[s].style.webkitMaskImage = "url(" + l0801[0] + ")";
        bc66c[s].style.maskImage = "url(" + l0801[0] + ")";
      }
    }

    var ucc52 = document.getElementById("z97b2");
    if (ucc52) {
      ucc52.addEventListener("click", function (event) {
        event.preventDefault();
        try {
          sessionStorage.removeItem(jc1a8);
        } catch (err) {}
        location.reload();
      });
    }

    if (window.q992f) window.q992f();

    if (location.hash) {
      var pbde5 = document.getElementById(location.hash.slice(1));
      if (pbde5) pbde5.scrollIntoView();
    }
  }

  function i10c8(yb74a, jc471) {
    nbf87("");
    k3931.disabled = true;
    k3931.textContent = "Opening…";

    return s42ed(yb74a, o1f3b[1], o1f3b[2])
      .then(function (key) {
        return i35cb(key, o1f3b);
      })
      .then(function (ffa45) {
        var n4248 = new TextDecoder().decode(ffa45);
        return t4bb7(yb74a).then(function (l0801) {
          if (jc471) {
            try {
              sessionStorage.setItem(jc1a8, yb74a);
            } catch (err) {}
          }
          he8d9(n4248, l0801);
        });
      })
      .catch(function () {
        k3931.disabled = false;
        k3931.textContent = "Unlock";
        try {
          sessionStorage.removeItem(jc1a8);
        } catch (err) {}
        return "no";
      });
  }

  v4fb8.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!p9d41.value) return;
    i10c8(p9d41.value, true).then(function (result) {
      if (result === "no") {
        nbf87("That password is not right.");
        p9d41.select();
      }
    });
  });

  var mff53 = null;
  try {
    mff53 = sessionStorage.getItem(jc1a8);
  } catch (err) {}
  if (mff53) i10c8(mff53, false);
  else p9d41.focus();
})();
