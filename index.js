alert("Please use a mobile device to explore this site")
alert("Press start to start audio context")

//Retrieve Html Elements:
const startButton = document.querySelector(".button-One");

// This creates a web audio api context
const audioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

//Retrieve Canvas Elements:
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');


//Define Array Variable:
let particlesArray=[];

let mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("click", function(event){
    mouse.x = event.x;
    mouse.y = event.y;

    console.log("hello");

    for(let i=0; i<10; i++){
        particlesArray.push(new Particle);
    }
})

//Create Particle Object 
class Particle{
    constructor(color){
        this.color = color;
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5 
        this.speedY = Math.random() * 3 - 1.5
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    drawCircles(){
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.size, 0, Math.PI * 2)
        ctx.fill();
        ctx.fillStyle = this.color;

    }
}
function instantiateParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].drawCircles();

        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i,1);
            i--;
        }
    }
}
function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    instantiateParticles();
    requestAnimationFrame(animate);
}
animate();

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
        x: -5,
        y: 0,
        z: 0
    },
    halfLeftTilt: {
        x:5,
        y:0,
        z:0
    },
    leftTilt    : {
        x: 5,
        y: 0,
        z: 0
    },
    leanAway    : {
        x: 0,
        y: 5,
        z: 11
    },
    leanTowards : {
        x: 0,
        y: 5,
        z: -8
    },
    leftSide: {
        x:5,
        y:-1,
        z: 8
    },
    rightSide: {
        x:-5,
        y:1,
        z:8
    }
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
    leanAway    : 'leanAway    ',
    leftSide    : 'leftSide',
    rightSide   : 'rightSide'
});

// Initialises the position of the phone to the origin position 
let previousPosition = referencePositions.origin;

let audio;

fetch("./Sounds/Snare - 1.wav")
.then(data => data.arrayBuffer())
.then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
.then(decodedAudio => {audio = decodedAudio});

function playback(){
    const playSound = audioCtx.createBufferSource();

    playSound.buffer = audio;
    playSound.connect(audioCtx.destination);
    playSound.start(audioCtx.currentTime);

    for(let i=0; i<10; i++){
        particlesArray.push(new Particle("red"));
    }
}

let audio_Hat

fetch("./Sounds/Hi-Hat - 1.wav")
.then(data_Hat => data_Hat.arrayBuffer())
.then(arrayBuffer_Hat => audioCtx.decodeAudioData(arrayBuffer_Hat))
.then(decodedAudio_Hat => {audio_Hat = decodedAudio_Hat});

function loadHitHats(){
      const playHat = audioCtx.createBufferSource();

      playHat.buffer = audio_Hat;
      playHat.connect(audioCtx.destination);
      playHat.start(audioCtx.currentTime);

      for(let i=0; i<10; i++){
        particlesArray.push(new Particle("purple"));
    }
}

let audio_Kick

fetch("./Sounds/Kick - 1.wav")
.then(data_Kick => data_Kick.arrayBuffer())
.then(arrayBuffer_Kick => audioCtx.decodeAudioData(arrayBuffer_Kick))
.then(decodedAudio_Kick => {audio_Kick = decodedAudio_Kick});

function loadKick(){

    const playKick = audioCtx.createBufferSource();

    playKick.buffer = audio_Kick;
    playKick.connect(audioCtx.destination);
    playKick.start(audioCtx.currentTime);

    for(let i=0; i<10; i++){
        particlesArray.push(new Particle("green"));
    }

}

let audio_Shaker

fetch("./Sounds/Shaker - 2.wav")
.then(data_Shaker  => data_Shaker.arrayBuffer())
.then(arrayBuffer_Shaker => audioCtx.decodeAudioData(arrayBuffer_Shaker))
.then(decodedAudio_Shaker => {audio_Shaker = decodedAudio_Shaker});

function loadShaker(){

    const playShaker = audioCtx.createBufferSource();

    playShaker.buffer = audio_Shaker;
    playShaker.connect(audioCtx.destination)
    playShaker.start(audioCtx.currentTime);

    for(let i=0; i<10; i++){
        particlesArray.push(new Particle("blue"));
    }
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
        document.getElementById('x').innerHTML = 'x: ' + Math.floor(event.target.x);
        document.getElementById('y').innerHTML = 'y: ' + Math.floor(event.target.y);
        document.getElementById('z').innerHTML = 'z: ' + Math.floor(event.target.z);

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
    let offset = 5;
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
    if(isAtPosition(position,referencePositions.leftSide)){
        previousPosition = referencePositions.leftSide;
        return "leftSide";
    }
    if(isAtPosition(position,referencePositions.rightSide)){
        previousPosition = referencePositions.rightSide;
        return "rightSide";
    }

    return ("ERROR: x:" + position.x + ", y: "+ position.y + ", z: " + position.z)
}
acl.start();
function sendSensorData(data){
    if(data.includes("ERROR")) return;
    
    switch(data){
        case "halfLeftTilt": loadKick();  console.log("audio_Kick"); break; 
        case "halfRightTilt": playback(); console.log("audio_Snare"); break;
        case "leanAway": loadHitHats(); console.log("hats played"); break;
        case "leanTowards": loadHitHats(); console.log("hats played"); break;
        case "leftSide": loadShaker(); console.log("shaker played"); break;
        case "rightSide": loadShaker(); console.log("shaker played"); break;

        default: break;
    }
}