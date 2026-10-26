(function () {
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function norm(a) { var l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }

  function brilliant() {
    var v = [], f = [], i;
    var crown = 0.324, pavilion = 0.862, table = 0.57, star = 0.78;
    function at(angle, r, y) { return [Math.cos(angle) * r, y, Math.sin(angle) * r]; }
    var T = [], S = [], G = [], M = [];
    for (i = 0; i < 8; i++) T.push(v.push(at(i * Math.PI / 4, table, crown)) - 1);
    var starY = crown * (1 - star) / (1 - table);
    for (i = 0; i < 8; i++) S.push(v.push(at((i + 0.5) * Math.PI / 4, star, starY)) - 1);
    for (i = 0; i < 16; i++) G.push(v.push(at(i * Math.PI / 8, 1, 0)) - 1);
    var lower = 0.22;
    for (i = 0; i < 8; i++) M.push(v.push(at((i + 0.5) * Math.PI / 4, lower, -pavilion * (1 - lower))) - 1);
    var culet = v.push([0, -pavilion, 0]) - 1;

    f.push(T.slice());                                         
    for (i = 0; i < 8; i++) {
      var n = (i + 1) % 8, p = (i + 7) % 8;
      f.push([T[i], T[n], S[i]]);                              
      f.push([T[i], S[p], G[2 * i], S[i]]);                    
      f.push([S[i], G[2 * i], G[2 * i + 1]]);                  
      f.push([S[i], G[2 * i + 1], G[(2 * i + 2) % 16]]);
      f.push([G[2 * i], M[p], culet, M[i]]);                   
      f.push([G[2 * i], G[2 * i + 1], M[i]]);                  
      f.push([G[2 * i + 1], G[(2 * i + 2) % 16], M[i]]);
    }
    
    f = f.map(function (idx) {
      var a = v[idx[0]], b = v[idx[1]], c = v[idx[2]];
      var nrm = cross(sub(b, a), sub(c, a));
      var mid = [0, 0, 0];
      idx.forEach(function (k) { mid = add(mid, v[k]); });
      return dot(nrm, mid) < 0 ? idx.slice().reverse() : idx;
    });
    return { v: v, f: f };
  }

  var LAYERS = [
    { tint: 0.72, alpha: 0.55, stones: [{ x: 0.42, y: 0.55, size: 0.95, spin: 0.035, phase: 0.3 }] },
    { tint: 0.86, alpha: 0.6, stones: [{ x: 0.86, y: 0.22, size: 0.62, spin: -0.05, phase: 2.1 },
                                      { x: 0.08, y: 0.95, size: 0.55, spin: 0.045, phase: 4.0 }] },
    { tint: 1, alpha: 0.7, stones: [{ x: 0.66, y: 0.92, size: 0.42, spin: -0.06, phase: 1.2 }] }
  ];
  
  var INTENSITY = 0.35;
  
  var TOP = 185;
  
  var CROWN = 0.55;

  var LIGHTS = [{ d: norm([-0.2, 1, 0.35]), sharp: 8, power: 0.55 }];
  (function () {
    var s = 99;
    function r() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    for (var i = 0; i < 12; i++) {
      var a = r() * Math.PI * 2, up = 0.15 + r() * 0.85;
      LIGHTS.push({ d: norm([Math.cos(a), up, Math.sin(a) * 0.6 + 0.5]), sharp: 90 + r() * 140, power: 0.9 + r() * 0.8 });
    }
  })();
  var VIEW = [0, 0, 1];
  
  var SPREAD = 0.13;
  
  var FIRE = true;
  
  var EDGE_FIRE = false;
  
  var FIRE_FROM = 0.55;
  
  var FIRE_LIT = 0.6;
  
  var REFLECT_REACH = 260;
  var REFLECT_STRENGTH = 0.55;
  
  var ECHO_OPPOSITE = 0.7;
  var ECHO_OTHER = 0.4;
  
  var fireCtx = null;

  var seed = 20261020;
  function rand() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }

  var MODEL = brilliant();

  function makeStones() {
    var out = [];
    LAYERS.forEach(function (layer, li) {
      layer.stones.forEach(function (st, i) {
        out.push({
          layer: li,
          id: out.length,
          x: st.x, y: st.y, size: st.size, spin: st.spin, phase: st.phase,
          
          tip: Math.PI / 2 - 0.12 + li * 0.05,
          roll: (i - 0.5) * 0.2,
          wobble: 0.16
        });
      });
    });
    return out;
  }

  function turn(p, stone, t) {
    var a = stone.phase + t * stone.spin;
    var c = Math.cos(a), s = Math.sin(a);
    var r = [p[0] * c - p[2] * s, p[1], p[0] * s + p[2] * c];
    var tip = stone.tip + Math.sin(t * 0.4 + stone.phase) * stone.wobble;
    var ct = Math.cos(tip), st = Math.sin(tip);
    r = [r[0], r[1] * ct - r[2] * st, r[1] * st + r[2] * ct];
    var cr = Math.cos(stone.roll), sr = Math.sin(stone.roll);
    return [r[0] * cr - r[1] * sr, r[0] * sr + r[1] * cr, r[2]];
  }

  function reflectLight(n, shift) {
    var d = dot(VIEW, n);
    var rv = [2 * d * n[0] - VIEW[0], 2 * d * n[1] - VIEW[1], 2 * d * n[2] - VIEW[2]];
    rv = norm([rv[0] + shift, rv[1] + shift * 0.5, rv[2]]);
    var sum = 0;
    for (var k = 0; k < LIGHTS.length; k++) {
      var L = LIGHTS[k];
      sum += L.power * Math.pow(Math.max(0, dot(rv, L.d)), L.sharp);
    }
    return sum;
  }

  function sparkle(ctx, f198a, at, strength, stone, face, t, la) {
    var phase = ((Math.sin(face.id * 3.7 + stone.id * 11.3) * 9301.5) % 1 + 1) % 1 * Math.PI * 2;
    var blink = Math.max(0, Math.sin(t * (0.9 + (face.id % 5) * 0.25) + phase));
    var s = Math.min(1, (strength - 0.25) * 3);
    var a = s * blink;
    if (a < 0.05) return;
    var len = 30 + 60 * s * (0.5 + 0.5 * blink);
    
    var warm = (face.id + stone.id) % 2 === 0;
    [[1, 0, 1, 1, warm ? "255,214,150" : "205,218,255"], [0, 1, 0.55, 0.85, warm ? "255,228,180" : "235,240,255"],
     [0.7, 0.7, 0.22, 0.5, warm ? "255,236,200" : "255,255,255"], [0.7, -0.7, 0.22, 0.5, warm ? "255,236,200" : "255,255,255"]].forEach(function (d) {
      var l = len * d[2];
      [ctx, f198a].forEach(function (c, k) {
        if (!c) return;
        var g = c.createLinearGradient(at.x - d[0] * l, at.y - d[1] * l, at.x + d[0] * l, at.y + d[1] * l);
        g.addColorStop(0, "rgba(" + d[4] + ",0)");
        g.addColorStop(0.5, "rgba(" + d[4] + "," + (a * d[3] * (k ? 0.6 : 0.9)).toFixed(3) + ")");
        g.addColorStop(1, "rgba(" + d[4] + ",0)");
        c.strokeStyle = g;
        c.lineWidth = k ? 4 : 1.2;
        c.beginPath();
        c.moveTo(at.x - d[0] * l, at.y - d[1] * l);
        c.lineTo(at.x + d[0] * l, at.y + d[1] * l);
        c.stroke();
      });
    });
    var core = ctx.createRadialGradient(at.x, at.y, 0, at.x, at.y, 10 * a + 3);
    core.addColorStop(0, "rgba(255,255,255," + (0.95 * a).toFixed(3) + ")");
    core.addColorStop(0.3, "rgba(225,235,255," + (0.4 * a).toFixed(3) + ")");
    core.addColorStop(1, "rgba(200,215,255,0)");
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(at.x, at.y, 10 * a + 3, 0, Math.PI * 2);
    ctx.fill();
  }

  function fireHue(x, y, t, seed) {
    var v = 0.5 + 0.3 * Math.sin(x * 2.3 + y * 0.9 + t * 0.035) + 0.2 * Math.sin(y * 2.9 - x * 1.1 - t * 0.025 + 1.7);
    var jitter = (((Math.sin(seed * 2.17) * 15731.7) % 1 + 1) % 1 - 0.5) * 16;
    return ((v * 400 + jitter) % 360 + 360) % 360;
  }

  function smooth(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function flare(fc, ctx, f198a, f, depth) {
    var a = f.heat * depth;
    if (!fc || a < 0.01) return;
    var dx = f.x - f.mx, dy = f.y - f.my, d = Math.hypot(dx, dy) || 1;
    var ang = Math.atan2(dy, dx);
    var len = Math.min(220, d * 0.8 + 40) * (0.6 + 0.4 * a);
    var ox = f.x - dx / d * len * 0.3, oy = f.y - dy / d * len * 0.3;
    
    var px = -dy / d, py = dx / d;
    function streak(c, shift, hue, light, alpha, lenK, wid) {
      c.save();
      c.translate(ox + px * shift, oy + py * shift);
      c.rotate(ang);
      c.scale(len * lenK, wid);
      var g = c.createRadialGradient(0, 0, 0, 0, 0, 1);
      g.addColorStop(0, "hsla(" + hue.toFixed(0) + ",100%," + light + "%," + Math.min(1, alpha).toFixed(3) + ")");
      g.addColorStop(1, "hsla(" + hue.toFixed(0) + ",100%," + light + "%,0)");
      c.fillStyle = g;
      c.beginPath(); c.arc(0, 0, 1, 0, Math.PI * 2); c.fill();
      c.restore();
    }
    
    var tri = f.tri;
    var e7681 = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, Math.max(20, d * 1.6));
    e7681.addColorStop(0, "rgba(255,250,240," + (0.35 * a).toFixed(3) + ")");
    e7681.addColorStop(1, "rgba(255,250,240,0)");
    ctx.fillStyle = e7681;
    ctx.beginPath(); ctx.moveTo(tri[0].x, tri[0].y); ctx.lineTo(tri[1].x, tri[1].y); ctx.lineTo(tri[2].x, tri[2].y); ctx.closePath();
    ctx.fill();
    
    var w = 3 + 4 * a;
    streak(fc, -w * 0.9, f.hue - 28, 60, 0.45 * a, 0.9, w);
    streak(fc, 0, f.hue, 62, 0.55 * a, 1, w);
    streak(fc, w * 0.9, f.hue + 28, 60, 0.45 * a, 0.9, w);
    
    streak(fc, 0, f.hue, 94, 0.9 * a, 0.55, 1.2 + a);
    
    if (f198a) streak(f198a, 0, f.hue, 60, 0.3 * a, 1.2, 14 + 10 * a);
  }

  function reflectFire(ctx, f, pieces, depth) {
    var a = f.heat * depth;
    if (a < 0.03) return;
    var R = REFLECT_REACH * (0.6 + 0.4 * a);
    pieces.forEach(function (p) {
      var mx = (p.a.x + p.b.x + p.c.x) / 3, my = (p.a.y + p.b.y + p.c.y) / 3;
      var dist = Math.hypot(mx - f.x, my - f.y);
      if (dist > R) return;
      var catchK = Math.pow(p.k, 2.2);
      var s = a * catchK * (1 - dist / R) * (1 - dist / R) * (p.back ? 1 - CROWN : 1);
      if (s < 0.01) return;
      var hue = f.hue + (p.k - 0.5) * 70;
      var g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, R);
      var sat = Math.round(95 * depth);
      g.addColorStop(0, "hsla(" + hue.toFixed(0) + "," + sat + "%,62%," + Math.min(1, REFLECT_STRENGTH * s * 1.6).toFixed(3) + ")");
      g.addColorStop(1, "hsla(" + hue.toFixed(0) + "," + sat + "%,55%," + (REFLECT_STRENGTH * s * 0.3).toFixed(3) + ")");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(p.a.x, p.a.y); ctx.lineTo(p.b.x, p.b.y); ctx.lineTo(p.c.x, p.c.y); ctx.closePath();
      ctx.fill();
    });
  }

  function mosaic(ctx, face, look, alpha, front, cover, fires, pieces) {
    var cx = 0, cy = 0, k;
    for (k = 0; k < face.idx.length; k++) { cx += face.pts[k].x; cy += face.pts[k].y; }
    cx /= face.idx.length; cy /= face.idx.length;
    var piece = 0;
    for (k = 0; k < face.idx.length; k++) {
      var a = face.pts[k], b = face.pts[(k + 1) % face.idx.length];
      var m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      [[a, m], [m, b]].forEach(function (pair) {
        var seed = face.id * 31.7 + piece * 7.13 + face.stoneId * 101.9;
        piece++;
        var tx = (((Math.sin(seed) * 43758.5) % 1 + 1) % 1 - 0.5) * 0.7;
        var ty = (((Math.sin(seed * 1.31) * 24634.6) % 1 + 1) % 1 - 0.5) * 0.7;
        var n = norm([look[0] + tx, look[1] + ty, look[2]]);
        var r = reflectLight(n, SPREAD), g = reflectLight(n, 0), bl = reflectLight(n, -SPREAD);
        var e7681 = Math.min(1, Math.min(r, g, bl) * 1.7);
        var shade = Math.pow(e7681, 0.6);
        var body = Math.min(1, 0.04 + 0.08 * (1 - Math.abs(n[2])) + 0.88 * shade);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(pair[0].x, pair[0].y);
        ctx.lineTo(pair[1].x, pair[1].y);
        ctx.closePath();
        
        var v = Math.round(10 + body * alpha);
        
        var lean = (r - bl) / (r + bl + 0.0001);
        var tint = 0;
        ctx.fillStyle = "rgba(" + Math.round(v + tint) + "," + v + "," + Math.round(v + 3 - tint) + "," + cover + ")";
        
        var split = Math.max(r, g, bl) - Math.min(r, g, bl);
        if (pieces) pieces.push({ a: pair[0], b: pair[1], c: { x: cx, y: cy }, back: !front,
                                           k: ((Math.sin(seed * 3.91) * 27183.1) % 1 + 1) % 1 });
        var heat = smooth((split - FIRE_FROM) / 0.25) * smooth((e7681 - FIRE_LIT) / 0.3);
        heat = heat * heat;
        
        if (!front) heat *= 1 - CROWN;
        if (FIRE && fires && heat > 0.01) {
          fires.push({ x: pair[0].x, y: pair[0].y, mx: (pair[0].x + pair[1].x + cx) / 3, my: (pair[0].y + pair[1].y + cy) / 3,
                       tri: [pair[0], pair[1], { x: cx, y: cy }], heat: heat, seed: seed,
                       k8: ((Math.sin(seed * 5.13) * 31415.9) % 1 + 1) % 1 });
        }
        ctx.fill();
      });
    }
  }

  function drawStone(ctx, stone, t, w, h, layer, f198a) {
    var la = layer.alpha * INTENSITY;
    
    var light = layer.tint * TOP;
    var glints = [], fires = [], pieces = [];
    layer = { fire: 1 };
    var size = stone.size * Math.max(w, h);
    var cx = stone.x * w;
    var cy = stone.y * h;
    var focal = 7;

    var pts = MODEL.v.map(function (p) {
      var r = turn(p, stone, t);
      var k = focal / (focal - r[2]);
      return { w: r, x: cx + r[0] * size * k, y: cy - r[1] * size * k };
    });

    var faces = MODEL.f.map(function (idx, fi) {
      var a = pts[idx[0]].w, b = pts[idx[1]].w, c = pts[idx[2]].w;
      var n = norm(cross(sub(b, a), sub(c, a)));
      var z = 0; idx.forEach(function (i) { z += pts[i].w[2]; });
      return { idx: idx, n: n, z: z / idx.length, id: fi, stoneId: stone.id, pts: idx.map(function (i) { return pts[i]; }) };
    });
    faces.sort(function (p, q) { return p.z - q.z; });

    var brightest = null, best = 0;
    faces.forEach(function (face) {
      var n = face.n;
      var front = n[2] > 0;
      
      var look = front ? n : [n[0], n[1], -n[2]];
      var r = reflectLight(look, SPREAD), g = reflectLight(look, 0), b = reflectLight(look, -SPREAD);
      var vis = front ? 1 : 0.35;
      var cover = front ? CROWN : 1;
      var peak = Math.max(r, g, b);
      if (front && peak > best) { best = peak; brightest = face; }

      function trace(c) {
        c.beginPath();
        face.idx.forEach(function (i, k) { if (k) c.lineTo(pts[i].x, pts[i].y); else c.moveTo(pts[i].x, pts[i].y); });
        c.closePath();
      }
      trace(ctx);

      mosaic(ctx, face, look, light, front, cover, fires, pieces);
      
      var white = Math.min(r, g, b);
      var eased = Math.max(0, Math.min(1, (white - 0.35) / 0.5));
      eased = eased * eased * (3 - 2 * eased);
      var op = eased;
      
      var bright = 0.35 + 0.9 * op;
      
      if (front && white > 0.3) {
        var gc = face.pts[(face.id * 7) % face.pts.length], gx = 0, gy = 0;
        face.pts.forEach(function (p) { gx += p.x; gy += p.y; });
        gx = gx / face.pts.length * 0.6 + gc.x * 0.4; gy = gy / face.pts.length * 0.6 + gc.y * 0.4;
        if (gx > 20 && gx < w - 20 && gy > 20 && gy < h - 20) glints.push([{ x: gx, y: gy }, white, face]);
      }
      
      var split = Math.max(r, g, b) - Math.min(r, g, b);
      if (EDGE_FIRE && split > 0.18 - 0.08 * op && front) {
        var lean = (r - b) / (Math.abs(r) + Math.abs(b) + 0.0001);
        var hue = 140 - lean * 140;
        var fire = la * bright * Math.min(0.55, (split - 0.1) * 0.9);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "hsla(" + hue.toFixed(0) + ",100%,68%," + fire.toFixed(3) + ")";
        ctx.stroke();
        if (f198a) {
          trace(f198a);
          f198a.lineWidth = 5;
          f198a.strokeStyle = "hsla(" + hue.toFixed(0) + ",100%,65%," + Math.min(1, fire * 2.4).toFixed(3) + ")";
          f198a.stroke();
        }
        
        if (split > 0.3 - 0.12 * op) {
          var ek = face.id % face.idx.length;
          var e0 = pts[face.idx[ek]], e1 = pts[face.idx[(ek + 1) % face.idx.length]];
          var mx = (e0.x + e1.x) / 2, my = (e0.y + e1.y) / 2;
          var cxF = 0, cyF = 0;
          face.idx.forEach(function (i) { cxF += pts[i].x; cyF += pts[i].y; });
          cxF /= face.idx.length; cyF /= face.idx.length;
          var fb126 = ctx.createLinearGradient(mx, my, mx + (cxF - mx) * 0.75, my + (cyF - my) * 0.75);
          var strength = la * bright * Math.min(0.5, (split - 0.15) * 0.9);
          var hues = [0, 32, 55, 120, 210, 270];
          hues.forEach(function (hh, k) {
            var a = strength * (k < 2 ? 1 : 1 - (k - 1) / 5);
            fb126.addColorStop(k / 6, "hsla(" + hh + ",100%,60%," + a.toFixed(3) + ")");
          });
          fb126.addColorStop(1, "hsla(280,100%,60%,0)");
          trace(ctx);
          ctx.fillStyle = fb126;
          ctx.fill();
        }
        trace(ctx);
      }

      ctx.lineWidth = front ? 0.8 + 0.5 * op : 0.5;
      ctx.strokeStyle = "rgba(230,238,255," + (la * vis * (0.06 + 0.22 * Math.min(1, peak))).toFixed(3) + ")";
      ctx.stroke();
      
      if (f198a) {
        trace(f198a);
        f198a.lineWidth = front ? 3 : 2;
        f198a.strokeStyle = "rgba(220,232,255," + (la * vis * (0.18 + 0.7 * Math.min(1, peak))).toFixed(3) + ")";
        f198a.stroke();
      }
    });
    
    ctx.globalCompositeOperation = "lighter";
    fires.forEach(function (f) {
      if (f.x < -200 || f.x > w + 200 || f.y < -200 || f.y > h + 200) return;
      f.hue = fireHue(f.x / w, f.y / h, t, f.seed);
      reflectFire(ctx, f, pieces, light / TOP);
      flare(fireCtx, ctx, f198a, f, light / TOP);
      
      var ex = f.x - cx, ey = f.y - cy;
      var turns = [[4, ECHO_OPPOSITE], [1 + Math.floor(f.k8 * 3), ECHO_OTHER], [5 + Math.floor(f.k8 * 7) % 3, ECHO_OTHER]];
      turns.forEach(function (tn) {
        var an = tn[0] * Math.PI / 4, ca = Math.cos(an), sa = Math.sin(an);
        reflectFire(ctx, { x: cx + ex * ca - ey * sa, y: cy + ex * sa + ey * ca, hue: f.hue, heat: f.heat * tn[1] },
                    pieces, light / TOP);
      });
    });
    
    glints.sort(function (p, q) { return q[1] - p[1]; });
    glints.slice(0, 2).forEach(function (gl) { sparkle(ctx, f198a, gl[0], gl[1], stone, gl[2], t, la); });
    ctx.globalCompositeOperation = "source-over";
  }

  window.ncCrystals = function (host, fixedTime) {
    var stones = makeStones();
    
    var main = document.createElement("canvas");
    main.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-3;";
    host.appendChild(main);
    var c9bb7 = document.createElement("canvas");
    c9bb7.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-2;" +
      "filter:blur(12px);";
    host.appendChild(c9bb7);
    
    var fireCv = document.createElement("canvas");
    fireCv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-2;" +
      "filter:blur(6px);";
    host.appendChild(fireCv);

    function frame(t) {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = window.innerWidth, h = window.innerHeight;
      
      var bw = Math.round(w * dpr), bh = Math.round(h * dpr);
      if (c9bb7.width !== bw || c9bb7.height !== bh) { c9bb7.width = bw; c9bb7.height = bh; }
      var f198a = c9bb7.getContext("2d");
      f198a.setTransform(dpr, 0, 0, dpr, 0, 0);
      f198a.clearRect(0, 0, w, h);
      f198a.globalCompositeOperation = "lighter";
      if (fireCv.width !== bw || fireCv.height !== bh) { fireCv.width = bw; fireCv.height = bh; }
      fireCtx = fireCv.getContext("2d");
      fireCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fireCtx.clearRect(0, 0, w, h);
      fireCtx.globalCompositeOperation = "lighter";
      if (main.width !== bw || main.height !== bh) { main.width = bw; main.height = bh; }
      var ctx = main.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      LAYERS.forEach(function (layer, li) {
        ctx.globalCompositeOperation = "source-over";
        stones.forEach(function (s) {
          if (s.layer === li) drawStone(ctx, s, t, w, h, layer, f198a);
        });
      });
    }

    if (typeof fixedTime === "number") { frame(fixedTime); return; }
    var v32ff = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var z8dd7 = performance.now();
    
    var last = 0;
    function loop(now) {
      if (!document.hidden && now - last >= 32) {
        last = now;
        frame((now - z8dd7) / 1000);
      }
      if (!v32ff) requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  };

  var lastY = null, lastT = 0, fastTimer = null;
  var FAST = 1.5;   
  document.addEventListener("scroll", function (e) {
    var now = performance.now();
    var el = e.target === document ? document.scrollingElement : e.target;
    var y = el && el.scrollTop || 0;
    if (lastY !== null && now - lastT < 200) {
      var speed = Math.abs(y - lastY) / Math.max(1, now - lastT);
      if (speed > FAST) document.documentElement.classList.add("v79b9");
    }
    lastY = y; lastT = now;
    clearTimeout(fastTimer);
    fastTimer = setTimeout(function () { document.documentElement.classList.remove("v79b9"); }, 160);
  }, { capture: true, passive: true });
})();

(function () {
  
  var chromium = !!navigator.userAgentData || navigator.userAgent.indexOf("Chrome/") >= 0;
  if (!chromium || !window.ResizeObserver) return;

  var PANES = [
    
    [".s839d", 0, 10], [".uf28e", 0, 10], [".t9baf", 4, 0], [".z3be6", 0, 10], [".j9626", 0, 10], [".f69f0", 0, 10], [".u78da", 0, 10],
    [".lb1fc", 0, 0], [".m4d76", 0, 0]
  ];
  
  var RING_THICKNESS = 9;
  var BEZEL = 34;        
  var THICKNESS = 38;    
  var INDEX = 1.5;       

  var svg = null;
  var counter = 0;
  var observer = new ResizeObserver(function (g7276) {
    for (var i = 0; i < g7276.length; i++) n1a39(g7276[i].target);
  });

  var bend = [];
  var strongest = 0;
  (function () {
    function height(t) {
      t = Math.max(0, Math.min(1, t));
      return Math.pow(1 - Math.pow(1 - t, 4), 0.25);
    }
    for (var d = 0; d <= BEZEL; d++) {
      var t = (d + 0.5) / BEZEL;
      var step = 0.5 / BEZEL;
      var slope = THICKNESS * (height(t + step) - height(t - step)) / (2 * step * BEZEL);
      var incoming = Math.atan(slope);
      var outgoing = Math.asin(Math.sin(incoming) / INDEX);
      var shift = THICKNESS * Math.tan(incoming - outgoing);
      bend.push(d >= BEZEL ? 0 : shift);
      if (shift > strongest) strongest = shift;
    }
  })();

  function x97d9() {
    if (svg) return svg;
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.setAttribute("aria-hidden", "true");
    svg.style.position = "absolute";
    document.body.appendChild(svg);
    return svg;
  }

  var pending = new Set();
  var td93b = null, running = false;
  function n1a39(pane) {
    pending.add(pane);
    clearTimeout(td93b);
    td93b = setTimeout(next, 120);
  }
  function soon(fn) {
    if (window.requestIdleCallback) requestIdleCallback(fn, { timeout: 250 });
    else setTimeout(fn, 16);
  }
  function next() {
    if (running || !pending.size) return;
    var view = window.innerHeight, best = null, bestScore = Infinity;
    pending.forEach(function (pane) {
      var r = pane.getBoundingClientRect();
      
      var score = r.bottom > 0 && r.top < view ? r.top : view * 2 + Math.min(Math.abs(r.top - view), Math.abs(r.bottom));
      if (score < bestScore) { bestScore = score; best = pane; }
    });
    pending.delete(best);
    if (best.isConnected) draw(best);
    running = true;
    requestAnimationFrame(function () {
      soon(function () { running = false; next(); });
    });
  }

  function lensFilter(owner, key, w, h, canvas, scale) {
    var ns = "http://www.w3.org/2000/svg";
    var id = owner.getAttribute("data-lens-id");
    if (!id) {
      id = "lg" + (++counter);
      owner.setAttribute("data-lens-id", id);
    }
    var tag = id + key;
    var stale = x97d9().querySelector("[data-lens-of='" + tag + "']");
    if (stale) stale.remove();
    var filter = document.createElementNS(ns, "filter");
    var fresh = tag + "-" + Date.now().toString(36);
    filter.setAttribute("id", fresh);
    filter.setAttribute("data-lens-of", tag);
    filter.setAttribute("filterUnits", "userSpaceOnUse");
    filter.setAttribute("primitiveUnits", "userSpaceOnUse");
    filter.setAttribute("x", "0");
    filter.setAttribute("y", "0");
    filter.setAttribute("width", String(w));
    filter.setAttribute("height", String(h));
    filter.setAttribute("color-interpolation-filters", "sRGB");
    var map = document.createElementNS(ns, "feImage");
    map.setAttribute("href", canvas.toDataURL("image/png"));
    map.setAttribute("x", "0");
    map.setAttribute("y", "0");
    map.setAttribute("width", String(w));
    map.setAttribute("height", String(h));
    map.setAttribute("preserveAspectRatio", "none");
    map.setAttribute("result", "map");
    var shiftNode = document.createElementNS(ns, "feDisplacementMap");
    shiftNode.setAttribute("in", "SourceGraphic");
    shiftNode.setAttribute("in2", "map");
    shiftNode.setAttribute("scale", String(scale));
    shiftNode.setAttribute("xChannelSelector", "R");
    shiftNode.setAttribute("yChannelSelector", "G");
    filter.appendChild(map);
    filter.appendChild(shiftNode);
    x97d9().appendChild(filter);
    return "url(#" + fresh + ")";
  }

  function depthAt(x, y, w, h, r) {
    var px = x + 0.5 - w / 2, py = y + 0.5 - h / 2;
    var qx = Math.abs(px) - (w / 2 - r), qy = Math.abs(py) - (h / 2 - r);
    if (qx > 0 && qy > 0) {
      var len = Math.sqrt(qx * qx + qy * qy);
      return { d: r - len, nx: -qx / len * Math.sign(px), ny: -qy / len * Math.sign(py) };
    }
    if (qx > qy) return { d: r - qx, nx: -Math.sign(px), ny: 0 };
    return { d: r - qy, nx: 0, ny: -Math.sign(py) };
  }

  function eachNearEdge(w, h, reach, visit) {
    for (var y = 0; y < h; y++) {
      if (y < reach || y >= h - reach) {
        for (var x = 0; x < w; x++) visit(x, y);
      } else {
        var edge = Math.min(reach, w);
        for (var x1 = 0; x1 < edge; x1++) visit(x1, y);
        for (var x2 = Math.max(edge, w - reach); x2 < w; x2++) visit(x2, y);
      }
    }
  }

  function drawRing(pane, ring) {
    var w = pane.offsetWidth + 2 * ring;
    var h = pane.offsetHeight + 2 * ring;
    var r = parseFloat(getComputedStyle(pane).borderTopLeftRadius) || 0;
    var outer = Math.min(r + ring, w / 2, h / 2);

    var maskCanvas = document.createElement("canvas");
    var mapCanvas = document.createElement("canvas");
    maskCanvas.width = mapCanvas.width = w;
    maskCanvas.height = mapCanvas.height = h;
    var mctx = maskCanvas.getContext("2d");
    var gctx = mapCanvas.getContext("2d");
    var maskImage = mctx.createImageData(w, h);
    var mapImage = gctx.createImageData(w, h);
    var maskPixels = new Uint32Array(maskImage.data.buffer);
    var mapPixels = new Uint32Array(mapImage.data.buffer);
    mapPixels.fill(0xff808080);

    var strongestRing = RING_THICKNESS * Math.tan(Math.PI / 2 - Math.asin(1 / INDEX)) * 0.6;
    eachNearEdge(w, h, Math.max(ring + 1, outer + 1), function (x, y) {
      var at = depthAt(x, y, w, h, outer);
      if (at.d < -0.5 || at.d > ring + 0.5) return;
      
      var cover = Math.max(0, Math.min(1, at.d + 0.5)) * Math.max(0, Math.min(1, ring - at.d + 0.5));
      maskPixels[y * w + x] = (Math.round(cover * 255) << 24) | 0xffffff;
      
      var u = Math.max(0.001, Math.min(0.999, at.d / ring));
      var c = 2 * u - 1;
      var slope = Math.abs(c) / Math.sqrt(1 - c * c) * (RING_THICKNESS / ring) * 0.5;
      var incoming = Math.atan(slope);
      var outgoing = Math.asin(Math.sin(incoming) / INDEX);
      var shift = Math.min(strongestRing, RING_THICKNESS * Math.tan(incoming - outgoing));
      var toward = c < 0 ? 1 : -1;      
      var red = Math.round(128 + 127 * (shift * at.nx * toward) / strongestRing);
      var green = Math.round(128 + 127 * (shift * at.ny * toward) / strongestRing);
      mapPixels[y * w + x] = 0xff800000 | (green << 8) | red;
    });
    mctx.putImageData(maskImage, 0, 0);
    gctx.putImageData(mapImage, 0, 0);

    pane.style.setProperty("--j9f52", "url(" + maskCanvas.toDataURL("image/png") + ")");
    pane.style.setProperty("--y596d", lensFilter(pane, "r", w, h, mapCanvas, 2 * strongestRing));
  }

  function draw(pane) {
    var ringWidth = Number(pane.getAttribute("data-lens-ring")) || 0;
    if (ringWidth) drawRing(pane, ringWidth);
    var inset = Number(pane.getAttribute("data-lens-inset")) || 0;
    var w = Math.round(pane.offsetWidth - 2 * inset);
    var h = Math.round(pane.offsetHeight - 2 * inset);
    if (w < 8 || h < 8) return;
    var r = parseFloat(getComputedStyle(pane).borderTopLeftRadius) || 0;
    r = Math.min(r, w / 2, h / 2);

    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var context = canvas.getContext("2d");
    var image = context.createImageData(w, h);
    var pixels = new Uint32Array(image.data.buffer);
    pixels.fill(0xff808080); 

    var hw = w / 2, hh = h / 2;
    var ix = hw - r, iy = hh - r;
    var fb126 = BEZEL;
    function sample(x, y) {
      
      var px = x + 0.5 - hw, py = y + 0.5 - hh;
      var qx = Math.abs(px) - ix, qy = Math.abs(py) - iy;
      var depth, nx, ny;
      if (qx > 0 && qy > 0) {
        var len = Math.sqrt(qx * qx + qy * qy);
        depth = r - len;
        nx = -qx / len * Math.sign(px);
        ny = -qy / len * Math.sign(py);
      } else if (qx > qy) {
        depth = r - qx;
        nx = -Math.sign(px); ny = 0;
      } else {
        depth = r - qy;
        nx = 0; ny = -Math.sign(py);
      }
      if (depth < 0 || depth >= fb126) return;
      var a = depth, i0 = Math.floor(a), f = a - i0;
      var shift = bend[i0] * (1 - f) + bend[Math.min(fb126, i0 + 1)] * f;
      var red = Math.round(128 + 127 * (shift * nx) / strongest);
      var green = Math.round(128 + 127 * (shift * ny) / strongest);
      pixels[y * w + x] = 0xff800000 | (green << 8) | red;
    }
    
    for (var y = 0; y < h; y++) {
      if (y < fb126 || y >= h - fb126) {
        for (var x = 0; x < w; x++) sample(x, y);
      } else {
        var edge = Math.min(fb126, w);
        for (var x1 = 0; x1 < edge; x1++) sample(x1, y);
        for (var x2 = Math.max(edge, w - fb126); x2 < w; x2++) sample(x2, y);
      }
    }
    context.putImageData(image, 0, 0);

    pane.style.setProperty("--g137e", lensFilter(pane, "p", w, h, canvas, 2 * strongest));
  }

  window.ncLens = function (root) {
    document.documentElement.classList.add("ab90d");
    for (var p = 0; p < PANES.length; p++) {
      var found = (root || document).querySelectorAll(PANES[p][0]);
      for (var i = 0; i < found.length; i++) {
        if (found[i].hasAttribute("data-lens-inset")) continue;
        found[i].setAttribute("data-lens-inset", String(PANES[p][1]));
        found[i].setAttribute("data-lens-ring", String(PANES[p][2]));
        observer.observe(found[i]);
        n1a39(found[i]);
      }
    }
  };
})();

(function () {
  var PANES = ".uf28e, .s839d, .z3be6, .j9626, .f69f0";
  var td93b = null;
  var root = document;

  function visible(el) {
    var box = el.getBoundingClientRect();
    return box.bottom > 0 && box.top < window.innerHeight && box.width > 40;
  }

  function glintOf(pane) {
    var g = pane.querySelector(":scope > .yc182");
    if (!g) {
      g = document.createElement("span");
      g.className = "yc182";
      g.setAttribute("aria-hidden", "true");
      pane.appendChild(g);
    }
    return g;
  }

  function once() {
    var panes = Array.prototype.filter.call(root.querySelectorAll(PANES), visible);
    if (panes.length) {
      var pane = panes[Math.floor(Math.random() * panes.length)];
      var g = glintOf(pane);
      g.style.setProperty("--od742", (10 + Math.random() * 25).toFixed(0) + "deg");
      g.classList.remove("ca756");
      void g.offsetWidth; 
      g.classList.add("ca756");
    }
    td93b = setTimeout(once, 2500 + Math.random() * 5500);
  }

  window.ncGlints = function (from) {
    var v32ff = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (v32ff) return;
    root = from || document;
    clearTimeout(td93b);
    td93b = setTimeout(once, 1500);
  };
})();

(function () {
  var b03bf = document.getElementById("v6869");
  if (!b03bf) return;

  var v9752 = JSON.parse(b03bf.textContent);
  var e6af7 = v9752[0];

  var q71ac = document.getElementById("ica79");
  var me6f6 = document.getElementById("ned24");
  var q3100 = document.getElementById("pe3a4");
  var ce446 = document.getElementById("xcc45");
  var ad8a5 = document.getElementById("e8a0d");
  var x97d9 = document.getElementById("o83f5");
  var s1437 = document.getElementById("mf08d");

  if (window.ncCrystals) window.ncCrystals(document.body);
  
  if (window.ncLens && q71ac) window.ncLens(q71ac.parentNode);

  var n4a34 = "ba596" + e6af7;

  function i893d(gd52c) {
    try {
      localStorage.setItem(n4a34, gd52c);
      return;
    } catch (err) {}
    try {
      sessionStorage.setItem(n4a34, gd52c);
    } catch (err) {}
  }
  function j3193() {
    try {
      var kept = localStorage.getItem(n4a34);
      if (kept) return kept;
    } catch (err) {}
    try {
      return sessionStorage.getItem(n4a34);
    } catch (err) {}
    return null;
  }
  function x41df() {
    try {
      localStorage.removeItem(n4a34);
    } catch (err) {}
    try {
      sessionStorage.removeItem(n4a34);
    } catch (err) {}
  }

  function t9baf(w0f23) {
    ad8a5.textContent = w0f23 || "";
    ad8a5.hidden = !w0f23;
  }

  function tefca(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  if (!window.crypto || !window.crypto.subtle) {
    ce446.disabled = true;
    q3100.disabled = true;
    t9baf(
      "This browser will not open the page from here. Use an https:// address, " +
        "or open the file from your own computer."
    );
    return;
  }

  function g4fc6(gd52c, salt, rounds) {
    var m2e3c = new TextEncoder();
    return crypto.subtle
      .importKey("raw", m2e3c.encode(gd52c), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: tefca(salt), iterations: rounds, hash: "SHA-256" },
          base,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
      });
  }

  function m0bdb(key, dbbde) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: tefca(dbbde[3]) },
      key,
      tefca(dbbde[4])
    );
  }

  function s4ce7(gd52c) {
    if (!s1437) return Promise.resolve([]);
    var g7276 = JSON.parse(s1437.textContent);

    return Promise.all(
      g7276.map(function (dbbde) {
        return g4fc6(gd52c, dbbde[1], dbbde[2])
          .then(function (key) {
            return m0bdb(key, dbbde);
          })
          .then(function (ubfcf) {
            return URL.createObjectURL(new Blob([ubfcf], { type: dbbde[0] }));
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

  function r32eb(x97d9) {
    
    var u028b = "245, 197, 66";
    var o3a17 = [
      
      { far: false, room: 5200, small: 13, big: 25, dim: 0.12, bright: 0.26, cap: 420 },
      { far: true, room: 11000, small: 12, big: 22, dim: 0.09, bright: 0.15, cap: 220 },
    ];

    for (var f = 0; f < o3a17.length; f++) {
      var i56cc = o3a17[f];
      var f883e = document.createElement("div");
      f883e.className = i56cc.far ? "i6717 h0aeb" : "i6717";
      f883e.setAttribute("aria-hidden", "true");

      var gb305 = window.innerWidth * 1.6;
      var j94e9 = window.innerHeight * 1.6;
      var i9442 = Math.min(i56cc.cap, Math.max(10, Math.round((gb305 * j94e9) / i56cc.room)));

      for (var s = 0; s < i9442; s++) {
        var z0bef = document.createElement("div");
        var m8854 = i56cc.small + Math.random() * (i56cc.big - i56cc.small);
        var f198a = i56cc.dim + Math.random() * (i56cc.bright - i56cc.dim);
        z0bef.className = "f8eda";
        z0bef.style.cssText =
          "left:" + (Math.random() * 100).toFixed(3) + "%;" +
          "top:" + (Math.random() * 100).toFixed(3) + "%;" +
          "width:" + m8854.toFixed(1) + "px;height:" + m8854.toFixed(1) + "px;" +
          "background-color:rgba(" + u028b + "," + f198a.toFixed(3) + ");" +
          "box-shadow:0 0 7px rgba(" + u028b + "," + (f198a * 2.4).toFixed(3) + ")," +
          "0 0 22px rgba(" + u028b + "," + (f198a * 1.8).toFixed(3) + ");" +
          
          "animation-duration:" + (2.5 + Math.random() * 7).toFixed(2) + "s;" +
          "animation-delay:-" + (Math.random() * 10).toFixed(2) + "s";
        f883e.appendChild(z0bef);
      }
      x97d9.appendChild(f883e);
    }
  }

  function peafd(host, cell, flame, spare, inside) {
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
    
    var c9bb7 = document.getElementById("o2f61");
    if (c9bb7) canvas.style.filter = "url(#" + c9bb7.id + ")";
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
          var m8854 = x + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
          if (m8854 < 0) m8854 = 0;
          if (m8854 >= cols) m8854 = cols - 1;
          heat[y * cols + m8854] = below > loss ? below - loss : 0;
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

  function j76ea(q6425, e1866) {
    x97d9.innerHTML = q6425;
    x97d9.hidden = false;
    
    var lockScreen = q71ac && q71ac.parentNode;
    if (lockScreen && lockScreen.parentNode) lockScreen.parentNode.removeChild(lockScreen);

    var cef75 = document.getElementById("u326e");
    if (cef75) document.title = cef75.textContent;

    var f9890 = x97d9.querySelectorAll("[sdbbb]");
    for (var i = 0; i < f9890.length; i++) {
      var e13d4 = e1866[Number(f9890[i].getAttribute("sdbbb"))];
      if (e13d4) f9890[i].src = e13d4;
    }

    var files = x97d9.querySelectorAll("[i5250]");
    for (var f = 0; f < files.length; f++) {
      var target = e1866[Number(files[f].getAttribute("i5250"))];
      if (target) files[f].href = target;
    }

    var switchable = x97d9.querySelectorAll("[g4e47]");
    var flagFile = document.getElementById("d1914");
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
            if (flags[switchable[k].getAttribute("g4e47")] === true) {
              switchable[k].hidden = false;
            } else if (switchable[k].tagName === "MAIN") {
              location.replace("index.html");
            }
          }

          var tint = flags.noticeColor;
          if (typeof tint === "string" && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(tint)) {
            for (var n = 0; n < switchable.length; n++) {
              if (!switchable[n].hidden && switchable[n].getAttribute("g4e47") === "t9baf") {
                switchable[n].style.setProperty("--e4e4e", tint);
              }
            }
          }
        });
    }

    if (window.ncLens) window.ncLens(x97d9);
    if (window.ncGlints) window.ncGlints(x97d9);

    var w6ebd = x97d9.querySelectorAll("[p28bb]");
    for (var b = 0; b < w6ebd.length; b++) {
      if (w6ebd[b].tagName === "FOOTER") peafd(w6ebd[b], 4, 16, 6, false);
      else peafd(w6ebd[b], 3, 8, 5, true);
    }

    var copiers = x97d9.querySelectorAll(".nd02a");
    for (var c = 0; c < copiers.length; c++) {
      copiers[c].addEventListener("click", copyCode);
    }

    if (e1866[0]) {
      var i420d = x97d9.querySelectorAll(".o3f6a");
      for (var s = 0; s < i420d.length; s++) {
        i420d[s].style.webkitMaskImage = "url(" + e1866[0] + ")";
        i420d[s].style.maskImage = "url(" + e1866[0] + ")";
      }
    }

    var d6cea = document.getElementById("v3e45");
    if (d6cea) {
      d6cea.addEventListener("click", function (event) {
        event.preventDefault();
        x41df();
        location.reload();
      });
    }

    if (window.vd984) window.vd984();

    if (location.hash) {
      var x1027 = document.getElementById(location.hash.slice(1));
      if (x1027) x1027.scrollIntoView();
    }
  }

  function q3122(gd52c, yba30) {
    t9baf("");
    ce446.disabled = true;
    ce446.textContent = "Opening…";

    return g4fc6(gd52c, v9752[1], v9752[2])
      .then(function (key) {
        return m0bdb(key, v9752);
      })
      .then(function (ubfcf) {
        var q6425 = new TextDecoder().decode(ubfcf);
        return s4ce7(gd52c).then(function (e1866) {
          if (yba30) i893d(gd52c);
          j76ea(q6425, e1866);
        });
      })
      .catch(function () {
        ce446.disabled = false;
        ce446.textContent = "Unlock";
        x41df();
        return "no";
      });
  }

  me6f6.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!q3100.value) return;
    q3122(q3100.value, true).then(function (result) {
      if (result === "no") {
        t9baf("That password is not right.");
        q3100.select();
      }
    });
  });

  var w3f49 = j3193();
  if (w3f49) q3122(w3f49, false);
  else q3100.focus();
})();
