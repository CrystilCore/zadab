(function () {
  var u2f61 = document.getElementById("d6015");
  if (!u2f61) return;

  var uc10c = JSON.parse(u2f61.textContent);
  var f4dcd = uc10c[0];

  var n30b9 = document.getElementById("v6738");
  var ta36d = document.getElementById("g1009");
  var s1017 = document.getElementById("cbe48");
  var ye8b9 = document.getElementById("s8362");
  var y0e22 = document.getElementById("tf220");
  var ja595 = document.getElementById("dadd5");
  var u1194 = document.getElementById("i18e5");

  var z7861 = "p8995" + f4dcd;

  function y1e42(t8b25) {
    try {
      localStorage.setItem(z7861, t8b25);
      return;
    } catch (err) {}
    try {
      sessionStorage.setItem(z7861, t8b25);
    } catch (err) {}
  }
  function tbce6() {
    try {
      var kept = localStorage.getItem(z7861);
      if (kept) return kept;
    } catch (err) {}
    try {
      return sessionStorage.getItem(z7861);
    } catch (err) {}
    return null;
  }
  function n40a0() {
    try {
      localStorage.removeItem(z7861);
    } catch (err) {}
    try {
      sessionStorage.removeItem(z7861);
    } catch (err) {}
  }

  function k2d14(pbce2) {
    y0e22.textContent = pbce2 || "";
    y0e22.hidden = !pbce2;
  }

  function nde18(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    ye8b9.disabled = true;
    s1017.disabled = true;
    k2d14(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function h8200(t8b25, salt, rounds) {
    var m0b67 = new TextEncoder();
    return crypto.subtle
      .importKey("raw", m0b67.encode(t8b25), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: nde18(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function bec2f(key, n5dd4) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: nde18(n5dd4[3]) },
      key,
      nde18(n5dd4[4])
    );
  }

  function j58d5(t8b25) {
    if (!u1194) return Promise.resolve([]);
    var r3bf6 = JSON.parse(u1194.textContent);

    return Promise.all(
      r3bf6.map(function (n5dd4) {
        return h8200(t8b25, n5dd4[1], n5dd4[2])
          .then(function (key) {
            return bec2f(key, n5dd4);
          })
          .then(function (aa1c3) {
            return URL.createObjectURL(new Blob([aa1c3], { type: n5dd4[0] }));
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

  function n686f(ja595) {
    
    var h07e2 = "245, 197, 66";
    var dc6ca = [
      
      { far: false, room: 5200, small: 13, big: 25, dim: 0.12, bright: 0.26, cap: 420 },
      { far: true, room: 11000, small: 12, big: 22, dim: 0.09, bright: 0.15, cap: 220 },
    ];

    for (var f = 0; f < dc6ca.length; f++) {
      var z80a6 = dc6ca[f];
      var q4197 = document.createElement("div");
      q4197.className = z80a6.far ? "z59fa l892f" : "z59fa";
      q4197.setAttribute("aria-hidden", "true");

      var p8b9f = window.innerWidth * 1.6;
      var tde45 = window.innerHeight * 1.6;
      var v4467 = Math.min(z80a6.cap, Math.max(10, Math.round((p8b9f * tde45) / z80a6.room)));

      for (var s = 0; s < v4467; s++) {
        var vd670 = document.createElement("div");
        var f03ce = z80a6.small + Math.random() * (z80a6.big - z80a6.small);
        var lc132 = z80a6.dim + Math.random() * (z80a6.bright - z80a6.dim);
        vd670.className = "ea5a4";
        vd670.style.cssText =
          "left:" + (Math.random() * 100).toFixed(3) + "%;" +
          "top:" + (Math.random() * 100).toFixed(3) + "%;" +
          "width:" + f03ce.toFixed(1) + "px;height:" + f03ce.toFixed(1) + "px;" +
          "background-color:rgba(" + h07e2 + "," + lc132.toFixed(3) + ");" +
          "box-shadow:0 0 7px rgba(" + h07e2 + "," + (lc132 * 2.4).toFixed(3) + ")," +
          "0 0 22px rgba(" + h07e2 + "," + (lc132 * 1.8).toFixed(3) + ");" +
          
          "animation-duration:" + (2.5 + Math.random() * 7).toFixed(2) + "s;" +
          "animation-delay:-" + (Math.random() * 10).toFixed(2) + "s";
        q4197.appendChild(vd670);
      }
      ja595.appendChild(q4197);
    }
  }

  function e040c(host, cell, flame, spare, inside) {
    if (!host || !window.requestAnimationFrame) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    var FLAME = flame;
    var rows = flame + spare;
    var MIX_LOOSE = inside ? 0.45 : 0.7;
    
    var shades = [
      [0, 0, 0, 0],
      [21, 92, 96, 90], [26, 106, 110, 140], [31, 122, 126, 180], [35, 138, 142, 205],
      [42, 154, 158, 225], [48, 168, 172, 240], [54, 181, 185, 255], [61, 194, 198, 255],
      [70, 207, 211, 255], [82, 218, 222, 255], [96, 227, 230, 255], [114, 234, 236, 255],
      [142, 241, 242, 255], [180, 248, 248, 255], [224, 255, 255, 255],
    ];
    var hottest = shades.length - 1;

    var canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    
    var sit = "bottom:calc(100% - 10px)";
    var sink = 0;
    if (!inside) {
      var strip = parseFloat(window.getComputedStyle(host, "::before").top);
      if (strip === strip) sink = Math.max(0, Math.round(strip + 36 - rows * cell));
    }
    canvas.style.cssText =
      "position:absolute;" + (inside ? sit : "top:" + sink + "px") + ";height:" +
      rows * cell + "px;pointer-events:none;z-index:-1;" +
      "image-rendering:pixelated;image-rendering:crisp-edges";
    
    var bdcdb = document.getElementById("f50bc");
    if (bdcdb) canvas.style.filter = "url(#" + bdcdb.id + ")";
    host.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    var cols = 0;
    var heat = null;
    var base = null;
    var tick = 0;
    
    var GAP = 5;
    var spots = [];
    var picture = null;
    var visible = false;
    var last = 0;
    var owed = 0;

    function resize() {
      var width = host.clientWidth;
      cols = Math.max(1, Math.floor(width / cell));
      canvas.width = cols;
      canvas.height = rows;
      canvas.style.width = cols * cell + "px";
      canvas.style.left = Math.round((width - cols * cell) / 2) + "px";
      heat = new Uint8Array(cols * rows);
      picture = ctx.createImageData(cols, rows);
      spots = [];
      for (var k = 0; k <= Math.ceil(cols / GAP) + 1; k++) {
        spots.push({
          phase: Math.random() * 6.28,
          speed: 0.25 + Math.random() * 0.55,
          reach: 0.14 + Math.random() * 0.16,
        });
      }
      
      if (inside) {
        var ink = inkAcross(width);
        var humps = humpsAcross();
        base = new Float32Array(cols);
        for (var i = 0; i < cols; i++) base[i] = (ink ? ink[i] : 1) * humps[i];
      } else {
        base = bellAcross();
      }
    }

    function humpsAcross() {
      var wide = Math.max(5, Math.round(FLAME * 0.85));
      var row = new Float32Array(cols);
      var x = 0;
      while (x < cols) {
        
        var span = Math.max(4, Math.round(wide * (0.7 + Math.random() * 0.7)));
        for (var n = 0; n < span && x < cols; n++, x++) {
          row[x] = Math.pow((1 - Math.cos((n / span) * 6.283)) / 2, 0.65);
        }
      }
      return row;
    }

    function bellAcross() {
      var curve = new Float32Array(cols);
      for (var x = 0; x < cols; x++) {
        var from = (x / (cols - 1 || 1)) * 2 - 1;
        curve[x] = Math.max(0, 1 - from * from * 1.15);
      }
      return curve;
    }

    function inkAcross(width) {
      var words = (host.textContent || "").trim();
      if (!words || !width) return null;
      var look = window.getComputedStyle(host);
      var probe = document.createElement("canvas");
      probe.width = Math.ceil(width);
      probe.height = Math.max(8, Math.ceil(parseFloat(look.fontSize) * 1.6));
      var pen = probe.getContext("2d");
      pen.font = look.fontStyle + " " + look.fontWeight + " " + look.fontSize + " " + look.fontFamily;
      pen.textBaseline = "top";
      pen.fillStyle = "#fff";
      pen.fillText(words, 0, 0);
      var seen = pen.getImageData(0, 0, probe.width, probe.height).data;
      var raw = new Float32Array(cols);
      var most = 0;
      for (var x = 0; x < cols; x++) {
        var sum = 0;
        for (var px = x * cell; px < (x + 1) * cell && px < probe.width; px++) {
          for (var py = 0; py < probe.height; py++) sum += seen[(py * probe.width + px) * 4 + 3];
        }
        raw[x] = sum;
        if (sum > most) most = sum;
      }
      if (!most) return null;
      var out = new Float32Array(cols);
      for (x = 0; x < cols; x++) {
        
        var pool = 0;
        var seenCols = 0;
        for (var n = x - 3; n <= x + 3; n++) {
          if (n < 0 || n >= cols) continue;
          pool += raw[n];
          seenCols++;
        }
        
        out[x] = Math.min(1, (pool / seenCols / most) * 2.2);
      }
      return out;
    }

    function burn() {
      var x, y, up;
      tick += 1;

      for (x = 0; x < cols; x++) {
        heat[(rows - 1) * cols + x] = Math.round(hottest * base[x] * (0.7 + Math.random() * 0.3));
      }
      for (y = 0; y < rows - 1; y++) {
        for (x = 0; x < cols; x++) {
          var below = heat[(y + 1) * cols + x];
          var roll = Math.random();
          var loss = roll < 0.3 ? 0 : roll < 0.8 ? 1 : 2;
          
          var over = rows - 1 - y - FLAME;
          if (over > 0) loss += over;
          var f03ce = x + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
          if (f03ce < 0) f03ce = 0;
          if (f03ce >= cols) f03ce = cols - 1;
          heat[y * cols + f03ce] = below > loss ? below - loss : 0;
        }
      }

      var data = picture.data;
      for (x = 0; x < cols; x++) {
        
        var near = Math.floor(x / GAP);
        var along = (x % GAP) / GAP;
        var ease = (1 - Math.cos(along * Math.PI)) / 2;
        var left = spots[near];
        var right = spots[near + 1];
        var wave =
          0.52 +
          (1 - ease) * left.reach * Math.sin(left.phase + tick * left.speed) +
          ease * right.reach * Math.sin(right.phase + tick * right.speed) +
          0.12 * (Math.random() - 0.5);
        var tall = Math.round(FLAME * base[x] * Math.max(0, Math.min(1, wave)));
        for (up = 0; up < rows; up++) {
          var tongue = 0;
          if (up < tall) {
            
            tongue = 3 + (tall - up) * 1.5;
            if (up === 0) tongue += 4;
            else if (up === 1) tongue += 2;
          }
          var cellAt = (rows - 1 - up) * cols + x;
          var shade = MIX_LOOSE * heat[cellAt] + (1 - MIX_LOOSE) * tongue;
          
          if (up >= rows - 2) shade = 0;
          shade = Math.max(0, Math.min(hottest, Math.round(shade)));
          var colour = shades[shade];
          var at = cellAt * 4;
          data[at] = colour[0];
          data[at + 1] = colour[1];
          data[at + 2] = colour[2];
          data[at + 3] = colour[3];
        }
      }
      ctx.putImageData(picture, 0, 0);
    }

    function frame(now) {
      if (!visible) {
        last = 0;
        return;
      }
      
      owed += last ? now - last : 56;
      last = now;
      if (owed >= 56) {
        owed = Math.min(owed - 56, 56);
        burn();
      }
      window.requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (seen) {
        var was = visible;
        visible = seen[0].isIntersecting;
        if (visible && !was) window.requestAnimationFrame(frame);
      }).observe(host);
    } else {
      visible = true;
      window.requestAnimationFrame(frame);
    }
  }

  function t7bea(babb2, x445b) {
    ja595.innerHTML = babb2;
    ja595.hidden = false;
    if (n30b9 && n30b9.parentNode) n30b9.parentNode.removeChild(n30b9);

    var vac03 = document.getElementById("x95de");
    if (vac03) document.title = vac03.textContent;

    var wd090 = ja595.querySelectorAll("[q1b1f]");
    for (var i = 0; i < wd090.length; i++) {
      var xda8e = x445b[Number(wd090[i].getAttribute("q1b1f"))];
      if (xda8e) wd090[i].src = xda8e;
    }

    var files = ja595.querySelectorAll("[r4f97]");
    for (var f = 0; f < files.length; f++) {
      var target = x445b[Number(files[f].getAttribute("r4f97"))];
      if (target) files[f].href = target;
    }

    var switchable = ja595.querySelectorAll("[fdee9]");
    var flagFile = document.getElementById("r13b9");
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
            if (flags[switchable[k].getAttribute("fdee9")] === true) {
              switchable[k].hidden = false;
            } else if (switchable[k].tagName === "MAIN") {
              location.replace("index.html");
            }
          }
        });
    }

    n686f(ja595);

    var z23fb = ja595.querySelectorAll("[z9e71]");
    for (var b = 0; b < z23fb.length; b++) {
      if (z23fb[b].tagName === "FOOTER") e040c(z23fb[b], 4, 16, 6, false);
      else e040c(z23fb[b], 3, 8, 5, true);
    }

    var copiers = ja595.querySelectorAll(".je2a3");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (x445b[0]) {
      var v65b6 = ja595.querySelectorAll(".fc014");
      for (var s = 0; s < v65b6.length; s++) {
        v65b6[s].style.webkitMaskImage = "url(" + x445b[0] + ")";
        v65b6[s].style.maskImage = "url(" + x445b[0] + ")";
      }
    }

    var fef80 = document.getElementById("c2fac");
    if (fef80) {
      fef80.addEventListener("click", function (event) {
        event.preventDefault();
        n40a0();
        location.reload();
      });
    }

    if (window.q9d77) window.q9d77();

    if (location.hash) {
      var x9ff3 = document.getElementById(location.hash.slice(1));
      if (x9ff3) x9ff3.scrollIntoView();
    }
  }

  function c9c4d(t8b25, xe9b5) {
    k2d14("");
    ye8b9.disabled = true;
    ye8b9.textContent = "Opening…";

    return h8200(t8b25, uc10c[1], uc10c[2])
      .then(function (key) {
        return bec2f(key, uc10c);
      })
      .then(function (aa1c3) {
        var babb2 = new TextDecoder().decode(aa1c3);
        return j58d5(t8b25).then(function (x445b) {
          if (xe9b5) y1e42(t8b25);
          t7bea(babb2, x445b);
        });
      })
      .catch(function () {
        ye8b9.disabled = false;
        ye8b9.textContent = "Unlock";
        n40a0();
        return "no";
      });
  }

  ta36d.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!s1017.value) return;
    c9c4d(s1017.value, true).then(function (result) {
      if (result === "no") {
        k2d14("That password is not right.");
        s1017.select();
      }
    });
  });

  var y79dd = tbce6();
  if (y79dd) c9c4d(y79dd, false);
  else s1017.focus();
})();
