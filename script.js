// Get the canvas element and its context
const canvas = document.getElementById('sineWaveCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Animation variables
let wavePhase = 0; // Phase of the sine wave
const waveAmplitude = 50; // Amplitude of the sine wave
const waveFrequency = 0.01; // Frequency of the sine wave
const waveSpeed = 2; // Speed of the wave progression
const ballRadius = 10; // Radius of the ball
let ballX = -ballRadius; // Initial x-position of the ball (off-screen)
const ballDelay = 50; // Delay in frames for the ball to follow the wave

// Function to draw the sine wave and the ball
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the sine wave
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * waveFrequency + wavePhase) * waveAmplitude;
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#00f';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Calculate the ball's position with a delay
    const ballTargetX = (wavePhase / waveFrequency) % canvas.width;
    ballX += (ballTargetX - ballX) / ballDelay;

    // Draw the ball
    const ballY = canvas.height / 2 + Math.sin(ballX * waveFrequency + wavePhase) * waveAmplitude;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#f00';
    ctx.fill();

    // Update the wave phase for the next frame
    wavePhase -= waveSpeed;

    // Request the next frame
    requestAnimationFrame(draw);
}

// Start the animation
draw();

// Handle window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
