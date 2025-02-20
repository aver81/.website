// Get the canvas element and its context
const canvas = document.getElementById('sineWaveCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Animation variables
let wavePhase = 0; // Phase of the sine wave
const waveAmplitude = 120; // Increased amplitude for better visibility
const waveFrequency = 0.008; // Frequency of the sine wave
const waveSpeed = 3; // Speed of the wave progression
const ballRadius = 12; // Increased radius for visibility
let ballX = 0; // Start at the left edge of the canvas
const ballDelay = 30; // Delay for the ball to follow the wave

let animationStartTime = null; // To track animation duration
const animationDuration = 1000; // 1 second (1000ms)

// Function to draw the sine wave and the ball
function draw(timestamp) {
    if (!animationStartTime) animationStartTime = timestamp; // Set start time
    const elapsedTime = timestamp - animationStartTime;

    // Stop animation after 1 second
    if (elapsedTime > animationDuration) {
        setTimeout(() => {
            document.getElementById("intro").classList.add("fade-out");
            setTimeout(() => {
                document.getElementById("intro").style.display = "none";
                document.body.style.overflow = "auto";
            }, 1500);
        }, 500);
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a single sine wave
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x * waveFrequency) + wavePhase) * waveAmplitude;
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.strokeStyle = '#FF0000'; // Change sine wave color to red
    ctx.lineWidth = 3;
    ctx.stroke();

    // Calculate the ball's delayed position
    const ballTargetX = (wavePhase / waveFrequency) % canvas.width - ballDelay;
    ballX = Math.max(0, Math.min(canvas.width, ballTargetX)); // Keep the ball within bounds

    // Draw the ball (Yellow color for visibility)
    const ballY = canvas.height / 2 + Math.sin((ballX * waveFrequency) + wavePhase) * waveAmplitude;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700'; // Yellow color
    ctx.fill();

    // Move the wave to the right
    wavePhase += waveSpeed;

    // Request the next frame
    requestAnimationFrame(draw);
}

// Start the animation
requestAnimationFrame(draw);

// Handle window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
