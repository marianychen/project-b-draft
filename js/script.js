let NUM_OF_BUTTERFLY = 10;
let butterflies = [];
let r;
let g;
let b;
let rainSound;

let rain = [];
let NUM_OF_RAIN = 100;
let rainBool = false;

function preload() {
  rainSound = loadSound("lightrain.wav");
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("p5container");
    
  for (let i = 0; i < NUM_OF_BUTTERFLY; i++) {
    butterflies[i] = new Butterfly(random(width), random(height));
  }
   for (let i = 0; i < NUM_OF_RAIN; i++) {
    rain[i] = new Rain(random(width), random(height));
  }
}

function draw() {
  background(50, 90);

  // update and display
  for (let i = 0; i < butterflies.length; i++) {
    let b = butterflies[i];
    b.bounce();
    if (rainBool) {
      b.moveTowards(width/6, height * 3/4);
    } else {
      b.move();
    }
    b.display();
  }

  if (keyIsPressed) {
    if (key == "R" || key == "r") {
      rainBool = true;
      rainSound.play();
      for (let i = 0; i < rain.length; i++) {
        rain[i].display();
        rain[i].update();
      }
    }
  } else {
    rainBool = false;
  }
}
class Butterfly {
  // constructor function
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.xSpd = 1;
    this.ySpd = 1;
    this.xAccel = 1;
    this.yAccel = 1;
    this.targetX = startX; // New variable to store the target X position
    this.targetY = startY; // New variable to store the target Y position
    this.arrival = 5; // Adjust the threshold as needed
  }

  move() {
    this.x += this.xSpd + this.xAccel;
    this.y += this.ySpd + this.yAccel;
  }

  moveTowards(targetX, targetY) {
    this.targetX = targetX;
    this.targetY = targetY;

    let angle = atan2(this.targetY - this.y, this.targetX - this.x);
    let distance = dist(this.x, this.y, this.targetX, this.targetY);

    if (distance > this.arrival) {
      this.x += cos(angle) * (this.xSpd + this.xAccel);
      this.y += sin(angle) * (this.ySpd + this.yAccel);
    }
  }

  bounce() {
    if (this.x > width || this.x < 0) {
      this.xSpd = -this.xSpd;
      this.xAccel = -this.xAccel;
    }

    if (this.y > height || this.y < 0) {
      this.ySpd = -this.ySpd;
      this.yAccel = -this.yAccel;
    }
  }

  display() {
    push();
    ellipseMode(RADIUS);
    //noStroke();
    this.drawButterfly();
  }
  drawButterfly(){
   ellipseMode(RADIUS);
    //Wings
    ellipse(this.x-17, this.y-10, 18, 13.5);
    ellipse(this.x - 15, this.y +10, 15, 10.5);
    ellipse(this.x+17, this.y-10, 18, 13.5);
    ellipse(this.x + 15, this.y+10, 15, 10.5);
    
    // Inner circles
    fill(mouseX, mouseY, 255);
    ellipse(this.x-17, this.y-10, 7.5, 5.4);
    ellipse(this.x - 15, this.y + 10, 6, 4.5);
    ellipse(this.x+17, this.y-10, 7.5, 5.4);
    ellipse(this.x + 15, this.y+10, 6, 4.5);
    
    // body of butterfly
    fill(0);
    ellipse(this.x, this.y+5, 2.5, 20);
    ellipse(this.x, this.y-15, 5, 5);
    ellipse(this.x, this.y+4, 6, 12);
  
    
    // anntenae
    line(this.x, this.y-20, this.x-10, this.y-40);
    line(this.x, this.y-20, this.x+10, this.y-40);
  

    fill(255);
  }
  
}

class Rain {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(5, 10);
    this.spd = random(10, 20); 
  }
  update() {
    this.y += this.spd;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }
  display() {
    push();
    stroke(146, 186, 210);
    ellipse(this.x, this.y, 2,5);
    pop();
  }

}