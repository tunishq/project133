STATUS = "";
objects = [];
function preload()
{
    img=loadImage("water_bottle.jpg");
}

function setup ()
{
canvas = createCanvas(640, 420);
canvas.center();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}



function draw ()
{
    image(img, 0, 0, 640, 420);

    if(STATUS != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(img, gotResult);
    }
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : object detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x - 55, objects[i].y -70 );
            noFill();
            stroke(r, g, b);
            rect(objects[i].x - 60, objects[i].y - 80, objects[i].width - 50, objects[i].height-100);

        }
    


}



function modelLoaded ()
{
    console.log("model loaded");
    STATUS = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.error("error");
    }
    console.log(results);
    objects = results;
}

