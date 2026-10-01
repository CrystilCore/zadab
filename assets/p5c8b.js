(function () {
  var wd999 = document.getElementById("nf900");
  if (!wd999) return;

  var l7026 = JSON.parse(wd999.textContent);
  var q4b96 = l7026[0];

  var gda48 = document.getElementById("g3160");
  var c1a50 = document.getElementById("q11e7");
  var t9fdc = document.getElementById("gf0e5");
  var cc520 = document.getElementById("n05ad");
  var w27af = document.getElementById("dc8ae");
  var gf358 = document.getElementById("n9a89");
  var b8b6a = document.getElementById("i3bba");

  var x6e76 = "g33af" + q4b96;

  function lc5e8(y5416) {
    try {
      localStorage.setItem(x6e76, y5416);
      return;
    } catch (err) {}
    try {
      sessionStorage.setItem(x6e76, y5416);
    } catch (err) {}
  }
  function scf54() {
    try {
      var kept = localStorage.getItem(x6e76);
      if (kept) return kept;
    } catch (err) {}
    try {
      return sessionStorage.getItem(x6e76);
    } catch (err) {}
    return null;
  }
  function d7e30() {
    try {
      localStorage.removeItem(x6e76);
    } catch (err) {}
    try {
      sessionStorage.removeItem(x6e76);
    } catch (err) {}
  }

  function ud57b(vb9b4) {
    w27af.textContent = vb9b4 || "";
    w27af.hidden = !vb9b4;
  }

  function rd24a(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    cc520.disabled = true;
    t9fdc.disabled = true;
    ud57b(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function sa962(y5416, salt, rounds) {
    var r4cb1 = new TextEncoder();
    return crypto.subtle
      .importKey("raw", r4cb1.encode(y5416), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: rd24a(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function iff08(key, r58c3) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: rd24a(r58c3[3]) },
      key,
      rd24a(r58c3[4])
    );
  }

  function o0c87(y5416) {
    if (!b8b6a) return Promise.resolve([]);
    var ye6a8 = JSON.parse(b8b6a.textContent);

    return Promise.all(
      ye6a8.map(function (r58c3) {
        return sa962(y5416, r58c3[1], r58c3[2])
          .then(function (key) {
            return iff08(key, r58c3);
          })
          .then(function (o0e5c) {
            return URL.createObjectURL(new Blob([o0e5c], { type: r58c3[0] }));
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

  function k7693(gf358) {
    
    var f77ac = "245, 197, 66";
    var be7df = [
      
      { far: false, room: 5200, small: 13, big: 25, dim: 0.12, bright: 0.26, cap: 420 },
      { far: true, room: 11000, small: 12, big: 22, dim: 0.09, bright: 0.15, cap: 220 },
    ];

    for (var f = 0; f < be7df.length; f++) {
      var c8a82 = be7df[f];
      var k092e = document.createElement("div");
      k092e.className = c8a82.far ? "cef6b of75b" : "cef6b";
      k092e.setAttribute("aria-hidden", "true");

      var y5998 = window.innerWidth * 1.6;
      var a0c3c = window.innerHeight * 1.6;
      var vb61d = Math.min(c8a82.cap, Math.max(10, Math.round((y5998 * a0c3c) / c8a82.room)));

      for (var s = 0; s < vb61d; s++) {
        var ec22f = document.createElement("div");
        var af1eb = c8a82.small + Math.random() * (c8a82.big - c8a82.small);
        var q7bfb = c8a82.dim + Math.random() * (c8a82.bright - c8a82.dim);
        ec22f.className = "m9301";
        ec22f.style.cssText =
          "left:" + (Math.random() * 100).toFixed(3) + "%;" +
          "top:" + (Math.random() * 100).toFixed(3) + "%;" +
          "width:" + af1eb.toFixed(1) + "px;height:" + af1eb.toFixed(1) + "px;" +
          "background-color:rgba(" + f77ac + "," + q7bfb.toFixed(3) + ");" +
          "box-shadow:0 0 7px rgba(" + f77ac + "," + (q7bfb * 2.4).toFixed(3) + ")," +
          "0 0 22px rgba(" + f77ac + "," + (q7bfb * 1.8).toFixed(3) + ");" +
          
          "animation-duration:" + (2.5 + Math.random() * 7).toFixed(2) + "s;" +
          "animation-delay:-" + (Math.random() * 10).toFixed(2) + "s";
        k092e.appendChild(ec22f);
      }
      gf358.appendChild(k092e);
    }
  }

  function yaacb(host, cell, flame, spare, inside) {
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
    
    var vd7c6 = document.getElementById("qfdbd");
    if (vd7c6) canvas.style.filter = "url(#" + vd7c6.id + ")";
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
          var af1eb = x + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
          if (af1eb < 0) af1eb = 0;
          if (af1eb >= cols) af1eb = cols - 1;
          heat[y * cols + af1eb] = below > loss ? below - loss : 0;
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

  function h73bc(f7432, g64b1) {
    gf358.innerHTML = f7432;
    gf358.hidden = false;
    if (gda48 && gda48.parentNode) gda48.parentNode.removeChild(gda48);

    var r6548 = document.getElementById("p7c58");
    if (r6548) document.title = r6548.textContent;

    var j0cc5 = gf358.querySelectorAll("[xfda2]");
    for (var i = 0; i < j0cc5.length; i++) {
      var s6e36 = g64b1[Number(j0cc5[i].getAttribute("xfda2"))];
      if (s6e36) j0cc5[i].src = s6e36;
    }

    var files = gf358.querySelectorAll("[h3a8f]");
    for (var f = 0; f < files.length; f++) {
      var target = g64b1[Number(files[f].getAttribute("h3a8f"))];
      if (target) files[f].href = target;
    }

    var switchable = gf358.querySelectorAll("[n75ea]");
    var flagFile = document.getElementById("zf9d4");
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
            if (flags[switchable[k].getAttribute("n75ea")] === true) {
              switchable[k].hidden = false;
            } else if (switchable[k].tagName === "MAIN") {
              location.replace("index.html");
            }
          }

          var tint = flags.noticeColor;
          if (typeof tint === "string" && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(tint)) {
            for (var n = 0; n < switchable.length; n++) {
              if (!switchable[n].hidden && switchable[n].getAttribute("n75ea") === "ud57b") {
                switchable[n].style.setProperty("--peac0", tint);
              }
            }
          }
        });
    }

    k7693(gf358);

    var r7d7d = gf358.querySelectorAll("[t45b0]");
    for (var b = 0; b < r7d7d.length; b++) {
      if (r7d7d[b].tagName === "FOOTER") yaacb(r7d7d[b], 4, 16, 6, false);
      else yaacb(r7d7d[b], 3, 8, 5, true);
    }

    var copiers = gf358.querySelectorAll(".mcc69");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (g64b1[0]) {
      var fce72 = gf358.querySelectorAll(".vc339");
      for (var s = 0; s < fce72.length; s++) {
        fce72[s].style.webkitMaskImage = "url(" + g64b1[0] + ")";
        fce72[s].style.maskImage = "url(" + g64b1[0] + ")";
      }
    }

    var y5408 = document.getElementById("z79e7");
    if (y5408) {
      y5408.addEventListener("click", function (event) {
        event.preventDefault();
        d7e30();
        location.reload();
      });
    }

    if (window.qd72a) window.qd72a();

    if (location.hash) {
      var ke8ba = document.getElementById(location.hash.slice(1));
      if (ke8ba) ke8ba.scrollIntoView();
    }
  }

  function h600b(y5416, q78ee) {
    ud57b("");
    cc520.disabled = true;
    cc520.textContent = "Opening…";

    return sa962(y5416, l7026[1], l7026[2])
      .then(function (key) {
        return iff08(key, l7026);
      })
      .then(function (o0e5c) {
        var f7432 = new TextDecoder().decode(o0e5c);
        return o0c87(y5416).then(function (g64b1) {
          if (q78ee) lc5e8(y5416);
          h73bc(f7432, g64b1);
        });
      })
      .catch(function () {
        cc520.disabled = false;
        cc520.textContent = "Unlock";
        d7e30();
        return "no";
      });
  }

  c1a50.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!t9fdc.value) return;
    h600b(t9fdc.value, true).then(function (result) {
      if (result === "no") {
        ud57b("That password is not right.");
        t9fdc.select();
      }
    });
  });

  var g0d45 = scf54();
  if (g0d45) h600b(g0d45, false);
  else t9fdc.focus();
})();
