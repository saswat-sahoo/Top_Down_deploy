function Player(enviornment) {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 20;
    this.speed = 4
    this.bullets = [];
    this.scale = 0.5;
    this.destructibles = enviornment.env_collider;
    this.id;

    // player body sprite
    this.sprite = createSprite(
        width / 2,
        height / 2,
        100 * this.scale,
        100 * this.scale
    );
    const FRICTION = 0.25;
    this.sprite.friction = FRICTION;
    this.sprite.shapeColor = color(255, 0, 0);

    this.healthbarBzckground = createSprite();
    this.healthbarBzckground.width = 200 * this.scale;
    this.healthbarBzckground.height = 15 * this.scale;
    this.healthbarBzckground.shapeColor = color('grey');

    this.healthbar = createSprite();
    this.healthbar.width = 200 * this.scale;
    this.healthbar.height = 10 * this.scale;
    this.healthbar.shapeColor = color(0, 255, 0);
    this.health = 100;
    this.RenderDist = 300;
    this.offset = 0;
    //text('player: '+this.id,this.x,this.y);

    //textFont(font);
    //textSize(fontsize);
    
    this.update = function () {
        this.x = this.sprite.position.x;
        this.y = this.sprite.position.y;
        this.healthbar.position.x = this.x + this.offset;
        this.healthbar.position.y = this.y - 50;
        this.healthbarBzckground.position.x = this.x;
        this.healthbarBzckground.position.y = this.y - 50;
        
       

        this
            .sprite
            .setCollider("rectangle");

        this.sprite.debug = true;

        if (keyIsDown(UP_ARROW) || keyDown('w')) {
            // if (this.y + (-1*20) > 0)
            this.moveY(-1);
        }
        if (keyIsDown(DOWN_ARROW) || keyDown('s')) {
            // if (this.y + (1*20) < height)
            this.moveY(1);
        }
        if (keyIsDown(LEFT_ARROW) || keyDown('a')) {
            // if (this.x + (-1*20) > 0)
            this.moveX(-1);
        }
        if (keyIsDown(RIGHT_ARROW) || keyDown('d')) {
            // if (this.x + (1*20) < width)
            this.moveX(1);
        }

        if (keyWentDown('v')) {
            this.takeDamage(10);
        }

        for (let i = 0; i < this.bullets.length; i++) {
            this
                .bullets[i]
                .update();
            if (dist(this.bullets[i].x, this.bullets[i].y, this.x, this.y) > this.RenderDist) {
                this.destroy(this.bullets, i)
                break;
            }

            for (let k = 0; k < this.destructibles.length; k++) {
                if (this.bullets[i].bulletsprite.collide(this.destructibles[k])) {
                    this.destroy(this.bullets, i)
                    break;

                }
            }
        }
    }

    this.destroy = function (arr, i) {
        arr[i]
            .bulletsprite
            .remove();
        arr.splice(i, 1);
    }

    this.moveY = function (number) {
        this.sprite.velocity.y = number * this.speed;
    }
    this.moveX = function (number) {
        this.sprite.velocity.x = number * this.speed;
    }

    this.shoot = function (camera_mouseX, camera_mouseY, camera_position_x, camera_position_y) {

        this
            .bullets
            .push(
                new Bullet(camera_mouseX, camera_mouseY, camera_position_x, camera_position_y)
            );
    }

    this.takeDamage = function (damage) {
        this.healthbar.width -= damage;
        this.offset -= damage / 2
        this.health -= damage;
        if (this.health > 60) {
            this.healthbar.shapeColor = color(0, 255, 0);
        } else if (this.health > 40 && this.health <= 60) {
            this.healthbar.shapeColor = color('yellow');
        } else {
            this.healthbar.shapeColor = color('red');
        }
    }
    this.collison = function (arr) {
        arr.forEach(item => {
            this.sprite.collide(item)
        });
    }


}