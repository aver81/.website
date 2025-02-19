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

document.addEventListener("DOMContentLoaded", function() {
    // Typing Animation
    const text = "Data Scientist | AI Enthusiast | ML Engineer";
    let index = 0;
    function typeEffect() {
        if (index < text.length) {
            document.getElementById("typing-text").innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 100);
        }
    }
    typeEffect();

    // Neural Network Animation
    const canvas = document.getElementById("neuralCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let nodes = [];
    for (let i = 0; i < 30; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 2,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 - 1
        });
    }

    function drawNodes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";

        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                let dx = nodes[i].x - nodes[j].x;
                let dy = nodes[i].y - nodes[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = "rgba(255,255,255,0.2)";
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        nodes.forEach(node => {
            node.x += node.dx;
            node.y += node.dy;
            if (node.x < 0 || node.x > canvas.width) node.dx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.dy *= -1;
        });

        requestAnimationFrame(drawNodes);
    }
    drawNodes();

    // Hide intro after 5 seconds
    setTimeout(() => {
        document.getElementById("intro").classList.add("fade-out");
        setTimeout(() => {
            document.getElementById("intro").style.display = "none";
        }, 1500);
    }, 5000);
});
