(function () {
  var efa72 = document.getElementById("k5b79");
  if (!efa72) return;

  var td0fd = JSON.parse(efa72.textContent);
  var e490e = td0fd[0];

  var j0214 = document.getElementById("h6e29");
  var l8319 = document.getElementById("m25dd");
  var cc225 = document.getElementById("t0983");
  var d70d3 = document.getElementById("o6ab9");
  var d6526 = document.getElementById("hf3e2");
  var i544b = document.getElementById("n50c4");
  var h9fd7 = document.getElementById("wff00");

  var b837e = "g4bd8" + e490e;

  function bf96b(l6003) {
    try {
      localStorage.setItem(b837e, l6003);
      return;
    } catch (err) {}
    try {
      sessionStorage.setItem(b837e, l6003);
    } catch (err) {}
  }
  function a92a0() {
    try {
      var kept = localStorage.getItem(b837e);
      if (kept) return kept;
    } catch (err) {}
    try {
      return sessionStorage.getItem(b837e);
    } catch (err) {}
    return null;
  }
  function ud6e2() {
    try {
      localStorage.removeItem(b837e);
    } catch (err) {}
    try {
      sessionStorage.removeItem(b837e);
    } catch (err) {}
  }

  function y34a7(j0520) {
    d6526.textContent = j0520 || "";
    d6526.hidden = !j0520;
  }

  function ed9c8(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    d70d3.disabled = true;
    cc225.disabled = true;
    y34a7(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function eb3e3(l6003, salt, rounds) {
    var ya152 = new TextEncoder();
    return crypto.subtle
      .importKey("raw", ya152.encode(l6003), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: ed9c8(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function s0a45(key, g4f89) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: ed9c8(g4f89[3]) },
      key,
      ed9c8(g4f89[4])
    );
  }

  function i43cf(l6003) {
    if (!h9fd7) return Promise.resolve([]);
    var w413d = JSON.parse(h9fd7.textContent);

    return Promise.all(
      w413d.map(function (g4f89) {
        return eb3e3(l6003, g4f89[1], g4f89[2])
          .then(function (key) {
            return s0a45(key, g4f89);
          })
          .then(function (a6119) {
            return URL.createObjectURL(new Blob([a6119], { type: g4f89[0] }));
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

  function m04f7(i544b) {
    
    var p0902 = "245, 197, 66";
    var z1e42 = [
      
      { far: false, room: 5200, small: 13, big: 25, dim: 0.12, bright: 0.26, cap: 420 },
      { far: true, room: 11000, small: 12, big: 22, dim: 0.09, bright: 0.15, cap: 220 },
    ];

    for (var f = 0; f < z1e42.length; f++) {
      var h65a6 = z1e42[f];
      var rfec0 = document.createElement("div");
      rfec0.className = h65a6.far ? "g5136 p6c16" : "g5136";
      rfec0.setAttribute("aria-hidden", "true");

      var bc03e = window.innerWidth * 1.6;
      var x0379 = window.innerHeight * 1.6;
      var xfbb3 = Math.min(h65a6.cap, Math.max(10, Math.round((bc03e * x0379) / h65a6.room)));

      for (var s = 0; s < xfbb3; s++) {
        var kbdc1 = document.createElement("div");
        var z98cc = h65a6.small + Math.random() * (h65a6.big - h65a6.small);
        var fb248 = h65a6.dim + Math.random() * (h65a6.bright - h65a6.dim);
        kbdc1.className = "o112c";
        kbdc1.style.cssText =
          "left:" + (Math.random() * 100).toFixed(3) + "%;" +
          "top:" + (Math.random() * 100).toFixed(3) + "%;" +
          "width:" + z98cc.toFixed(1) + "px;height:" + z98cc.toFixed(1) + "px;" +
          "background-color:rgba(" + p0902 + "," + fb248.toFixed(3) + ");" +
          "box-shadow:0 0 7px rgba(" + p0902 + "," + (fb248 * 2.4).toFixed(3) + ")," +
          "0 0 22px rgba(" + p0902 + "," + (fb248 * 1.8).toFixed(3) + ");" +
          
          "animation-duration:" + (2.5 + Math.random() * 7).toFixed(2) + "s;" +
          "animation-delay:-" + (Math.random() * 10).toFixed(2) + "s";
        rfec0.appendChild(kbdc1);
      }
      i544b.appendChild(rfec0);
    }
  }

  function qb043(host, cell, flame, spare, inside) {
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
    
    var u82e5 = document.getElementById("nd984");
    if (u82e5) canvas.style.filter = "url(#" + u82e5.id + ")";
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
          var z98cc = x + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
          if (z98cc < 0) z98cc = 0;
          if (z98cc >= cols) z98cc = cols - 1;
          heat[y * cols + z98cc] = below > loss ? below - loss : 0;
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

  function e8a9e(j3267, b1c76) {
    i544b.innerHTML = j3267;
    i544b.hidden = false;
    if (j0214 && j0214.parentNode) j0214.parentNode.removeChild(j0214);

    var q4dbc = document.getElementById("l8c63");
    if (q4dbc) document.title = q4dbc.textContent;

    var i2855 = i544b.querySelectorAll("[j1529]");
    for (var i = 0; i < i2855.length; i++) {
      var p4ddd = b1c76[Number(i2855[i].getAttribute("j1529"))];
      if (p4ddd) i2855[i].src = p4ddd;
    }

    var files = i544b.querySelectorAll("[g97a3]");
    for (var f = 0; f < files.length; f++) {
      var target = b1c76[Number(files[f].getAttribute("g97a3"))];
      if (target) files[f].href = target;
    }

    var switchable = i544b.querySelectorAll("[jd2c4]");
    var flagFile = document.getElementById("bb212");
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
            if (flags[switchable[k].getAttribute("jd2c4")] === true) {
              switchable[k].hidden = false;
            } else if (switchable[k].tagName === "MAIN") {
              location.replace("index.html");
            }
          }

          var tint = flags.noticeColor;
          if (typeof tint === "string" && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(tint)) {
            for (var n = 0; n < switchable.length; n++) {
              if (!switchable[n].hidden && switchable[n].getAttribute("jd2c4") === "y34a7") {
                switchable[n].style.setProperty("--m7ff4", tint);
              }
            }
          }
        });
    }

    m04f7(i544b);

    var lb380 = i544b.querySelectorAll("[ebb4d]");
    for (var b = 0; b < lb380.length; b++) {
      if (lb380[b].tagName === "FOOTER") qb043(lb380[b], 4, 16, 6, false);
      else qb043(lb380[b], 3, 8, 5, true);
    }

    var copiers = i544b.querySelectorAll(".fd1a6");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (b1c76[0]) {
      var e6a03 = i544b.querySelectorAll(".d3dd2");
      for (var s = 0; s < e6a03.length; s++) {
        e6a03[s].style.webkitMaskImage = "url(" + b1c76[0] + ")";
        e6a03[s].style.maskImage = "url(" + b1c76[0] + ")";
      }
    }

    var k1ba6 = document.getElementById("w05cc");
    if (k1ba6) {
      k1ba6.addEventListener("click", function (event) {
        event.preventDefault();
        ud6e2();
        location.reload();
      });
    }

    if (window.k0e25) window.k0e25();

    if (location.hash) {
      var l82e4 = document.getElementById(location.hash.slice(1));
      if (l82e4) l82e4.scrollIntoView();
    }
  }

  function ce937(l6003, haa08) {
    y34a7("");
    d70d3.disabled = true;
    d70d3.textContent = "Opening…";

    return eb3e3(l6003, td0fd[1], td0fd[2])
      .then(function (key) {
        return s0a45(key, td0fd);
      })
      .then(function (a6119) {
        var j3267 = new TextDecoder().decode(a6119);
        return i43cf(l6003).then(function (b1c76) {
          if (haa08) bf96b(l6003);
          e8a9e(j3267, b1c76);
        });
      })
      .catch(function () {
        d70d3.disabled = false;
        d70d3.textContent = "Unlock";
        ud6e2();
        return "no";
      });
  }

  l8319.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!cc225.value) return;
    ce937(cc225.value, true).then(function (result) {
      if (result === "no") {
        y34a7("That password is not right.");
        cc225.select();
      }
    });
  });

  var j2a42 = a92a0();
  if (j2a42) ce937(j2a42, false);
  else cc225.focus();
})();
