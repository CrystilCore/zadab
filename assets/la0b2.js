(function () {
  var a1876 = document.getElementById("uaadb");
  if (!a1876) return;

  var a7ea8 = JSON.parse(a1876.textContent);
  var y7c82 = a7ea8[0];

  var g43a9 = document.getElementById("k0197");
  var c0ebb = document.getElementById("s1a99");
  var md4f4 = document.getElementById("c5bf5");
  var b2d1d = document.getElementById("g8de0");
  var u8331 = document.getElementById("i045b");
  var d4cc5 = document.getElementById("qf8b3");
  var p8102 = document.getElementById("tf1b3");

  var j9697 = "k8f75" + y7c82;

  function l9307(s9a37) {
    try {
      localStorage.setItem(j9697, s9a37);
      return;
    } catch (err) {}
    try {
      sessionStorage.setItem(j9697, s9a37);
    } catch (err) {}
  }
  function uae43() {
    try {
      var kept = localStorage.getItem(j9697);
      if (kept) return kept;
    } catch (err) {}
    try {
      return sessionStorage.getItem(j9697);
    } catch (err) {}
    return null;
  }
  function ubce6() {
    try {
      localStorage.removeItem(j9697);
    } catch (err) {}
    try {
      sessionStorage.removeItem(j9697);
    } catch (err) {}
  }

  function z8ffd(idfe8) {
    u8331.textContent = idfe8 || "";
    u8331.hidden = !idfe8;
  }

  function a49d1(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    b2d1d.disabled = true;
    md4f4.disabled = true;
    z8ffd(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function v8464(s9a37, salt, rounds) {
    var w58ba = new TextEncoder();
    return crypto.subtle
      .importKey("raw", w58ba.encode(s9a37), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: a49d1(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function r1305(key, mac08) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: a49d1(mac08[3]) },
      key,
      a49d1(mac08[4])
    );
  }

  function u2ed1(s9a37) {
    if (!p8102) return Promise.resolve([]);
    var wacb5 = JSON.parse(p8102.textContent);

    return Promise.all(
      wacb5.map(function (mac08) {
        return v8464(s9a37, mac08[1], mac08[2])
          .then(function (key) {
            return r1305(key, mac08);
          })
          .then(function (w61f5) {
            return URL.createObjectURL(new Blob([w61f5], { type: mac08[0] }));
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

  function g9a17(d4cc5) {
    
    var ca63a = "245, 197, 66";
    var xc137 = [
      
      { far: false, room: 5200, small: 13, big: 25, dim: 0.12, bright: 0.26, cap: 420 },
      { far: true, room: 11000, small: 12, big: 22, dim: 0.09, bright: 0.15, cap: 220 },
    ];

    for (var f = 0; f < xc137.length; f++) {
      var b5817 = xc137[f];
      var mdc4e = document.createElement("div");
      mdc4e.className = b5817.far ? "v61b7 e65ce" : "v61b7";
      mdc4e.setAttribute("aria-hidden", "true");

      var x672c = window.innerWidth * 1.6;
      var n113e = window.innerHeight * 1.6;
      var f3497 = Math.min(b5817.cap, Math.max(10, Math.round((x672c * n113e) / b5817.room)));

      for (var s = 0; s < f3497; s++) {
        var u05ec = document.createElement("div");
        var q8172 = b5817.small + Math.random() * (b5817.big - b5817.small);
        var i3173 = b5817.dim + Math.random() * (b5817.bright - b5817.dim);
        u05ec.className = "idb77";
        u05ec.style.cssText =
          "left:" + (Math.random() * 100).toFixed(3) + "%;" +
          "top:" + (Math.random() * 100).toFixed(3) + "%;" +
          "width:" + q8172.toFixed(1) + "px;height:" + q8172.toFixed(1) + "px;" +
          "background-color:rgba(" + ca63a + "," + i3173.toFixed(3) + ");" +
          "box-shadow:0 0 7px rgba(" + ca63a + "," + (i3173 * 2.4).toFixed(3) + ")," +
          "0 0 22px rgba(" + ca63a + "," + (i3173 * 1.8).toFixed(3) + ");" +
          
          "animation-duration:" + (2.5 + Math.random() * 7).toFixed(2) + "s;" +
          "animation-delay:-" + (Math.random() * 10).toFixed(2) + "s";
        mdc4e.appendChild(u05ec);
      }
      d4cc5.appendChild(mdc4e);
    }
  }

  function w8e56(host, cell, flame, spare, inside) {
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
    
    var o5477 = document.getElementById("of446");
    if (o5477) canvas.style.filter = "url(#" + o5477.id + ")";
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
          var q8172 = x + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
          if (q8172 < 0) q8172 = 0;
          if (q8172 >= cols) q8172 = cols - 1;
          heat[y * cols + q8172] = below > loss ? below - loss : 0;
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

  function m0fe8(x6c76, taa21) {
    d4cc5.innerHTML = x6c76;
    d4cc5.hidden = false;
    if (g43a9 && g43a9.parentNode) g43a9.parentNode.removeChild(g43a9);

    var wa13b = document.getElementById("c7e73");
    if (wa13b) document.title = wa13b.textContent;

    var t2773 = d4cc5.querySelectorAll("[j8a57]");
    for (var i = 0; i < t2773.length; i++) {
      var t2e2d = taa21[Number(t2773[i].getAttribute("j8a57"))];
      if (t2e2d) t2773[i].src = t2e2d;
    }

    var files = d4cc5.querySelectorAll("[ee462]");
    for (var f = 0; f < files.length; f++) {
      var target = taa21[Number(files[f].getAttribute("ee462"))];
      if (target) files[f].href = target;
    }

    var switchable = d4cc5.querySelectorAll("[qb294]");
    var flagFile = document.getElementById("j6e75");
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
            if (flags[switchable[k].getAttribute("qb294")] === true) {
              switchable[k].hidden = false;
            } else if (switchable[k].tagName === "MAIN") {
              location.replace("index.html");
            }
          }
        });
    }

    g9a17(d4cc5);

    var h3c6f = d4cc5.querySelectorAll("[b0a31]");
    for (var b = 0; b < h3c6f.length; b++) {
      if (h3c6f[b].tagName === "FOOTER") w8e56(h3c6f[b], 4, 16, 6, false);
      else w8e56(h3c6f[b], 3, 8, 5, true);
    }

    var copiers = d4cc5.querySelectorAll(".dd7c8");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (taa21[0]) {
      var o2576 = d4cc5.querySelectorAll(".m45c6");
      for (var s = 0; s < o2576.length; s++) {
        o2576[s].style.webkitMaskImage = "url(" + taa21[0] + ")";
        o2576[s].style.maskImage = "url(" + taa21[0] + ")";
      }
    }

    var ta7b4 = document.getElementById("a956c");
    if (ta7b4) {
      ta7b4.addEventListener("click", function (event) {
        event.preventDefault();
        ubce6();
        location.reload();
      });
    }

    if (window.d3be1) window.d3be1();

    if (location.hash) {
      var b7f45 = document.getElementById(location.hash.slice(1));
      if (b7f45) b7f45.scrollIntoView();
    }
  }

  function d1c89(s9a37, f103c) {
    z8ffd("");
    b2d1d.disabled = true;
    b2d1d.textContent = "Opening…";

    return v8464(s9a37, a7ea8[1], a7ea8[2])
      .then(function (key) {
        return r1305(key, a7ea8);
      })
      .then(function (w61f5) {
        var x6c76 = new TextDecoder().decode(w61f5);
        return u2ed1(s9a37).then(function (taa21) {
          if (f103c) l9307(s9a37);
          m0fe8(x6c76, taa21);
        });
      })
      .catch(function () {
        b2d1d.disabled = false;
        b2d1d.textContent = "Unlock";
        ubce6();
        return "no";
      });
  }

  c0ebb.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!md4f4.value) return;
    d1c89(md4f4.value, true).then(function (result) {
      if (result === "no") {
        z8ffd("That password is not right.");
        md4f4.select();
      }
    });
  });

  var z5fd5 = uae43();
  if (z5fd5) d1c89(z5fd5, false);
  else md4f4.focus();
})();
