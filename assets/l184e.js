(function () {
  var oe251 = document.getElementById("wcdbe");
  if (!oe251) return;

  var p44f6 = JSON.parse(oe251.textContent);
  var d777f = p44f6[0];

  var b2a5e = document.getElementById("xf7aa");
  var r1d63 = document.getElementById("b47ea");
  var z4054 = document.getElementById("y4432");
  var u58a5 = document.getElementById("t3ff4");
  var tccfe = document.getElementById("y2cc0");
  var e2931 = document.getElementById("v04bd");
  var z622b = document.getElementById("y5617");

  var i0308 = "vd488" + d777f;

  function q53f6(g6019) {
    tccfe.textContent = g6019 || "";
    tccfe.hidden = !g6019;
  }

  function kc540(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    u58a5.disabled = true;
    z4054.disabled = true;
    q53f6(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function q081d(m1427, salt, rounds) {
    var pc5d0 = new TextEncoder();
    return crypto.subtle
      .importKey("raw", pc5d0.encode(m1427), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: kc540(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function v8331(key, b5d39) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: kc540(b5d39[3]) },
      key,
      kc540(b5d39[4])
    );
  }

  function l92ba(m1427) {
    if (!z622b) return Promise.resolve([]);
    var f3319 = JSON.parse(z622b.textContent);

    return Promise.all(
      f3319.map(function (b5d39) {
        return q081d(m1427, b5d39[1], b5d39[2])
          .then(function (key) {
            return v8331(key, b5d39);
          })
          .then(function (e3521) {
            return URL.createObjectURL(new Blob([e3521], { type: b5d39[0] }));
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

  function d26c9(host, cell, flame, spare, inside) {
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
    
    var g84e9 = document.getElementById("c2a66");
    if (g84e9) canvas.style.filter = "url(#" + g84e9.id + ")";
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
          var side = x + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
          if (side < 0) side = 0;
          if (side >= cols) side = cols - 1;
          heat[y * cols + side] = below > loss ? below - loss : 0;
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

  function cb9d2(ide7d, b324b) {
    e2931.innerHTML = ide7d;
    e2931.hidden = false;
    if (b2a5e && b2a5e.parentNode) b2a5e.parentNode.removeChild(b2a5e);

    var f65bd = document.getElementById("me029");
    if (f65bd) document.title = f65bd.textContent;

    var u218d = e2931.querySelectorAll("[u24ad]");
    for (var i = 0; i < u218d.length; i++) {
      var o7f51 = b324b[Number(u218d[i].getAttribute("u24ad"))];
      if (o7f51) u218d[i].src = o7f51;
    }

    var files = e2931.querySelectorAll("[j0e06]");
    for (var f = 0; f < files.length; f++) {
      var target = b324b[Number(files[f].getAttribute("j0e06"))];
      if (target) files[f].href = target;
    }

    var switchable = e2931.querySelectorAll("[j44ef]");
    var flagFile = document.getElementById("b10cc");
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
            if (flags[switchable[k].getAttribute("j44ef")] === true) {
              switchable[k].hidden = false;
            } else if (switchable[k].tagName === "MAIN") {
              location.replace("index.html");
            }
          }
        });
    }

    var d8f2f = e2931.querySelectorAll("[r3be7]");
    for (var b = 0; b < d8f2f.length; b++) {
      if (d8f2f[b].tagName === "FOOTER") d26c9(d8f2f[b], 4, 16, 6, false);
      else d26c9(d8f2f[b], 3, 8, 5, true);
    }

    var copiers = e2931.querySelectorAll(".n583b");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (b324b[0]) {
      var q2a3f = e2931.querySelectorAll(".e6e2d");
      for (var s = 0; s < q2a3f.length; s++) {
        q2a3f[s].style.webkitMaskImage = "url(" + b324b[0] + ")";
        q2a3f[s].style.maskImage = "url(" + b324b[0] + ")";
      }
    }

    var c8a38 = document.getElementById("x51d1");
    if (c8a38) {
      c8a38.addEventListener("click", function (event) {
        event.preventDefault();
        try {
          sessionStorage.removeItem(i0308);
        } catch (err) {}
        location.reload();
      });
    }

    if (window.e62a5) window.e62a5();

    if (location.hash) {
      var dc65a = document.getElementById(location.hash.slice(1));
      if (dc65a) dc65a.scrollIntoView();
    }
  }

  function w0be4(m1427, n0a1f) {
    q53f6("");
    u58a5.disabled = true;
    u58a5.textContent = "Opening…";

    return q081d(m1427, p44f6[1], p44f6[2])
      .then(function (key) {
        return v8331(key, p44f6);
      })
      .then(function (e3521) {
        var ide7d = new TextDecoder().decode(e3521);
        return l92ba(m1427).then(function (b324b) {
          if (n0a1f) {
            try {
              sessionStorage.setItem(i0308, m1427);
            } catch (err) {}
          }
          cb9d2(ide7d, b324b);
        });
      })
      .catch(function () {
        u58a5.disabled = false;
        u58a5.textContent = "Unlock";
        try {
          sessionStorage.removeItem(i0308);
        } catch (err) {}
        return "no";
      });
  }

  r1d63.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!z4054.value) return;
    w0be4(z4054.value, true).then(function (result) {
      if (result === "no") {
        q53f6("That password is not right.");
        z4054.select();
      }
    });
  });

  var tebb4 = null;
  try {
    tebb4 = sessionStorage.getItem(i0308);
  } catch (err) {}
  if (tebb4) w0be4(tebb4, false);
  else z4054.focus();
})();
