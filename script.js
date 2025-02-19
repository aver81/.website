document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Neural network animation script loaded!");
    const canvas = document.getElementById("neuralCanvas");
    const ctx = canvas.getContext("2d");

    // Resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Neural Network Layer Structure (3 Input, 5 Hidden, 3 Output)
    const layers = [
        { x: 100, nodes: 3 },  // Input Layer
        { x: 250, nodes: 6 },  // Hidden Layer 1
        { x: 400, nodes: 6 },  // Hidden Layer 2
        { x: 550, nodes: 6 },  // Hidden Layer 3
        { x: 700, nodes: 6 },  // Hidden Layer 4
        { x: 850, nodes: 6 },  // Hidden Layer 5
        { x: 1000, nodes: 6 }, // Hidden Layer 6
        { x: 1150, nodes: 1 }  // Output Layer (Single Node)
    ];

    let networkNodes = [];

    // Create node positions for layers
    layers.forEach(layer => {
        let spacing = canvas.height / (layer.nodes + 1);
        let nodes = [];
        for (let i = 0; i < layer.nodes; i++) {
            nodes.push({
                x: layer.x,
                y: (i + 1) * spacing,
                active: false // For animation
            });
        }
        networkNodes.push(nodes);
    });

    let edges = [];

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

        // Draw edges
        edges.forEach(edge => {
            ctx.beginPath();
            ctx.moveTo(edge.from.x, edge.from.y);
            ctx.lineTo(edge.to.x, edge.to.y);
            ctx.strokeStyle = edge.active ? "#48cae4" : "rgba(255, 255, 255, 0.2)";
            ctx.lineWidth = edge.active ? 2.5 : 1;
            ctx.stroke();
        });

        // Draw nodes
        networkNodes.forEach(layer => {
            layer.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
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
            }, 250);
        } else {
            // Fade out the intro after propagation
            setTimeout(() => {
                document.getElementById("intro").classList.add("fade-out");
                setTimeout(() => {
                    document.getElementById("intro").style.display = "none";
                }, 1500);
            }, 1000);
        }
    }

    // Typing Animation
    const text = "Aayush's Website";
    let index = 0;
    function typeEffect() {
        if (index < text.length) {
            document.getElementById("typing-text").innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 100);
        }
    }

    typeEffect();
    animateForwardPropagation();
});

document.addEventListener("DOMContentLoaded", function () {
    function revealTimeline() {
        let items = document.querySelectorAll(".timeline-item");
        let windowHeight = window.innerHeight;

        items.forEach(item => {
            let itemTop = item.getBoundingClientRect().top;
            if (itemTop < windowHeight - 50) {
                item.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealTimeline);
    revealTimeline(); // Run on load
});

document.addEventListener("scroll", function () {
    let sections = document.querySelectorAll("section");
    let sidebarLinks = document.querySelectorAll(".sidebar ul li a");

    sections.forEach((section, index) => {
        let rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            sidebarLinks.forEach(link => link.classList.remove("active"));
            sidebarLinks[index].classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    function revealFlowBlocks() {
        let blocks = document.querySelectorAll(".experience-card");
        let windowHeight = window.innerHeight;

        blocks.forEach(block => {
            let blockTop = block.getBoundingClientRect().top;
            if (blockTop < windowHeight - 100) {
                block.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealFlowBlocks);
    revealFlowBlocks(); // Run on load
});
