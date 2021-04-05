function Bullet(X, Y, PX, PY) {
    this.speed = 20;
    this.x = PX;
    this.y = PY;
    this.z = 0;
    this.r = 5;
    this.speed = 10;
    // let bulletsprite;
    this.bulletsprite = createSprite();
    this.bulletsprite.width = 10;
    this.bulletsprite.height = 10;
    this.bulletsprite.shapeColor = color(255, 0, 0);


    let end = createVector(X - this.x, Y - this.y);
    this.update = function() {



        //while(this.x!=X && this.y!=Y){
        end.setMag(this.speed);
        this.x += end.x;
        this.y += end.y;

        this.bulletsprite.position.x = this.x;
        this.bulletsprite.position.y = this.y;
        this.bulletsprite.setCollider("rectangle");
        this.bulletsprite.debug = true;
        //drawSprites();
    }
}