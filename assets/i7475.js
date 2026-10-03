(function () {
  var a03aa = document.getElementById("n9bc8");
  if (!a03aa) return;

  var z93dd = JSON.parse(a03aa.textContent);
  var a4af2 = z93dd[0];

  var e48bd = document.getElementById("r0c22");
  var z4ae5 = document.getElementById("pbdaa");
  var n1c80 = document.getElementById("qd44f");
  var m1906 = document.getElementById("u3722");
  var ibbd1 = document.getElementById("mc175");
  var p2ecb = document.getElementById("v33c5");
  var g813c = document.getElementById("z95df");

  var ga060 = "eccef" + a4af2;

  function ce531(y1500) {
    try {
      localStorage.setItem(ga060, y1500);
      return;
    } catch (err) {}
    try {
      sessionStorage.setItem(ga060, y1500);
    } catch (err) {}
  }
  function rcf78() {
    try {
      var kept = localStorage.getItem(ga060);
      if (kept) return kept;
    } catch (err) {}
    try {
      return sessionStorage.getItem(ga060);
    } catch (err) {}
    return null;
  }
  function z2eaf() {
    try {
      localStorage.removeItem(ga060);
    } catch (err) {}
    try {
      sessionStorage.removeItem(ga060);
    } catch (err) {}
  }

  function g556e(j44a2) {
    ibbd1.textContent = j44a2 || "";
    ibbd1.hidden = !j44a2;
  }

  function p7d30(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    m1906.disabled = true;
    n1c80.disabled = true;
    g556e(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function f7dcd(y1500, salt, rounds) {
    var r8a1f = new TextEncoder();
    return crypto.subtle
      .importKey("raw", r8a1f.encode(y1500), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: p7d30(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function d165d(key, ia3bb) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: p7d30(ia3bb[3]) },
      key,
      p7d30(ia3bb[4])
    );
  }

  function ef89b(y1500) {
    if (!g813c) return Promise.resolve([]);
    var b0faa = JSON.parse(g813c.textContent);

    return Promise.all(
      b0faa.map(function (ia3bb) {
        return f7dcd(y1500, ia3bb[1], ia3bb[2])
          .then(function (key) {
            return d165d(key, ia3bb);
          })
          .then(function (z5b10) {
            return URL.createObjectURL(new Blob([z5b10], { type: ia3bb[0] }));
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

  function kc704(p2ecb) {
    
    var m958e = "245, 197, 66";
    var e9c54 = [
      
      { far: false, room: 5200, small: 13, big: 25, dim: 0.12, bright: 0.26, cap: 420 },
      { far: true, room: 11000, small: 12, big: 22, dim: 0.09, bright: 0.15, cap: 220 },
    ];

    for (var f = 0; f < e9c54.length; f++) {
      var jd470 = e9c54[f];
      var l2dd9 = document.createElement("div");
      l2dd9.className = jd470.far ? "jcbd5 d82da" : "jcbd5";
      l2dd9.setAttribute("aria-hidden", "true");

      var r3c3a = window.innerWidth * 1.6;
      var sd60d = window.innerHeight * 1.6;
      var e1b16 = Math.min(jd470.cap, Math.max(10, Math.round((r3c3a * sd60d) / jd470.room)));

      for (var s = 0; s < e1b16; s++) {
        var i0d19 = document.createElement("div");
        var r8336 = jd470.small + Math.random() * (jd470.big - jd470.small);
        var dbd5a = jd470.dim + Math.random() * (jd470.bright - jd470.dim);
        i0d19.className = "m9755";
        i0d19.style.cssText =
          "left:" + (Math.random() * 100).toFixed(3) + "%;" +
          "top:" + (Math.random() * 100).toFixed(3) + "%;" +
          "width:" + r8336.toFixed(1) + "px;height:" + r8336.toFixed(1) + "px;" +
          "background-color:rgba(" + m958e + "," + dbd5a.toFixed(3) + ");" +
          "box-shadow:0 0 7px rgba(" + m958e + "," + (dbd5a * 2.4).toFixed(3) + ")," +
          "0 0 22px rgba(" + m958e + "," + (dbd5a * 1.8).toFixed(3) + ");" +
          
          "animation-duration:" + (2.5 + Math.random() * 7).toFixed(2) + "s;" +
          "animation-delay:-" + (Math.random() * 10).toFixed(2) + "s";
        l2dd9.appendChild(i0d19);
      }
      p2ecb.appendChild(l2dd9);
    }
  }

  function m7de5(host, cell, flame, spare, inside) {
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
    
    var z7f59 = document.getElementById("zfbd5");
    if (z7f59) canvas.style.filter = "url(#" + z7f59.id + ")";
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
          var r8336 = x + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
          if (r8336 < 0) r8336 = 0;
          if (r8336 >= cols) r8336 = cols - 1;
          heat[y * cols + r8336] = below > loss ? below - loss : 0;
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

  function oa413(o2d96, d68d3) {
    p2ecb.innerHTML = o2d96;
    p2ecb.hidden = false;
    if (e48bd && e48bd.parentNode) e48bd.parentNode.removeChild(e48bd);

    var mcfb3 = document.getElementById("g091d");
    if (mcfb3) document.title = mcfb3.textContent;

    var p16ef = p2ecb.querySelectorAll("[y5af3]");
    for (var i = 0; i < p16ef.length; i++) {
      var vdd55 = d68d3[Number(p16ef[i].getAttribute("y5af3"))];
      if (vdd55) p16ef[i].src = vdd55;
    }

    var files = p2ecb.querySelectorAll("[bd54e]");
    for (var f = 0; f < files.length; f++) {
      var target = d68d3[Number(files[f].getAttribute("bd54e"))];
      if (target) files[f].href = target;
    }

    var switchable = p2ecb.querySelectorAll("[k83d0]");
    var flagFile = document.getElementById("y58dd");
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
            if (flags[switchable[k].getAttribute("k83d0")] === true) {
              switchable[k].hidden = false;
            } else if (switchable[k].tagName === "MAIN") {
              location.replace("index.html");
            }
          }

          var tint = flags.noticeColor;
          if (typeof tint === "string" && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(tint)) {
            for (var n = 0; n < switchable.length; n++) {
              if (!switchable[n].hidden && switchable[n].getAttribute("k83d0") === "g556e") {
                switchable[n].style.setProperty("--c6dbc", tint);
              }
            }
          }
        });
    }

    kc704(p2ecb);

    var qf07a = p2ecb.querySelectorAll("[lc002]");
    for (var b = 0; b < qf07a.length; b++) {
      if (qf07a[b].tagName === "FOOTER") m7de5(qf07a[b], 4, 16, 6, false);
      else m7de5(qf07a[b], 3, 8, 5, true);
    }

    var copiers = p2ecb.querySelectorAll(".f9723");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (d68d3[0]) {
      var d7bfb = p2ecb.querySelectorAll(".fba1f");
      for (var s = 0; s < d7bfb.length; s++) {
        d7bfb[s].style.webkitMaskImage = "url(" + d68d3[0] + ")";
        d7bfb[s].style.maskImage = "url(" + d68d3[0] + ")";
      }
    }

    var t2c6b = document.getElementById("jafdf");
    if (t2c6b) {
      t2c6b.addEventListener("click", function (event) {
        event.preventDefault();
        z2eaf();
        location.reload();
      });
    }

    if (window.t6518) window.t6518();

    if (location.hash) {
      var udcac = document.getElementById(location.hash.slice(1));
      if (udcac) udcac.scrollIntoView();
    }
  }

  function n9d13(y1500, baa5e) {
    g556e("");
    m1906.disabled = true;
    m1906.textContent = "Opening…";

    return f7dcd(y1500, z93dd[1], z93dd[2])
      .then(function (key) {
        return d165d(key, z93dd);
      })
      .then(function (z5b10) {
        var o2d96 = new TextDecoder().decode(z5b10);
        return ef89b(y1500).then(function (d68d3) {
          if (baa5e) ce531(y1500);
          oa413(o2d96, d68d3);
        });
      })
      .catch(function () {
        m1906.disabled = false;
        m1906.textContent = "Unlock";
        z2eaf();
        return "no";
      });
  }

  z4ae5.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!n1c80.value) return;
    n9d13(n1c80.value, true).then(function (result) {
      if (result === "no") {
        g556e("That password is not right.");
        n1c80.select();
      }
    });
  });

  var rd2c7 = rcf78();
  if (rd2c7) n9d13(rd2c7, false);
  else n1c80.focus();
})();
