/**
 * Offsets of PI
 *
 * From my Motus Art channel.
 * @see https://www.instagram.com/p/BjX_hK_HbaP/
 *
 * @ref https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js
 * @ref https://cdn.jsdelivr.net/gh/owenmcateer/canvas-cast/dist/App.js
 * @ref ./pixel-map.js
 */

// Canvas Cast config
const matrix = {
  // Node Serial server
  ip: '',
  // Matrix pixel size
  width: 520,
  height: 520,
  // Matrix brightness 0-255
  brightness: 10,
  // Context type (2d/webgl)
  type: '2d',
  // Custom pixel map (@see ./pixel-map.js)
  customMap: gFxMap(520),
};

// Start WS Matrix
canvasCast.init(matrix);

const cx = Math.round(matrix.width / 2);
const speed = -30;
let showing = 1;
let addNewEntitySpeed = 30;


/**
 * Setup
 */
function setup() {
  createCanvas(matrix.width, matrix.height);
  colorMode(HSB, 360, 100, 100, 1);
  pixelDensity(1);
  frameRate(30);
}


/**
 * Draw tick
 */
function draw() {
  background(0);
  fill('white');
  noStroke();

  // Draw rings
  for (let i = 0; i < min(12, showing); i++) {
    const angle = (i / 12) * PI;
    const offset = i * (PI / 12);
    const radius = sin((frameCount / speed) + offset) * (cx - 10);

    const x = cos(angle) * radius + cx;
    const y = sin(angle) * radius + cx;

    ellipse(x, y, 10);
  }

  // Add more entities
  if (frameCount % addNewEntitySpeed === 0) {
    showing++;
    addNewEntitySpeed -= 2;
  }

  // Cast data
  const p5canvas = document.getElementById('defaultCanvas0');
  canvasCast.cast(p5canvas);
  // Custom pixel map guide
  canvasCast.guide(p5canvas, 5, 'p5js');
}
