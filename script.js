document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("neuralCanvas");
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    
    const ctx = canvas.getContext("2d");

    // Resize Canvas Dynamically
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Neural Network Layer Structure
    const layers = [
    { x: 150, nodes: 4 },    // Input Layer (4 nodes)
    { x: 350, nodes: 6 },    // Hidden Layer 1 (6 nodes)
    { x: 550, nodes: 5 },    // Hidden Layer 2 (5 nodes)
    { x: 750, nodes: 3 },    // Hidden Layer 3 (3 nodes)
    { x: 950, nodes: 6 },    // Hidden Layer 4 (6 nodes)
    { x: 1150, nodes: 6 },   // Hidden Layer 5 (6 nodes)
    { x: 1350, nodes: 1 }    // Output Layer (1 node)
];

    let networkNodes = [];
    let edges = [];

    // Create node positions for layers
    layers.forEach(layer => {
        let spacing = canvas.height / (layer.nodes + 1);
        let nodes = [];
        for (let i = 0; i < layer.nodes; i++) {
            nodes.push({
                x: layer.x,
                y: (i + 1) * spacing,
                active: false // Initially inactive
            });
        }
        networkNodes.push(nodes);
    });

    // Create connections (edges) between layers
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

        // Draw edges (connections)
        edges.forEach(edge => {
            ctx.beginPath();
            ctx.moveTo(edge.from.x, edge.from.y);
            ctx.lineTo(edge.to.x, edge.to.y);
            ctx.strokeStyle = edge.active ? "#48cae4" : "rgba(255,255,255,0.2)";
            ctx.lineWidth = edge.active ? 2.5 : 1;
            ctx.stroke();
        });

        // Draw nodes
        networkNodes.forEach(layer => {
            layer.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
                ctx.fillStyle = node.active ? "#48cae4" : "white";
                ctx.fill();
                ctx.strokeStyle = "black";
                ctx.stroke();
            });
        });

        if (step < networkNodes.length) {
            // Activate nodes in each layer over time
            networkNodes[step].forEach(node => node.active = true);
            setTimeout(() => {
                // Activate corresponding edges
                edges.forEach(edge => {
                    if (edge.from.active && !edge.to.active) {
                        edge.active = true;
                    }
                });
                step++;
                animateForwardPropagation();
            }, 300); // Faster forward propagation
        } else {
            // Fade out intro after propagation
            setTimeout(() => {
                document.getElementById("intro").classList.add("fade-out");
                setTimeout(() => {
                    document.getElementById("intro").style.display = "none";
                    document.body.style.overflow = "auto";
                }, 1200);
            }, 800);
        }
    }

    // Typing Animation Text
    const text = "Simulating Neural Network...";
    let index = 0;
    function typeEffect() {
        if (index < text.length) {
            document.getElementById("typing-text").innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 75);
        }
    }

    typeEffect();
    animateForwardPropagation();
});
