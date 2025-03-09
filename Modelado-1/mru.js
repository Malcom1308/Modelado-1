let v0_mps = 0; 
let angle = 0; 
let scaleFactor = 10; // Factor de conversión de metros a píxeles (1 píxel = 10 metros)

let t = 0; 
let x = 0;
let y = 0;
let startX = 50;
let startY = 50;

const g = 9.81; 

function setup() {
  let canvas = createCanvas(1000, 500);
  canvas.parent('simulation');
  angleMode(DEGREES);
  startY = height - 50; 
  x = startX;
  y = startY;
  noLoop(); 
}

function draw() {
  background(220);

  if (t === 0) {
    noLoop();
    setTimeout(() => {
      loop();
    }, 800); 
  }

  let v0x = v0_mps * cos(angle); 
  let v0y = v0_mps * sin(angle); 

  let x_m = v0x * t;
  let y_m = v0y * t - 0.5 * g * t * t; 

  x = startX + x_m * scaleFactor;
  y = startY - y_m * scaleFactor; 

  fill(255, 0, 0);
  ellipse(x, y, 10, 10);

  fill(0); 
  textSize(16); 
  text(`t: ${t.toFixed(4)}, x: ${x_m.toFixed(2)}, y: ${y_m.toFixed(2)}`, 10, 20); 

  // Imprimir en consola con 4 decimales
  console.log(`t: ${t.toFixed(4)}, x: ${x_m.toFixed(4)}, y: ${y_m.toFixed(4)}`);

  t += 1 / 60; 

  if (y > height - 50 || x >= width - 50 || x <= 0 || y <= 0) {
    noLoop();
    setTimeout(() => {
      text("Click to Restart", width / 3 + 40, height / 3); 
    }, 200);
  }
}

function mousePressed() {
  t = 0;
  x = startX;
  y = startY;
  loop();
}

function startSimulation() {
  const v0Input = document.getElementById('v0');
  const angleInput = document.getElementById('angle');
  const v0Error = document.getElementById('v0-error');
  const angleError = document.getElementById('angle-error');

  let valid = true;

  if (v0Input.value === '' || v0Input.value < 0 || v0Input.value > 100) {
    v0Error.textContent = 'Por favor, ingrese una velocidad inicial válida (entre 0 y 100).';
    v0Error.style.display = 'block';
    valid = false;
  } else {
    v0Error.style.display = 'none';
  }

  if (angleInput.value === '' || angleInput.value < 0 || angleInput.value > 90) {
    angleError.textContent = 'Por favor, ingrese un ángulo válido (entre 0 y 90 grados).';
    angleError.style.display = 'block';
    valid = false;
  } else {
    angleError.style.display = 'none';
  }

  if (valid) {
    v0_mps = parseFloat(v0Input.value);
    angle = parseFloat(angleInput.value);
    t = 0;
    x = startX;
    y = startY;
    loop(); 
  }
}
