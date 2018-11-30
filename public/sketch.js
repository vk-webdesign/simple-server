var canvas;
var myFont;
var song;
var amp;

var chime;

var sounds = [];
var circles = [];

//keeps track of amp levels
var volGraph = [];

var textAdvice;

//RECTANGLES
//var m = 0;
//var move1 = 1;



function preload() {
  soundFormats('m4a');
  for (var i = 0; i < 10; i++) {
    sounds.push(loadSound('assets/sound/glockenspiel.m4a'));
  }

  soundFormats('mp3');
  song = loadSound('assets/sound/Broken.mp3');
}

function setup() {
  myFont = loadFont('assets/font/RobotoCondensed-Bold.ttf');
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  amp = new p5.Amplitude();

  angleMode(DEGREES);

  loadJSON('http://api.adviceslip.com/advice', gotData);

  song.play();
  song.loop();
  }

  var pts;
  function gotData(data) {
    print(data.slip.advice);
    textAdvice = data;
    stroke(255);
    strokeWeight(1);
    pts = myFont.textToPoints(textAdvice.slip.advice)
  }

  window.onresize = function() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var size = 0;
    canvas.size(w,h);
    width = w;
    height = h;
    
  };

  var changeInX = 0.5;
  var x = 10;


 
  

function draw() {
  background(17,79,84);  

  //VOL GRAPH
  var vol = amp.getLevel();
  volGraph.push(vol);
  stroke(185,201,217);
  noFill();
  strokeWeight(2);
  beginShape();
  for (var i = 0; i < volGraph.length; i++) {
    var y = map(volGraph[i], 0, 1, height/5*4+20, height/5*4-100);
    vertex(width/9*3+i, y);
  }
  endShape();

  if (volGraph.length > width/9*3) {
    volGraph.splice(0, 1);
  }

  //text
  textFont(myFont);
  fill(185,201,217);
  noStroke();
  textAlign(CENTER);

  if (textAdvice) {
  textSize(width/500+x);

  if (x > 15){
    changeInX = 0.4;
  }
  if (x > 20){
    changeInX = 0.03;
  }
  if (x > 25){
    changeInX = 0.02;
  }
 
  if (x > 35) {
    x = 0;
    loadJSON('http://api.adviceslip.com/advice', gotData);
    changeInX = 0.5;
  }
  
  text(textAdvice.slip.advice, width/2, height/5*3+height/8-20);
  
  }
  x = x + changeInX;
  //print(x);

    //RECTANGLE
    rectMode(CORNER);
    noFill();
    stroke(185,201,217);
    strokeWeight(15);
    rect(width/9*3, height/9, width/9*3-5, height/6*3);


    stroke(185,201,217,30);
    strokeWeight(1);
    for (var i = 0; i < volGraph.length; i++) {
      var y = map(volGraph[i], 0, 1, height/6*3, height/9);
      line(width/9*3, y, width/9*6-5, y);
    }
  }



  //RACTANGLE ZOOM
    //noFill();
    //stroke(185,201,217);
    //strokeWeight(1);

  
    //m = m - move1;
      //for (var w = width/9*3-20; w >= 10; w = w - 25) {
      //  rectMode(CENTER);
      //  noFill();
      //  stroke(185,201,217);
      //  strokeWeight(1);
      //  rect(width/2-2-m, height/9*3+25, w+m, w);
      //}

    //for (var i = 15; i <= width/9*3; i=i+40) {
      //rectMode(CENTER);
      //noFill();
      //stroke(185,201,217);
      //strokeWeight(1);
      //rect(width/2+2, height/9*3+25, i+m, i+m);
    //}
  //print(m);





  //fill(237,221,212,150);
  //noStroke();
  //ellipse(width/2, height/2, width-50, vol*200);
  
  
  
  //var level = amp.getLevel();
  //var size = map (level, 0, 1, 0, 200);

  //ellipse(width/2,height/2,size,size);

  // LINES
//  if (level >= 0.63) {
//    background(0);
//    stroke(255,0,0);
//    var x = random(100,width-100);
//    line(100,100, x,1200);
//    line(100,height/2, x,height-100);
//    line(width-100,height/2, x,100);
//  }