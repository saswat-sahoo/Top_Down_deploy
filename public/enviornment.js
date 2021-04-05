function Enviornment() {
  this.env_collider = [];
  this.color = color(255);
  this.thickness = 10;
  this.boundaries = [];
  this.obstacles = [];
  this.update = function () {


    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++) {
        this.obstacles[i][j].setCollider("rectangle");
        this.obstacles[i][j].debug = true;

      }
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++) {
        this.boundaries[i][j].setCollider("rectangle");
        this.boundaries[i][j].debug = true;

      }

  }



  for (let i = 0; i < 2; i++) {
    this.boundaries[i] = []
    for (let j = 0; j < 2; j++) {
      this.boundaries[i][j] = []
      this.boundaries[i][j] = createSprite();
      this.boundaries[i][j].shapeColor = this.color;
      if (i == 0 && j == 0) {
        this.boundaries[i][j].width = windowWidth;
        this.boundaries[i][j].height = this.thickness;
        this.boundaries[i][j].position = createVector(windowWidth / 2, 0);;
      }
      if (i == 0 && j == 1) {
        this.boundaries[i][j].width = windowWidth;
        this.boundaries[i][j].height = this.thickness;
        this.boundaries[i][j].position = createVector(windowWidth / 2, windowHeight);
      }

      if (i == 1 && j == 0) {
        this.boundaries[i][j].width = this.thickness;
        this.boundaries[i][j].height = windowHeight;
        this.boundaries[i][j].position = createVector(0, windowHeight / 2);
      }
      if (i == 1 && j == 1) {
        this.boundaries[i][j].width = this.thickness;
        this.boundaries[i][j].height = windowHeight;
        this.boundaries[i][j].position = createVector(windowWidth, windowHeight / 2);
      }

      this.env_collider.push(this.boundaries[i][j]);
    }
  }





  for (let i = 0; i < 2; i++) {
    this.obstacles[i] = [];
    for (let j = 0; j < 2; j++) {
      this.obstacles[i][j] = createSprite();
      this.obstacles[i][j].width = 30;
      this.obstacles[i][j].height = 20
      this.obstacles[i][j].position = createVector(random(windowWidth), random(windowHeight));
      this.obstacles[i][j].shapeColor = this.color;
      this.env_collider.push(this.obstacles[i][j]);
    }
  }







}