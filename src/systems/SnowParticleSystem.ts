/**
 * Implementation of the snow particle system
 * @packageDocumentation
 */

import { Particle, SnowOptions, IParticleSystem } from '../types';
import { DEFAULT_SNOW_OPTIONS, SNOW_PRESETS, SNOW_PHYSICS } from '../constants';
import { createSnowParticle, updateParticlePhysics, calculateWindChange } from '../utils/physics';
import { drawParticle, isParticleOutOfBounds } from '../utils/canvas';

/**
 * Snow Particle System
 * 
 * Allows creating and displaying snowfall effects on HTML Canvas
 */
export class SnowParticleSystem implements IParticleSystem {
  /** Array of active particles */
  private particles: Particle[] = [];
  
  /** Current snow settings */
  private options: SnowOptions;
  
  /** Canvas context for rendering */
  private context: CanvasRenderingContext2D;
  
  /** Counter for changing wind */
  private windChangeTimer = 0;
  
  /** Current wind force */
  private currentWind = 0;
  
  /** Animation ID for possible stopping */
  private animationFrameId: number | null = null;

  /**
   * Creates a new snow particle system
   * @param context Canvas context for rendering
   * @param options Optional initial settings
   */
  constructor(context: CanvasRenderingContext2D, options?: Partial<SnowOptions>) {
    if (!context) {
      throw new Error('SnowParticleSystem: Canvas context is required');
    }
    
    this.context = context;
    this.options = { ...DEFAULT_SNOW_OPTIONS, ...options };
  }

  /**
   * Sets new parameters for the particle system
   * @param options Partial settings to update
   */
  public setOptions(options: Partial<SnowOptions>): void {
    this.options = { ...this.options, ...options };
  }

  /**
   * Uses one of the preset snow modes
   * @param presetName Preset name: 'light', 'regular', or 'blizzard'
   */
  public usePreset(presetName: keyof typeof SNOW_PRESETS): void {
    const preset = SNOW_PRESETS[presetName];
    if (!preset) {
      console.warn(`Unknown preset: ${presetName}. Available presets: ${Object.keys(SNOW_PRESETS).join(', ')}`);
      return;
    }
    
    this.setOptions(preset);
    
    // Set blizzard mode if the corresponding preset is selected
    if (presetName === 'blizzard') {
      this.setBlizzardMode(true);
    } else {
      this.setBlizzardMode(false);
    }
  }

  /**
   * Creates a new snow particle
   * @private
   */
  private createParticle(): void {
    const particle = createSnowParticle(
      this.context.canvas.width,
      this.options,
      this.currentWind
    );
    
    this.particles.push(particle);
  }

  /**
   * Updates a particle's state
   * @param particle Particle to update
   * @private
   */
  private updateParticle(particle: Particle): void {
    updateParticlePhysics(particle, this.options, this.currentWind);
    
    // Remove the particle if its lifetime has expired or it's out of screen
    if (particle.lifetime <= 0 || 
        isParticleOutOfBounds(particle, this.context.canvas.width, this.context.canvas.height)) {
      const index = this.particles.indexOf(particle);
      if (index > -1) this.particles.splice(index, 1);
    }
  }

  /**
   * Renders a particle on the canvas
   * @param particle Particle to render
   * @private
   */
  private renderParticle(particle: Particle): void {
    const opacity = Math.min(1, particle.lifetime / 3); // Gradual fading
    drawParticle(this.context, particle, opacity);
  }

  /**
   * Updates all particles and renders them on the canvas
   * @private
   */
  private update(): void {
    // Random change of wind over time
    this.windChangeTimer++;
    if (this.windChangeTimer > SNOW_PHYSICS.WIND_CHANGE_INTERVAL) {
      this.windChangeTimer = 0;
      this.currentWind = calculateWindChange(this.currentWind, this.options);
    }
    
    // Update and render particles
    this.particles.forEach(particle => this.updateParticle(particle));
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.particles.forEach(particle => this.renderParticle(particle));

    // Determine how many new particles to create (more in blizzard mode)
    const particlesToCreate = this.options.blizzardMode ? 3 : 1;
    
    // Create new particles if there aren't enough
    for (let i = 0; i < particlesToCreate; i++) {
      if (this.particles.length < this.options.particleCount) {
        this.createParticle();
      }
    }
  }

  /**
   * Starts the particle system
   */
  public start(): void {
    // Stop previous animation if it's running
    if (this.animationFrameId !== null) {
      this.stop();
    }
    
    const loop = (): void => {
      this.update();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    
    loop();
  }

  /**
   * Stops the particle system
   */
  public stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    this.particles = [];
  }

  /**
   * Resets the particle system (removes all particles)
   */
  public reset(): void {
    this.particles = [];
    this.currentWind = 0;
    this.windChangeTimer = 0;
  }
  
  /**
   * Enables or disables blizzard mode
   * @param enabled Enable or disable mode
   */
  public setBlizzardMode(enabled: boolean): void {
    this.options.blizzardMode = enabled;
    
    // Adjust parameters to match the selected mode
    if (enabled && !this.options.blizzardMode) {
      this.setOptions({
        particleCount: Math.max(this.options.particleCount, 250),
        gravity: Math.max(this.options.gravity, 0.15),
        wind: Math.max(this.options.wind, 0.2),
        speed: Math.max(this.options.speed, 1.5),
      });
    }
  }
  
  /**
   * Gets the current number of active particles
   * @returns Number of particles
   */
  public getParticleCount(): number {
    return this.particles.length;
  }
  
  /**
   * Checks if the particle system is running
   * @returns True if the system is active
   */
  public isRunning(): boolean {
    return this.animationFrameId !== null;
  }
} 