const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var coelho_img;
var fruta_img;
var fundo_img
var coelho
var botao
var coelhocomendo
var coelhopiscando
var coelhotriste
var somdefundo
var somdocoelhotriste
var somdocoelhocomendo
var somdacordacortando
var somdesopro
var balaodear
var botaodemute
var botaodois
var botaotres
var cordadois
var cordatres
var fruit_condois
var fruit_contres

function preload(){
fundo_img=loadImage("background.png")
fruta_img=loadImage("melon.png")
coelho_img=loadImage("Rabbit-01.png")
coelhocomendo=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
coelhopiscando=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
coelhotriste=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
coelhocomendo.playing= true
coelhopiscando.playing= true 
coelhotriste.playing= true
coelhocomendo.looping= false
coelhotriste.looping= false
somdefundo = loadSound("sound1.mp3")
somdocoelhotriste = loadSound("sad.wav")
somdocoelhocomendo = loadSound("eating_sound.mp3")
somdacordacortando = loadSound("rope_cut.mp3")
somdesopro = loadSound("air.wav")
}
function setup() 
{
  var ismobile = /iPhone|iPed|iPod|Android/i.test(navigator.userAgent)
  if(ismobile){
    canW=displayWidth
    canH=displayHeight
    createcanvas(displayWidth,displayHeight)
  }
  else{
    canW=windowWidth
    canH=windowHeight
    createCanvas(windowWidth,windowHeight);
  }
  
  
  somdefundo.play()
  somdefundo.setVolume(0.5)
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH,600,20);

  rope = new Rope(8,{x:40,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);
  cordadois = new Rope(7,{x:370,y:40});
  cordatres = new Rope(4,{x:400,y:225});
  fruit_con = new Link(rope,fruit);
  fruit_condois = new Link(cordadois,fruit);
  fruit_contres = new Link(cordatres,fruit);
coelho= createSprite(canW/2,canH-80,100,100)

coelho.scale=0.2
coelhopiscando.frameDelay= 10
coelhocomendo.frameDelay= 10
coelhotriste.frameDelay= 10
coelho.addAnimation("comendo",coelhocomendo)
coelho.addAnimation("piscando",coelhopiscando)
coelho.addAnimation("triste",coelhotriste)
coelho.changeAnimation("piscando")

botao= createImg("cut_btn.png")
botao.position(20,30)
botao.size(50,50)
botao.mouseClicked(drop)
botaodois= createImg("cut_btn.png")
botaodois.position(330,35)
botaodois.size(50,50)
botaodois.mouseClicked(dropdois)
botaotres= createImg("cut_btn.png")
botaotres.position(340,200)
botaotres.size(50,50)
botaotres.mouseClicked(droptres)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER)
  balaodear = createImg("balloon.png")
  balaodear.position(10,250)
  balaodear.size(150,100)
  balaodear.mouseClicked(Balaodear)

  botaodemute = createImg("mute.png")
  botaodemute.position(40,20)
  botaodemute.size(50,50)
  botaodemute.mouseClicked(Mute)
}

function draw() 
{
  background(51);
  image(fundo_img,0,0,displayWidth,displayHeight*2)

  rope.show();
  cordadois.show();
  cordatres.show();

  if (fruit!=null){

  
  image(fruta_img,fruit.position.x,fruit.position.y,60,60);
  }
  ground.show();

   Engine.update(engine);
   if (collid(fruit,coelho)=== true){
    coelho.changeAnimation("comendo")
    somdocoelhocomendo.play()
   }
   if (collid(fruit,ground.body)=== true){
    coelho.changeAnimation("triste")
    somdocoelhotriste.play()
    somdefundo.stop()
   }
   drawSprites()
}
function drop(){
  somdacordacortando.play()
  rope.break()
  fruit_con.detach()
  fruit_con= null
}
function collid(body,sprite){
  if (body!=null){
    var d= dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if (d<=80){
      World.remove(engine.world,fruit)
      fruit=null
      return true
    }
    else {
      return false
    }
  }
}
function Balaodear(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
somdesopro.play();
}
function Mute(){
  if (somdefundo.isPlaying()){
    somdefundo.stop()
  }
  else{
    somdefundo.play()
  }
}
function dropdois(){
  somdacordacortando.play()
  cordadois.break()
  fruit_condois.detach()
  fruit_condois= null
}
function droptres(){
  somdacordacortando.play()
 cordatres.break()
  fruit_contres.detach()
  fruit_contres= null
}
