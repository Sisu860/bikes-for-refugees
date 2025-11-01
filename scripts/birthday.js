// Confetti Animation
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
const confettiCount = 150;
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8'];

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

// Initialize confetti
for (let i = 0; i < confettiCount; i++) {
    confettiPieces.push(new Confetti());
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiPieces.forEach(piece => {
        piece.update();
        piece.draw();
    });
    
    requestAnimationFrame(animateConfetti);
}

animateConfetti();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Balloon pop effect
const balloons = document.querySelectorAll('.balloon');
balloons.forEach(balloon => {
    balloon.addEventListener('click', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(0)';
        this.style.transition = 'transform 0.3s ease-out';
        
        // Create burst effect
        createBurst(this);
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.style.animation = 'float 3s ease-in-out infinite';
        }, 2000);
    });
});

function createBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = 0;
        let posY = 0;
        let opacity = 1;
        
        const animate = () => {
            posX += vx * 0.016;
            posY += vy * 0.016 + 50 * 0.016;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${posX}px, ${posY}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// Wish button functionality
const wishButton = document.getElementById('wishButton');
const starsContainer = document.getElementById('starsContainer');
const flame = document.querySelector('.flame');

wishButton.addEventListener('click', () => {
    // Blow out the candle
    flame.classList.add('blown-out');
    
    // Add button animation
    wishButton.classList.add('blown');
    
    // Create stars
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createStar();
        }, i * 50);
    }
    
    // Change button text
    wishButton.textContent = 'Wish Granted! 🌟';
    wishButton.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    
    // Reset after animation
    setTimeout(() => {
        flame.classList.remove('blown-out');
        wishButton.classList.remove('blown');
        wishButton.textContent = 'Make a Wish! ✨';
        wishButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }, 3000);
});

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.textContent = '⭐';
    star.style.left = Math.random() * 100 + '%';
    star.style.bottom = '20%';
    starsContainer.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 2000);
}

// Add sparkle effect on mouse move
document.querySelector('.birthday-card').addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = e.offsetX + 'px';
        sparkle.style.top = e.offsetY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '20px';
        sparkle.style.animation = 'starRise 1s ease-out forwards';
        document.querySelector('.birthday-card').appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Add typing effect to message (optional enhancement)
console.log('🎉 Happy Birthday! 🎂');
console.log('Click the balloons to pop them!');
console.log('Click "Make a Wish" to blow out the candle!');
