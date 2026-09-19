(function () {
  var v9103 = document.getElementById("l2db4");
  if (!v9103) return;

  var nde03 = JSON.parse(v9103.textContent);
  var de8d2 = nde03[0];

  var k9a8c = document.getElementById("xa539");
  var i249f = document.getElementById("x9c43");
  var m4047 = document.getElementById("g0a76");
  var r01f4 = document.getElementById("t001e");
  var t045c = document.getElementById("vf3fa");
  var s1df1 = document.getElementById("b8ed5");
  var z5b56 = document.getElementById("k652d");

  var pda92 = "m1056" + de8d2;

  function cab12(be957) {
    t045c.textContent = be957 || "";
    t045c.hidden = !be957;
  }

  function b9b7c(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    r01f4.disabled = true;
    m4047.disabled = true;
    cab12(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function ka8b4(x6fc7, salt, rounds) {
    var uf170 = new TextEncoder();
    return crypto.subtle
      .importKey("raw", uf170.encode(x6fc7), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: b9b7c(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function y1f70(key, j206f) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: b9b7c(j206f[3]) },
      key,
      b9b7c(j206f[4])
    );
  }

  function bea5b(x6fc7) {
    if (!z5b56) return Promise.resolve([]);
    var t2689 = JSON.parse(z5b56.textContent);

    return Promise.all(
      t2689.map(function (j206f) {
        return ka8b4(x6fc7, j206f[1], j206f[2])
          .then(function (key) {
            return y1f70(key, j206f);
          })
          .then(function (t76ed) {
            return URL.createObjectURL(new Blob([t76ed], { type: j206f[0] }));
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

  function d0bfd(s345e, v33ad) {
    s1df1.innerHTML = s345e;
    s1df1.hidden = false;
    if (k9a8c && k9a8c.parentNode) k9a8c.parentNode.removeChild(k9a8c);

    var d2dd6 = document.getElementById("k9582");
    if (d2dd6) document.title = d2dd6.textContent;

    var y3d31 = s1df1.querySelectorAll("[e775e]");
    for (var i = 0; i < y3d31.length; i++) {
      var m8772 = v33ad[Number(y3d31[i].getAttribute("e775e"))];
      if (m8772) y3d31[i].src = m8772;
    }

    var files = s1df1.querySelectorAll("[j101b]");
    for (var f = 0; f < files.length; f++) {
      var target = v33ad[Number(files[f].getAttribute("j101b"))];
      if (target) files[f].href = target;
    }

    var switchable = s1df1.querySelectorAll("[heeb2]");
    var flagFile = document.getElementById("k9e5e");
    if (switchable.length && flagFile) {
      fetch(flagFile.textContent + "?" + Date.now(), { cache: "no-store" })
        .then(function (response) {
          return response.ok ? response.json() : {};
        })
        .catch(function () {
          return {};
        })
        .then(function (flags) {
          for (var k = 0; k < switchable.length; k++) {
            if (flags[switchable[k].getAttribute("heeb2")] === true) {
              switchable[k].hidden = false;
            } else if (switchable[k].tagName === "MAIN") {
              location.replace("index.html");
            }
          }
        });
    }

    var copiers = s1df1.querySelectorAll(".cec33");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (v33ad[0]) {
      var s5c31 = s1df1.querySelectorAll(".mfd1e");
      for (var s = 0; s < s5c31.length; s++) {
        s5c31[s].style.webkitMaskImage = "url(" + v33ad[0] + ")";
        s5c31[s].style.maskImage = "url(" + v33ad[0] + ")";
      }
    }

    var ncf01 = document.getElementById("z7310");
    if (ncf01) {
      ncf01.addEventListener("click", function (event) {
        event.preventDefault();
        try {
          sessionStorage.removeItem(pda92);
        } catch (err) {}
        location.reload();
      });
    }

    if (window.q38a3) window.q38a3();

    if (location.hash) {
      var uf199 = document.getElementById(location.hash.slice(1));
      if (uf199) uf199.scrollIntoView();
    }
  }

  function k07ff(x6fc7, j7d17) {
    cab12("");
    r01f4.disabled = true;
    r01f4.textContent = "Opening…";

    return ka8b4(x6fc7, nde03[1], nde03[2])
      .then(function (key) {
        return y1f70(key, nde03);
      })
      .then(function (t76ed) {
        var s345e = new TextDecoder().decode(t76ed);
        return bea5b(x6fc7).then(function (v33ad) {
          if (j7d17) {
            try {
              sessionStorage.setItem(pda92, x6fc7);
            } catch (err) {}
          }
          d0bfd(s345e, v33ad);
        });
      })
      .catch(function () {
        r01f4.disabled = false;
        r01f4.textContent = "Unlock";
        try {
          sessionStorage.removeItem(pda92);
        } catch (err) {}
        return "no";
      });
  }

  i249f.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!m4047.value) return;
    k07ff(m4047.value, true).then(function (result) {
      if (result === "no") {
        cab12("That password is not right.");
        m4047.select();
      }
    });
  });

  var p1314 = null;
  try {
    p1314 = sessionStorage.getItem(pda92);
  } catch (err) {}
  if (p1314) k07ff(p1314, false);
  else m4047.focus();
})();
