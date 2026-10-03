(function () {
  var k569b = document.getElementById("e85b5");
  if (!k569b) return;

  var je868 = JSON.parse(k569b.textContent);
  var a9f62 = je868[0];

  var gcc3d = document.getElementById("u8d94");
  var ta583 = document.getElementById("q6e21");
  var z34ea = document.getElementById("x595c");
  var ed942 = document.getElementById("h2838");
  var w1cb3 = document.getElementById("ae1b1");
  var f1766 = document.getElementById("q2486");
  var h55fb = document.getElementById("laffa");

  var d4feb = "le53a" + a9f62;

  function e1dda(mc52e) {
    try {
      localStorage.setItem(d4feb, mc52e);
      return;
    } catch (err) {}
    try {
      sessionStorage.setItem(d4feb, mc52e);
    } catch (err) {}
  }
  function n27c7() {
    try {
      var kept = localStorage.getItem(d4feb);
      if (kept) return kept;
    } catch (err) {}
    try {
      return sessionStorage.getItem(d4feb);
    } catch (err) {}
    return null;
  }
  function p58ef() {
    try {
      localStorage.removeItem(d4feb);
    } catch (err) {}
    try {
      sessionStorage.removeItem(d4feb);
    } catch (err) {}
  }

  function q26a1(g4ecc) {
    w1cb3.textContent = g4ecc || "";
    w1cb3.hidden = !g4ecc;
  }

  function zb052(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    ed942.disabled = true;
    z34ea.disabled = true;
    q26a1(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function gdda8(mc52e, salt, rounds) {
    var qee25 = new TextEncoder();
    return crypto.subtle
      .importKey("raw", qee25.encode(mc52e), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: zb052(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function m3692(key, a664a) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: zb052(a664a[3]) },
      key,
      zb052(a664a[4])
    );
  }

  function x4ff3(mc52e) {
    if (!h55fb) return Promise.resolve([]);
    var wac56 = JSON.parse(h55fb.textContent);

    return Promise.all(
      wac56.map(function (a664a) {
        return gdda8(mc52e, a664a[1], a664a[2])
          .then(function (key) {
            return m3692(key, a664a);
          })
          .then(function (x8eb6) {
            return URL.createObjectURL(new Blob([x8eb6], { type: a664a[0] }));
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

  function ad2b5(f1766) {
    
    var e604d = "245, 197, 66";
    var ybee3 = [
      
      { far: false, room: 5200, small: 13, big: 25, dim: 0.12, bright: 0.26, cap: 420 },
      { far: true, room: 11000, small: 12, big: 22, dim: 0.09, bright: 0.15, cap: 220 },
    ];

    for (var f = 0; f < ybee3.length; f++) {
      var be1cf = ybee3[f];
      var re9b8 = document.createElement("div");
      re9b8.className = be1cf.far ? "wfa49 mac01" : "wfa49";
      re9b8.setAttribute("aria-hidden", "true");

      var x4b67 = window.innerWidth * 1.6;
      var b9870 = window.innerHeight * 1.6;
      var o3ebe = Math.min(be1cf.cap, Math.max(10, Math.round((x4b67 * b9870) / be1cf.room)));

      for (var s = 0; s < o3ebe; s++) {
        var y6c4c = document.createElement("div");
        var oe28b = be1cf.small + Math.random() * (be1cf.big - be1cf.small);
        var m0c3d = be1cf.dim + Math.random() * (be1cf.bright - be1cf.dim);
        y6c4c.className = "cd52b";
        y6c4c.style.cssText =
          "left:" + (Math.random() * 100).toFixed(3) + "%;" +
          "top:" + (Math.random() * 100).toFixed(3) + "%;" +
          "width:" + oe28b.toFixed(1) + "px;height:" + oe28b.toFixed(1) + "px;" +
          "background-color:rgba(" + e604d + "," + m0c3d.toFixed(3) + ");" +
          "box-shadow:0 0 7px rgba(" + e604d + "," + (m0c3d * 2.4).toFixed(3) + ")," +
          "0 0 22px rgba(" + e604d + "," + (m0c3d * 1.8).toFixed(3) + ");" +
          
          "animation-duration:" + (2.5 + Math.random() * 7).toFixed(2) + "s;" +
          "animation-delay:-" + (Math.random() * 10).toFixed(2) + "s";
        re9b8.appendChild(y6c4c);
      }
      f1766.appendChild(re9b8);
    }
  }

  function v8b0e(host, cell, flame, spare, inside) {
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
    
    var y7071 = document.getElementById("fc5a8");
    if (y7071) canvas.style.filter = "url(#" + y7071.id + ")";
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
          var oe28b = x + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
          if (oe28b < 0) oe28b = 0;
          if (oe28b >= cols) oe28b = cols - 1;
          heat[y * cols + oe28b] = below > loss ? below - loss : 0;
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

  function oe46f(q4f8f, c5353) {
    f1766.innerHTML = q4f8f;
    f1766.hidden = false;
    if (gcc3d && gcc3d.parentNode) gcc3d.parentNode.removeChild(gcc3d);

    var d430e = document.getElementById("o3ade");
    if (d430e) document.title = d430e.textContent;

    var o175f = f1766.querySelectorAll("[r5438]");
    for (var i = 0; i < o175f.length; i++) {
      var q3b25 = c5353[Number(o175f[i].getAttribute("r5438"))];
      if (q3b25) o175f[i].src = q3b25;
    }

    var files = f1766.querySelectorAll("[nb8d0]");
    for (var f = 0; f < files.length; f++) {
      var target = c5353[Number(files[f].getAttribute("nb8d0"))];
      if (target) files[f].href = target;
    }

    var switchable = f1766.querySelectorAll("[u3890]");
    var flagFile = document.getElementById("x1f32");
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
            if (flags[switchable[k].getAttribute("u3890")] === true) {
              switchable[k].hidden = false;
            } else if (switchable[k].tagName === "MAIN") {
              location.replace("index.html");
            }
          }

          var tint = flags.noticeColor;
          if (typeof tint === "string" && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(tint)) {
            for (var n = 0; n < switchable.length; n++) {
              if (!switchable[n].hidden && switchable[n].getAttribute("u3890") === "q26a1") {
                switchable[n].style.setProperty("--f2311", tint);
              }
            }
          }
        });
    }

    ad2b5(f1766);

    var s4de9 = f1766.querySelectorAll("[r0bb5]");
    for (var b = 0; b < s4de9.length; b++) {
      if (s4de9[b].tagName === "FOOTER") v8b0e(s4de9[b], 4, 16, 6, false);
      else v8b0e(s4de9[b], 3, 8, 5, true);
    }

    var copiers = f1766.querySelectorAll(".meb08");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (c5353[0]) {
      var b45ad = f1766.querySelectorAll(".t2864");
      for (var s = 0; s < b45ad.length; s++) {
        b45ad[s].style.webkitMaskImage = "url(" + c5353[0] + ")";
        b45ad[s].style.maskImage = "url(" + c5353[0] + ")";
      }
    }

    var z6d30 = document.getElementById("y4842");
    if (z6d30) {
      z6d30.addEventListener("click", function (event) {
        event.preventDefault();
        p58ef();
        location.reload();
      });
    }

    if (window.r7aea) window.r7aea();

    if (location.hash) {
      var cc315 = document.getElementById(location.hash.slice(1));
      if (cc315) cc315.scrollIntoView();
    }
  }

  function q6a02(mc52e, sc223) {
    q26a1("");
    ed942.disabled = true;
    ed942.textContent = "Opening…";

    return gdda8(mc52e, je868[1], je868[2])
      .then(function (key) {
        return m3692(key, je868);
      })
      .then(function (x8eb6) {
        var q4f8f = new TextDecoder().decode(x8eb6);
        return x4ff3(mc52e).then(function (c5353) {
          if (sc223) e1dda(mc52e);
          oe46f(q4f8f, c5353);
        });
      })
      .catch(function () {
        ed942.disabled = false;
        ed942.textContent = "Unlock";
        p58ef();
        return "no";
      });
  }

  ta583.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!z34ea.value) return;
    q6a02(z34ea.value, true).then(function (result) {
      if (result === "no") {
        q26a1("That password is not right.");
        z34ea.select();
      }
    });
  });

  var b1225 = n27c7();
  if (b1225) q6a02(b1225, false);
  else z34ea.focus();
})();
