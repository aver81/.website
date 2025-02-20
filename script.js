// Get the canvas element and its context
const canvas = document.getElementById('sineWaveCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match the container size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Animation variables
let wavePhase = 0; // Phase of the sine wave
const waveAmplitude = 100; // Increased amplitude for a bigger wave
const waveFrequency = 0.01; // Frequency of the sine wave
const waveSpeed = 2; // Speed of the wave progression
const ballRadius = 10; // Radius of the ball
let ballX = -ballRadius; // Initial x-position of the ball (off-screen)
const ballDelay = 50; // Delay in frames for the ball to follow the wave
let animationStartTime = null; // Track when the animation starts
const animationDuration = 1000; // 1 second duration

// Function to draw the sine wave and the ball
function draw(timestamp) {
    // Initialize animation start time
    if (!animationStartTime) {
        animationStartTime = timestamp;
    }

    // Calculate elapsed time
    const elapsedTime = timestamp - animationStartTime;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the sine wave
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * waveFrequency + wavePhase) * waveAmplitude;
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#ff0000'; // Red color for the sine wave
    ctx.lineWidth = 2;
    ctx.stroke();

    // Calculate the ball's position with a delay
    const ballTargetX = (wavePhase / waveFrequency) % canvas.width;
    ballX += (ballTargetX - ballX) / ballDelay;

    // Draw the ball
    const ballY = canvas.height / 2 + Math.sin(ballX * waveFrequency + wavePhase) * waveAmplitude;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#00f'; // Blue color for the ball
    ctx.fill();

    // Update the wave phase for the next frame
    wavePhase -= waveSpeed;

    // Stop the animation after 1 second
    if (elapsedTime < animationDuration) {
        requestAnimationFrame(draw);
    }
}

// Start the animation
requestAnimationFrame(draw);

// Handle window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
