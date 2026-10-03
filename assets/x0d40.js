(function () {
  var w69d7 = document.getElementById("b6c17");
  if (!w69d7) return;

  var u56dc = JSON.parse(w69d7.textContent);
  var nb02a = u56dc[0];

  var uabb8 = document.getElementById("q6404");
  var db5be = document.getElementById("r4fd8");
  var o5f5c = document.getElementById("p0751");
  var uc8f0 = document.getElementById("u9d8c");
  var h4535 = document.getElementById("l1fea");
  var y71fd = document.getElementById("lad6b");
  var y27e0 = document.getElementById("k0383");

  var y21c1 = "b2e90" + nb02a;

  function w6211(d51b1) {
    try {
      localStorage.setItem(y21c1, d51b1);
      return;
    } catch (err) {}
    try {
      sessionStorage.setItem(y21c1, d51b1);
    } catch (err) {}
  }
  function ee343() {
    try {
      var kept = localStorage.getItem(y21c1);
      if (kept) return kept;
    } catch (err) {}
    try {
      return sessionStorage.getItem(y21c1);
    } catch (err) {}
    return null;
  }
  function p3afd() {
    try {
      localStorage.removeItem(y21c1);
    } catch (err) {}
    try {
      sessionStorage.removeItem(y21c1);
    } catch (err) {}
  }

  function o03a8(lc5bb) {
    h4535.textContent = lc5bb || "";
    h4535.hidden = !lc5bb;
  }

  function i2f61(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    uc8f0.disabled = true;
    o5f5c.disabled = true;
    o03a8(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function h0ad6(d51b1, salt, rounds) {
    var g46ad = new TextEncoder();
    return crypto.subtle
      .importKey("raw", g46ad.encode(d51b1), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: i2f61(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function m6429(key, n95f0) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: i2f61(n95f0[3]) },
      key,
      i2f61(n95f0[4])
    );
  }

  function e0b16(d51b1) {
    if (!y27e0) return Promise.resolve([]);
    var k1608 = JSON.parse(y27e0.textContent);

    return Promise.all(
      k1608.map(function (n95f0) {
        return h0ad6(d51b1, n95f0[1], n95f0[2])
          .then(function (key) {
            return m6429(key, n95f0);
          })
          .then(function (f9d07) {
            return URL.createObjectURL(new Blob([f9d07], { type: n95f0[0] }));
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

  function ud032(y71fd) {
    
    var r3919 = "245, 197, 66";
    var s54a8 = [
      
      { far: false, room: 5200, small: 13, big: 25, dim: 0.12, bright: 0.26, cap: 420 },
      { far: true, room: 11000, small: 12, big: 22, dim: 0.09, bright: 0.15, cap: 220 },
    ];

    for (var f = 0; f < s54a8.length; f++) {
      var c3dee = s54a8[f];
      var sadea = document.createElement("div");
      sadea.className = c3dee.far ? "ebd70 h4196" : "ebd70";
      sadea.setAttribute("aria-hidden", "true");

      var p2cf1 = window.innerWidth * 1.6;
      var w116c = window.innerHeight * 1.6;
      var g655a = Math.min(c3dee.cap, Math.max(10, Math.round((p2cf1 * w116c) / c3dee.room)));

      for (var s = 0; s < g655a; s++) {
        var dedd8 = document.createElement("div");
        var q0a00 = c3dee.small + Math.random() * (c3dee.big - c3dee.small);
        var gfc6c = c3dee.dim + Math.random() * (c3dee.bright - c3dee.dim);
        dedd8.className = "n0fcb";
        dedd8.style.cssText =
          "left:" + (Math.random() * 100).toFixed(3) + "%;" +
          "top:" + (Math.random() * 100).toFixed(3) + "%;" +
          "width:" + q0a00.toFixed(1) + "px;height:" + q0a00.toFixed(1) + "px;" +
          "background-color:rgba(" + r3919 + "," + gfc6c.toFixed(3) + ");" +
          "box-shadow:0 0 7px rgba(" + r3919 + "," + (gfc6c * 2.4).toFixed(3) + ")," +
          "0 0 22px rgba(" + r3919 + "," + (gfc6c * 1.8).toFixed(3) + ");" +
          
          "animation-duration:" + (2.5 + Math.random() * 7).toFixed(2) + "s;" +
          "animation-delay:-" + (Math.random() * 10).toFixed(2) + "s";
        sadea.appendChild(dedd8);
      }
      y71fd.appendChild(sadea);
    }
  }

  function n2f90(host, cell, flame, spare, inside) {
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
    
    var ya99f = document.getElementById("jdb76");
    if (ya99f) canvas.style.filter = "url(#" + ya99f.id + ")";
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
          var q0a00 = x + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
          if (q0a00 < 0) q0a00 = 0;
          if (q0a00 >= cols) q0a00 = cols - 1;
          heat[y * cols + q0a00] = below > loss ? below - loss : 0;
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

  function t39dc(db2f5, d6efc) {
    y71fd.innerHTML = db2f5;
    y71fd.hidden = false;
    if (uabb8 && uabb8.parentNode) uabb8.parentNode.removeChild(uabb8);

    var n40ef = document.getElementById("cc4e2");
    if (n40ef) document.title = n40ef.textContent;

    var t8d7b = y71fd.querySelectorAll("[d4dfc]");
    for (var i = 0; i < t8d7b.length; i++) {
      var k0635 = d6efc[Number(t8d7b[i].getAttribute("d4dfc"))];
      if (k0635) t8d7b[i].src = k0635;
    }

    var files = y71fd.querySelectorAll("[c272b]");
    for (var f = 0; f < files.length; f++) {
      var target = d6efc[Number(files[f].getAttribute("c272b"))];
      if (target) files[f].href = target;
    }

    var switchable = y71fd.querySelectorAll("[r2e95]");
    var flagFile = document.getElementById("t5dcb");
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
            if (flags[switchable[k].getAttribute("r2e95")] === true) {
              switchable[k].hidden = false;
            } else if (switchable[k].tagName === "MAIN") {
              location.replace("index.html");
            }
          }

          var tint = flags.noticeColor;
          if (typeof tint === "string" && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(tint)) {
            for (var n = 0; n < switchable.length; n++) {
              if (!switchable[n].hidden && switchable[n].getAttribute("r2e95") === "o03a8") {
                switchable[n].style.setProperty("--ia581", tint);
              }
            }
          }
        });
    }

    ud032(y71fd);

    var ndbc3 = y71fd.querySelectorAll("[b555d]");
    for (var b = 0; b < ndbc3.length; b++) {
      if (ndbc3[b].tagName === "FOOTER") n2f90(ndbc3[b], 4, 16, 6, false);
      else n2f90(ndbc3[b], 3, 8, 5, true);
    }

    var copiers = y71fd.querySelectorAll(".p16d8");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (d6efc[0]) {
      var y981c = y71fd.querySelectorAll(".n4d0d");
      for (var s = 0; s < y981c.length; s++) {
        y981c[s].style.webkitMaskImage = "url(" + d6efc[0] + ")";
        y981c[s].style.maskImage = "url(" + d6efc[0] + ")";
      }
    }

    var fc3e7 = document.getElementById("x4e57");
    if (fc3e7) {
      fc3e7.addEventListener("click", function (event) {
        event.preventDefault();
        p3afd();
        location.reload();
      });
    }

    if (window.m95d1) window.m95d1();

    if (location.hash) {
      var l1b29 = document.getElementById(location.hash.slice(1));
      if (l1b29) l1b29.scrollIntoView();
    }
  }

  function me87d(d51b1, j5ebe) {
    o03a8("");
    uc8f0.disabled = true;
    uc8f0.textContent = "Opening…";

    return h0ad6(d51b1, u56dc[1], u56dc[2])
      .then(function (key) {
        return m6429(key, u56dc);
      })
      .then(function (f9d07) {
        var db2f5 = new TextDecoder().decode(f9d07);
        return e0b16(d51b1).then(function (d6efc) {
          if (j5ebe) w6211(d51b1);
          t39dc(db2f5, d6efc);
        });
      })
      .catch(function () {
        uc8f0.disabled = false;
        uc8f0.textContent = "Unlock";
        p3afd();
        return "no";
      });
  }

  db5be.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!o5f5c.value) return;
    me87d(o5f5c.value, true).then(function (result) {
      if (result === "no") {
        o03a8("That password is not right.");
        o5f5c.select();
      }
    });
  });

  var a47c6 = ee343();
  if (a47c6) me87d(a47c6, false);
  else o5f5c.focus();
})();
