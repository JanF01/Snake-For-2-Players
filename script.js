const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

if(screen.width>1366){
   canvas.style.transform='scale(1.2)';
  canvas.style.marginTop='50px';
}
else if(screen.width>1200){
   canvas.style.transform='scale(1.2)';
  canvas.style.marginTop='50px';
}
canvas.width = 500;
canvas.height = 500;

const canvasw = canvas.width;
const canvash = canvas.height;

let scale = 20;
let hardnes;

var flags = {
  zas: 0,
  pick: 1,
  direction: 0,
}


class food{

  constructor(x,y,state){
    this.x = x*scale;
    this.y = y*scale;
    this.state = state;
    this.size = scale;
    this.bombT = 0;
    this.bombIs = 0;
  }
  refresh(){
     ctx.strokeStyle='white';
     ctx.lineWidth = 10;
    if(this.bombT>1){this.bombT-=1;}
    switch(this.state){
      case 'n':
        ctx.fillStyle='#701020';
        ctx.fillRect(this.x,this.y,this.size,this.size);
        ctx.stroke();
      break;
        case 'd':
        ctx.fillStyle='#107020';
        ctx.fillRect(this.x,this.y,this.size,this.size);
      break;
        case 's':
        ctx.fillStyle='rgb(255,255,42)';
        ctx.fillRect(this.x,this.y,this.size,this.size);
      break;
        case 'l':
        ctx.fillStyle='blue';
        ctx.fillRect(this.x,this.y,this.size,this.size);
      break;
        case 'b':
        ctx.fillStyle='black';
        ctx.fillRect(this.x,this.y,this.size,this.size);
      break;
    }
  }
  cheak(){
    if((this.x == Pociong.X && this.y == Pociong.Y) || (this.x == Pociong2.X && this.y == Pociong2.Y) || (this.bombIs && this.bombT==1)){
    if(this.x == Pociong.X && this.y == Pociong.Y){
     Pociong.eat(this.state);
    }
    else if(this.x == Pociong2.X && this.y == Pociong2.Y){
      Pociong2.eat(this.state);
    }
    this.x = Math.floor(Math.random()*25)*scale;
    this.y = Math.floor(Math.random()*25)*scale;
     this.bombT=0;
     this.bombIs=0;
      let random = Math.random()*100;
      if(random>=0 && random<=55){this.state='n';}
    else if(random>=56 && random<=70){this.state='d';}
    else if(random>=71 && random<=80){this.state='s';}
    else if(random>=81 && random<=90){this.state='b'; this.bombIs=1;this.bombT=150;}
    else if(random>=91 && random<=100){this.state='l';}
    }
  }
}

class Snake{

  constructor(x,y,c){
    this.X = x*scale;
    this.Y = y*scale;
    this.speedX = 0;
    this.speedY = 0;
    this.time = 0;
    this.speedT;
    this.fast = 0;
    this.slow = 0;
    this.color = c;
    this.size = scale-2;
    this.body = [[this.X,this.Y]];
  }
  refresh(){
    ctx.fillStyle = this.color;
    for(let i=0;i<this.body.length;i++){
      ctx.fillRect(this.body[i][0],this.body[i][1],this.size,this.size);
    }
  }
  set(x,y){
    if(this.body.length==1 || !(x == -this.speedX/scale && y ==-this.speedY/scale)){
    this.speedX=x*scale;
    this.speedY=y*scale;
    }
  }
  move(){
    if(this.time == 0){
    if(this.body.length>1){
      for(let i=this.body.length-1;i>0;i--){
        this.body[i] = this.body[i-1];
      }
    }
    this.X+=this.speedX;
    this.Y+=this.speedY;
    this.body[0]=[this.X,this.Y];

    this.time=this.speedT;
      if(this.slow>1){this.slow--;}
      else if(this.slow==1){this.speedT-=3;this.slow=0;}
      if(this.fast>1){this.fast--;}
      else if(this.fast==1){this.speedT+=2;this.fast=0;}
  }
    else{
      this.time--;
    }
  }
  colision(x){
    if(this.X==canvasw || this.X<0 || this.Y<0 || this.Y==canvash){
       this.won();
         return true;
    }
    for(let i=1;i<x.length;i++){
      if(this.X==x[i][0] && this.Y==x[i][1]){
      this.won();
         return true;
      }
    }

    if(this.body.length>3){
    for(let i=2;i<this.body.length;i++){
      if(this.X==this.body[i][0] && this.Y==this.body[i][1]){
           this.won();
         return true;
      }
    }
    }

  }
  eat(state){
    if(state == 'd'){
      for(let i=0;i<2;i++){
        this.body.push([this.body[this.body.length-1][0],this.body[this.body.length-1][1]]);
      }
    }
    else if(state=='n' || state=='s' || state=='l'){
        this.body.push([this.body[this.body.length-1][0],this.body[this.body.length-1][1]]);
      if(state=='s'){
        if(this.fast==0){this.fast+=30;this.speedT-=2;}

      }
      else if(state=='l'){
        if(this.slow==0){this.slow+=30;this.speedT+=3;}
      }
    }
    else if(state=='b'){
      this.won();
    }
  }

  won(){

    start(0);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvasw,canvash);
    ctx.fillStyle = 'white';
    ctx.font = '35px monospace';
    if(this.color=="black"){ctx.font = '33px monospace'; ctx.fillText('Gratulacje, Fioletowy Graczu',10,100);}
    else if(this.color=='#900050'){ctx.fillText('Gratulacje, Czarny Graczu', 10, 100);}


    ctx.fillText('Kliknij Q - Menu', 100, 250);
    flags.zas=1;
    flags.pick=0;


    Pociong = new Snake(17,12,"black");
    Pociong2 = new Snake(7,12,"#900050");
  Pociong.move();
    Pociong2.move();
    f1 = new         food(Math.floor(Math.random()*25),Math.floor(Math.random()*25),'n');
f2 = new food(Math.floor(Math.random()*25),Math.floor(Math.random()*25),'d');
  }

}


Pociong = new Snake(17,12,"black");
Pociong2 = new Snake(7,12,"#900050");
f1 = new food(Math.floor(Math.random()*25),Math.floor(Math.random()*25),'n');
f2 = new food(Math.floor(Math.random()*25),Math.floor(Math.random()*25),'d');


function draw(){
  ctx.fillStyle = "#bbbbbb";
  ctx.fillRect(0,0,canvasw,canvash);
  let a = Pociong2.colision(Pociong.body);
  let b = Pociong.colision(Pociong2.body);
  if(!a && !b){
  Pociong.move();
  Pociong2.move();
   f1.cheak();
  f2.cheak();
  Pociong.refresh();
  Pociong2.refresh();
    f1.refresh();
  f2.refresh();
  }


}


function checkKey(e){
  if(e.keyCode=='38'){// up arrow
     Pociong.set(0,-1);
    Pociong.time = 0;
     Pociong.move();
    }
  else if(e.keyCode=='39'){// right arrow
     Pociong.set(1,0);
    Pociong.time = 0;
      Pociong.move();
    }
  else if(e.keyCode=='40'){// down arrow
     Pociong.set(0,1);
    Pociong.time = 0;
      Pociong.move();
    }
  else if(e.keyCode=='37'){// left arrow
     Pociong.set(-1,0);
    Pociong.time = 0;
      Pociong.move();
    }
  else if(e.keyCode=='65'){
       if(flags.pick){
        Pociong.speedT=5;
        Pociong2.speedT=5;
         flags.pick=false;
         hardnes='EASY';
         flags.zas=2;
          start();
       }
    else{
      Pociong2.set(-1,0);
      Pociong2.time = 0;
        Pociong2.move();
    }
    }
  else if(e.keyCode=='66'){
        if(flags.pick){
        Pociong.speedT=3;
        Pociong2.speedT=3;
         flags.pick=false;
          hardnes='MEDIUM';
          flags.zas=2;
           start();
       }
    }
  else if(e.keyCode=='67'){
        if(flags.pick){
        Pociong.speedT=2;
        Pociong2.speedT=2;
         flags.pick=false;
          hardnes='HARD';
          flags.zas=2;
           start();
       }
  }
  else if(e.keyCode=='68'){
        if(flags.pick){
        Pociong.speedT=1;
        Pociong2.speedT=1;
         flags.pick=false;
          hardnes='INPOSSIBLE';
          flags.zas=2;
             start();
        }
     else{
      Pociong2.set(1,0);
       Pociong2.time = 0;
          Pociong2.move();
    }
       }
  else if(e.keyCode=='87'){
   Pociong2.set(0,-1);
           Pociong2.time = 0;
       Pociong2.move();
  }
   else if(e.keyCode=='83'){
   Pociong2.set(0,1);
            Pociong2.time = 0;
        Pociong2.move();
  }
  else if(e.keyCode=='81'){
    if(flags.zas==1) {pick();flags.zas=0;flags.pick=1}
    else if(!flags.zas) {zasady();flags.zas=1;}
  }
}

document.addEventListener("keydown",checkKey);

function zasady(){

  ctx.fillStyle = "#999999";
  ctx.fillRect(0,0,canvasw,canvash);
  ctx.fillStyle= "rgb(217,200,85)";
  ctx.font='20px monospace';
  ctx.fillStyle= '#701020';
  ctx.fillRect(50,50,scale,scale);
  ctx.fillText("- 1 punkt, przedłużenie węża o 1", 80, 67.5);
  ctx.fillStyle= '#107020';
  ctx.fillRect(50,100,scale,scale);
  ctx.fillText("- 1 punkt, przedłużenie węża o 2",80, 117.5);
  ctx.fillStyle= 'rgb(255,255,42)';
  ctx.fillRect(50,150,scale,scale);
  ctx.fillText("- 1 punkt, przyśpieszenie",80, 167.5);
   ctx.fillStyle= 'blue';
  ctx.fillRect(50,200,scale,scale);
  ctx.fillText("- 1 punkt, spowolnienie",80, 217.5);
  ctx.fillStyle= 'black';
  ctx.fillRect(50,250,scale,scale);
  ctx.fillText("- Przegrana!!!, bomba",80, 267.5);
  ctx.font='25px monospace';
  ctx.fillText("Przeciwnik musi uderzyć w ciebie,", 30, 330);
  ctx.fillText("lub w ścianę byś wygrał :D",70,370);
  ctx.font='18px monospace';
  ctx.fillText("Przytrzymaj przycisk - super przyśpieszenie",30,415);
  ctx.font='35px monospace';
  ctx.fillText("Kliknij Q - Powrót", 80, 470);
}
function pick(){

  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvasw,canvash);
  ctx.fillStyle = "rgb(217,200,85)";
  ctx.font='25px monospace';
  ctx.font='35px monospace';
  ctx.fillStyle='white';
  ctx.fillText('Snake Doubleplayer', 75,50);
  ctx.fillText('Kliknij Q - Zasady Gry',40,120);
  ctx.font='20px monospace';
  ctx.fillText('Wybierz poziom trudności',110,250);
  ctx.fillText('Klikając przycisk na klawiaturze:',60,290);
  ctx.fillStyle="green";
  ctx.fillRect(12.5,330,100,100);
  ctx.fillStyle="orange";
  ctx.fillRect(140,330,100,100);
  ctx.fillStyle="red";
  ctx.fillRect(265,330,100,100);
  ctx.fillStyle="grey";
  ctx.fillRect(387.5,330,100,100);
  ctx.fillStyle= 'white';
  ctx.font = '100px monospace';
  ctx.fillText("A",37.5,410);
  ctx.fillText("B",162.5,410);
  ctx.fillText("C",287.5,410);
  ctx.fillText("D",412.5,410);

}


function game(){
draw();
}

var fps = 40;
pick();
var interv;
function start(x){
  if(x==0){
   clearInterval(interv);
  }
  else{
   interv = setInterval(game,1000/fps);
  }
}
