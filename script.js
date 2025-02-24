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
