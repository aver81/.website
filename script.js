//ORIGINAL VERSION
/*
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("neuralCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const layers = [
        { x: 100, nodes: 4 },
        { x: 300, nodes: 6 },
        { x: 500, nodes: 5 },
        { x: 700, nodes: 3 },
        { x: 900, nodes: 3 },
        { x: 1050, nodes: 1 }
    ];

    let networkNodes = [];
    let edges = [];

    layers.forEach(layer => {
        let spacing = canvas.height / (layer.nodes + 1);
        let nodes = [];
        for (let i = 0; i < layer.nodes; i++) {
            nodes.push({
                x: layer.x,
                y: (i + 1) * spacing,
                active: false
            });
        }
        networkNodes.push(nodes);
    });

    for (let i = 0; i < networkNodes.length - 1; i++) {
        networkNodes[i].forEach(nodeA => {
            networkNodes[i + 1].forEach(nodeB => {
                edges.push({
                    from: nodeA,
                    to: nodeB,
                    active: false
                });
            });
        });
    }

    let step = 0;
    function animateForwardPropagation() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        edges.forEach(edge => {
            ctx.beginPath();
            ctx.moveTo(edge.from.x, edge.from.y);
            ctx.lineTo(edge.to.x, edge.to.y);
            ctx.strokeStyle = edge.active ? "#FFD700" : "rgba(255,255,255,0.2)";
            ctx.lineWidth = edge.active ? 2.5 : 1;
            ctx.stroke();
        });

        networkNodes.forEach(layer => {
            layer.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
                ctx.fillStyle = node.active ? "#FFD700" : "white";
                ctx.fill();
                ctx.strokeStyle = "black";
                ctx.stroke();
            });
        });

        if (step < networkNodes.length) {
            networkNodes[step].forEach(node => node.active = true);
            setTimeout(() => {
                step++;
                animateForwardPropagation();
            }, 150);
        } else {
            document.getElementById("intro").classList.add("fade-out");
            setTimeout(() => document.getElementById("intro").style.display = "none", 1500);
        }
    }

    animateForwardPropagation();
});

document.addEventListener("DOMContentLoaded", () => {
    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 200);
    });
});
*/

// NEW VERSION
// script.js

const INTRO_DURATION = 1000; // 1 second

document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const pageContent = document.getElementById("page-content");

  runNeuralIntro(() => {
    if (intro) {
      intro.classList.add("intro-fade-out");
    }
    if (pageContent) {
      pageContent.classList.add("page-visible");
    }
  });

  setupSmoothScroll();
  setupRevealAnimations();
  setupMobileNav();
});

function runNeuralIntro(onComplete) {
  const canvas = document.getElementById("neuralCanvas");
  if (!canvas || !canvas.getContext) {
    if (typeof onComplete === "function") onComplete();
    return;
  }

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const particles = [];
  const NUM_PARTICLES = 55;
  const MAX_SPEED = 0.25;

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * MAX_SPEED * 2,
      vy: (Math.random() - 0.5) * MAX_SPEED * 2,
      r: 1.5 + Math.random() * 1.5
    });
  }

  let startTime = null;

  function drawFrame(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }

    // Draw connections
    const MAX_DIST = 140;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DIST) {
          const alpha = 1 - dist / MAX_DIST;
          ctx.strokeStyle = `rgba(255, 215, 0, ${alpha * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const p of particles) {
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 215, 0, 0.9)";
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (elapsed < INTRO_DURATION) {
      requestAnimationFrame(drawFrame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      window.removeEventListener("resize", resize);
      if (typeof onComplete === "function") onComplete();
    }
  }

  requestAnimationFrame(drawFrame);
}

// Smooth scroll for internal anchors
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// Reveal on scroll
function setupRevealAnimations() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("reveal-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

// Mobile nav toggle (works if .nav-toggle and .site-nav exist)
function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    toggle.classList.toggle("nav-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      toggle.classList.remove("nav-open");
    });
  });
}
