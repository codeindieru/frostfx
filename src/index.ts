/**
 * FrostFX - Library for creating snow effects
 * @packageDocumentation
 */

// Export main types
export * from './types';

// Export constants and presets
export * from './constants';

// Export main particle system class
export { SnowParticleSystem as ParticleSystem } from './systems/SnowParticleSystem';

// Backward compatibility with the old name
export { SnowParticleSystem } from './systems/SnowParticleSystem';