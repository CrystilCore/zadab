(function () {
  var e2cfa = document.getElementById("h95a5");
  if (!e2cfa) return;

  var v0332 = JSON.parse(e2cfa.textContent);
  var i9876 = v0332[0];

  var dedcf = document.getElementById("r589a");
  var j7a47 = document.getElementById("j050c");
  var i5d0a = document.getElementById("yabaf");
  var x161a = document.getElementById("lfa58");
  var t642c = document.getElementById("t2872");
  var pbfa8 = document.getElementById("ue383");
  var oc1d8 = document.getElementById("j392a");

  var md53f = "yabae" + i9876;

  function z923a(he193) {
    try {
      localStorage.setItem(md53f, he193);
      return;
    } catch (err) {}
    try {
      sessionStorage.setItem(md53f, he193);
    } catch (err) {}
  }
  function hb2bd() {
    try {
      var kept = localStorage.getItem(md53f);
      if (kept) return kept;
    } catch (err) {}
    try {
      return sessionStorage.getItem(md53f);
    } catch (err) {}
    return null;
  }
  function ma468() {
    try {
      localStorage.removeItem(md53f);
    } catch (err) {}
    try {
      sessionStorage.removeItem(md53f);
    } catch (err) {}
  }

  function nfda0(vc489) {
    t642c.textContent = vc489 || "";
    t642c.hidden = !vc489;
  }

  function gdf46(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    x161a.disabled = true;
    i5d0a.disabled = true;
    nfda0(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function gf30b(he193, salt, rounds) {
    var p0055 = new TextEncoder();
    return crypto.subtle
      .importKey("raw", p0055.encode(he193), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: gdf46(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function va735(key, n6562) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: gdf46(n6562[3]) },
      key,
      gdf46(n6562[4])
    );
  }

  function y639f(he193) {
    if (!oc1d8) return Promise.resolve([]);
    var dc7b7 = JSON.parse(oc1d8.textContent);

    return Promise.all(
      dc7b7.map(function (n6562) {
        return gf30b(he193, n6562[1], n6562[2])
          .then(function (key) {
            return va735(key, n6562);
          })
          .then(function (p725e) {
            return URL.createObjectURL(new Blob([p725e], { type: n6562[0] }));
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

  function q857f(pbfa8) {
    
    var d5e3b = "245, 197, 66";
    var ze060 = [
      
      { far: false, room: 5200, small: 13, big: 25, dim: 0.12, bright: 0.26, cap: 420 },
      { far: true, room: 11000, small: 12, big: 22, dim: 0.09, bright: 0.15, cap: 220 },
    ];

    for (var f = 0; f < ze060.length; f++) {
      var m31d4 = ze060[f];
      var wa40e = document.createElement("div");
      wa40e.className = m31d4.far ? "bfe1b i4e40" : "bfe1b";
      wa40e.setAttribute("aria-hidden", "true");

      var pfa9d = window.innerWidth * 1.6;
      var sc226 = window.innerHeight * 1.6;
      var c03f6 = Math.min(m31d4.cap, Math.max(10, Math.round((pfa9d * sc226) / m31d4.room)));

      for (var s = 0; s < c03f6; s++) {
        var jb41c = document.createElement("div");
        var bb670 = m31d4.small + Math.random() * (m31d4.big - m31d4.small);
        var f026d = m31d4.dim + Math.random() * (m31d4.bright - m31d4.dim);
        jb41c.className = "b9890";
        jb41c.style.cssText =
          "left:" + (Math.random() * 100).toFixed(3) + "%;" +
          "top:" + (Math.random() * 100).toFixed(3) + "%;" +
          "width:" + bb670.toFixed(1) + "px;height:" + bb670.toFixed(1) + "px;" +
          "background-color:rgba(" + d5e3b + "," + f026d.toFixed(3) + ");" +
          "box-shadow:0 0 7px rgba(" + d5e3b + "," + (f026d * 2.4).toFixed(3) + ")," +
          "0 0 22px rgba(" + d5e3b + "," + (f026d * 1.8).toFixed(3) + ");" +
          
          "animation-duration:" + (2.5 + Math.random() * 7).toFixed(2) + "s;" +
          "animation-delay:-" + (Math.random() * 10).toFixed(2) + "s";
        wa40e.appendChild(jb41c);
      }
      pbfa8.appendChild(wa40e);
    }
  }

  function s2722(host, cell, flame, spare, inside) {
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
    
    var ke8da = document.getElementById("me46c");
    if (ke8da) canvas.style.filter = "url(#" + ke8da.id + ")";
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
          var bb670 = x + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
          if (bb670 < 0) bb670 = 0;
          if (bb670 >= cols) bb670 = cols - 1;
          heat[y * cols + bb670] = below > loss ? below - loss : 0;
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

  function i8161(daa9d, n8676) {
    pbfa8.innerHTML = daa9d;
    pbfa8.hidden = false;
    if (dedcf && dedcf.parentNode) dedcf.parentNode.removeChild(dedcf);

    var f64b0 = document.getElementById("x2c8c");
    if (f64b0) document.title = f64b0.textContent;

    var k8a39 = pbfa8.querySelectorAll("[h8718]");
    for (var i = 0; i < k8a39.length; i++) {
      var y7ed5 = n8676[Number(k8a39[i].getAttribute("h8718"))];
      if (y7ed5) k8a39[i].src = y7ed5;
    }

    var files = pbfa8.querySelectorAll("[r9eb7]");
    for (var f = 0; f < files.length; f++) {
      var target = n8676[Number(files[f].getAttribute("r9eb7"))];
      if (target) files[f].href = target;
    }

    var switchable = pbfa8.querySelectorAll("[l5b6b]");
    var flagFile = document.getElementById("z4c28");
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
            if (flags[switchable[k].getAttribute("l5b6b")] === true) {
              switchable[k].hidden = false;
            } else if (switchable[k].tagName === "MAIN") {
              location.replace("index.html");
            }
          }

          var tint = flags.noticeColor;
          if (typeof tint === "string" && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(tint)) {
            for (var n = 0; n < switchable.length; n++) {
              if (!switchable[n].hidden && switchable[n].getAttribute("l5b6b") === "nfda0") {
                switchable[n].style.setProperty("--e22bb", tint);
              }
            }
          }
        });
    }

    q857f(pbfa8);

    var g0df1 = pbfa8.querySelectorAll("[pf17d]");
    for (var b = 0; b < g0df1.length; b++) {
      if (g0df1[b].tagName === "FOOTER") s2722(g0df1[b], 4, 16, 6, false);
      else s2722(g0df1[b], 3, 8, 5, true);
    }

    var copiers = pbfa8.querySelectorAll(".dfc54");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (n8676[0]) {
      var n0e69 = pbfa8.querySelectorAll(".n7ce0");
      for (var s = 0; s < n0e69.length; s++) {
        n0e69[s].style.webkitMaskImage = "url(" + n8676[0] + ")";
        n0e69[s].style.maskImage = "url(" + n8676[0] + ")";
      }
    }

    var z6afa = document.getElementById("rf0fc");
    if (z6afa) {
      z6afa.addEventListener("click", function (event) {
        event.preventDefault();
        ma468();
        location.reload();
      });
    }

    if (window.a89c0) window.a89c0();

    if (location.hash) {
      var k64ac = document.getElementById(location.hash.slice(1));
      if (k64ac) k64ac.scrollIntoView();
    }
  }

  function ldb88(he193, iafef) {
    nfda0("");
    x161a.disabled = true;
    x161a.textContent = "Opening…";

    return gf30b(he193, v0332[1], v0332[2])
      .then(function (key) {
        return va735(key, v0332);
      })
      .then(function (p725e) {
        var daa9d = new TextDecoder().decode(p725e);
        return y639f(he193).then(function (n8676) {
          if (iafef) z923a(he193);
          i8161(daa9d, n8676);
        });
      })
      .catch(function () {
        x161a.disabled = false;
        x161a.textContent = "Unlock";
        ma468();
        return "no";
      });
  }

  j7a47.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!i5d0a.value) return;
    ldb88(i5d0a.value, true).then(function (result) {
      if (result === "no") {
        nfda0("That password is not right.");
        i5d0a.select();
      }
    });
  });

  var i603e = hb2bd();
  if (i603e) ldb88(i603e, false);
  else i5d0a.focus();
})();
