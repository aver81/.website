document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gradientCanvas");
    const ctx = canvas.getContext("2d");

    // Resize Canvas Dynamically
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Define Cost Function: y = 0.005 * x^2
    function costFunction(x) {
        return 0.005 * Math.pow(x, 2);
    }

    // Ball Properties
    let ball = {
        x: -150, // Start position closer to center
        y: costFunction(-150),
        radius: 10,
        color: "red",
        velocity: 0,
        learningRate: 0.5, // Adjusted learning rate
    };

    let running = true; // Controls animation flow

    // Proper Scaling for Visibility
    const scaleX = canvas.width / 400;  // Adjusted to fit screen better
    const scaleY = canvas.height / 150; // Adjusted for better curve visibility

    // Center Curve
    function drawCurve() {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + (-200 * scaleX), canvas.height / 2 - costFunction(-200) * scaleY);
        for (let x = -200; x < 200; x += 5) {
            let y = costFunction(x);
            ctx.lineTo(canvas.width / 2 + x * scaleX, canvas.height / 2 - y * scaleY);
        }
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draw Ball
    function drawBall() {
        ctx.beginPath();
        ctx.arc(canvas.width / 2 + ball.x * scaleX, canvas.height / 2 - ball.y * scaleY, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Gradient Descent Update
    function updateBall() {
        if (!running) return;

        let gradient = 0.01 * ball.x; // dy/dx = 0.01x
        ball.velocity = -ball.learningRate * gradient; 
        ball.x += ball.velocity; 
        ball.y = costFunction(ball.x);

        // Stop animation when movement is minimal
        if (Math.abs(ball.velocity) < 0.02) running = false;
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCurve();
        drawBall();
        updateBall();
        if (running) {
            requestAnimationFrame(animate);
        } else {
            setTimeout(() => {
                document.getElementById("intro").classList.add("fade-out");
                setTimeout(() => {
                    document.getElementById("intro").style.display = "none";
                    document.body.style.overflow = "auto";
                }, 1500);
            }, 1000);
        }
    }

    document.body.style.overflow = "hidden"; 
    animate();
});
