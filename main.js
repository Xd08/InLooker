img="";
status="";
objects=[];
animal_name=""

function setup() {
    canvas= createCanvas(700, 400);
    canvas.position(300, 230);

    video=createCapture(VIDEO);
    video.hide();

    //initializing coco-ssd model
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("object_status").innerHTML="Current status: Detecting Objects..."
}

function draw() {
    image(video, 0, 0,700, 420);
    if(status != "") {
        objectDetector.detect(video, gotResult)
        for(i=0; i< objects.length; i++) {
            document.getElementById("object_status").innerHTML="Objects in the Video have been detected";
            document.getElementById("number_of_objects").innerHTML= objects.length + " objects have been detected"
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+ " " + percent + "%",objects[i].x,objects[i].y);
            noFill();
            stroke("blue")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        objectDetector.detect(video, gotResult);
        for(i=0; i< objects.length; i++) {
            document.getElementById("object_status").inneHTML="Current Status: Objects detected"
            document.getElementById("number_of_objects").innerHTML=objects.length + " have been detected";
            fill("blue");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label +" " + percent+ "%", objects[i].x, objects[i].y);
            noFill();
            stroke("blue");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            
            if(objects[i].label==animal_name) {
                document.getElementById("object_status").inneHTML= animal_name + "has been found!"
                video.stop();
                var synth=window.speechSynthesis;
                speak_data="The" + animal_name + " has been found"
                var utterThis=new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else {
                document.getElementById("object_status").inneHTML= animal_name + "hasn't been found yet"
            }
        }
    }
}

function start() {
    objectDetetctor=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("object_status").innerHTML="Detecting Objects in the video";
    animal_name= document.getElementById("animal_name").value
}

function modelLoaded() {
    console.log("COCO.S.S.D Model has succesfully been loaded");
    status=true;
}

function gotResult(error, result) {
    if(error) {
        console.log(error);
    }

    else {
        console.log(result);
        objects=result;
    }
}