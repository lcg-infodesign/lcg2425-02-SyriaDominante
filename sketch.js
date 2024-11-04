function preload() {
  // put preload code here
}

// costanti e variabili
const CRYSTAL_SIZE = 80;
let SIDES;
let PALETTE = [];
const cols = 5; // numero di colonne griglia
const rows = 4; // righe

function setup() {
  createCanvas(windowWidth, windowHeight);

  SIDES = floor(random(5, 10)); // numero casuale di lati

  PALETTE = [
    color(210, 90, 195), // rosa
    color(0, 175, 145),  // verde
    color(0, 100, 225),  // blu
    color(140, 75, 20)   // marrone
  ];

  // modalità
  frameRate(1);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background("#f1e3ce"); 

  // mettere i glifi in griglia

  const cellWidth = width / cols;
  const cellHeight = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // Calcola il centro della cella
      const x = i * cellWidth + cellWidth / 2;
      const y = j * cellHeight + cellHeight / 2;
      testLines(x, y);
    }
  }
}

// disegno glifi di partenza
function testLines(x, y) {
  const rando = random(1);
  let numShapes;
  if (rando > 0.5) {
    numShapes = SIDES;
  } else {
    numShapes = SIDES * floor(random(5, 10));
  }

  const rando2 = floor(random(0, PALETTE.length));
  const strokeColor = PALETTE[rando2];

  noFill();
  stroke(strokeColor);

  push();
  translate(x, y);
  ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);

  const angle = 360 / numShapes;
  for (let i = 0; i < numShapes; i++) {
    line(0, 0, 0, CRYSTAL_SIZE / 2);
    rotate(angle);
  }

  // quadrato inscritto con una probabilità casuale
  if (random(1) > 0.3) { // probabilità + del 50%
    const squareSize = CRYSTAL_SIZE * 0.7; // Dimensione del quadrato inscritto nel cerchio
    push();
    rotate(random(360)); // Ruota il quadrato di un angolo casuale
    square(0, 0, squareSize);
    pop();
  }

  // triangolo inscritto con una probabilità casuale
  if (random(1) > 0.3) { // probabilità di apparizione del triangolo --> + del 50%(0.5)
    const triangleSize = CRYSTAL_SIZE * 0.7; // per avere il triangolo inscritto nel cerchio
    push();
    rotate(random(360)); // ruota il triangolo di un angolo casuale
    beginShape();
    for (let i = 0; i < 3; i++) {
      const angle = map(i, 0, 3, 0, 360);
      const x = cos(angle) * triangleSize / 2;
      const y = sin(angle) * triangleSize / 2;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  pop();
}
