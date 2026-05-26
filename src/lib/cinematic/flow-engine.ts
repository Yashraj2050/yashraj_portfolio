// Cinematic Flow Engine - Procedural motion graphics system

import type { FlowParticle, FlowField, MotionConfig } from './types';

export class CinematicFlowEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: FlowParticle[] = [];
  private flowField: FlowField;
  private animationId: number | null = null;
  private config: MotionConfig;
  private time: number = 0;
  private mouseX: number = 0.5;
  private mouseY: number = 0.5;
  private targetMouseX: number = 0.5;
  private targetMouseY: number = 0.5;
  private width: number = 0;
  private height: number = 0;
  private dpr: number = 1;

  constructor(canvas: HTMLCanvasElement, config: Partial<MotionConfig> = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true })!;
    
    this.config = {
      intensity: config.intensity ?? 0.8,
      speed: config.speed ?? 1,
      complexity: config.complexity ?? 0.6,
      colorScheme: config.colorScheme ?? 'dark',
    };

    const cellSize = 20;
    this.flowField = {
      cols: Math.ceil(window.innerWidth / cellSize),
      rows: Math.ceil(window.innerHeight / cellSize),
      field: new Float32Array(
        Math.ceil(window.innerWidth / cellSize) * 
        Math.ceil(window.innerHeight / cellSize)
      ),
      time: 0,
    };

    this.resize();
    this.initParticles();
  }

  private resize(): void {
    this.dpr = Math.min(window.devicePixelRatio, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    
    this.ctx.scale(this.dpr, this.dpr);
  }

  private initParticles(): void {
    const count = Math.floor((this.width * this.height) / 8000 * this.config.intensity);
    this.particles = [];
    
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(x?: number, y?: number): FlowParticle {
    return {
      x: x ?? Math.random() * this.width,
      y: y ?? Math.random() * this.height,
      vx: 0,
      vy: 0,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      hue: 200 + Math.random() * 40,
      life: 0,
      maxLife: Math.random() * 400 + 200,
    };
  }

  private noise(x: number, y: number, z: number): number {
    // Simplex-like noise approximation
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    
    const u = this.fade(xf);
    const v = this.fade(yf);
    
    const a = (X + Y * 57 + z * 131) * 0.01745329;
    const b = (X + 1 + Y * 57 + z * 131) * 0.01745329;
    const c = (X + (Y + 1) * 57 + z * 131) * 0.01745329;
    const d = (X + 1 + (Y + 1) * 57 + z * 131) * 0.01745329;
    
    return this.lerp(
      this.lerp(Math.sin(a), Math.sin(b), u),
      this.lerp(Math.sin(c), Math.sin(d), u),
      v
    );
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  private updateFlowField(): void {
    const { cols, rows, field } = this.flowField;
    const scale = 0.008 * this.config.complexity;
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const index = y * cols + x;
        const angle = this.noise(x * scale, y * scale, this.time * 0.0003) * Math.PI * 4;
        field[index] = angle;
      }
    }
  }

  private getFlowAngle(x: number, y: number): number {
    const { cols, field } = this.flowField;
    const cellSize = 20;
    
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    
    if (col < 0 || col >= this.flowField.cols || row < 0 || row >= this.flowField.rows) {
      return 0;
    }
    
    return field[row * cols + col];
  }

  setMousePosition(x: number, y: number): void {
    this.targetMouseX = x / this.width;
    this.targetMouseY = y / this.height;
  }

  update(deltaTime: number): void {
    this.time += deltaTime * this.config.speed;
    
    // Smooth mouse following
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
    
    this.updateFlowField();
    
    const speed = 1.5 * this.config.speed;
    const mouseInfluence = 150;
    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      // Get flow field direction
      const angle = this.getFlowAngle(p.x, p.y);
      
      // Mouse influence
      const dx = this.mouseX * this.width - p.x;
      const dy = this.mouseY * this.height - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / mouseInfluence);
      
      // Update velocity
      p.vx += Math.cos(angle) * 0.1 + (dx / dist || 0) * influence * 0.5;
      p.vy += Math.sin(angle) * 0.1 + (dy / dist || 0) * influence * 0.5;
      
      // Damping
      p.vx *= 0.98;
      p.vy *= 0.98;
      
      // Update position
      p.x += p.vx * speed;
      p.y += p.vy * speed;
      
      // Update life
      p.life++;
      
      // Reset if out of bounds or dead
      if (
        p.x < -50 || p.x > this.width + 50 ||
        p.y < -50 || p.y > this.height + 50 ||
        p.life > p.maxLife
      ) {
        this.particles[i] = this.createParticle();
      }
    }
  }

  render(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw flow particles
    for (const p of this.particles) {
      const lifeRatio = p.life / p.maxLife;
      const fadeIn = Math.min(lifeRatio * 4, 1);
      const fadeOut = Math.min((1 - lifeRatio) * 4, 1);
      const alpha = p.opacity * fadeIn * fadeOut;
      
      // Trail
      const trailLength = Math.sqrt(p.vx * p.vx + p.vy * p.vy) * 8;
      if (trailLength > 1) {
        const gradient = this.ctx.createLinearGradient(
          p.x - p.vx * trailLength,
          p.y - p.vy * trailLength,
          p.x,
          p.y
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 60%, 50%, 0)`);
        gradient.addColorStop(1, `hsla(${p.hue}, 60%, 60%, ${alpha * 0.6})`);
        
        this.ctx.beginPath();
        this.ctx.moveTo(p.x - p.vx * trailLength, p.y - p.vy * trailLength);
        this.ctx.lineTo(p.x, p.y);
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = p.size;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
      }
      
      // Particle head
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${alpha})`;
      this.ctx.fill();
    }
    
    // Draw ambient glow around mouse
    const glowGradient = this.ctx.createRadialGradient(
      this.mouseX * this.width,
      this.mouseY * this.height,
      0,
      this.mouseX * this.width,
      this.mouseY * this.height,
      300
    );
    glowGradient.addColorStop(0, 'rgba(100, 150, 200, 0.03)');
    glowGradient.addColorStop(0.5, 'rgba(80, 120, 180, 0.01)');
    glowGradient.addColorStop(1, 'rgba(60, 100, 160, 0)');
    
    this.ctx.fillStyle = glowGradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  start(): void {
    if (this.animationId !== null) return;
    
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      this.update(deltaTime);
      this.render();
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    this.animationId = requestAnimationFrame(animate);
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  handleResize(): void {
    this.resize();
    this.flowField.cols = Math.ceil(this.width / 20);
    this.flowField.rows = Math.ceil(this.height / 20);
    this.flowField.field = new Float32Array(this.flowField.cols * this.flowField.rows);
    this.initParticles();
  }

  destroy(): void {
    this.stop();
  }
}
