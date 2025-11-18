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
document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // 1. Neural Network Canvas
  // =============================
  const canvas = document.getElementById("neuralCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNetwork();
    }

    let nodes = [];
    let connections = [];

    function initNetwork() {
      nodes = [];
      connections = [];
      const width = canvas.width;
      const height = canvas.height;
      const layerCount = 4;
      const layerYsPadding = 0.2 * height;
      const minY = layerYsPadding;
      const maxY = height - layerYsPadding;

      for (let i = 0; i < layerCount; i++) {
        const x = ((i + 1) / (layerCount + 1)) * width;
        const nodeCount = 3 + i; // 3,4,5,6
        for (let j = 0; j < nodeCount; j++) {
          const y = minY + (j / (nodeCount - 1)) * (maxY - minY);
          nodes.push({
            x,
            y,
            r: 5,
          });
        }
      }

      // Build simple connections between adjacent layers
      const layerNodes = [];
      let index = 0;
      for (let i = 0; i < layerCount; i++) {
        const count = 3 + i;
        layerNodes.push(nodes.slice(index, index + count));
        index += count;
      }

      for (let i = 0; i < layerNodes.length - 1; i++) {
        const leftLayer = layerNodes[i];
        const rightLayer = layerNodes[i + 1];
        leftLayer.forEach((ln) => {
          rightLayer.forEach((rn) => {
            connections.push({
              from: ln,
              to: rn,
              t: Math.random(),
              speed: 0.002 + Math.random() * 0.003,
            });
          });
        });
      }
    }

    function drawNetwork() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background
      const grad = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        w
      );
      grad.addColorStop(0, "#050608");
      grad.addColorStop(1, "#000000");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Connections
      ctx.lineWidth = 1;
      connections.forEach((c) => {
        ctx.strokeStyle = "rgba(245,196,83,0.12)";
        ctx.beginPath();
        ctx.moveTo(c.from.x, c.from.y);
        ctx.lineTo(c.to.x, c.to.y);
        ctx.stroke();
      });

      // Moving activations on connections
      connections.forEach((c) => {
        c.t += c.speed;
        if (c.t > 1) c.t = 0;
        const x = c.from.x + (c.to.x - c.from.x) * c.t;
        const y = c.from.y + (c.to.y - c.from.y) * c.t;
        ctx.fillStyle = "rgba(245,196,83,0.8)";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Nodes
      nodes.forEach((n) => {
        ctx.fillStyle = "#f5c453";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(drawNetwork);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawNetwork();
  }

  // =============================
  // 2. Intro Typing Effect
  // =============================
  const typingEl = document.getElementById("typing-text");
  const subtitleEl = document.querySelector(".intro-subtitle");
  const introSection = document.getElementById("intro");

  if (typingEl && introSection) {
    const lines = [
      "Aayush Verma",
      "Data Scientist & ML Engineer",
      "Building data products that ship."
    ];
    let lineIndex = 0;
    let charIndex = 0;

    function typeLine() {
      const currentLine = lines[lineIndex];
      typingEl.textContent = currentLine.slice(0, charIndex);
      charIndex++;
      if (charIndex <= currentLine.length) {
        setTimeout(typeLine, 70);
      } else {
        if (lineIndex === 0 && subtitleEl) {
          subtitleEl.textContent = "Analytics, ML, and experimentation.";
        }
        setTimeout(() => {
          lineIndex++;
          if (lineIndex < lines.length) {
            charIndex = 0;
            typeLine();
          }
        }, 600);
      }
    }

    setTimeout(typeLine, 400);

    // Fade out intro after a few seconds
    setTimeout(() => {
      introSection.classList.add("intro-hide");
    }, 4500);
  }

  // =============================
  // 3. Smooth Scroll for Anchors
  // =============================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // =============================
  // 4. Mobile Nav Toggle
  // =============================
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("nav-open");
    });
  }

  // =============================
  // 5. Scroll Reveal
  // =============================
  const toReveal = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && toReveal.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    toReveal.forEach((el) => observer.observe(el));
  } else {
    toReveal.forEach((el) => el.classList.add("in-view"));
  }
});

