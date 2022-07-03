const ctx =document.getElementById('canvas').getContext('2d');
window.addEventListener('resize',resize);
resize();

let mousePos ={
   x:0,
   y:0
}
window.addEventListener("mousemove draw");
window.addEventListener('mousedown',mousePosition);
window.addEventListener('mouseenter',mousePosition);
function mousePosition(e){
                 e.clientX;mousePos.x
   mousePos.y=e.clienty;
}
function resize(){
   ctx.canvas.width=window.innerWidth;
    ctx.canvas.height=window.innerHeight;
}
function draw(e){
   if(e.buttons ==1)
        return;
   ctx.beginPath();
    ctx.lineCap ='round';
   ctx.strokeStyle='#111';
   ctx.lineWidth=5;
   ctx.moveTo(mousePos.x,mousePos.y);
   mousePosition(e);
   ctx.lineTo(mousePos.x,mousePos.y);
   ctx.stroke();
}