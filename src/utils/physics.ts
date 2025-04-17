/**
 * Utilities for snow particle physics
 * @packageDocumentation
 */

import { Particle, SnowOptions } from '../types';
import { SNOW_PHYSICS } from '../constants';

/**
 * Creates a new snow particle with random parameters
 * @param canvasWidth Canvas width
 * @param options Particle system settings
 * @param currentWind Current wind force
 * @returns New particle object
 */
export function createSnowParticle(
  canvasWidth: number, 
  options: SnowOptions, 
  currentWind: number
): Particle {
  // Randomly select a snowflake type from available ones
  const snowType = options.snowflakeTypes[
    Math.floor(Math.random() * options.snowflakeTypes.length)
  ];
  
  // Random size within the given range
  const size = Math.random() * (options.maxSize - options.minSize) + options.minSize;
  
  // Create snow particle
  return {
    x: Math.random() * canvasWidth,
    y: -10, // Start slightly above the visible area
    velocityX: (Math.random() - 0.5) * options.speed + currentWind,
    velocityY: Math.random() * options.speed + options.gravity,
    lifetime: Math.random() * options.lifetime + 5,
    size: size,
    color: options.colors[Math.floor(Math.random() * options.colors.length)],
    rotation: Math.random() * Math.PI * 2,
    type: snowType
  };
}

/**
 * Updates the physical parameters of a particle
 * @param particle Particle object
 * @param options Particle system settings
 * @param currentWind Current wind force
 */
export function updateParticlePhysics(
  particle: Particle, 
  options: SnowOptions, 
  currentWind: number
): void {
  // Add wind influence
  particle.velocityX += currentWind * 0.01;
  
  // Limit maximum speed on X axis
  if (particle.velocityX > options.speed) {
    particle.velocityX = options.speed;
  } else if (particle.velocityX < -options.speed) {
    particle.velocityX = -options.speed;
  }
  
  // Small oscillations while falling (air current simulation)
  particle.x += Math.sin(particle.y * SNOW_PHYSICS.WAVE_FREQUENCY) * 
                SNOW_PHYSICS.WAVE_AMPLITUDE + 
                particle.velocityX;
  particle.y += particle.velocityY;
  
  // Rotation of snowflakes (only for 'flake' type)
  if (particle.type === 'flake' && particle.rotation !== undefined) {
    particle.rotation += SNOW_PHYSICS.ROTATION_SPEED;
  }
  
  // Decrease lifetime
  particle.lifetime -= SNOW_PHYSICS.LIFETIME_DECREASE_RATE;
}

/**
 * Calculates a new wind value
 * @param currentWind Current wind value
 * @param options Particle system settings
 * @returns New wind value
 */
export function calculateWindChange(
  currentWind: number, 
  options: SnowOptions
): number {
  let wind = currentWind;
  
  // Gradually change wind
  wind += (Math.random() - 0.5) * SNOW_PHYSICS.WIND_CHANGE_RATE;
  
  // Limit maximum wind force
  const maxWind = options.blizzardMode ? 
                  options.wind * SNOW_PHYSICS.WIND_MULTIPLIER_BLIZZARD : 
                  options.wind;
  
  if (wind > maxWind) wind = maxWind;
  if (wind < -maxWind) wind = -maxWind;
  
  return wind;
} 