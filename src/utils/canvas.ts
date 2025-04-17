/**
 * Utilities for working with Canvas
 * @packageDocumentation
 */

import { Particle, SnowflakeType } from '../types';

/**
 * Draws a snow particle as a circle
 * @param ctx Canvas context
 * @param particle Particle object
 * @param opacity Particle opacity (0-1)
 */
export function drawCircleParticle(
  ctx: CanvasRenderingContext2D, 
  particle: Particle, 
  opacity: number
): void {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fillStyle = `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
  ctx.fill();
}

/**
 * Draws a snow particle as a snowflake
 * @param ctx Canvas context
 * @param particle Particle object
 * @param opacity Particle opacity (0-1)
 * @param rays Number of snowflake rays (default 6)
 */
export function drawFlakeParticle(
  ctx: CanvasRenderingContext2D, 
  particle: Particle, 
  opacity: number,
  rays: number = 6
): void {
  ctx.save();
  ctx.translate(particle.x, particle.y);
  
  if (particle.rotation !== undefined) {
    ctx.rotate(particle.rotation);
  }
  
  ctx.beginPath();
  ctx.fillStyle = `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
  
  // Draw snowflake (6 rays by default)
  const angleStep = Math.PI * 2 / rays;
  for (let i = 0; i < rays; i++) {
    ctx.rotate(angleStep);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, particle.size * 2);
    
    // Add small branches
    ctx.save();
    ctx.translate(0, particle.size * 0.7);
    ctx.rotate(Math.PI / 4);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, particle.size * 0.5);
    ctx.restore();
    
    ctx.save();
    ctx.translate(0, particle.size * 1.3);
    ctx.rotate(-Math.PI / 4);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, particle.size * 0.5);
    ctx.restore();
  }
  
  ctx.fill();
  ctx.restore();
}

/**
 * Draws a snow particle based on its type
 * @param ctx Canvas context
 * @param particle Particle object
 * @param opacity Particle opacity (0-1)
 */
export function drawParticle(
  ctx: CanvasRenderingContext2D, 
  particle: Particle, 
  opacity: number
): void {
  switch (particle.type) {
    case 'circle':
      drawCircleParticle(ctx, particle, opacity);
      break;
    case 'flake':
      drawFlakeParticle(ctx, particle, opacity);
      break;
    default:
      // For safety, if type is unknown
      drawCircleParticle(ctx, particle, opacity);
  }
}

/**
 * Checks if a particle is outside the visible area
 * @param particle Particle object
 * @param width Canvas width
 * @param height Canvas height
 * @param margin Margin for checking (default 10 pixels)
 * @returns Boolean value - whether the particle is out of bounds
 */
export function isParticleOutOfBounds(
  particle: Particle, 
  width: number, 
  height: number, 
  margin: number = 10
): boolean {
  return (
    particle.y > height + margin || 
    particle.x < -margin || 
    particle.x > width + margin
  );
} 