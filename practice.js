const canvas = document.getElementById("canvas-Element")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(ctx);



const mouse ={
    x: undefined, // null lacks identification
    y: undefined
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x
    mouse.y = event.y
    //console.log(event);

    for(let i = 0; i < 10; i++){ 
       particlesArray.push(new Particle);
    }
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x 
    mouse.y = event.y
   /* 
    for(let i = 0; i < 10; i++){ 
        particlesArray.push(new Particle);
     }
   */
})


class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y
        //this.x = Math.random() * canvas.width
        //this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(){
        ctx.fillStyle ="red";
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.size,0, Math.PI*2);
        ctx.fill();
    }
}

const particlesArray = []

/*
function initialise(){
    for(let  i = 0; i < 100; i++){
        particlesArray.push(new Particle())
    }
}
console.log(particlesArray);
*/
function handleParticles(){
    for(let i = 0; i<particlesArray.length; i++){

        particlesArray[i].update();
        particlesArray[i].draw();

        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i,1);
            console.log(particlesArray.length);
            i--;
        }
    }

}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}
animate();
