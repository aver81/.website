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

    let waveOffset = 0; // Controls the sine wave scrolling

    // Define Cost Function: Sine Wave
    function costFunction(x) {
        return Math.sin(x);  // Standard sine wave
    }

    // Ball Properties
    let ball = {
        x: -Math.PI * 4,  // Start far left
        y: costFunction(-Math.PI * 4),
        radius: 12,
        color: "red",
        velocity: 0,
        learningRate: 0.3,  // Faster movement
        acceleration: 1.2,   // Apply acceleration for smoother descent
        delay: 0.2,         // Delay factor for ball movement
    };

    let running = true; // Controls animation flow

    // Proper Scaling for Full-Screen Visibility
    const scaleX = canvas.width / (4 * Math.PI);  // Stretch across full width
    const scaleY = canvas.height / 3;             // Scale to fit screen height

    // Draw Full-Screen Sine Wave
    function drawCurve() {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 - costFunction(waveOffset - 4 * Math.PI) * scaleY);
        for (let x = -4 * Math.PI; x <= 4 * Math.PI; x += 0.1) {
            let y = costFunction(x + waveOffset); // Move wave to the right
            ctx.lineTo(canvas.width / 2 + x * scaleX, canvas.height / 2 - y * scaleY);
        }
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draw Ball
    function drawBall() {
        ctx.beginPath();
        ctx.arc(canvas.width / 2 + (ball.x - waveOffset * ball.delay) * scaleX, 
                canvas.height / 2 - ball.y * scaleY, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Gradient Descent Update (Derivative of sin(x) is cos(x))
    function updateBall() {
        if (!running) return;

        let gradient = Math.cos(ball.x); // Derivative of sin(x) is cos(x)
        ball.velocity = -ball.learningRate * gradient * ball.acceleration; // Apply acceleration
        ball.x += ball.velocity;
        ball.y = costFunction(ball.x);

        // Stop animation when movement is minimal
        if (ball.x >= 4 * Math.PI || Math.abs(ball.velocity) < 0.01) running = false;
    }

    // Move the sine wave and ball
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        waveOffset += 0.05; // Scroll wave to the right
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
            }, 500);
        }
    }

    document.body.style.overflow = "hidden"; 
    animate();
});
