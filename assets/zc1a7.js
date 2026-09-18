(function () {
  var p1b6c = document.getElementById("m4e75");
  if (!p1b6c) return;

  var j5447 = JSON.parse(p1b6c.textContent);
  var cc9c1 = j5447[0];

  var n45e5 = document.getElementById("q1f50");
  var ff5eb = document.getElementById("led2d");
  var u1017 = document.getElementById("p7cff");
  var gd366 = document.getElementById("dfe63");
  var y5bac = document.getElementById("w70f6");
  var ada86 = document.getElementById("tf104");
  var d742c = document.getElementById("kf6e3");

  var a7bf5 = "f7ae9" + cc9c1;

  function o8825(jcd26) {
    y5bac.textContent = jcd26 || "";
    y5bac.hidden = !jcd26;
  }

  function h1b1b(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    gd366.disabled = true;
    u1017.disabled = true;
    o8825(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function jf860(wf4b4, salt, rounds) {
    var aed61 = new TextEncoder();
    return crypto.subtle
      .importKey("raw", aed61.encode(wf4b4), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: h1b1b(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function e5aa1(key, d3869) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: h1b1b(d3869[3]) },
      key,
      h1b1b(d3869[4])
    );
  }

  function g2dcf(wf4b4) {
    if (!d742c) return Promise.resolve([]);
    var tafc0 = JSON.parse(d742c.textContent);

    return Promise.all(
      tafc0.map(function (d3869) {
        return jf860(wf4b4, d3869[1], d3869[2])
          .then(function (key) {
            return e5aa1(key, d3869);
          })
          .then(function (qd372) {
            return URL.createObjectURL(new Blob([qd372], { type: d3869[0] }));
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

  function cfcfd(c5eaf, i5377) {
    ada86.innerHTML = c5eaf;
    ada86.hidden = false;
    if (n45e5 && n45e5.parentNode) n45e5.parentNode.removeChild(n45e5);

    var pcb44 = document.getElementById("n711b");
    if (pcb44) document.title = pcb44.textContent;

    var f05d7 = ada86.querySelectorAll("[s54e4]");
    for (var i = 0; i < f05d7.length; i++) {
      var m97ec = i5377[Number(f05d7[i].getAttribute("s54e4"))];
      if (m97ec) f05d7[i].src = m97ec;
    }

    var files = ada86.querySelectorAll("[v3fd0]");
    for (var f = 0; f < files.length; f++) {
      var target = i5377[Number(files[f].getAttribute("v3fd0"))];
      if (target) files[f].href = target;
    }

    var copiers = ada86.querySelectorAll(".g3301");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (i5377[0]) {
      var s7a3b = ada86.querySelectorAll(".h0565");
      for (var s = 0; s < s7a3b.length; s++) {
        s7a3b[s].style.webkitMaskImage = "url(" + i5377[0] + ")";
        s7a3b[s].style.maskImage = "url(" + i5377[0] + ")";
      }
    }

    var nc1b3 = document.getElementById("ae5b0");
    if (nc1b3) {
      nc1b3.addEventListener("click", function (event) {
        event.preventDefault();
        try {
          sessionStorage.removeItem(a7bf5);
        } catch (err) {}
        location.reload();
      });
    }

    if (window.w3e25) window.w3e25();

    if (location.hash) {
      var kbabe = document.getElementById(location.hash.slice(1));
      if (kbabe) kbabe.scrollIntoView();
    }
  }

  function w7548(wf4b4, ba258) {
    o8825("");
    gd366.disabled = true;
    gd366.textContent = "Opening…";

    return jf860(wf4b4, j5447[1], j5447[2])
      .then(function (key) {
        return e5aa1(key, j5447);
      })
      .then(function (qd372) {
        var c5eaf = new TextDecoder().decode(qd372);
        return g2dcf(wf4b4).then(function (i5377) {
          if (ba258) {
            try {
              sessionStorage.setItem(a7bf5, wf4b4);
            } catch (err) {}
          }
          cfcfd(c5eaf, i5377);
        });
      })
      .catch(function () {
        gd366.disabled = false;
        gd366.textContent = "Unlock";
        try {
          sessionStorage.removeItem(a7bf5);
        } catch (err) {}
        return "no";
      });
  }

  ff5eb.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!u1017.value) return;
    w7548(u1017.value, true).then(function (result) {
      if (result === "no") {
        o8825("That password is not right.");
        u1017.select();
      }
    });
  });

  var d8a1a = null;
  try {
    d8a1a = sessionStorage.getItem(a7bf5);
  } catch (err) {}
  if (d8a1a) w7548(d8a1a, false);
  else u1017.focus();
})();
