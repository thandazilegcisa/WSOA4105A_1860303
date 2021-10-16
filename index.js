//Retrieve Html Elements:
const startButton = document.querySelector(".button-One");

// This creates a web audio api context
const audioContext = window.AudioContext;
const audioCtx = new AudioContext();

// The following are reference positions found by debugging 
// the accelerometer function on line 71
const referencePositions = {
    origin      : {
        x: 0,
        y: 0,
        z: 10
    },
    faceDown    : {
        x: 0,
        y: 0,
        z: -10
    },
    straightUp  : {
        x: 0,
        y: 10,
        z: 0
    },
    upsideDown  : {
        x: 0,
        y: -10,
        z: 0
    },
    rightTilt   : {
        x: -10,
        y: 0,
        z: 0
    },
    leftTilt    : {
        x: 10,
        y: 0,
        z: 0
    },
    leanAway    : {
        x: 0,
        y: 7,
        z: 5
    },
    leanTowards : {
        x: 0,
        y: 7,
        z: -5
    },
}

// Oject freeze, freeze's the properties of an objects so 
// that they cannot be changed, which is important because
// we want to refer back to these positions
const phoneOrientations = Object.freeze({
    origin      : 'origin      ',
    faceDown    : 'faceDown    ',
    straightUp  : 'straightUp  ',
    upsideDown  : 'upsideDown  ',
    rightTilt   : 'rightTilt   ',
    leftTilt    : 'leftTilt    ',
    leanTowards : 'leanTowards ',
    leanAway    : 'leanAway    '
});

// Initialises the position of the phone to the origin position 
let previousPosition = referencePositions.origin;

// This creates the initial pitch theremin frequency and volume values
const maxFreq = 6000;
const maxVol = 0.05;
const initialVol = 0.001;

//volume.gain.value = initialVol;
//volume.gain.minValue = initialVol;
//volume.gain.maxValue = initialVol

function droneAudio (){
    // This creates and oscilator and a gain (volume) node
       const osc = audioCtx.createOscillator();
       const volume = audioCtx.createGain();

    // Select oscillator type (sine,triangle,square,saw)
       osc.type = "sine";

    // Determine the pitch of the audio  
       osc.frequency.value = 640;

       //let leftTilt = parseFloat("leftTilt");
       //let rightTilt = parseFloat("rightTilt");
       osc.frequency.exponentialRampToValueAtTime(720,audioCtx.currentTime +1);
       volume.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime + 0.9)

       osc.start(0);
       osc.stop(audioCtx.currentTime + 1.5);
    // This connects the oscillator (out input) to the volume
    // input and then to the output destination (our speakers)
       osc.connect(volume).connect(audioCtx.destination);

}
var startOffset = 0;
var startTime = 0;

function loadSnare(){
    let audio = new Audio("Hollow Direct Punchy Snare.wav");
    let source = audioCtx.createMediaElementSource(audio);

    source.connect(audioCtx.destination);

    audio.play();
}
startButton.addEventListener("click", function(){
    if(audioCtx.state === "suspended"){
        audioCtx.resume();
    }

    droneAudio();
});

// This function listens or rather uses the accelerometer api 
let acl = new Accelerometer();
acl.addEventListener("reading", function(event){
    
    // This condition checks if  the event that we are listening
    // for is not the same as the previous position (origin, and 
    // every other position thereafter)
    if(!isAtPosition(event.target, previousPosition)){
        
        // This visualizes the values on the screen

        document.getElementById('x').innerHTML = 'x: ' + Math.abs(event.target.x);
        document.getElementById('y').innerHTML = 'y: ' + event.target.y;
        document.getElementById('z').innerHTML = 'z: ' + event.target.z;

        sendSensorData(checkPosition(event.target));

    }
});
function isAtPosition(refPosition, newPosition){

    return( 
        isSomeWhatEqual(refPosition.x, newPosition.x ) && 
        isSomeWhatEqual(refPosition.y, newPosition.y ) && 
        isSomeWhatEqual(refPosition.z, newPosition.z ) 
    );
}

function isSomeWhatEqual(num1, num2){
    let offset = 4.5;

    // return absolute value because the api return 
    // values that have decimal points 
    return (Math.abs(num1 -num2) <= offset);
}

 // This checks for the Position of the device sets and 
 // sets that position as the previous position and returns
 // value form the object that we freezed.

function checkPosition(position){

    if(isAtPosition(position, referencePositions.origin)){
        previousPosition = referencePositions.origin;
        return "origin";
    }
    if(isAtPosition(position,referencePositions.faceDown)){
        previousPosition = referencePositions.faceDown;
        return "faceDown";
    }
    if(isAtPosition(position,referencePositions.straightUp)){
        previousPosition = referencePositions.straightUp;
        return "straightUp";
    }
    if(isAtPosition(position, referencePositions.upsideDown)){
        previousPosition = referencePositions.upsideDown;
        return "upsideDown";
    }
    if(isAtPosition(position,referencePositions.rightTilt)){
        previousPosition = referencePositions.rightTilt;
        return "rightTilt";
    }
    if(isAtPosition(position,referencePositions.leftTilt)){
        previousPosition = referencePositions.leftTilt;
        return "leftTilt";
    }
    if(isAtPosition(position,referencePositions.leanTowards)){
        previousPosition = referencePositions.leanTowards;
        return "leanTowards";
    }
    if(isAtPosition(position,referencePositions.leanAway)){
        previousPosition = referencePositions.leanAway;
        return "leanAway";
    }

    return ("ERROR: x:" + position.x + ", y: "+ position.y + ", z: " + position.z)
}
 acl.start();

function sendSensorData(data){
    if(data.includes("ERROR")) return;
    
    switch(data){
        case "leftTilt": droneAudio();  console.log("audioTilt"); break; 
        case "rightTilt": droneAudio(); console.log("audioTilt"); 
        case "leanTowards": loadSnare(); console.log("Snare played"); break;

        default: break;
    }
}