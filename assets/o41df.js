(function () {
  var y0a4c = document.getElementById("i789d");
  if (!y0a4c) return;

  var e373e = JSON.parse(y0a4c.textContent);
  var od24d = e373e[0];

  var u2991 = document.getElementById("lcda5");
  var iaf54 = document.getElementById("p0729");
  var n44c1 = document.getElementById("gf481");
  var g1e50 = document.getElementById("a6e35");
  var qa023 = document.getElementById("h7dcd");
  var d1ef2 = document.getElementById("sbd26");
  var v0704 = document.getElementById("r7431");

  var wa90f = "b6d64" + od24d;

  function l62c4(yfd6a) {
    qa023.textContent = yfd6a || "";
    qa023.hidden = !yfd6a;
  }

  function v03d2(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    g1e50.disabled = true;
    n44c1.disabled = true;
    l62c4(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function d366c(v7c28, salt, rounds) {
    var n4ee7 = new TextEncoder();
    return crypto.subtle
      .importKey("raw", n4ee7.encode(v7c28), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: v03d2(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function o5dd9(key, e2785) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: v03d2(e2785[3]) },
      key,
      v03d2(e2785[4])
    );
  }

  function c9201(v7c28) {
    if (!v0704) return Promise.resolve([]);
    var t576b = JSON.parse(v0704.textContent);

    return Promise.all(
      t576b.map(function (e2785) {
        return d366c(v7c28, e2785[1], e2785[2])
          .then(function (key) {
            return o5dd9(key, e2785);
          })
          .then(function (ob9a3) {
            return URL.createObjectURL(new Blob([ob9a3], { type: e2785[0] }));
          });
      })
    );
  }

  function q8ca9(x31ab, m982c) {
    d1ef2.innerHTML = x31ab;
    d1ef2.hidden = false;
    if (u2991 && u2991.parentNode) u2991.parentNode.removeChild(u2991);

    var z5643 = document.getElementById("x2073");
    if (z5643) document.title = z5643.textContent;

    var i05a2 = d1ef2.querySelectorAll("[vea2a]");
    for (var i = 0; i < i05a2.length; i++) {
      var z1b65 = m982c[Number(i05a2[i].getAttribute("vea2a"))];
      if (z1b65) i05a2[i].src = z1b65;
    }

    if (m982c[0]) {
      var vf1e7 = d1ef2.querySelectorAll(".rd823");
      for (var s = 0; s < vf1e7.length; s++) {
        vf1e7[s].style.webkitMaskImage = "url(" + m982c[0] + ")";
        vf1e7[s].style.maskImage = "url(" + m982c[0] + ")";
      }
    }

    var r7149 = document.getElementById("j0798");
    if (r7149) {
      r7149.addEventListener("click", function (event) {
        event.preventDefault();
        try {
          sessionStorage.removeItem(wa90f);
        } catch (err) {}
        location.reload();
      });
    }

    if (window.a991d) window.a991d();

    if (location.hash) {
      var d9844 = document.getElementById(location.hash.slice(1));
      if (d9844) d9844.scrollIntoView();
    }
  }

  function u1991(v7c28, h7978) {
    l62c4("");
    g1e50.disabled = true;
    g1e50.textContent = "Opening…";

    return d366c(v7c28, e373e[1], e373e[2])
      .then(function (key) {
        return o5dd9(key, e373e);
      })
      .then(function (ob9a3) {
        var x31ab = new TextDecoder().decode(ob9a3);
        return c9201(v7c28).then(function (m982c) {
          if (h7978) {
            try {
              sessionStorage.setItem(wa90f, v7c28);
            } catch (err) {}
          }
          q8ca9(x31ab, m982c);
        });
      })
      .catch(function () {
        g1e50.disabled = false;
        g1e50.textContent = "Unlock";
        try {
          sessionStorage.removeItem(wa90f);
        } catch (err) {}
        return "no";
      });
  }

  iaf54.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!n44c1.value) return;
    u1991(n44c1.value, true).then(function (result) {
      if (result === "no") {
        l62c4("That password is not right.");
        n44c1.select();
      }
    });
  });

  var o25bb = null;
  try {
    o25bb = sessionStorage.getItem(wa90f);
  } catch (err) {}
  if (o25bb) u1991(o25bb, false);
  else n44c1.focus();
})();
