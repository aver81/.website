document.addEventListener("DOMContentLoaded", function () {
    const neuralCanvas = document.getElementById("neuralCanvas");
    const neuralCtx = neuralCanvas.getContext("2d");

    function resizeCanvas() {
        neuralCanvas.width = window.innerWidth;
        neuralCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Neural Network Layers
    const layers = [
        { x: 150, nodes: 4 },
        { x: 300, nodes: 6 },
        { x: 450, nodes: 5 },
        { x: 600, nodes: 4 },
        { x: 750, nodes: 3 },
        { x: 900, nodes: 1 }
    ];

    let networkNodes = [];
    let edges = [];

    layers.forEach(layer => {
        let spacing = neuralCanvas.height / (layer.nodes + 1);
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
        neuralCtx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);

        edges.forEach(edge => {
            neuralCtx.beginPath();
            neuralCtx.moveTo(edge.from.x, edge.from.y);
            neuralCtx.lineTo(edge.to.x, edge.to.y);
            neuralCtx.strokeStyle = edge.active ? "#48cae4" : "rgba(255,255,255,0.2)";
            neuralCtx.lineWidth = edge.active ? 2.5 : 1;
            neuralCtx.stroke();
        });

        networkNodes.forEach(layer => {
            layer.forEach(node => {
                neuralCtx.beginPath();
                neuralCtx.arc(node.x, node.y, 12, 0, Math.PI * 2);
                neuralCtx.fillStyle = node.active ? "#48cae4" : "white";
                neuralCtx.fill();
                neuralCtx.strokeStyle = "black";
                neuralCtx.stroke();
            });
        });

        if (step < networkNodes.length) {
            networkNodes[step].forEach(node => node.active = true);
            setTimeout(() => {
                edges.forEach(edge => {
                    if (edge.from.active && !edge.to.active) {
                        edge.active = true;
                    }
                });
                step++;
                animateForwardPropagation();
            }, 300);
        } else {
            setTimeout(() => {
                document.getElementById("intro").classList.add("fade-out");
                setTimeout(() => {
                    document.getElementById("intro").style.display = "none";
                    startOceanAnimation();
                }, 1200);
            }, 800);
        }
    }

    function startOceanAnimation() {
        const oceanCanvas = document.getElementById("oceanCanvas");
        const ctx = oceanCanvas.getContext("2d");

        function resizeCanvas() {
            oceanCanvas.width = window.innerWidth;
            oceanCanvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let wavePhase = 0;
        const waveHeight = 50;
        const waveSpeed = 0.02;
        const waveFrequency = 0.01;

        function drawWaves() {
            ctx.clearRect(0, 0, oceanCanvas.width, oceanCanvas.height);

            ctx.fillStyle = "#003366";
            ctx.fillRect(0, oceanCanvas.height / 2, oceanCanvas.width, oceanCanvas.height / 2);

            ctx.fillStyle = "#0088cc";

            for (let x = 0; x < oceanCanvas.width; x++) {
                const y = oceanCanvas.height / 2 + Math.sin(x * waveFrequency + wavePhase) * waveHeight;
                ctx.fillRect(x, y, 2, oceanCanvas.height / 2 - y);
            }

            wavePhase -= waveSpeed;
            requestAnimationFrame(drawWaves);
        }

        drawWaves();
    }

    animateForwardPropagation();
});
