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

    // Define Cost Function: Sine Wave
    function costFunction(x) {
        return Math.sin(x);  // Sine wave function
    }

    // Ball Properties
    let ball = {
        x: -Math.PI, // Start position (left side of sine wave)
        y: costFunction(-Math.PI),
        radius: 10,
        color: "red",
        velocity: 0,
        learningRate: 0.1, // Adjusted for smooth descent
    };

    let running = true; // Controls animation flow

    // Proper Scaling for Visibility
    const scaleX = canvas.width / (4 * Math.PI);  // Fit sine wave across width
    const scaleY = canvas.height / 3;            // Scale to fit screen height

    // Draw Sine Wave
    function drawCurve() {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + (-2 * Math.PI) * scaleX, canvas.height / 2 - costFunction(-2 * Math.PI) * scaleY);
        for (let x = -2 * Math.PI; x <= 2 * Math.PI; x += 0.1) {
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

    // Gradient Descent Update (Derivative of sin(x) is cos(x))
    function updateBall() {
        if (!running) return;

        let gradient = Math.cos(ball.x); // Derivative of sin(x) is cos(x)
        ball.velocity = -ball.learningRate * gradient;
        ball.x += ball.velocity;
        ball.y = costFunction(ball.x);

        // Stop animation when movement is minimal
        if (Math.abs(ball.velocity) < 0.001) running = false;
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
