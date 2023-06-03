status = "";
object = [];

function preload()
{
    
}

function setup()
{
    cv=createCanvas(350,350);
    cv.center();
    video=createCapture(VIDEO);
    video.size(350,350);
    video.hide();
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
}

function modelLoaded()
{
    console.log("cocossd status == Initialised.");
    status=true;
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    object = results;
}

function draw()
{
    image(video,0,0,350,350);

    if(status!="")
    {
        objectDetector.detect(video,gotResult);

        r = random(255);
        g = random(255);
        b = random(255);

        for(i = 0;i < object.length;i++)
        {
            document.getElementById("status").innerHTML="Status : Detected objects";
            document.getElementById("no_obj").innerHTML="No. of Objects Detected : " + object.length;
            fill(r,g,b);
            p = Math.floor(object[i].confidence * 100);
            text(object[i].label + " " + p + "%",object[i].x + 20,object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}