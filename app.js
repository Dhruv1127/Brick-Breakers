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
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#ff9f43']
    },
    levels: {
        1: { name: 'EASY', rows: 3, cols: 8, ballSpeed: 4, paddleSpeed: 8 },
        2: { name: 'MEDIUM', rows: 4, cols: 9, ballSpeed: 5, paddleSpeed: 8 },
        3: { name: 'HARD', rows: 5, cols: 10, ballSpeed: 6, paddleSpeed: 7 },
        4: { name: 'EXPERT', rows: 6, cols: 11, ballSpeed: 7, paddleSpeed: 7 },
        5: { name: 'MASTER', rows: 7, cols: 12, ballSpeed: 8, paddleSpeed: 6 },
        6: { name: 'LEGEND', rows: 8, cols: 13, ballSpeed: 9, paddleSpeed: 6 }
    }
};

// Game State
class GameState {
    constructor() {
        this.phase = 'home'; // home, levelSelect, ready, playing, ended
        this.currentLevel = 1;
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
        this.completedLevels = [];
        
        this.initializeBricks();
    }
    
    initializeBricks() {
        this.bricks = [];
        const level = GAME_CONFIG.levels[this.currentLevel];
        const rows = level.rows;
        const cols = level.cols;
        
        const totalWidth = cols * GAME_CONFIG.brick.width + (cols - 1) * GAME_CONFIG.brick.padding;
        const startX = (GAME_CONFIG.width - totalWidth) / 2;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const brick = {
                    x: startX + col * (GAME_CONFIG.brick.width + GAME_CONFIG.brick.padding),
                    y: 60 + row * (GAME_CONFIG.brick.height + GAME_CONFIG.brick.padding),
                    width: GAME_CONFIG.brick.width,
                    height: GAME_CONFIG.brick.height,
                    color: GAME_CONFIG.brick.colors[row % GAME_CONFIG.brick.colors.length],
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
        const level = GAME_CONFIG.levels[this.currentLevel];
        this.ball = {
            x: GAME_CONFIG.width / 2,
            y: GAME_CONFIG.height - 60,
            dx: level.ballSpeed * 0.6,
            dy: -level.ballSpeed * 0.8
        };
        this.initializeBricks();
        this.phase = 'ready';
    }
    
    setLevel(levelNumber) {
        this.currentLevel = levelNumber;
        this.resetGame();
    }
    
    goToHome() {
        this.phase = 'home';
    }
    
    goToLevelSelect() {
        this.phase = 'levelSelect';
    }
    
    completeLevel() {
        if (!this.completedLevels.includes(this.currentLevel)) {
            this.completedLevels.push(this.currentLevel);
        }
        
        // Check if there's a next level
        if (this.currentLevel < Object.keys(GAME_CONFIG.levels).length) {
            this.currentLevel++;
            this.resetGame();
        } else {
            this.phase = 'ended';
        }
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
                    this.hideAllScreens();
                }
            }
            
            if (e.code === 'KeyR' && this.state.phase === 'ended') {
                this.restartGame();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.state.keys[e.code] = false;
        });
        
        // Home screen events
        document.getElementById('startGameBtn').addEventListener('click', () => {
            this.state.setLevel(1);
            this.showStartScreen();
        });
        
        document.getElementById('levelsBtn').addEventListener('click', () => {
            this.state.goToLevelSelect();
            this.showLevelScreen();
        });
        
        document.getElementById('quitBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to quit the game?')) {
                window.close();
            }
        });
        
        // Level selection events
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const level = parseInt(btn.dataset.level);
                if (!btn.classList.contains('locked')) {
                    this.state.setLevel(level);
                    this.updateLevelInfo();
                    this.showStartScreen();
                }
            });
        });
        
        document.getElementById('backToHomeBtn').addEventListener('click', () => {
            this.state.goToHome();
            this.showHomeScreen();
        });
        
        // Start screen events
        document.getElementById('startBtn').addEventListener('click', () => {
            this.state.start();
            this.hideAllScreens();
        });
        
        document.getElementById('backToLevelsBtn').addEventListener('click', () => {
            this.state.goToLevelSelect();
            this.showLevelScreen();
        });
        
        // Game over screen events
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartGame();
        });
        
        // Mute button
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
    
    hideAllScreens() {
        document.getElementById('homeScreen').classList.add('hidden');
        document.getElementById('levelScreen').classList.add('hidden');
        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('gameOverScreen').classList.add('hidden');
    }
    
    showHomeScreen() {
        this.hideAllScreens();
        document.getElementById('homeScreen').classList.remove('hidden');
    }
    
    showLevelScreen() {
        this.hideAllScreens();
        document.getElementById('levelScreen').classList.remove('hidden');
        this.updateLevelButtons();
    }
    
    showStartScreen() {
        this.hideAllScreens();
        document.getElementById('startScreen').classList.remove('hidden');
        this.updateLevelInfo();
    }
    
    showGameOverScreen() {
        document.getElementById('finalScore').textContent = this.state.score;
        document.getElementById('gameOverScreen').classList.remove('hidden');
    }
    
    updateLevelInfo() {
        const level = GAME_CONFIG.levels[this.state.currentLevel];
        document.getElementById('currentLevel').textContent = this.state.currentLevel;
        document.getElementById('currentLevelName').textContent = level.name;
    }
    
    updateLevelButtons() {
        const buttons = document.querySelectorAll('.level-btn');
        buttons.forEach((btn, index) => {
            const levelNum = index + 1;
            if (levelNum <= this.state.currentLevel || this.state.completedLevels.includes(levelNum)) {
                btn.classList.remove('locked');
            } else {
                btn.classList.add('locked');
            }
        });
    }
    
    restartGame() {
        this.state.resetGame();
        this.showHomeScreen();
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
        const level = GAME_CONFIG.levels[this.state.currentLevel];
        if (this.state.keys['ArrowLeft'] || this.state.keys['KeyA']) {
            this.state.paddle.x = Math.max(0, this.state.paddle.x - level.paddleSpeed);
        }
        if (this.state.keys['ArrowRight'] || this.state.keys['KeyD']) {
            this.state.paddle.x = Math.min(
                GAME_CONFIG.width - GAME_CONFIG.paddle.width,
                this.state.paddle.x + level.paddleSpeed
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
                const level = GAME_CONFIG.levels[this.state.currentLevel];
                this.state.ball.x = GAME_CONFIG.width / 2;
                this.state.ball.y = GAME_CONFIG.height - 60;
                this.state.ball.dx = level.ballSpeed * 0.6;
                this.state.ball.dy = -level.ballSpeed * 0.8;
            } else {
                this.state.end();
                this.showGameOverScreen();
            }
        }
        
        // Check for win condition
        const remainingBricks = this.state.bricks.filter(brick => !brick.destroyed);
        if (remainingBricks.length === 0) {
            this.state.completeLevel();
            if (this.state.phase === 'ended') {
                this.showGameOverScreen();
            } else {
                this.showStartScreen();
            }
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