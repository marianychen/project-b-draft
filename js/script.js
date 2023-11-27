let NUM_OF_BUTTERFLY = 10;
let butterflies = [];
let r;
let g;
let b;
let human;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('p5container');

  human = new Butterfly(random(width), random(height));
  //human.changeColor(255,0,0);
  //human.changeSize(40);
    
  for (let i = 0; i < NUM_OF_BUTTERFLY; i++) {
    butterflies[i] = new Butterfly(random(width), random(height));
  }
}

function draw() {
  background(50);

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

class Butterfly {
  // constructor function
  constructor(startX, startY) {
    // r = random(255);
    // g = random(255);
    // b = random(255);
    this.x = startX;
    this.y = startY;
    this.xSpd = random(-3, 3);
    this.ySpd = random(-3, 3);
    //this.hue = random(0, 377);
  }
  // methods (functions): particle's behaviors
  move(){
    this.x += this.xSpd;
    this.y += this.ySpd;
  
  }
  slowDown(){
    this.xSpd *= 0.995;
    this.ySpd *= 0.995;
  }

  speedUp(){
    this.xSpd *= 3.05;
    this.ySpd *= 3.05;
  }
  bounce(){
    if (this.x > width || this.x < 0){
      this.xSpd = -this.xSpd;
    }

    if (this.y>height || this.y < 0) {
      this.ySpd = -this.ySpd;
    }
  }
  
   attractTo(targetX, targetY){
    let accelX = (targetX - this.x)* 0.1;
    let accelY = (targetY - this.y) * 0.1;
    this.x += accelX;
    this.y += accelY;
  }
  
  escapeFrom(other){
    let d = dist(this.x, this.y, other.x, other.y);

    if(d<100){
      let accelX = (other.x - this.x)* 0.05 * -1;
      let accelY = (other.y - this.y) * 0.05 *-1;
      this.xSpd += accelX;
      this.ySpd += accelY;
    }

  }
  
  display() {
    push();
    scale(0.3);
    ellipseMode(RADIUS);
    //noStroke();
    
    //Wings
    ellipse()
    ellipse(this.x + 167, this.y + 180, 60, 45);
    ellipse(this.x + 182, this.y + 240, 50, 35);
    ellipse(this.x + 271, this.y + 185, 60, 45);
    ellipse(this.x + 260, this.y + 245, 50, 35);
    
    // Inner circles
    //fill(mouseX, mouseY, 255);
    ellipse(this.x + 167, this.y + 170, 25, 18);
    ellipse(this.x + 182, this.y + 240, 20, 15);
    ellipse(this.x + 271, this.y + 175, 25, 18);
    ellipse(this.x + 260, this.y + 245, 20, 15);
    
    // body of butterfly
    fill(0);
    ellipse(this.x + 220, this.y + 180, 10, 10);
    ellipse(this.x + 220, this.y + 205, 13, 20);
    ellipse(this.x + 220, this.y + 220, 7, 50);
  
    push();
    // anntenae
    angleMode(DEGREES);
    translate(this.x + 230, this.y + 160);
    rotate(20);
    ellipse(0, 0, 2, 35);
    pop();
    push();
    translate(this.x + 210, this.y + 160);
    rotate(340);
    ellipse(0, 0, 2, 35);
    pop();

    fill(255);
    pop();
  }
}