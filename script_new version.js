// Neural network intro, with original timing preserved
document.addEventListener("DOMContentLoaded", function () {
    const intro = document.getElementById("intro");
    const canvas = document.getElementById("neuralCanvas");
    if (!intro || !canvas) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Same layer layout as your original script
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

    // Build nodes
    layers.forEach(layer => {
        let spacing = canvas.height / (layer.nodes + 1);
        let nodes = [];
        for (let i = 0; i < layer.nodes; i++) {
            nodes.push({
                x: layer.x,
                y: spacing * (i + 1),
                active: false
            });
        }
        networkNodes.push(nodes);
    });

    // Fully connect layers
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

    // === TIMING: match original ===
    const STEP_DURATION = 150;                         // original setTimeout delay
    const ANIMATION_DURATION = STEP_DURATION * layers.length; // 150 * 6 = 900 ms
    const FADE_DURATION = 1500;                        // original fade-out before display:none

    let startTime = null;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw edges
        edges.forEach(edge => {
            ctx.beginPath();
            ctx.moveTo(edge.from.x, edge.from.y);
            ctx.lineTo(edge.to.x, edge.to.y);
            ctx.strokeStyle = edge.active ? "#FFD700" : "rgba(255,255,255,0.2)";
            ctx.lineWidth = edge.active ? 2.5 : 1;
            ctx.stroke();
        });

        // Draw nodes
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
    }

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

        // Reset all actives each frame
        networkNodes.forEach(layer => {
            layer.forEach(node => (node.active = false));
        });
        edges.forEach(edge => (edge.active = false));

        // Activate layers left → right according to progress
        const layerCount = networkNodes.length || 1;
        networkNodes.forEach((layer, layerIdx) => {
            if (layerCount === 1) {
                // edge case, but not used here
                layer.forEach(node => (node.active = true));
                return;
            }
            const threshold = layerIdx / (layerCount - 1); // 0, 0.2, ..., 1
            if (progress >= threshold) {
                layer.forEach(node => (node.active = true));
            }
        });

        // Edge is active if both ends are active
        edges.forEach(edge => {
            if (edge.from.active && edge.to.active) {
                edge.active = true;
            }
        });

        draw();

        if (elapsed < ANIMATION_DURATION) {
            requestAnimationFrame(animate);
        } else {
            // Done: behave like original script
            intro.classList.add("fade-out"); // uses your existing #intro.fade-out CSS
            setTimeout(() => {
                intro.style.display = "none"; // removes full-screen overlay, no gap
            }, FADE_DURATION);
        }
    }

    requestAnimationFrame(animate);
});

// Keep your original skill-card fade-in
document.addEventListener("DOMContentLoaded", () => {
    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 200);
    });
});
