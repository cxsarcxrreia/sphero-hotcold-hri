// sphero_behaviors.js
// Sphero Hot & Cold HRI Study - Behavior Library
// Works in Sphero Edu JavaScript (Text) mode

// ---------------
// LIGHT-ONLY MODES
// ---------------
// NOTE: These functions DO NOT move the robot. They only change LEDs.
// For Light-only condition, you use joystick/Drive for heeling and
// call these functions as needed during testing.

async function COLD_L() {
  // Blue, slow pulse (~2s period)
  let color = { r: 0, g: 0, b: 255 };
  setMainLed(color);
  for (let i = 0; i < 4; i++) {
    setMainLed(color);
    await delay(1);              // on 1s
    setMainLed({ r: 0, g: 0, b: 0 }); // off 1s
    await delay(1);
  }
  setMainLed(color);             // leave it on
}

async function WARM_L() {
  // Orange, medium pulse (~0.6s period)
  let color = { r: 255, g: 140, b: 0 };
  setMainLed(color);
  for (let i = 0; i < 6; i++) {
    setMainLed(color);
    await delay(0.3);
    setMainLed({ r: 0, g: 0, b: 0 });
    await delay(0.3);
  }
  setMainLed(color);
}

async function HOT_L() {
  // Red, fast strobe (~0.2s period)
  let color = { r: 255, g: 0, b: 0 };
  setMainLed(color);
  for (let i = 0; i < 10; i++) {
    setMainLed(color);
    await delay(0.1);
    setMainLed({ r: 0, g: 0, b: 0 });
    await delay(0.1);
  }
  setMainLed(color);
}

async function FOUND_L() {
  // Rainbow-ish celebration, ending in green
  for (let i = 0; i < 3; i++) {
    setMainLed({ r: 255, g: 0, b: 0 });   // red
    await delay(0.2);
    setMainLed({ r: 0, g: 255, b: 0 });   // green
    await delay(0.2);
    setMainLed({ r: 0, g: 0, b: 255 });   // blue
    await delay(0.2);
    setMainLed({ r: 255, g: 255, b: 0 }); // yellow
    await delay(0.2);
  }
  setMainLed({ r: 0, g: 255, b: 0 });     // end on green
}

// ---------------
// MOVEMENT-ONLY MODES
// ---------------
// NOTE: These functions move the robot but DO NOT change LED color.
// At the top of your program (startProgram), set LED to neutral once.

// Helper: set LED to neutral (call once in startProgram for movement-only)
function setNeutralLed() {
  setMainLed({ r: 10, g: 10, b: 10 }); // very dim white/grey
}

async function COLD_M() {
  // Sluggish low-energy wobble, small displacement
  // Small forward/back motions
  for (let i = 0; i < 2; i++) {
    await roll(0, 40, 0.2);   // forward slowly
    await roll(180, 40, 0.2); // back
    await delay(1);           // pause
  }
  await roll(0, 0, 0); // ensure stop
}

async function WARM_M() {
  // Perky spin in place
  // 3 quick segments of a spin
  await roll(0, 0, 0); // stop before spin
  await roll(0, 80, 0.1);
  await roll(120, 80, 0.1);
  await roll(240, 80, 0.1);
  await roll(0, 0, 0); // stop
}

async function HOT_M() {
  // High-frequency shake: quick back-and-forth motions
  for (let i = 0; i < 6; i++) {
    await roll(0, 100, 0.05);
    await roll(180, 100, 0.05);
  }
  await roll(0, 0, 0); // stop
}

async function FOUND_M() {
  // Happy dance: small square path
  for (let i = 0; i < 2; i++) {
    await roll(0, 80, 0.3);    // forward
    await roll(90, 80, 0.3);   // right
    await roll(180, 80, 0.3);  // backwards
    await roll(270, 80, 0.3);  // left
  }
  await roll(0, 0, 0); // stop
}

// ---------------
// MULTI-MODAL MODES
// ---------------
// Combines the above into single cues: light + movement.
// We run the light pattern and movement pattern in sequence.
// (Sphero Edu doesn't support true parallel promises nicely, so
// we keep them short and sequential.)

async function COLD_MULTI() {
  let color = { r: 0, g: 0, b: 255 }; // blue
  setMainLed(color);
  // Short pulse + sluggish wobble
  await roll(0, 40, 0.2);
  await roll(180, 40, 0.2);
  await delay(0.5);
  await roll(0, 0, 0);
}

async function WARM_MULTI() {
  let color = { r: 255, g: 140, b: 0 }; // orange
  setMainLed(color);
  // Perky spin + brief pause
  await roll(0, 80, 0.1);
  await roll(120, 80, 0.1);
  await roll(240, 80, 0.1);
  await delay(0.4);
  await roll(0, 0, 0);
}

async function HOT_MULTI() {
  let color = { r: 255, g: 0, b: 0 }; // red
  setMainLed(color);
  // Intense shake
  for (let i = 0; i < 6; i++) {
    await roll(0, 100, 0.05);
    await roll(180, 100, 0.05);
  }
  await roll(0, 0, 0);
}

async function FOUND_MULTI() {
  // Rainbow + happy dance
  for (let i = 0; i < 3; i++) {
    setMainLed({ r: 255, g: 0, b: 0 });
    await delay(0.2);
    setMainLed({ r: 0, g: 255, b: 0 });
    await delay(0.2);
    setMainLed({ r: 0, g: 0, b: 255 });
    await delay(0.2);
  }
  // End in green while dancing
  setMainLed({ r: 0, g: 255, b: 0 });
  for (let i = 0; i < 2; i++) {
    await roll(0, 80, 0.3);
    await roll(90, 80, 0.3);
    await roll(180, 80, 0.3);
    await roll(270, 80, 0.3);
  }
  await roll(0, 0, 0);
}

// ---------------
// ENTRYPOINT
// ---------------
// Sphero Edu calls startProgram() when you hit Start.
// For testing, uncomment ONE behavior at a time.
// In the actual experiment, you'll probably use Block-mode "soundboards"
// or separate programs for each condition and macro.

async function startProgram() {
  // EXAMPLES (for testing only):
  // await COLD_L();
  // await WARM_L();
  // await HOT_L();
  // await FOUND_L();

  // await COLD_M();
  // await WARM_M();
  // await HOT_M();
  // await FOUND_M();

  // await COLD_MULTI();
  // await WARM_MULTI();
  // await HOT_MULTI();
  // await FOUND_MULTI();
  
  // For Movement-only program, you might start with:
  // setNeutralLed();
  // then call one movement behavior.
}
