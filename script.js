const stars = document.getElementById('stars');
const moon = document.getElementById('moon');
const mountains_behind = document.getElementById('mountains_behind');
const text = document.getElementById('text');
const btn = document.getElementById('btn');
const mountains_front = document.getElementById('mountains_front');
const header = document.querySelector('header');


// Add scroll event listener
window.addEventListener('scroll', function() {
  // Get the current scroll position
  let value = window.scrollY;
  
  // Update element styles based on scroll position
  stars.style.left = value * 0.25 + 'px';
  moon.style.top = value * 1.05 + 'px';
  mountains_behind.style.top = value * 0.5 + 'px';
  mountains_front.style.top = value * 0 + 'px';
  text.style.marginRight = value * 4 + 'px';
  text.style.marginTop = value * 1.5 + 'px';
  btn.style.marginTop = value * 1.5 + 'px';
  header.style.top = value * 0.5 + 'px';
});

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var particlesOnScreen = 245;
var particlesArray = [];
var w,h;
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

function random(min, max) {
    return min + Math.random() * (max - min + 1);
};

function clientResize(ev){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
};
window.addEventListener("resize", clientResize);

function createSnowFlakes() {
    for(var i = 0; i < particlesOnScreen; i++){
        particlesArray.push({
            x: Math.random() * w,  
            y: Math.random() * h,  
            opacity: Math.random(),  
            speedX: random(-11, 11),  
            speedY: random(7, 15),    
            radius:random(0.5, 4.2),
        })
    }
};

function drawSnowFlakes(){
    for(var i = 0; i < particlesArray.length; i++){    
        var gradient = ctx.createRadialGradient(  
            particlesArray[i].x,   
            particlesArray[i].y,   
            0,                     
            particlesArray[i].x,   
            particlesArray[i].y,   
            particlesArray[i].radius  
            );

            gradient.addColorStop(0, "rgba(255, 255, 255," + particlesArray[i].opacity + ")");  // white
            gradient.addColorStop(.8, "rgba(210, 236, 242," + particlesArray[i].opacity + ")");  // bluish
            gradient.addColorStop(1, "rgba(237, 247, 249," + particlesArray[i].opacity + ")");   // lighter bluish
          
            ctx.beginPath(); 
            ctx.arc(
            particlesArray[i].x,  
            particlesArray[i].y,  
            particlesArray[i].radius,  
            0,                         
            Math.PI*2,                 
            false                     
            );

        ctx.fillStyle = gradient;   
        ctx.fill();                 
    }
};

function moveSnowFlakes(){
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].x += particlesArray[i].speedX;     
        particlesArray[i].y += particlesArray[i].speedY;     

        if (particlesArray[i].y > h) {                                                                               
            particlesArray[i].x = Math.random() * w * 1.5;
            particlesArray[i].y = -50;
        }
    }
};

function updateSnowFall  () {
    ctx.clearRect(0, 0, w, h);
    drawSnowFlakes();
    moveSnowFlakes();
};

setInterval(updateSnowFall,50);
createSnowFlakes();



