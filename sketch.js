

var flyingSaucers;

function setup()
{
    createCanvas(1400,700);
    noStroke();

    // array of saucers
    flyingSaucers = [];

    // pushing values into flyinhSaucers array
    for (var i=0; i<5; i++)
    {
        flyingSaucers.push(new FlyingSaucer(180 + (i*250) ,150));
    }
}

function draw()
{
    background(10,0,80);
    
    //draw the ground
    fill(0,50,0);
    rect(0,height - 100, width, 100);

    for(var i=0; i<flyingSaucers.length; i++)
    {
        if (flyingSaucers[i].beam_on == true)
        {
            flyingSaucers[i].beam();
        }
        
        
        flyingSaucers[i].hover();

        flyingSaucers[i].draw();
    }
}

function keyPressed()
{
    flyingSaucer.beam_on = true;
}

function keyReleased() 
{
    flyingSaucer.beam_on = false;
}

function FlyingSaucer(x,y)  {
    this.x = x;
    this.y = y;
    this.width = random(100,300);
    this.height = random(60, 100);
    this.num_lights = 11;
    this.brightness = [];
    this.beam_on = false;

    this.hover = function()
    {
        this.x += random(-2, 2);
        this.y += random(-4, 4);

        if (this.beam_on == false && random() > 0)
        {
            this.beam_on = true;
        }
        else if (this.beam_on == true && random() > 0.99)
        {
            this.beam_on = false;
        }
    };

    this.beam = function()
    {
        fill(100, 100, 100, 100);

        beginShape();
        vertex(this.x - this.width *0.15, this.y);
        vertex(this.x + this.width *0.15, this.y);
        vertex(this.x + this.width *0.45, height-100);
        vertex(this.x - this.width *0.45, height-100);
        endShape(CLOSE);
    };

    this.draw = function()
    {
        //draw the flying saucer
        fill(175,238,238);
        arc(this.x,
            this.y,
            this.width/2,
            this.height * 2,
            PI,TWO_PI
        )
        fill(150);
        arc(this.x,
            this.y,
            this.width,
            this.height,
            PI,TWO_PI
        );
        fill(50);
        arc(this.x,
            this.y,
            this.width,
            this.height/2,0,PI
        );


        // lights around saucer
        fill(255);
        var incr = this.width/10;
        for(var i=0; i<this.num_lights; i++)
        {
            fill(this.brightness[i]);
            ellipse(this.x - this.width/2 + incr*i, this.y, 5);

            this.brightness[i] +=2;
            // once the fill value goes above 255, modular kicks in to reset it to 0
            // aka, blinking lights
            this.brightness[i] = this.brightness[i]%255;
        }
    }


    // pushing the lights value to brightness array
    for (var i=0; i<this.num_lights; i++)
    {
        this.brightness.push((i * 50)%255);
        // modular (%255) resets the brightness push value to 0 when it goes above rgb value 255
    }
}






