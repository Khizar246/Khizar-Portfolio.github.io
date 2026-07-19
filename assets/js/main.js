/* Mohd Khizar — portfolio interactions */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* header scrolled + glow follows section */
  const header = $("#header");
  const glow = $("#bg-glow");
  const sections = $$("section[id]");
  const glowPos = {
    hero:       { top: "-8%",  left: "78%" },
    about:      { top: "18%",  left: "18%" },
    work:       { top: "48%",  left: "82%" },
    stack:      { top: "68%",  left: "20%" },
    experience: { top: "90%",  left: "78%" },
    certs:      { top: "110%", left: "24%" },
    contact:    { top: "128%", left: "72%" },
  };
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle("scr", window.scrollY > 20);
      const mid = window.scrollY + innerHeight * 0.4;
      let cur = sections[0];
      for (const s of sections) if (s.offsetTop <= mid) cur = s;
      if (glow && cur && glowPos[cur.id]) { glow.style.top = glowPos[cur.id].top; glow.style.left = glowPos[cur.id].left; }
      ticking = false;
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Smooth in-page nav. Self-correcting: it re-measures the target's live
     position every frame, so lazy-loaded images and reveal animations that
     shift the layout mid-scroll can't leave us short of the section. */
  const headerH = () => (header?.offsetHeight || 56) + 8;
  const targetY = (target, id) =>
    Math.max(0, target.getBoundingClientRect().top + window.scrollY - (id === "top" ? 0 : headerH()));

  let scrollAnim = null;
  const jumpTo = (id) => {
    const target = document.getElementById(id) || (id === "top" ? document.body : null);
    if (!target) return;
    // Reveal everything above the target up front so height is roughly stable.
    const tTop = target.getBoundingClientRect().top + window.scrollY;
    $$(".rv:not(.in)").forEach(el => {
      if (el.getBoundingClientRect().top + window.scrollY < tTop) el.classList.add("in");
    });
    if (reduce) { window.scrollTo(0, targetY(target, id)); history.replaceState(null, "", id === "top" ? location.pathname : "#" + id); return; }

    if (scrollAnim) cancelAnimationFrame(scrollAnim);
    const startY = window.scrollY, t0 = performance.now(), dur = 650;
    const easeInOut = p => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const goal = targetY(target, id);            // re-measure live (absorbs shifts)
      window.scrollTo(0, startY + (goal - startY) * easeInOut(p));
      if (p < 1) { scrollAnim = requestAnimationFrame(step); }
      else {
        window.scrollTo(0, targetY(target, id));   // final snap to the true position
        history.replaceState(null, "", id === "top" ? location.pathname : "#" + id);
        scrollAnim = null;
      }
    };
    scrollAnim = requestAnimationFrame(step);
  };
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      e.preventDefault();
      jumpTo(id);
    });
  });

  /* mobile menu */
  const burger = $("#burger");
  const menu = $("#mobile-menu");
  const toggle = (open) => {
    const o = open ?? !menu.classList.contains("open");
    menu.classList.toggle("open", o);
    menu.setAttribute("aria-hidden", String(!o));
    burger.setAttribute("aria-expanded", String(o));
  };
  burger?.addEventListener("click", () => toggle());
  $$("#mobile-menu a").forEach(a => a.addEventListener("click", () => toggle(false)));

  /* reveal on scroll */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
  $$(".rv").forEach(el => io.observe(el));
  requestAnimationFrame(() => $$(".hero .rv").forEach(el => el.classList.add("in")));

  /* count-up numbers (0 -> value, fast through big numbers via easing) */
  const fmt = (n, d) => d > 0 ? n.toFixed(d) : Math.round(n).toLocaleString("en-US");
  const count = (el) => {
    const t = parseFloat(el.dataset.c), d = parseInt(el.dataset.dec || "0", 10), s = el.dataset.s || "";
    if (reduce) { el.textContent = fmt(t, d) + s; return; }
    const dur = 1600, start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // fast at first, eases into final value
      el.textContent = fmt(t * eased, d) + s;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { count(e.target); cio.unobserve(e.target); }
  }), { threshold: 0.6 });
  $$("[data-c]").forEach(el => cio.observe(el));

  /* lightbox */
  const lb = $("#lb"), lbImg = $("#lb-img");
  const open = (src) => { lbImg.src = src; lb.classList.add("on"); lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; };
  const close = () => { lb.classList.remove("on"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lbImg.src = ""; };
  $$("[data-full]").forEach(el => el.addEventListener("click", () => open(el.dataset.full)));
  $("#lb-x")?.addEventListener("click", close);
  lb?.addEventListener("click", e => { if (e.target === lb) close(); });
  addEventListener("keydown", e => { if (e.key === "Escape") { close(); toggle(false); } });

  /* ---- Ambient background: drifting connected data points ---- */
  const canvas = $("#bg-canvas");
  if (canvas && !reduce) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, pts = [];
    const mouse = { x: -999, y: -999 };
    const CORAL = [255, 107, 87];

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };
    const build = () => {
      const n = Math.min(70, Math.floor((w * h) / 26000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.6
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const [cr, cg, cb] = CORAL;
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        // gentle pull toward cursor
        const dx = mouse.x - p.x, dy = mouse.y - p.y, dist = Math.hypot(dx, dy);
        if (dist < 160) { p.x += dx * 0.0016; p.y += dy * 0.0016; }
        const near = Math.max(0, 1 - dist / 160);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + near * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${0.25 + near * 0.5})`;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${(1 - d / 130) * 0.14})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };
    addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    addEventListener("mouseleave", () => { mouse.x = -999; mouse.y = -999; });
    addEventListener("resize", resize);
    resize(); draw();
  }
})();
