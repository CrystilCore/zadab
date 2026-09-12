(function () {
  var a5f2c = document.getElementById("lf478");
  if (!a5f2c) return;

  var p5eeb = JSON.parse(a5f2c.textContent);
  var ocb64 = p5eeb[0];

  var r1d13 = document.getElementById("l4aae");
  var h2a8e = document.getElementById("t397b");
  var k6428 = document.getElementById("nc946");
  var d84b9 = document.getElementById("s1fd3");
  var ha9a8 = document.getElementById("ha229");
  var j8d0a = document.getElementById("j6d2f");
  var rd892 = document.getElementById("x0d52");

  var s76ba = "lf532" + ocb64;

  function lee51(ib0a8) {
    ha9a8.textContent = ib0a8 || "";
    ha9a8.hidden = !ib0a8;
  }

  function kf43c(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    d84b9.disabled = true;
    k6428.disabled = true;
    lee51(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function c707a(h3ee7, salt, rounds) {
    var x7733 = new TextEncoder();
    return crypto.subtle
      .importKey("raw", x7733.encode(h3ee7), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: kf43c(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function c6bff(key, w3cf4) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: kf43c(w3cf4[3]) },
      key,
      kf43c(w3cf4[4])
    );
  }

  function q68bd(h3ee7) {
    if (!rd892) return Promise.resolve([]);
    var a36d5 = JSON.parse(rd892.textContent);

    return Promise.all(
      a36d5.map(function (w3cf4) {
        return c707a(h3ee7, w3cf4[1], w3cf4[2])
          .then(function (key) {
            return c6bff(key, w3cf4);
          })
          .then(function (kc6cb) {
            return URL.createObjectURL(new Blob([kc6cb], { type: w3cf4[0] }));
          });
      })
    );
  }

  function z0cc1(paf0a, k9c16) {
    j8d0a.innerHTML = paf0a;
    j8d0a.hidden = false;
    if (r1d13 && r1d13.parentNode) r1d13.parentNode.removeChild(r1d13);

    var i256e = document.getElementById("b99a6");
    if (i256e) document.title = i256e.textContent;

    var l6474 = j8d0a.querySelectorAll("[fe7bc]");
    for (var i = 0; i < l6474.length; i++) {
      var vd2cc = k9c16[Number(l6474[i].getAttribute("fe7bc"))];
      if (vd2cc) l6474[i].src = vd2cc;
    }

    if (k9c16[0]) {
      var x2e69 = j8d0a.querySelectorAll(".x81e3");
      for (var s = 0; s < x2e69.length; s++) {
        x2e69[s].style.webkitMaskImage = "url(" + k9c16[0] + ")";
        x2e69[s].style.maskImage = "url(" + k9c16[0] + ")";
      }
    }

    var dd0e5 = document.getElementById("v6d27");
    if (dd0e5) {
      dd0e5.addEventListener("click", function (event) {
        event.preventDefault();
        try {
          sessionStorage.removeItem(s76ba);
        } catch (err) {}
        location.reload();
      });
    }

    if (window.ff594) window.ff594();

    if (location.hash) {
      var v5672 = document.getElementById(location.hash.slice(1));
      if (v5672) v5672.scrollIntoView();
    }
  }

  function r545c(h3ee7, rccd3) {
    lee51("");
    d84b9.disabled = true;
    d84b9.textContent = "Opening…";

    return c707a(h3ee7, p5eeb[1], p5eeb[2])
      .then(function (key) {
        return c6bff(key, p5eeb);
      })
      .then(function (kc6cb) {
        var paf0a = new TextDecoder().decode(kc6cb);
        return q68bd(h3ee7).then(function (k9c16) {
          if (rccd3) {
            try {
              sessionStorage.setItem(s76ba, h3ee7);
            } catch (err) {}
          }
          z0cc1(paf0a, k9c16);
        });
      })
      .catch(function () {
        d84b9.disabled = false;
        d84b9.textContent = "Unlock";
        try {
          sessionStorage.removeItem(s76ba);
        } catch (err) {}
        return "no";
      });
  }

  h2a8e.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!k6428.value) return;
    r545c(k6428.value, true).then(function (result) {
      if (result === "no") {
        lee51("That password is not right.");
        k6428.select();
      }
    });
  });

  var j689a = null;
  try {
    j689a = sessionStorage.getItem(s76ba);
  } catch (err) {}
  if (j689a) r545c(j689a, false);
  else k6428.focus();
})();
