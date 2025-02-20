document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gradientCanvas");
    const ctx = canvas.getContext("2d");

    // Resize Canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Define Cost Function: y = 0.005 * x^2 (Scaled for better visualization)
    function costFunction(x) {
        return 0.005 * Math.pow(x, 2);
    }

    // Ball Properties
    let ball = {
        x: -250, // Start position (far left)
        y: costFunction(-250),
        radius: 10,
        color: "red",
        velocity: 0,
        learningRate: 0.4, // Step Size (Balanced for smooth descent)
    };

    let running = true; // Controls animation flow

    // Adjust Scaling for Proper Visibility
    const scaleX = canvas.width / 600; // Scale width for better fit
    const scaleY = canvas.height / 200; // Scale height to fit the curve

    // Draw Loss Function
    function drawCurve() {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + (-300 * scaleX), canvas.height / 2 - costFunction(-300) * scaleY);
        for (let x = -300; x < 300; x += 5) {
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

        let gradient = 0.01 * ball.x; // Derivative of y = 0.005x^2 -> dy/dx = 0.01x
        ball.velocity = -ball.learningRate * gradient; // Gradient Descent Update Rule
        ball.x += ball.velocity; // Update position
        ball.y = costFunction(ball.x); // Update height

        // Stop animation when movement is minimal
        if (Math.abs(ball.velocity) < 0.05) running = false;
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
            // Fade Out & Transition to Main Page
            setTimeout(() => {
                document.getElementById("intro").classList.add("fade-out");
                setTimeout(() => {
                    document.getElementById("intro").style.display = "none";
                    document.body.style.overflow = "auto"; // Ensure scrolling is enabled after animation
                }, 1500);
            }, 1000);
        }
    }

    // Start animation and ensure website loads properly
    document.body.style.overflow = "hidden"; // Prevent scrolling during animation
    animate();
});
