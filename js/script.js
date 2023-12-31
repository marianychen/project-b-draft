let NUM_OF_BUTTERFLY = 10;
let butterflies = [];
let r, g, b;
let flowerImg;
let rain = [];
let NUM_OF_RAIN = 100;
let rainBool = false;
let human;
let humanImg;
let rainSound;
let forrestSound;
let treesImg;
let deathSound;
let reviveSound;
let cloudX = 0
let cloudSpace = 700;


function preload() {
  rainSound = loadSound("sounds/lightrain.mp3");
  forrestSound = loadSound("sounds/forrestsound.mp3");
  deathSound = loadSound("sounds/death.mp3");
  reviveSound = loadSound("sounds/revive.mp3");

  treesImg = loadImage("images/trees.png");
  flowerImg = loadImage("images/doodle.png");
  humanImg = loadImage("images/hand.png");
}


function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("p5container");

  human = new Human(random(width), random(height));
  for (let i = 0; i < NUM_OF_BUTTERFLY; i++) {
    butterflies[i] = new Butterfly(random(width), random(height));
  }
  for (let i = 0; i < NUM_OF_RAIN; i++) {
    rain[i] = new Rain(random(width), random(height));
  }
}


function draw() {
  background(0, 0, 51, 60);
  

  //moon
  fill(246, 241, 213);
  ellipse(width - 100, 100, 80);

  //clouds
  drawClouds(frameCount, 0);

//end game - tree
if (butterflies.length === 0) {
  if(forrestSound.isPlaying()){
    forrestSound.stop();
  }
  textSize(30);
  textAlign(CENTER);
  textFont("Arial");
  fill(255);
  text("YOU HAVE KILLED", width / 2, height / 2 - 100);
  text("ALL THE BUTTERFLIES.", width / 2, height / 2 - 50);
  for (let i = 0; i < rain.length; i++) {
    rain[i].display();
    rain[i].update();
  }

  push();
  imageMode(CENTER);
  rotate(PI/4);
  tint(76, 52, 26);
  image(treesImg, 600, 100, 400,420);
  pop();
  for (let i = 20; i < 1061; i +=210) {
    tint(76, 52, 26);
    image(flowerImg, i, 590, 100, 120);
  }
  background(0, 0, 51, 60); 

} else {
  if(!forrestSound.isPlaying()){
    forrestSound.play();
  }
  //background(0, 0, 51, 60); 
  //tree 
  drawStars(4);
  imageMode(CENTER);
  image(treesImg, 170, 430, 400,400);
  //flowers
  
  for (let i = 0; i < 1061; i +=70) {
    image(flowerImg, i, 590, 100, 120);
  }


}

  // update and display
  for (let i = 0; i < butterflies.length; i++) {
    let b = butterflies[i];
    b.bounce();
    b.slowDown();
    b.escapeFrom(human);
    if (rainBool) {
      b.moveTowards(width / 6, height - 50);
    } else {
      b.move();
    }
    b.display();
  }
  

  if (keyIsPressed) {
    if (key == "R" || key == "r") {
      rainBool = true;
  
      if (!rainSound.isPlaying()) {
        rainSound.loop();
      }
      for (let i = 0; i < rain.length; i++) {
        rain[i].display();
        rain[i].update();
      }
    }
  } else {
    rainBool = false;
    if (rainSound.isPlaying()) {
      rainSound.stop();
    }

  
  }

  human.move();
  human.bounce();
  human.display();
  human.collisionDetect(butterflies,butterflies);
  human.generateButterflies();
}
function drawClouds(x) {
  fill(177, 177, 205);
  
  cloudX += 1; 
  
  if (cloudX > width) {
    cloudX = -cloudSpace; 
  }

  ellipse(cloudX - 100, 120, 25, 30);
  ellipse(cloudX + 50 - 100, 100, 40, 50);
  ellipse(cloudX, 110, 25, 30);
  ellipse(cloudX + 135 - 100, 115, 25, 25);

  ellipse(cloudX + 250,120, 25, 35);
  ellipse(cloudX + 300, 100, 30, 30);
  ellipse(cloudX + 300, 130, 30, 30);
  ellipse(cloudX + 345, 115, 30, 40);
  ellipse(cloudX + 390, 120, 25, 30);

  ellipse(cloudX + 550, 120, 25, 35);
  ellipse(cloudX + 600, 100, 30, 30);
  ellipse(cloudX + 600, 130, 30, 30);
  ellipse(cloudX + 650, 115, 30, 40);
  ellipse(cloudX + 390, 120, 25, 30);



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
        allObjects.splice(i, 1);
        deathSound.play();
      }
      }

      }
      generateButterflies() {
        if (mouseX < 0 || mouseX > 1000 || mouseY < 0 || mouseY > 600) {
          if (keyIsPressed && keyCode === 32) {
      
            let newButterfly = new Butterfly(random(width), random(height));
            butterflies.push(newButterfly);
            reviveSound.play();
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
    this.angle = 0.5;
    this.angleSpd = 0.05;
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
    let distX = targetX - this.x;
    let distY = targetY - this.y;

  let distance = dist(this.x, this.y, targetX, targetY);

  let speed = 3;

  this.x += (distX / distance) * speed;
  this.y += (distY / distance) * speed;
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
      let accelX = (other.x - this.x) * 0.02 * -1;
      let accelY = (other.y - this.y) * 0.02 * -1;
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
    
    this.angle += this.angleSpd;
     r = 250;
    b = map(cos(this.angle), -1, 1, 0, 255);
    g = map(sin(this.angle), -1, 1, 0, 200);

    fill(r, g, b);
    push();
    stroke(0);
    //Wings
    ellipse(this.x - 17, this.y - 10, 18, 13.5);
    ellipse(this.x - 15, this.y + 10, 15, 10.5);
    ellipse(this.x + 17, this.y - 10, 18, 13.5);
    ellipse(this.x + 15, this.y + 10, 15, 10.5);

    fill(255);
    // Inner circles
    //fill(mouseX, mouseY, 255);
    ellipse(this.x - 17, this.y - 10, 7.5, 5.4);
    ellipse(this.x - 15, this.y + 10, 6, 4.5);
    ellipse(this.x + 17, this.y - 10, 7.5, 5.4);
    ellipse(this.x + 15, this.y + 10, 6, 4.5);

    r = 250;
    b = map(cos(this.angle), -1, 1, 0, 255);
    g = map(sin(this.angle), -1, 1, 0, 200);

    //fill(r, g, b);
    
    pop();
    //Inner inner circles
    // push();
    // //noStroke();
    // //fill(this.r, this.b, this.g);
    // ellipse(this.x - 17, this.y - 10, 5.5, 2);
    // ellipse(this.x - 15, this.y + 10, 4, 1.7);
    // ellipse(this.x + 17, this.y - 10, 5.5, 2);
    // ellipse(this.x + 15, this.y + 10, 4, 1.7);
    // pop();

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
