/**
 * Types used in FrostFX
 * @packageDocumentation
 */

/**
 * Structure representing a snow particle
 */
export interface Particle {
  /** X position of the particle */
  x: number;
  /** Y position of the particle */
  y: number;
  /** Horizontal velocity of the particle */
  velocityX: number;
  /** Vertical velocity of the particle */
  velocityY: number;
  /** Remaining lifetime of the particle */
  lifetime: number;
  /** Size of the particle */
  size: number;
  /** Color of the particle in HEX or RGBA format */
  color: string;
  /** Rotation angle of the particle (in radians) */
  rotation?: number;
  /** Type of snowflake */
  type: SnowflakeType;
}

/**
 * Possible snowflake types
 */
export type SnowflakeType = 'circle' | 'flake';

/**
 * Settings for the snow particle system
 */
export interface SnowOptions {
  /** Number of particles in the system */
  particleCount: number;
  /** Gravity effect */
  gravity: number;
  /** Wind force */
  wind: number;
  /** Particle lifetime (seconds) */
  lifetime: number;
  /** Base particle size */
  size: number;
  /** Minimum particle size */
  minSize: number;
  /** Maximum particle size */
  maxSize: number;
  /** Particle movement speed */
  speed: number;
  /** Array of colors for particles */
  colors: string[];
  /** Types of snowflakes used in the system */
  snowflakeTypes: SnowflakeType[];
  /** Blizzard mode (more intense effects) */
  blizzardMode: boolean;
}

/**
 * Interface for particle system
 */
export interface IParticleSystem {
  /**
   * Sets particle system parameters
   * @param options Particle system settings
   */
  setOptions(options: Partial<SnowOptions>): void;
  
  /**
   * Starts the particle system
   */
  start(): void;
  
  /**
   * Stops the particle system
   */
  stop(): void;
  
  /**
   * Resets the particle system (removes all existing particles)
   */
  reset(): void;
} 