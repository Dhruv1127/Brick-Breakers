// Game Configuration
const GAME_CONFIG = {
    width: 800,
    height: 600,
    paddle: {
        width: 100,
        height: 15,
        speed: 8,
        color: '#4c6ef5'
    },
    ball: {
        radius: 8,
        speed: 5,
        color: '#ff6b6b'
    },
    brick: {
        width: 75,
        height: 20,
        padding: 5,
        rows: 5,
        cols: 10,
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7']
    }
};

// Game State
class GameState {
    constructor() {
        this.phase = 'ready'; // ready, playing, ended
        this.score = 0;
        this.lives = 3;
        this.paddle = {
            x: GAME_CONFIG.width / 2 - GAME_CONFIG.paddle.width / 2,
            y: GAME_CONFIG.height - 40
        };
        this.ball = {
            x: GAME_CONFIG.width / 2,
            y: GAME_CONFIG.height - 60,
            dx: GAME_CONFIG.ball.speed * 0.6,
            dy: -GAME_CONFIG.ball.speed * 0.8
        };
        this.bricks = [];
        this.keys = {};
        this.isMuted = true;
        
        this.initializeBricks();
    }
    
    initializeBricks() {
        this.bricks = [];
        for (let row = 0; row < GAME_CONFIG.brick.rows; row++) {
            for (let col = 0; col < GAME_CONFIG.brick.cols; col++) {
                const brick = {
                    x: col * (GAME_CONFIG.brick.width + GAME_CONFIG.brick.padding) + 40,
                    y: row * (GAME_CONFIG.brick.height + GAME_CONFIG.brick.padding) + 60,
                    width: GAME_CONFIG.brick.width,
                    height: GAME_CONFIG.brick.height,
                    color: GAME_CONFIG.brick.colors[row],
                    destroyed: false
                };
                this.bricks.push(brick);
            }
        }
    }
    
    resetGame() {
        this.score = 0;
        this.lives = 3;
        this.paddle.x = GAME_CONFIG.width / 2 - GAME_CONFIG.paddle.width / 2;
        this.ball = {
            x: GAME_CONFIG.width / 2,
            y: GAME_CONFIG.height - 60,
            dx: GAME_CONFIG.ball.speed * 0.6,
            dy: -GAME_CONFIG.ball.speed * 0.8
        };
        this.initializeBricks();
        this.phase = 'ready';
    }
    
    start() {
        if (this.phase === 'ready') {
            this.phase = 'playing';
        }
    }
    
    end() {
        this.phase = 'ended';
    }
}

// Audio Manager
class AudioManager {
    constructor() {
        this.hitSound = document.getElementById('hitSound');
        this.successSound = document.getElementById('successSound');
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.isMuted = true;
        
        // Set volumes
        if (this.hitSound) this.hitSound.volume = 0.3;
        if (this.successSound) this.successSound.volume = 0.5;
        if (this.backgroundMusic) this.backgroundMusic.volume = 0.2;
    }
    
    playHit() {
        if (!this.isMuted && this.hitSound) {
            this.hitSound.currentTime = 0;
            this.hitSound.play().catch(() => {});
        }
    }
    
    playSuccess() {
        if (!this.isMuted && this.successSound) {
            this.successSound.currentTime = 0;
            this.successSound.play().catch(() => {});
        }
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        const muteBtn = document.getElementById('muteBtn');
        muteBtn.textContent = this.isMuted ? '🔇 Sound Off' : '🔊 Sound On';
        
        if (!this.isMuted && this.backgroundMusic) {
            this.backgroundMusic.play().catch(() => {});
        } else if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
    }
}

// Game Renderer
class GameRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
    
    clear() {
        this.ctx.clearRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
    }
    
    drawPaddle(paddle) {
        // Draw paddle with gradient
        const gradient = this.ctx.createLinearGradient(0, paddle.y, 0, paddle.y + GAME_CONFIG.paddle.height);
        gradient.addColorStop(0, '#4c6ef5');
        gradient.addColorStop(1, '#364fc7');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(paddle.x, paddle.y, GAME_CONFIG.paddle.width, GAME_CONFIG.paddle.height);
        
        // Add border
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(paddle.x, paddle.y, GAME_CONFIG.paddle.width, GAME_CONFIG.paddle.height);
    }
    
    drawBall(ball) {
        // Draw ball with glow effect
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, GAME_CONFIG.ball.radius, 0, Math.PI * 2);
        
        const gradient = this.ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, GAME_CONFIG.ball.radius);
        gradient.addColorStop(0, '#ff8cc8');
        gradient.addColorStop(1, '#ff6b6b');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        // Add outer glow
        this.ctx.shadowColor = '#ff6b6b';
        this.ctx.shadowBlur = 10;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }
    
    drawBricks(bricks) {
        bricks.forEach(brick => {
            if (!brick.destroyed) {
                // Draw brick with gradient
                const gradient = this.ctx.createLinearGradient(0, brick.y, 0, brick.y + brick.height);
                gradient.addColorStop(0, brick.color);
                gradient.addColorStop(1, this.darkenColor(brick.color, 0.3));
                
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                
                // Add border
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
            }
        });
    }
    
    drawParticles() {
        // Add some background stars/particles
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * GAME_CONFIG.width;
            const y = Math.random() * GAME_CONFIG.height;
            const size = Math.random() * 2;
            this.ctx.fillRect(x, y, size, size);
        }
    }
    
    darkenColor(color, factor) {
        // Simple color darkening function
        const rgb = this.hexToRgb(color);
        if (rgb) {
            const r = Math.floor(rgb.r * (1 - factor));
            const g = Math.floor(rgb.g * (1 - factor));
            const b = Math.floor(rgb.b * (1 - factor));
            return `rgb(${r}, ${g}, ${b})`;
        }
        return color;
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}

// Game Engine
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.state = new GameState();
        this.renderer = new GameRenderer(this.canvas);
        this.audio = new AudioManager();
        
        this.initializeEventListeners();
        this.initializeUI();
        this.createBackgroundParticles();
        this.gameLoop();
    }
    
    initializeEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.state.keys[e.code] = true;
            
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.state.phase === 'ready') {
                    this.state.start();
                    this.hideStartScreen();
                }
            }
            
            if (e.code === 'KeyR' && this.state.phase === 'ended') {
                this.restartGame();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.state.keys[e.code] = false;
        });
        
        // Button events
        document.getElementById('startBtn').addEventListener('click', () => {
            this.state.start();
            this.hideStartScreen();
        });
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartGame();
        });
        
        document.getElementById('muteBtn').addEventListener('click', () => {
            this.audio.toggleMute();
        });
    }
    
    initializeUI() {
        this.updateScore();
        this.updateLives();
    }
    
    createBackgroundParticles() {
        const particlesContainer = document.querySelector('.background-particles');
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 4 + 's';
            particle.style.animationDuration = (3 + Math.random() * 2) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    hideStartScreen() {
        document.getElementById('startScreen').classList.add('hidden');
    }
    
    showGameOverScreen() {
        document.getElementById('finalScore').textContent = this.state.score;
        document.getElementById('gameOverScreen').classList.remove('hidden');
    }
    
    hideGameOverScreen() {
        document.getElementById('gameOverScreen').classList.add('hidden');
    }
    
    showStartScreen() {
        document.getElementById('startScreen').classList.remove('hidden');
    }
    
    restartGame() {
        this.state.resetGame();
        this.hideGameOverScreen();
        this.showStartScreen();
        this.updateScore();
        this.updateLives();
    }
    
    updateScore() {
        document.getElementById('scoreValue').textContent = this.state.score;
    }
    
    updateLives() {
        document.getElementById('livesValue').textContent = this.state.lives;
    }
    
    update() {
        if (this.state.phase !== 'playing') return;
        
        // Paddle movement
        if (this.state.keys['ArrowLeft'] || this.state.keys['KeyA']) {
            this.state.paddle.x = Math.max(0, this.state.paddle.x - GAME_CONFIG.paddle.speed);
        }
        if (this.state.keys['ArrowRight'] || this.state.keys['KeyD']) {
            this.state.paddle.x = Math.min(
                GAME_CONFIG.width - GAME_CONFIG.paddle.width,
                this.state.paddle.x + GAME_CONFIG.paddle.speed
            );
        }
        
        // Ball movement
        this.state.ball.x += this.state.ball.dx;
        this.state.ball.y += this.state.ball.dy;
        
        // Ball collision with walls
        if (this.state.ball.x <= GAME_CONFIG.ball.radius || 
            this.state.ball.x >= GAME_CONFIG.width - GAME_CONFIG.ball.radius) {
            this.state.ball.dx = -this.state.ball.dx;
            this.audio.playHit();
        }
        
        if (this.state.ball.y <= GAME_CONFIG.ball.radius) {
            this.state.ball.dy = -this.state.ball.dy;
            this.audio.playHit();
        }
        
        // Ball collision with paddle
        if (this.state.ball.y + GAME_CONFIG.ball.radius >= this.state.paddle.y &&
            this.state.ball.x >= this.state.paddle.x &&
            this.state.ball.x <= this.state.paddle.x + GAME_CONFIG.paddle.width) {
            
            // Calculate bounce angle based on where ball hits paddle
            const hitPos = (this.state.ball.x - this.state.paddle.x) / GAME_CONFIG.paddle.width;
            const angle = (hitPos - 0.5) * Math.PI / 3; // Max 60 degrees
            
            const speed = Math.sqrt(this.state.ball.dx * this.state.ball.dx + this.state.ball.dy * this.state.ball.dy);
            this.state.ball.dx = speed * Math.sin(angle);
            this.state.ball.dy = -Math.abs(speed * Math.cos(angle));
            
            this.audio.playHit();
        }
        
        // Ball collision with bricks
        this.state.bricks.forEach(brick => {
            if (!brick.destroyed &&
                this.state.ball.x >= brick.x &&
                this.state.ball.x <= brick.x + brick.width &&
                this.state.ball.y >= brick.y &&
                this.state.ball.y <= brick.y + brick.height) {
                
                brick.destroyed = true;
                this.state.ball.dy = -this.state.ball.dy;
                this.state.score += 10;
                this.updateScore();
                this.audio.playSuccess();
            }
        });
        
        // Check for ball falling off screen
        if (this.state.ball.y > GAME_CONFIG.height) {
            this.state.lives--;
            this.updateLives();
            
            if (this.state.lives > 0) {
                // Reset ball position
                this.state.ball.x = GAME_CONFIG.width / 2;
                this.state.ball.y = GAME_CONFIG.height - 60;
                this.state.ball.dx = GAME_CONFIG.ball.speed * 0.6;
                this.state.ball.dy = -GAME_CONFIG.ball.speed * 0.8;
            } else {
                this.state.end();
                this.showGameOverScreen();
            }
        }
        
        // Check for win condition
        const remainingBricks = this.state.bricks.filter(brick => !brick.destroyed);
        if (remainingBricks.length === 0) {
            this.state.end();
            this.showGameOverScreen();
        }
    }
    
    render() {
        this.renderer.clear();
        this.renderer.drawParticles();
        this.renderer.drawPaddle(this.state.paddle);
        this.renderer.drawBall(this.state.ball);
        this.renderer.drawBricks(this.state.bricks);
    }
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});