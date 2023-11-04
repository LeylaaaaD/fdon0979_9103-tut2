let smallerGrass = [];
let stems = [];
let leave = [];
let smallerleave = [];
let dots = [];
let song;
let fft;
let lerpAmount;
let amplitude;
let redDotStarttime = 140; 
let redDotEndtime = 154; 

function preload() {
  song = loadSound("audio/ray-chen-waltzing-matilda.mp3");
}

function setup() {
  createCanvas(300, 600);
  background(242,169,4); 
  // Create a new FFT analysis object
  fft = new p5.FFT(0.8, 512);
  // Add the song into the FFT's input
  song.connect(fft);

  //Draw the pink and black dots
  for (let i = 0; i < 700; i++) {
    let x = random(width);
    let y = random(height);
    let col = color(random(1) > 0.5 ? color(214, 139, 168) : color(0));
    dots.push(new Dot(x, y, col));
  }

  //Setting attributes for the stem objects that represent huge leaves' stems
  stems = [
    new stem(0, 140, 80, 140, 150, 150, 0, 0, 0),
    new stem(0, 300, 25, 310, 50, 335, 0, 0, 0),
    new stem(160, 450, 220, 380, 240, 340, 0, 0, 0)
  ];

  //Setting attributes for the Leave objects that represent huge leaves' blade 
  leave = [
    new Leave(30, 140, 45, 120, 75, 105, 19, 18, 19, 1, 4, 6, color(0, 0, 0)),
    new Leave(20, 138, 35, 145, 50, 155, 19, 18, 19, 1, 4, 6, color(0, 0, 0)),
  ];

  //Setting attributes for the Smallerleave objects that represent huge leaves' blade
  smallerLeave = [
    new Smallerleave(35, 140, 65, 120, 80, 110, 27, 20, 19, 2, 5, 6, color(209, 79, 127), null, null, null, 73, 192),
    new Smallerleave(25, 140, 45, 140, 80, 160, 27, 21, 19, 2, 5, 6, color(209, 79, 127), null, null, null, 73, 192),
    new Smallerleave(8, 300, 10, 295, 20, 285, 6, 10, 12, 2, 5, 6, color(209, 79, 127), null, null, null, 76, 192),
    new Smallerleave(8, 300, 3, 312, 10, 340, 7, 10, 13, 5, 6, 6, color(209, 79, 127), null, null, null, 76, 192),
    new Smallerleave(0, 300, 5, 295, 12, 285, 1, 2, 13, 1, 4, 10, color(0, 0, 0), null, null, null, 76, 192),
    new Smallerleave(5, 300, 0, 310, 6, 330, 1, 10, 11, 1, 7, 8, color(0, 0, 0), null, null, null, 76, 192),
    new Smallerleave(185, 420, 175, 390, 190, 360, 9, 13, 10, -12, -14, -9, color(209, 79, 127), null, null, null, 80, 192),
    new Smallerleave(180, 430, 210, 420, 250, 385, 9, 7, 4, -12, -15, -15, color(209, 79, 127), null, null, null, 80, 192),
    new Smallerleave(180, 430, 180, 400, 190, 365, 9, 10, 12, -15, -14, -10, color(0, 0, 0), null, null, null, 80, 192),
    new Smallerleave(185, 420, 220, 410, 250, 385, 10, 7, 4, -14, -14, -13, color(0, 0, 0), null, null, null, 80, 192),
  ];

  //Setting attributes for the Small objects that represent small flower looked grass
  smallerGrass = [
    new Small(0, 0, color(0, 0, 0), -1, 12, 3, 80, 5),
    new Small(0, 180, color(0, 0, 0), -1, 7, 3, 25, 5),
    new Small(5, 230, color(0, 0, 0), -1, 8, 3, 40, 10),
    new Small(5, 400, color(0, 0, 0), -1, 8, 3, 40, 10),
    new Small(10, 400, color(209, 79, 127), -1, 7, 3, 40, 10),
    new Small(10, 230, color(209, 79, 127), -1, 7, 3, 40, 10),
    new Small(95, 200, color(0, 0, 0), 2, 8, 3, 25, 5),
    new Small(90, 205, color(255, 0, 0), 2, 8, 3, 25, 5),
    new Small(192, 153, color(255, 0, 0)),
    new Small(205, 150, color(255, 0, 0)),
    new Small(192, 153, color(255, 0, 0)),
    new Small(230, 220, color(220, 79, 180), 2, 7),
    new Small(225, 220, color(0, 0, 0), 2, 7),
    new Small(270, 180, color(0, 0, 0), 1, 6),
    new Small(290, 240, color(0, 0, 0)),
    new Small(295, 240, color(209, 79, 127)),
    new Small(300, 240, color(255, 0, 0)),
    new Small(290, 290, color(0, 0, 0)),
    new Small(295, 290, color(209, 79, 127)),
    new Small(300, 290, color(255, 0, 0)),
    new Small(295, 340, color(209, 79, 127)),
    new Small(300, 340, color(255, 0, 0)),
    new Small(300, 440, color(0, 0, 0), 1, 6),
    new Small(290, 440, color(0, 0, 0), 1, 6),
    new Small(300, 500, color(0, 0, 0), 1, 5),
    new Small(300, 540, color(0, 0, 0), 1, 5),
    new Small(270, 580, color(0, 0, 0), 1, 5),
    new Small(205, 600, color(255, 0, 0), 2, 14, 3, 25, 5),
    new Small(80, 350, color(255, 0, 0), -1.5, 10, 3, 20, 10),
    new Small(120, 400, color(220, 79, 180), 2, 16, 3, 30, 20),
    new Small(260, 430, color(107, 33, 33), 1, 8),
    new Small(220, 490, color(0, 0, 0), -1, 6)
  ];
}

function draw() {
  background(242,169,4);

 // Request fresh data from the FFT analysis
  let spectrum = fft.analyze();
  lerpAmount = 0.5;

// Iterate over all the 'dots' objects 
  for (let i = 0; i < dots.length; i++) {
    let amp = spectrum[i];
    dots[i].display(amp);
  }

  // Get the energy of the bass and treble from the FFT
  let bass = fft.getEnergy("bass"); 
  let treble = fft.getEnergy("treble"); 
  // Set the frame rate based on the bass level
  let speed = map(bass, 0, 255, 2, 24);
  frameRate(speed);
  // Mapping angles with bass amplitude
  let angleOffsetBass = map(bass, 0, 255, -HALF_PI / 4 , -HALF_PI * 1.3);
  let angleOffsetBass1 = map(bass, 0, 255,  -HALF_PI / 4, -HALF_PI * 1.2,);
  let angleOffsetBass2 = map(bass, 0, 255, HALF_PI * 1.2, TWO_PI);

  // Mapping the bass energy level to a range between 0 and 30
  let amplitude = map(bass, 0, 255, 0, 30);
  let amplitude1 = map(bass, 0, 255, 0, 30);

  let waveform = fft.waveform();
  // Defining a threshold for when the bass is considered to be "high"
  let bassThreshold = 180; 
  Kaleidoscope(waveform, bass, bassThreshold);

  //Calling functions to draw three huge grass 
  grass(angleOffsetBass);
  grass1(angleOffsetBass1);
  grass2(angleOffsetBass2);
  FlippedGrass(angleOffsetBass);
  FlippedGrass1(angleOffsetBass1);

  //Calling functions to draw the weeds at the botton left corner and top right edge
  StraightWeeds();
  CurvedWeeds();

  //Draw the branch of the first huge grass
  stroke(79, 21, 27);
  line(190, 80, 220, 220);

  //Draw the first roots of the huge grass
  noStroke();
  fill(183, 90, 125);  
  ellipse(190, 90, 40, 30);  

  //Draw the second roots of the huge grass
  fill(196, 85, 135);  
  ellipse(150, 320, 40, 35);

  fill(105, 46, 76);  
  ellipse(150, 320, 35, 30);
  
  fill(252, 105, 155); 
  ellipse(150, 320, 30, 25);  
  
  fill(82, 25, 50); 
  ellipse(150, 320, 25, 20);

  //Draw the third roots of the huge grass
  fill(229, 82, 139);  
  ellipse(115, 455, 45, 30);  
  
  for (let i = 0; i < smallerGrass.length; i++) {
    let grass = smallerGrass[i];
    if (i % 2 === 0) { 
      grass.update(treble);
    } else {
      grass.update(bass);
    }
      grass.display();
  }

  for (let stem of stems) {
    stem.display();
  }
  
  for (let sLeaf of smallerLeave) {
    sLeaf.update(amplitude1);
    sLeaf.display();
  }

  for (let leaf of leave) {
    leaf.update(amplitude);
    leaf.display();
  }
}

function Kaleidoscope(waveform, bass, bassThreshold) {
  // Check if the bass level exceeds the threshold
  if (bass > bassThreshold) {
    push();
    translate(width / 2, height / 2); 
    let density = 2;
    let numDots = int(waveform.length * density);

    for (let i = 0; i < numDots; i++) {
      let index = int(random(waveform.length))
      let angle = map(i, 0, waveform.length, 0, TWO_PI);
      let amp = waveform[index];
      let r = map(amp, -1, 1, 0, 250); 
      let x = r * cos(angle);
      let y = r * sin(angle);

      fill(255, 0, 0); 
      noStroke(); 
      ellipse(x, y, 4, 4); 
    }
  }
  pop();
}

// Draw the first huge grass
function grass(angleOffsetBass) {
   noFill();
   strokeWeight(4);
 
  let ellipseCenterX = 190, ellipseCenterY = 80;
  let numCurves = 10; 
  let lineLength = 120; 
  let curveAmount = 40; 
  
  //Use a for loop to give some randomness to color setting of the curves
  for (let i = 0; i < numCurves; i++) {
    if (random(1) > 0.2) {
      stroke(209, 79, 127);  
     } else {
       stroke(179, 70, 105);      
     }

     let angle = map(i, 2, numCurves, 0, angleOffsetBass);  
     let x1 = ellipseCenterX;
     let y1 = ellipseCenterY;
     let x2 = x1 + curveAmount * sin(angle);
     let y2 = y1 + curveAmount * cos(angle);
     let x3 = x1 + (lineLength + curveAmount) * cos(angle);
     let y3 = y1 + (lineLength - curveAmount) * sin(angle);
     let x4 = x1 + lineLength * cos(angle);
     let y4 = y1 + lineLength * sin(angle);
 
     bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  }
}

//Flip the first half of the huge grass to form the other half
function FlippedGrass(angleOffsetBass) {
  push();  
  translate(width / 2, height / 2.2);
  rotate(-HALF_PI);
  translate(-height / 75, -width / 5.8);
  grass(angleOffsetBass); 
  pop();  
}

//Similarlly to he first huge grass, draw the second huge grass
function grass1(angleOffsetBass1) {
  noFill();
  strokeWeight(4);

  let ellipseCenterX = 140, ellipseCenterY = 320;
  let numCurves = 9; 
  let lineLength = 100; 
  let curveAmount = 50; 
  let steps = 8;
  let dotSize = 5;

  //Use a for loop to give some randomness to color setting of the curves
  for (let i = 0; i < numCurves; i++) {
    if (random(1) > 0.5) {
      stroke(209, 79, 127);  
     } else {
       stroke(0);      
     }

    let angle = map(i, 1, numCurves, 0, angleOffsetBass1);  
     
    let x1 = ellipseCenterX;
    let y1 = ellipseCenterY;
    let x2 = x1 + (curveAmount * 0.5) * cos(angle);  
    let y2 = y1 + (lineLength * 0.5) * sin(angle);  
    let x3 = x1 + (lineLength * 0.75) * cos(angle); 
    let y3 = y1 + (curveAmount * 0.75) * sin(angle); 
    let x4 = x1 + lineLength  * cos(angle);
    let y4 = y1 + lineLength * sin(angle);
 
    bezier(x1, y1, x2, y2, x3, y3, x4, y4);  

  // Add the red dots align the grass line
    noStroke();  
    fill(255, 0, 0)
    for (let j = 0; j <= steps; j++) {
      let t = j / steps;
      let px = bezierPoint(x1, x2, x3, x4, t);
      let py = bezierPoint(y1, y2, y3, y4, t);

      let dotsAngle = atan2(py - y1, px - x1) + HALF_PI; 
      let offsetDistance = random(2, 4); 
      let offsetX = offsetDistance * cos(dotsAngle);
      let offsetY = offsetDistance * sin(dotsAngle);

      px += offsetX;
      py += offsetY;
      ellipse(px, py, dotSize, dotSize);
    }
  }
}

// Flip the secound huge grass as well
function FlippedGrass1(angleOffsetBass1) {
  push();  
  translate(width / 15, height / 3);
  rotate(-HALF_PI);
  translate(-height / 2.2, -width / 1.7);
  grass1(angleOffsetBass1); 
  pop();  
}

// Draw the third huge grass
function grass2(angleOffsetBass2) {
  noFill();
  strokeWeight(4);

    let ellipseCenterX = 115, ellipseCenterY = 460;
    let numCurves = 20; 
    let lineLength = 100; 
    let curveAmount = 40; 
 
   //Use a for loop to give some randomness to color setting of the curves
   for (let i = 0; i < numCurves; i++) {
    if (random(1) > 0.3) {
      stroke(209, 79, 127);  
     } else {
       stroke(0);      
     }

     let angle = map(i, 2, numCurves, 0, angleOffsetBass2);  
     
     let x1 = ellipseCenterX;
     let y1 = ellipseCenterY;
     let x2 = x1 + curveAmount * cos(angle);
     let y2 = y1 - curveAmount * sin(angle);
     let x3 = x1 + (lineLength + curveAmount) * cos(angle);
     let y3 = y1 + (lineLength - curveAmount) * sin(angle);
     let x4 = x1 + lineLength * cos(angle);
     let y4 = y1 + lineLength * sin(angle);
 
     bezier(x1, y1, x2, y2, x3, y3, x4, y4);
    }
}

// Function of the straight weeds
function StraightWeeds() {
  let numWeeds = 30;
  let weedSpacing = 10;
  let weedWidth;
  let minWeedHeight = 20;
  let maxWeedHeight = 50;

  // Use a for loop to give some randomness to color setting of the weeds
  for (let i = 0; i <= numWeeds; i++) {
    weedWidth = random(2,4);
    if (random(1) > 0.4) {
      stroke(209, 79, 127);
    } else {
      stroke(0);
    }

    //Setting the stroke attribute using the pre-set values and locate the weeds
    strokeWeight(weedWidth);
    let x = i * weedSpacing;
    x = constrain(x, 0, 300);
    let weedHeight = random(minWeedHeight, maxWeedHeight);
    line(x, height, x, height - weedHeight);

    let yRight = i * weedSpacing;
    yRight = constrain(yRight, 115, 220);
    let rightWeedHeight = random(15, 25);
    line(width, yRight, width - rightWeedHeight, yRight);
  }

  // Drawing straight weeds on the left 
  for (let i = 0; i <= 15; i++) {
    let yLeft = map(i, 0, 9, 460, 550); 
    let leftWeedWidth = random(10, 15);
    
    if (random(1) > 0.5) {
      stroke(125, 30, 24); 
    } else {
      stroke(0);
    }
    line(0, yLeft, leftWeedWidth, yLeft);
  }
}

function CurvedWeeds() {
  let numWeeds = 9;
  let weedSpacing = 300 / numWeeds;
  let weedWidth = 3;
  let minWeedHeight = 5;
  let maxWeedHeight = 60;
  let controlOffset = 20;

  //Use a for loop to give some randomness to color setting of the curves
  for (let i = 0; i <= numWeeds; i++) {
    if (random(1) > 0.2) {
      stroke(179, 70, 105);
    } else {
      stroke(0);
    }
    strokeWeight(weedWidth);

    // Drawing curved weeds on the bottom
    let x = i * weedSpacing;
    x = constrain(x, 0, 300);
    let weedHeight = random(minWeedHeight, maxWeedHeight);
    let ctrlPt1X = constrain(x + random(-controlOffset, controlOffset), 0, width);
    let ctrlPt2X = constrain(x + random(-controlOffset, controlOffset), 0, width);
    bezier(x, height, ctrlPt1X, height - weedHeight / 3, ctrlPt2X, height - 2 * weedHeight / 3, x, height - weedHeight);

    // Drawing curved weeds on the left
    let y1 = 450 + i * weedSpacing / 2 ;
    y1 = constrain(y1, 450, height - 20);
    weedHeight = random(20, 30);
    let ctrlPtY1 = constrain(y1 + random(-controlOffset, controlOffset), 0, height);
    let ctrlPtY2 = constrain(y1 + random(-controlOffset, controlOffset), 0, height);
    bezier(0, y1, weedHeight / 3, ctrlPtY1, 2 * weedHeight / 3, ctrlPtY2, weedHeight, y1);

    // Drawing curved weeds on the right
    let y2 = 100 + i * weedSpacing / 2;
    y2 = constrain(y2, 115, 200);
    weedHeight = random(15, 20);
    let ctrlPtY3 = constrain(y2 + random(-controlOffset, controlOffset), 0, height);
    let ctrlPtY4 = constrain(y2 + random(-controlOffset, controlOffset), 0, height);
    bezier(width, y2, width - weedHeight / 3, ctrlPtY3, width - 2 * weedHeight / 3, ctrlPtY4, width - weedHeight, y2);
  }
}

class Dot {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.currentSize = 5;
    this.col = col;
  }

  display(amp) {
    let targetSize = map(amp, 0, 255, 5, 15);
    this.currentSize = lerp(this.currentSize, targetSize, lerpAmount);
    fill(this.col);
    noStroke();
    ellipse(this.x, this.y, this.currentSize);
  }
}

class stem {
  //Using constructor to set the parameters.
  //(SX1, SY1), (SX2, SY2) and (SX3, SY3) represents the coordinates that will be used in curveVertex() method
  //sColor stands for stem color which will be passed to stroke color
  //tX1, tY1 and sAngle are planed for translate coordinates and rotation angle
  constructor(SX1, SY1, SX2, SY2, SX3, SY3, sColor, tX1, tY1, sAngle){
    this.SX1 = SX1;
    this.SY1 = SY1;
    this.SX2 = SX2;
    this.SY2 = SY2;
    this.SX3 = SX3;
    this.SY3 = SY3;
    this.sColor = sColor;
    this.tX1 = tX1;
    this.tY1 = tY1;
    this.sAngle = sAngle
  }
  display(){
    //Using curveVertex() method for the leave blade
    push()
    translate(this.tX1, this.tY1)
    fill(0);
    stroke(this.sColor);
    strokeWeight(5)
    beginShape();
    curveVertex(this.SX1,this.SY1);
    curveVertex(this.SX1,this.SY1);
    curveVertex(this.SX2,this.SY2);
    curveVertex(this.SX3,this.SY3);
    curveVertex(this.SX3,this.SY3);
    endShape();
    pop()
  }
}

class Small {
  //Using constructor to set the parameters.
  constructor(x, y, color, angleMultiplier = 1, numCurves = 5, strokeW = 3, lineLength = 20, circleSize = 5) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.circleRadius = circleSize / 2;
    this.numCurves = numCurves;
    this.curveWidth = 2.5;
    this.strokeW = strokeW;
    this.lineLength = lineLength;
    this.angleMultiplier = angleMultiplier;
    this.angle = 0;
    this.startRotationTime = 103;
    this.changeRotationTime = 139;
    this.changeRotationTime1 = 160;
    this.endRotationTime = 192;
  }

  update (amp) {
    if (song.currentTime() > this.endRotationTime) {
      this.angle = 0;
    } else if (song.currentTime() > this.changeRotationTime) {
      this.angle += map(amp, 0, 255, 0, HALF_PI);
    } else if (song.currentTime() > this.startRotationTime) {
      this.angle += map(amp, 0, 255, 0, PI / 10);
    }
  }

  display() {
    push();
    rotate(this.angle); 

    //set color and draw the center ellipse
    fill(this.color);
    ellipse(this.x, this.y, this.circleRadius * 2);

    stroke(this.color);
    strokeWeight(this.strokeW);
    noFill();

    let rotationOffset = PI / 2;

    for (let i = 0; i < this.numCurves; i++) {
      //Calculate the start and end angles for the curve.
      let startAngle = this.angleMultiplier * PI / this.numCurves * i + rotationOffset; 
      let endAngle = startAngle + HALF_PI / this.numCurves;
      let curveRadius = this.circleRadius + this.lineLength; 
      let startX = this.x + this.circleRadius * cos(startAngle);
      let startY = this.y + this.circleRadius * sin(startAngle);

      beginShape();
      //Using a series of vertices to draw curves.
      vertex(startX, startY);
      for (let a = startAngle; a < endAngle; a += 0.01) {
        let x = this.x + curveRadius * cos(a);
        let y = this.y + curveRadius * sin(a);
        let offset = map(sin(a * 4), -1, 1, -this.curveWidth, this.curveWidth);
        vertex(x + offset, y);
      }
      endShape();
    }
   pop();
  }
}

class Leave {
  //Using constructor to set the parameters.
  //(LX1, LY1), (LX2, LY2) and (LX3, LY3) represents the coordinates that will be used in curveVertex() method
  //numA, numB and numC are used to vary the x coordinates for the three main points
  //numD, numE and numF are used to vary the y coordinates for the three main points
  //lColor stands for leave color which will be passed to stroke color
  //tX2, tY2 and lAngle are planed for translate coordinates and rotation angle
  constructor(LX1, LY1, LX2, LY2, LX3, LY3, numA, numB, numC, numD, numE, numF, lColor, tX2, tY2, lAngle){
    this.LX1 = LX1;
    this.LY1 = LY1;
    this.LX2 = LX2;
    this.LY2 = LY2;
    this.LX3 = LX3;
    this.LY3 = LY3;
    this.numA = numA;
    this.numB = numB;
    this.numC = numC;
    this.numD = numD;
    this.numE = numE;
    this.numF = numF;
    this.lColor = lColor;
    this.tX2 = tX2;
    this.tY2 = tY2;
    this.lAngle = lAngle;
    this.angleOffset = 0;
    this.startMovetime = 73;
    this.endMovetime = 192;
  }
  
  update(amplitude) {
    if (song.currentTime() < this.startMovetime) {
      this.angleOffset = 0;
    } else if (song.currentTime() <= this.endMovetime) {
      this.angleOffset = cos(frameCount * 0.1) * amplitude;
    } else {
      this.angleOffset = 0;
    }
  }

  display() {
    for (let i = 0; i < 7; i++) {
      push()
      translate(this.tX2, this.tY2);
      fill(0);
      stroke(this.lColor);
      strokeWeight(5)
      beginShape();
      curveVertex(this.LX1 + i * this.numA, this.LY1 + i * this.numD);
      curveVertex(this.LX1 + i * this.numA, this.LY1 + i * this.numD);
      curveVertex(this.LX2 + i * this.numB + this.angleOffset, this.LY2 + i * this.numE);
      curveVertex(this.LX3 + i * this.numC + this.angleOffset, this.LY3 + i * this.numF);
      curveVertex(this.LX3 + i * this.numC, this.LY3 + i * this.numF);
      endShape();
      pop()
    }
  }
}

class Smallerleave {
  //Similar parameters like leave object except less curve will be made
  constructor(sX1, sY1, sX2, sY2, sX3, sY3, num1, num2, num3, num4, num5, num6, ColorS, tX3, tY3, AngleS, startTime, endTime){
    this.sX1 = sX1;
    this.sY1 = sY1;
    this.sX2 = sX2;
    this.sY2 = sY2;
    this.sX3 = sX3;
    this.sY3 = sY3;
    this.num1 = num1;
    this.num2 = num2;
    this.num3 = num3;
    this.num4 = num4;
    this.num5 = num5;
    this.num6 = num6;
    this.ColorS = ColorS;
    this.tX3 = tX3;
    this.tY3 = tY3;
    this.AngleS = AngleS;
    this.startTime = startTime; 
    this.endTime = endTime;  
    this.angleOffset1 = 0;
  }

  // If the current time is between startMovetime and endMovetime,
  // the angleOffset will oscillate with a cosine wave, scaled by the amplitude.
  update(amplitude1) {
      if (song.currentTime() >= this.startTime && song.currentTime()< this.endTime) {
        this.angleOffset1 = Math.cos(frameCount * 0.1) * amplitude1;
      } else {
        this.angleOffset1 = 0;
      }
    }

  display() {
    for (let i = 0; i < 5; i++) {
      push()
      translate(this.tX3, this.tY3)
      noFill();
      stroke(this.ColorS);
      strokeWeight(4)
      beginShape();
      curveVertex(this.sX1 + i * this.num1, this.sY1 + i * this.num4);
      curveVertex(this.sX1 + i * this.num1, this.sY1 + i * this.num4);
      curveVertex(this.sX2 + i * this.num2, this.sY2 + i * this.num5 + this.angleOffset1);
      curveVertex(this.sX3 + i * this.num3, this.sY3 + i * this.num6 + this.angleOffset1);
      curveVertex(this.sX3 + i * this.num3, this.sY3 + i * this.num6 + this.angleOffset1);
      endShape();
      pop()
    }
  }
}

// Toggle playback on or pause with a mouse click
function mousePressed() {
  if (song.isPlaying()) {
  song.pause();
  } else {
  song.play(0, 1, 1, 53);
  }
}
