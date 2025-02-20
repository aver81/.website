document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gradientCanvas");
    const ctx = canvas.getContext("2d");

    // Resize Canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Define Cost Function: y = x^2 (Parabolic Loss)
    function costFunction(x) {
        return 0.05 * Math.pow(x, 2);
    }

    // Ball Properties
    let ball = {
        x: -200, // Start position (left side)
        y: costFunction(-200),
        radius: 10,
        color: "red",
        velocity: 0,
        learningRate: 0.5, // Step Size
    };

    let running = true; // Control animation

    // Draw Loss Function
    function drawCurve() {
        ctx.beginPath();
        ctx.moveTo(0, costFunction(-canvas.width / 2) + canvas.height / 2);
        for (let x = -canvas.width / 2; x < canvas.width / 2; x += 5) {
            let y = costFunction(x);
            ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 - y);
        }
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draw Ball
    function drawBall() {
        ctx.beginPath();
        ctx.arc(canvas.width / 2 + ball.x, canvas.height / 2 - ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Gradient Descent Update
    function updateBall() {
        if (!running) return;
        let gradient = 0.1 * ball.x; // Derivative of y = 0.05x^2 (dy/dx = 0.1x)
        ball.velocity = -ball.learningRate * gradient; // Gradient Descent Update Rule
        ball.x += ball.velocity; // Update position
        ball.y = costFunction(ball.x); // Update height
        if (Math.abs(ball.velocity) < 0.01) running = false; // Stop when movement is minimal
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCurve();
        drawBall();
        updateBall();
        if (running) {
            requestAnimationFrame(animate);
        }
    }

    animate();
});
