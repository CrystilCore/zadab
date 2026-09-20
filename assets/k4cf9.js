(function () {
  var lc4fd = document.getElementById("n1818");
  if (!lc4fd) return;

  var r3704 = JSON.parse(lc4fd.textContent);
  var sd98f = r3704[0];

  var fa138 = document.getElementById("s93af");
  var i7847 = document.getElementById("m2c8b");
  var j6e09 = document.getElementById("a82e6");
  var te628 = document.getElementById("b7205");
  var j64c1 = document.getElementById("g7bfc");
  var h1b04 = document.getElementById("ud3bc");
  var d8c6e = document.getElementById("q7f85");

  var re957 = "j6d6b" + sd98f;

  function hc7d2(xa8ab) {
    try {
      localStorage.setItem(re957, xa8ab);
      return;
    } catch (err) {}
    try {
      sessionStorage.setItem(re957, xa8ab);
    } catch (err) {}
  }
  function s8e53() {
    try {
      var kept = localStorage.getItem(re957);
      if (kept) return kept;
    } catch (err) {}
    try {
      return sessionStorage.getItem(re957);
    } catch (err) {}
    return null;
  }
  function k955b() {
    try {
      localStorage.removeItem(re957);
    } catch (err) {}
    try {
      sessionStorage.removeItem(re957);
    } catch (err) {}
  }

  function xe431(a9ca5) {
    j64c1.textContent = a9ca5 || "";
    j64c1.hidden = !a9ca5;
  }

  function o73dc(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    te628.disabled = true;
    j6e09.disabled = true;
    xe431(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function mfb43(xa8ab, salt, rounds) {
    var s0905 = new TextEncoder();
    return crypto.subtle
      .importKey("raw", s0905.encode(xa8ab), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: o73dc(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function f1410(key, s4240) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: o73dc(s4240[3]) },
      key,
      o73dc(s4240[4])
    );
  }

  function yceee(xa8ab) {
    if (!d8c6e) return Promise.resolve([]);
    var b3c98 = JSON.parse(d8c6e.textContent);

    return Promise.all(
      b3c98.map(function (s4240) {
        return mfb43(xa8ab, s4240[1], s4240[2])
          .then(function (key) {
            return f1410(key, s4240);
          })
          .then(function (ocece) {
            return URL.createObjectURL(new Blob([ocece], { type: s4240[0] }));
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

  function i7e22(h1b04) {
    
    var pe111 = "245, 197, 66";
    var fc01e = [
      
      { far: false, room: 5200, small: 13, big: 25, dim: 0.12, bright: 0.26, cap: 420 },
      { far: true, room: 11000, small: 12, big: 22, dim: 0.09, bright: 0.15, cap: 220 },
    ];

    for (var f = 0; f < fc01e.length; f++) {
      var x31c9 = fc01e[f];
      var p6cca = document.createElement("div");
      p6cca.className = x31c9.far ? "be1e0 hb22a" : "be1e0";
      p6cca.setAttribute("aria-hidden", "true");

      var p21e5 = window.innerWidth * 1.6;
      var wfd3d = window.innerHeight * 1.6;
      var nbc7e = Math.min(x31c9.cap, Math.max(10, Math.round((p21e5 * wfd3d) / x31c9.room)));

      for (var s = 0; s < nbc7e; s++) {
        var l8359 = document.createElement("div");
        var bac57 = x31c9.small + Math.random() * (x31c9.big - x31c9.small);
        var g8db3 = x31c9.dim + Math.random() * (x31c9.bright - x31c9.dim);
        l8359.className = "d8b79";
        l8359.style.cssText =
          "left:" + (Math.random() * 100).toFixed(3) + "%;" +
          "top:" + (Math.random() * 100).toFixed(3) + "%;" +
          "width:" + bac57.toFixed(1) + "px;height:" + bac57.toFixed(1) + "px;" +
          "background-color:rgba(" + pe111 + "," + g8db3.toFixed(3) + ");" +
          "box-shadow:0 0 7px rgba(" + pe111 + "," + (g8db3 * 2.4).toFixed(3) + ")," +
          "0 0 22px rgba(" + pe111 + "," + (g8db3 * 1.8).toFixed(3) + ");" +
          
          "animation-duration:" + (2.5 + Math.random() * 7).toFixed(2) + "s;" +
          "animation-delay:-" + (Math.random() * 10).toFixed(2) + "s";
        p6cca.appendChild(l8359);
      }
      h1b04.appendChild(p6cca);
    }
  }

  function v5dcd(host, cell, flame, spare, inside) {
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
    
    var mf514 = document.getElementById("a2364");
    if (mf514) canvas.style.filter = "url(#" + mf514.id + ")";
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
          var bac57 = x + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
          if (bac57 < 0) bac57 = 0;
          if (bac57 >= cols) bac57 = cols - 1;
          heat[y * cols + bac57] = below > loss ? below - loss : 0;
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

  function g9abb(s4567, ob3e7) {
    h1b04.innerHTML = s4567;
    h1b04.hidden = false;
    if (fa138 && fa138.parentNode) fa138.parentNode.removeChild(fa138);

    var x7963 = document.getElementById("cac97");
    if (x7963) document.title = x7963.textContent;

    var u6fd4 = h1b04.querySelectorAll("[hda44]");
    for (var i = 0; i < u6fd4.length; i++) {
      var p655b = ob3e7[Number(u6fd4[i].getAttribute("hda44"))];
      if (p655b) u6fd4[i].src = p655b;
    }

    var files = h1b04.querySelectorAll("[x4cf5]");
    for (var f = 0; f < files.length; f++) {
      var target = ob3e7[Number(files[f].getAttribute("x4cf5"))];
      if (target) files[f].href = target;
    }

    var switchable = h1b04.querySelectorAll("[kbd48]");
    var flagFile = document.getElementById("qcb47");
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
            if (flags[switchable[k].getAttribute("kbd48")] === true) {
              switchable[k].hidden = false;
            } else if (switchable[k].tagName === "MAIN") {
              location.replace("index.html");
            }
          }
        });
    }

    i7e22(h1b04);

    var z3c37 = h1b04.querySelectorAll("[tcce0]");
    for (var b = 0; b < z3c37.length; b++) {
      if (z3c37[b].tagName === "FOOTER") v5dcd(z3c37[b], 4, 16, 6, false);
      else v5dcd(z3c37[b], 3, 8, 5, true);
    }

    var copiers = h1b04.querySelectorAll(".a804b");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (ob3e7[0]) {
      var qfd61 = h1b04.querySelectorAll(".le2b4");
      for (var s = 0; s < qfd61.length; s++) {
        qfd61[s].style.webkitMaskImage = "url(" + ob3e7[0] + ")";
        qfd61[s].style.maskImage = "url(" + ob3e7[0] + ")";
      }
    }

    var q750e = document.getElementById("h018d");
    if (q750e) {
      q750e.addEventListener("click", function (event) {
        event.preventDefault();
        k955b();
        location.reload();
      });
    }

    if (window.i7ff2) window.i7ff2();

    if (location.hash) {
      var q327b = document.getElementById(location.hash.slice(1));
      if (q327b) q327b.scrollIntoView();
    }
  }

  function qc8ca(xa8ab, e4651) {
    xe431("");
    te628.disabled = true;
    te628.textContent = "Opening…";

    return mfb43(xa8ab, r3704[1], r3704[2])
      .then(function (key) {
        return f1410(key, r3704);
      })
      .then(function (ocece) {
        var s4567 = new TextDecoder().decode(ocece);
        return yceee(xa8ab).then(function (ob3e7) {
          if (e4651) hc7d2(xa8ab);
          g9abb(s4567, ob3e7);
        });
      })
      .catch(function () {
        te628.disabled = false;
        te628.textContent = "Unlock";
        k955b();
        return "no";
      });
  }

  i7847.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!j6e09.value) return;
    qc8ca(j6e09.value, true).then(function (result) {
      if (result === "no") {
        xe431("That password is not right.");
        j6e09.select();
      }
    });
  });

  var i5350 = s8e53();
  if (i5350) qc8ca(i5350, false);
  else j6e09.focus();
})();
