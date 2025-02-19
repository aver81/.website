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
    // Formula 1 Animation
    const f1Car = document.getElementById("f1-container");

    // Add class to trigger animation
    setTimeout(() => {
        f1Car.classList.add("f1-zoom");
    }, 500); // Delay start slightly for better effect

    // Hide the intro after the animation completes
    setTimeout(() => {
        document.getElementById("intro").classList.add("fade-out");
        setTimeout(() => {
            document.getElementById("intro").style.display = "none";
        }, 1500);
    }, 2000); // Ensure enough time for animation before fading out

    // Reveal Timeline Animation on Scroll
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

    // Reveal Flow Blocks Animation on Scroll
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

// Sidebar Scroll Highlighting
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
