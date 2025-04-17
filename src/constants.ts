/**
 * Constants used in FrostFX
 * @packageDocumentation
 */

import { SnowflakeType } from './types';

/**
 * Default values for the snow particle system
 */
export const DEFAULT_SNOW_OPTIONS = {
  particleCount: 150,
  gravity: 0.1,
  wind: 0.05,
  lifetime: 8,
  size: 4,
  minSize: 1,
  maxSize: 5,
  speed: 1,
  colors: ['#ffffff', '#f0f0f0', '#e8e8e8'],
  snowflakeTypes: ['circle', 'flake'] as Array<SnowflakeType>,
  blizzardMode: false
};

/**
 * Preset configurations for different types of snow
 */
export const SNOW_PRESETS = {
  light: {
    particleCount: 100,
    gravity: 0.05,
    wind: 0.02,
    lifetime: 10,
    minSize: 1,
    maxSize: 3,
    speed: 0.7,
    colors: ['#ffffff', '#f0f0f0', '#e8e8e8'],
    snowflakeTypes: ['circle'] as Array<SnowflakeType>,
    blizzardMode: false
  },
  regular: {
    particleCount: 150,
    gravity: 0.1,
    wind: 0.05,
    lifetime: 8,
    minSize: 1,
    maxSize: 5,
    speed: 1,
    colors: ['#ffffff', '#f0f0f0', '#e8e8e8'],
    snowflakeTypes: ['circle', 'flake'] as Array<SnowflakeType>,
    blizzardMode: false
  },
  blizzard: {
    particleCount: 300,
    gravity: 0.15,
    wind: 0.2,
    lifetime: 5,
    minSize: 1,
    maxSize: 4,
    speed: 2,
    colors: ['#ffffff', '#f0f0f0'],
    snowflakeTypes: ['circle', 'flake'] as Array<SnowflakeType>,
    blizzardMode: true
  }
};

/**
 * Constants for snow physics configuration
 */
export const SNOW_PHYSICS = {
  WIND_CHANGE_RATE: 0.02,
  WIND_CHANGE_INTERVAL: 100,
  WIND_MULTIPLIER_BLIZZARD: 2,
  LIFETIME_DECREASE_RATE: 0.02,
  ROTATION_SPEED: 0.01,
  WAVE_AMPLITUDE: 0.1,
  WAVE_FREQUENCY: 0.01
}; 