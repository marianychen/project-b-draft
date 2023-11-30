let NUM_OF_BUTTERFLY = 20;
let butterflies = [];
let r, g, b;
let rainSound;
let flowerImg;
let rain = [];
let NUM_OF_RAIN = 100;
let rainBool = false;
let human;
let humanImg;
let forrestSound;

// function preload() {
//   rainSound = loadSound("/Users/marianchen/Desktop/snr yr fall 2023/project-b-draft/assets/lightrain.wav");
//   flowerImg = loadImage("/Users/marianchen/Desktop/snr yr fall 2023/project-b-draft/assets/doodle.png");
//   humanImg = loadImage("/Users/marianchen/Desktop/snr yr fall 2023/project-b-draft/assets/hand.png");
//   forrestSound = loadSound("/Users/marianchen/Desktop/snr yr fall 2023/project-b-draft/assets/forrestsound.wav");
// }

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent('p5container');
  
  human = new Butterfly(random(width), random(height));
    
  for (let i = 0; i < NUM_OF_BUTTERFLY; i++) {
    butterflies[i] = new Butterfly(random(width), random(height));
  }
}
function draw() {
  background(0, 0, 51, 90);
  //forrestSound.loop();
  drawStars(4);
  
  //moon
  fill(246, 241, 213);
  ellipse(width - 100, 100, 50);
  
   
    drawClouds(frameCount,0);
  

  // update and display
  for (let i = 0; i < butterflies.length; i++) {
    let b = butterflies[i];
    b.bounce();
    b.move();
    b.slowDown();
    b.escapeFrom(human);
    b.display();
  }
  human.attractTo(mouseX, mouseY);
  human.move();
  human.bounce();
  human.display();  
  //human.changeColor(255,255,0);
  //human.changeSize(35);
}

function drawClouds(x, y){

  fill(177, 177, 205);
  ellipse(x,120,y + 25,30);
  ellipse(x + 50,y + 100,40,50);
  ellipse(x + 100,y + 110,25,30);
  ellipse(x + 135,y + 115,25,25);
  
  ellipse(x + 250,y + 120,25,35);
  ellipse(x + 300,y + 100,30,30);
  ellipse(x + 300,y + 130,30,30);
  ellipse(x + 345,y + 115,30,40);
  ellipse(x + 390,y + 120,25,30);
  
  ellipse(x + 550,y + 120,25,35);
  ellipse(x + 600,y + 100,30,30);
  ellipse(x + 600,y + 130,30,30);
  ellipse(x + 650,y + 115,30,40);
  ellipse(x + 390,y + 120,25,30);
  
  
}

function drawStars(numStars) {
  fill(255);
  noStroke();
  for (let i = 0; i < numStars; i++) {
    let x = random(width);
    let y = random(height);
    ellipse(x, y, 2, 2);
  }
}

function drawMoon(x, y, radius) {
  fill(255);
  noStroke();
  ellipse(x, y, radius);
}
class Human {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.xSpd = 0.5;
    this.ySpd = 0.5;
    this.dia = 25;
  }

  move() {
    this.x = mouseX;
    this.y = mouseY;
    this.x += this.xSpd;
    this.y += this.ySpd;
  }

  bounce() {
    if (this.x > width || this.x < 0) {
      this.xSpd = -this.xSpd;
    }

    if (this.y > height || this.y < 0) {
      this.ySpd = -this.ySpd;
    }
  }
  collisionDetect(allObjects) {
    for (let i = 0; i < allObjects.length; i++) {
      let p = allObjects[i];
      let d = dist(this.x, this.y, p.x, p.y);
      if (d < this.dia / 2 + p.dia / 2) {
        console.log("hello");
          allObjects.splice(i,1);
        
      }
    }
  }

  display() {
    imageMode(CENTER);
    image(humanImg, this.x, this.y, 50, 50);
  }
}
class Butterfly {
  // constructor function
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.xSpd = random(-3, 3);
    this.ySpd = random(-3, 3);
    this.xAccel = random(-3, 3);
    this.yAccel = random(-3, 3);
    this.targetX = startX;
    this.targetY = startY;
    this.dia = 34;
  }

  move() {
    this.x += this.xSpd + this.xAccel;
    this.y += this.ySpd + this.yAccel;
  }
  slowDown() {
    this.xSpd *= 0.995;
    this.ySpd *= 0.995;
  }

  speedUp() {
    this.xSpd *= 3.05;
    this.ySpd *= 3.05;
  }

  moveTowards(targetX, targetY) {
    this.x = targetX;
    this.y = targetY;
  }
  changeColor() {
    this.color = color(92, 0, 230);
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

  escapeFrom(other) {
    let d = dist(this.x, this.y, other.x, other.y);

    if (d < 100) {
      let accelX = (other.x - this.x) * 0.05 * -1;
      let accelY = (other.y - this.y) * 0.05 * -1;
      this.xSpd += accelX;
      this.ySpd += accelY;
    }
  }
  
  
  display() {
    push();
    ellipseMode(RADIUS);
    //noStroke();
    this.drawButterfly();
  }
  drawButterfly() {
    //Wings
    fill(255);
    ellipse(this.x - 17, this.y - 10, 18, 13.5);
    ellipse(this.x - 15, this.y + 10, 15, 10.5);
    ellipse(this.x + 17, this.y - 10, 18, 13.5);
    ellipse(this.x + 15, this.y + 10, 15, 10.5);

    // Inner circles
    fill(mouseX, mouseY, 255);
    ellipse(this.x - 17, this.y - 10, 7.5, 5.4);
    ellipse(this.x - 15, this.y + 10, 6, 4.5);
    ellipse(this.x + 17, this.y - 10, 7.5, 5.4);
    ellipse(this.x + 15, this.y + 10, 6, 4.5);

    //Inner inner circles
    push();
    noStroke();
    fill(this.r, this.b, this.g);
    ellipse(this.x - 17, this.y - 10, 6.5, 2);
    ellipse(this.x - 15, this.y + 10, 5, 1.7);
    ellipse(this.x + 17, this.y - 10, 6.5, 2);
    ellipse(this.x + 15, this.y + 10, 5, 1.7);
    pop();

    // body of butterfly
    fill(0);
    ellipse(this.x, this.y + 5, 2.5, 20);
    ellipse(this.x, this.y - 15, 5, 5);
    ellipse(this.x, this.y + 4, 6, 12);

    // anntenae

    push();
    strokeWeight(2);
    stroke(0);
    line(this.x, this.y - 20, this.x - 10, this.y - 40);
    line(this.x, this.y - 20, this.x + 10, this.y - 40);
    pop();
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
    fill(146, 186, 210);
    ellipse(this.x, this.y, 2, 5);
    pop();
  }
}
