alert("Please use a mobile device to explore this site")
alert("Press start to start audio context")

//Retrieve Html Elements:
const startButton = document.querySelector(".button-One");

// This creates a web audio api context
const audioContext = window.AudioContext;
const audioCtx = new AudioContext();

// The following are reference positions found by debugging 
// the accelerometer function on line 157
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
    halfRightTilt:{
        x:-5,
        y:0,
        z:0
    },
    rightTilt   : {
        x: -8,
        y: 0,
        z: 0
    },
    halfLeftTilt: {
        x:5,
        y:0,
        z:0
    },
    leftTilt    : {
        x: 8,
        y: 0,
        z: 0
    },
    leanAway    : {
        x: 0,
        y: 8,
        z: 5
    },
    leanTowards : {
        x: 0,
        y: 7,
        z: 6
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
    halfRightTilt: 'halfRightTilt',
    rightTilt   : 'rightTilt   ',
    halfLeftTilt: 'halfLeftTilt',
    leftTilt    : 'leftTilt    ',
    leanTowards : 'leanTowards ',
    leanAway    : 'leanAway    '
});

// Initialises the position of the phone to the origin position 
let previousPosition = referencePositions.origin;


function loadSnare(){
    let audio = new Audio("Hollow Direct Punchy Snare.wav");

    let source= audioCtx.createBufferSource();
    source.start(0);

    source = audioCtx.createMediaElementSource(audio);

    source.connect(audioCtx.destination);
    audio.play();
}
function loadHitHats(){
    let audio = new Audio("Hollow Different Double Hat.wav");

    let source= audioCtx.createBufferSource();
    source.start(0);

    source = audioCtx.createMediaElementSource(audio);

    source.connect(audioCtx.destination);
    audio.play();
}
function loadKick(){
    // This creates and oscilator and a gain (volume) node
    const kickOsc = audioCtx.createOscillator();
    const primaryGainControl = audioCtx.createGain();

    // Gradually change parameters  
    kickOsc.frequency.setTargetAtTime(150,0);
    kickOsc.frequency.exponentialRampToValueAtTime(0.001,audioCtx.currentTime + 0.5);

    const kickGain = audioCtx.createGain();
    kickGain.gain.setTargetAtTime(1,0);
    kickGain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime + 0.5);
    
    // This connects the oscillator (out input) to the volume
    // input and then to the output destination (our speakers)
    kickOsc.connect(kickGain)
    kickGain.connect(primaryGainControl);
    kickOsc.start();
    kickOsc.stop(audioCtx.currentTime + 0.5);

}
function loadSample(){
    
    let audio = new Audio("Perfect Thick Warm Kick.wav");

    let source= audioCtx.createBufferSource();
    source.start(0);

    source = audioCtx.createMediaElementSource(audio);

    source.connect(audioCtx.destination);
    audio.play();
}
function droneAudio (){
    // This creates and oscilator and a gain (volume) node
       const osc = audioCtx.createOscillator();

       const source = audioCtx.createBufferSource();
       const volume = audioCtx.createGain();

    // Select oscillator type (sine,triangle,square,saw)
       osc.type = "sine";

    // Determine the pitch of the audio  
       osc.frequency.value = 640;
    
    // Gradually change parameters   
       osc.frequency.exponentialRampToValueAtTime(720,audioCtx.currentTime +1);
       volume.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime + 0.9)

       osc.start(0);
       osc.stop(audioCtx.currentTime + 1.5);
    // This connects the oscillator (out input) to the volume
    // input and then to the output destination (our speakers)
       osc.connect(volume).connect(audioCtx.destination);

  
       let oscTime = audioCtx.currentTime;
       console.log(oscTime);

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
        document.getElementById('y').innerHTML = 'y: ' + Math.abs(event.target.y);
        document.getElementById('z').innerHTML = 'z: ' + Math.abs(event.target.z);

        sendSensorData(checkPosition(event.target));


        
       let oscTime = audioCtx.currentTime;
       oscTime = event.target;
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
    if(isAtPosition(position,referencePositions.halfRightTilt)){
        previousPosition = referencePositions.halfRightTilt;
        return "halfRightTilt";
    }
    if(isAtPosition(position,referencePositions.rightTilt)){
        previousPosition = referencePositions.rightTilt;
        return "rightTilt";
    }
    if(isAtPosition(position,referencePositions.halfLeftTilt)){
        previousPosition = referencePositions.halfLeftTilt;
        return "halfLeftTilt";
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
        case "halfLeftTilt": loadSample();  console.log("audioTilt"); break; 
        case "halfRightTilt": loadSnare(); console.log("audioTilt"); break;
        case "leanAway ": loadHitHats(); console.log("hats played"); 
        case "leanTowards": loadHitHats(); console.log("hats played"); break;

        default: break;
    }
}