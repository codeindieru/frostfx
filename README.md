# FrostFX

A lightweight and flexible library for creating snow effects in HTML5 and Canvas.

## Features

- Flexible configuration of snow effects
- Various snowflake types (circles, flakes)
- Physical effects: wind, gravity, rotation
- Ready-to-use presets for different types of snowfall
- Blizzard mode
- Optimized performance
- Written in TypeScript with full typing

## Installation

```bash
npm install frostfx
```

## Quick Start

```typescript
import { ParticleSystem } from 'frostfx';

// Get canvas element
const canvas = document.getElementById('snow-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

// Configure canvas to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create particle system
const snowSystem = new ParticleSystem(ctx);

// Start the snowfall
snowSystem.start();

// When window size changes
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
```

## Presets

The library contains several ready-to-use presets:

```typescript
// Light snow
snowSystem.usePreset('light');

// Regular snow
snowSystem.usePreset('regular');

// Blizzard
snowSystem.usePreset('blizzard');
```

## Configuration

You can fine-tune the snow parameters:

```typescript
snowSystem.setOptions({
  // Number of particles
  particleCount: 200,
  
  // Gravity force
  gravity: 0.1,
  
  // Wind force
  wind: 0.05,
  
  // Particle lifetime
  lifetime: 8,
  
  // Snowflake size
  size: 4,
  minSize: 1,
  maxSize: 5,
  
  // Movement speed
  speed: 1,
  
  // Snowflake colors
  colors: ['#ffffff', '#f0f0f0', '#e8e8e8'],
  
  // Snowflake types ('circle' - circles, 'flake' - snowflakes)
  snowflakeTypes: ['circle', 'flake'],
  
  // Blizzard mode
  blizzardMode: false
});
```

## Control

```typescript
// Start
snowSystem.start();

// Stop (clears all particles)
snowSystem.stop();

// Reset (clears particles but doesn't stop animation)
snowSystem.reset();

// Enable blizzard mode
snowSystem.setBlizzardMode(true);

// Get number of active particles
const count = snowSystem.getParticleCount();

// Check if system is running
const isActive = snowSystem.isRunning();
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FrostFX Demo</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #1a2639;
        }
        #snow-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .controls {
            position: absolute;
            top: 20px;
            left: 20px;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 15px;
            border-radius: 8px;
            color: white;
            z-index: 100;
        }
        button {
            margin: 5px;
            padding: 8px 15px;
            background-color: #2c4870;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <canvas id="snow-canvas"></canvas>
    
    <div class="controls">
        <button onclick="setLightSnow()">Light Snow</button>
        <button onclick="setRegularSnow()">Regular Snow</button>
        <button onclick="setBlizzard()">Blizzard</button>
        <button onclick="stopSnow()">Stop</button>
    </div>

    <script type="module">
        import { ParticleSystem } from './dist/index.js';
        
        let snowSystem;
        
        // Initialization after DOM loading
        window.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('snow-canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const ctx = canvas.getContext('2d');
            snowSystem = new ParticleSystem(ctx);
            
            // Add functions to global scope
            window.setLightSnow = function() {
                snowSystem.usePreset('light');
                snowSystem.start();
            };
            
            window.setRegularSnow = function() {
                snowSystem.usePreset('regular');
                snowSystem.start();
            };
            
            window.setBlizzard = function() {
                snowSystem.usePreset('blizzard');
                snowSystem.start();
            };
            
            window.stopSnow = function() {
                snowSystem.stop();
            };
            
            // Window resize
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
            
            // Start regular snow by default
            snowSystem.usePreset('regular');
            snowSystem.start();
        });
    </script>
</body>
</html>
```

## License

MIT
