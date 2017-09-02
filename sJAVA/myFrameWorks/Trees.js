function Tree(name){
   this.name = name;
   this.x =900;
   this.y =350;
   this.rule = new Rule(0,0,0);
   this.canvas = this.rule.canvas;
   this.rotate = new Point(0,0,0);
   this.listener = new Event(this);
   this.dirControl = new DirControl(this, "dirControl");
   this.ruleStr = "mary::iFxFxFz*eFx*S(12)";
   this.turtleMode = "turtle";
   this.size = 50;
   this.depth = 3;
   this.selectSpawnExpand = false;


this.run = function(){
   this.rule.canvas.orgin=this.canvas.orgin;
//   this.rule.canvas.rotate.set(this.rotate.x,this.rotate.y,this.rotate.z);
   this.runRule();
};
this.start = function(){
    new MenuThis(null,'frameMenu').clear();
    this.dirControl.resetTxt = "draw";
    this.dirControl.funct("turtle", 900,420);
    document.onwheel = null;
    document.onmousemove = null;
    document.onclick = () =>{
        this.canvas.orgin.x = event.clientX;
        this.canvas.orgin.y = event.clientY;
    };
    this.runRule();
};
this.now = function(){
   var myNow = new Date();
   return myNow;
}; 
this.runRule = function(){
   var startTime = this.now();
   recorder.record(this.ruleStr);
   this.canvas.clearScreen("#d7c457");
   var startTime = this.now();   
   this.rule.canvas.rotate.set(this.rotate.x,this.rotate.y,this.rotate.z);
   var i = this.rule.rule(0,0,0,this.ruleStr,30,this.depth); 
   startTime = this.now() - startTime; 
   this.ruleStrPost(i,startTime);
//Menus
   this.selectSpawn(1050,300); 
   this.menu();  
};
this.ruleStrAdd = function(str){
   this.ruleStr += str;
   this.runRule();
};
this.ruleStrClear = function(){
   this.ruleStr = "kate:";
   this.selectSpawnExpand = false;
   this.runRule();
};
this.ruleStrDelete = function(){
   if(this.ruleStr[this.ruleStr.length-1] == "*"){
      this.selectSpawnExpand = !this.selectSpawnExpand;
      }
   this.ruleStr = this.ruleStr.substring(0,this.ruleStr.length-1);
   this.runRule();
};
this.ruleStrDeleteToStar = function(){
   for(var i = 0; this.ruleStr[this.ruleStr.length-1]; i++){ 
      if(this.ruleStr[this.ruleStr.length-1] == "*"){
         this.runRule();
         return this.ruleStr;
      }
      else if(this.ruleStr[this.ruleStr.length-1] != "*"){
         this.ruleStr = this.ruleStr.substring(0,this.ruleStr.length-1);
      }
   }
};

this.ruleStrPost = function(i,duration){

   this.canvas.switchCanvas("txt");
    this.canvas.clearPage();
   this.canvas.setTxtColor("#333333");
   this.canvas.setTxtSize(8);
   this.canvas.setTxtSize(14);
   this.canvas.setFont(4);
   this.canvas.color = "slateGrey";
   this.canvas.rectXY(1052,495,140,90);
   this.canvas.textXYinBox("XYZ: "+this.rule.canvas.XYZtype,1062,532,"#223322","lightBlue");
   this.canvas.textXYinBox(this.rule.last.x+":"+this.rule.last.y+":"+this.rule.last.z,
                             1062,512,"#332233","lightBlue");
   this.canvas.textXYinBox("i: "+i,1102,552,"#223322","lightBlue");
   this.canvas.textXYinBox("size:"+this.rule.size,1062,552,"#332233","lightBlue");
   this.canvas.textXYinBox(this.rule.canvas.color,1062,572,"black",this.rule.canvas.color);
   this.canvas.textXYinBox(duration.toString(),1112,572,"blue",this.rule.canvas.color);
   this.canvas.rotate.set(this.rotate.x,this.rotate.y,this.rotate.z);
   this.canvas.rotateOut(1140,510);   
   this.canvas.textXYinBox(this.ruleStr, 300, 600, "lightBlue","navy");
   this.canvas.textXYinBox(this.rule.rulesStr, 300, 625, "lightBlue","navy");
   this.canvas.switchCanvas("drawing");
};
this.menu = function(){
   var x = this.x;
   var y = this.y;
   var treeMenu = new MenuThis(this, "program");

//Delete/DeleteToStar/clear/rotate/exit

   treeMenu.clear().setBGcolor('white')
    .btn("clear" , x    , y    , () => this.ruleStrClear()            , 32,32, "TcTC")
    .btn("delTo*", x+40 , y    , () => this.ruleStrDeleteToStar()     , 40,40, "TcBxTc")
    .btn(".DEL"  , x+90 , y    , () => this.ruleStrDelete()           , 52,52, "CrTCTcCb[Fx]Fz]Bz]Bx")  
    .btn("back"  , x-45 , y    , () => this.exit()                    , 32,32, "WxWxFxFxFx[WxWzTvWxMzTv")
    .btn("rotate", x    , y-50 , () => { 
                                        this.dirControl.resetTxt='stop';
                                        this.dirControl.funct('Rotate', 900,420)
                                       }                              , 40,40, "TCTc[Fx]Fz]Fx")

//Select Color
   .btn("red"    , x-25 , y+145, () => this.ruleStrAdd('Cr'), 32,32, "Cr[By]Fx]TcTCSdTcTCS1Tc")
   .btn("blue"   , x+20 , y+145, () => this.ruleStrAdd('Cb'), 32,32, "Cb[Fy]Fx]TcTCSdTcTCS1Tc")
   .btn("green"  , x+65 , y+145, () => this.ruleStrAdd('Cg'), 32,32, "Cg[Fx]Fz]TcTCSdTcTCS1Tc")
   .setBGcolor(this.canvas.random_hexColor())
   .btn("random" , x+110, y+145, () => this.ruleStrAdd('Cx'), 32,32, "Cx[By]Bz]TcCxTCSdCxTcCxTCS1CxTc")

//Select Size
   .setBGcolor('white')
   .btn("30"     , x-25 , y+185, () => this.ruleStrAdd('S1'), 30,30, "TC")
   .btn("50"     , x+11 , y+185, () => this.ruleStrAdd('S3'), 50,50, "TC")
   .btn("s/2"    , x+68 , y+185, () => this.ruleStrAdd('Sd'), 25,25, "MxMzTCWzTc")
   .btn("s*2"    , x+100, y+185, () => this.ruleStrAdd('S2'), 50,50, "TcFxFzTC")
   .btn("random" , x-68 , y+185, () => this.ruleStrAdd('Sx'), 35,35, "TBFxFzBx") 
////////change depth
   .btn("depth +", 1100 , 0    , () => { this.depth += 1;this.run() }, 40,20, "CgSdWzWxTc")
   .setBGcolor("#DDDDDD")
   .textXY(this.depth,1110,25).css("color","lightBlue").css("backgroundColor","slateBlue").css('font-size','16px')
   .btn("depth -", 1100 , 50   , () => { this.depth -= 1;this.run() }, 40,20,"CgSdWzWxTc");  
  
};

this.selectSpawn = function(x,y){
   var selectMenu = new MenuThis(this, "subMenu");
   if(this.selectSpawnExpand){
//SpawnPointMenu
    selectMenu.clear().setBGcolor("yellow")
      .btn("Exit<br>Spawn<br>Mode", x-50 , y    , () => { this.selectSpawnExpand = false; this.ruleStrAdd('*') }, 40,40, "*")
      .setBGcolor("#CADF3E")
      .btn("+x"  , x    , y-150, () => this.ruleStrAdd('+x'), 42,42, "Cr[Fr")  
      .btn("+y"  , x+50 , y-150, () => this.ruleStrAdd('+y'), 42,42, "Cg[Fs")
      .btn("+z"  , x+100, y-150, () => this.ruleStrAdd('+z'), 42,42, "Cb[Ft")
       
      .btn("Fx"  , x    , y-100, () => this.ruleStrAdd('Fx'), 42,42, "Cr[Fx")  
      .btn("Fy"  , x+50 , y-100, () => this.ruleStrAdd('Fy'), 42,42, "Cg[Fy")
      .btn("Fz"  , x+100, y-100, () => this.ruleStrAdd('Fz'), 42,42, "Cb[Fz")

      .btn("s/d" , x    , y+50 , () => this.ruleStrAdd('Sd'), 45,45, "TCBxTc")
      .btn("s*d" , x+50 , y+50 , () => this.ruleStrAdd('SD'), 45,45, "TcFFzTC")
      .btn("s/2" , x+100, y+50 , () => this.ruleStrAdd('S2'), 45,45, "TCBxTBTc")

      .btn("size", x    , y-50 , () => this.ruleStrAdd('S1'), 45,45, "TTcFxFzTc")
      .btn("zero", x+50 , y-50 , () => this.ruleStrAdd('S0'), 45,45, "TCBxTBTc")
      .btn("+z"  , x+100, y-50 , () => this.ruleStrAdd('+z'), 45,45, "Tc")

      .btn("base", x    , y    , () => this.ruleStrAdd('A0'), 45,45, "Tc[Fx]Fz]Fx")
      .btn("A3"  , x+50 , y    , () => this.ruleStrAdd('A3'), 45,45, "TCTc[Fx]Fz]Fx")
      .btn("grid", x+100, y    , () => this.ruleStrAdd('e') , 45,45, "i");

      }
   else{
      selectMenu.clear().setBGcolor("red")
      .btn("spawn<br><br>Point", x-50 , y    , () => { this.selectSpawnExpand = true; this.ruleStrAdd('*') }, 40,40, "*")
//      selectMenu.ruleStrBoxColor("TCTc[Fx]Fz]Fx","rotate","menu.dirControl.resetTxt='stop';menu.dirControl.funct('tree.Rotate')",x-45,y+47,40,"#888888");

//RotateMenu   
       /*
      selectMenu.ruleStrBox("Cr[Fr","Octa",this.name+".canvas.octagon(402,200,50);"
                                           +this.name+".canvas.octagonSideLine(405,208,45,1);"
                                           +this.name+".canvas.octagonSideLine(405,208,45,3);"
                                           +this.name+".canvas.octagonSideLine(405,208,45,5);"
                                           +this.name+".canvas.octagonSideLine(405,208,45,6);"
//                                           +this.name+".canvas.octagonSideLine(405,208,45,0);"
                                           +this.name+".canvas.octagonSideLine(405,208,45,7);"
                                           +this.name+".canvas.octagonSideLine(405,208,45,2)",x,y-150,42);  
      selectMenu.ruleStrBox("Cg[Fs","Penta",this.name+".canvas.pentagon(200,200,50);"
                                           +this.name+".canvas.agonSide(205,208,45,4,5)",x+50,y-150,42); 
      selectMenu.ruleStrBox("Cb[Ft","Hexa",this.name+".canvas.hexagon(300,200,50);"
                                          +this.name+".canvas.hexagonSpikes(300,200,50)",x+100,y-150,42); */

//lineXYMenu 
      .setBGcolor("#CADF3E")
      .btn("xz"    , x    , y+100, () => this.ruleStrAdd('Fr'), 42,42, "Cr[Fr")
      .btn("xy"    , x+50 , y+100, () => this.ruleStrAdd('Fs'), 42,42, "Cg[Fs") 
      .btn("yz"    , x+100, y+100, () => this.ruleStrAdd('Ft'), 42,42, "Cb[Ft")

      .btn("-xz"   , x    , y+50 , () => this.ruleStrAdd('Fu'), 42,42, "Cr[Fu")
      .btn("-xy"  , x+50 , y+50 , () => this.ruleStrAdd('Fv'), 42,42, "Cg[Fv")
      .btn("-yz"   , x+100, y+50 , () => this.ruleStrAdd('Fw'), 42,42, "Cb[Fw")
//BlockActionMenu
      .btn("recX"  , x    , y    , () => this.ruleStrAdd('Tx'), 42,42, "Tx") 
      .btn("triR"  , x+50 , y    , () => this.ruleStrAdd('Tr'), 42,42, "Tr") 
      .btn("cube"  , x+100, y    , () => this.ruleStrAdd('Tb'), 42,42, "SdWzWxS2Tb")

      .btn("recY"  , x    , y-50 , () => this.ruleStrAdd('Ty'), 42,42, "Ty")
      .btn("triL"  , x+50 , y-50 , () => this.ruleStrAdd('Tl'), 42,42, "Tl")
      .btn("grid"  , x+100, y-50 , () => this.ruleStrAdd('Tg'), 42,42, "Tg")
      .btn("recZ"  , x    , y-100, () => this.ruleStrAdd('Tz'), 42,42, "Tz")
      .btn("Bow"   , x+50 , y-100, () => this.ruleStrAdd('TB'), 42,42, "TB")
      .btn("circ"  , x+100, y-100, () => this.ruleStrAdd('Tc'), 42,42, "Tc")

      .btn("x"     , x    , y+150, () => this.ruleStrAdd('nx'), 42,42, "MxWzS2nx")
      .btn("i"     , x+50 , y+150, () => this.ruleStrAdd('ni'), 42,42, "MxWzS2S2ni")
      .btn("Circle", x+100, y+150, () => this.ruleStrAdd('TC'), 42,42, "TC")
      }
}; 
this.turtlexUp = function(){
  this.ruleStr += "Fy";
  this.runRule();
//  myAlert4("last:"+this.last.x+":"+this.last.y+":"+this.last.z);
};
this.turtlexDown = function(){
  this.ruleStr += "By";
  this.runRule();
//  myAlert4("last:"+this.last.x+":"+this.last.y+":"+this.last.z);
};
this.turtleyUp = function(){
  this.ruleStr += "Bx";
  this.runRule();
};
this.turtleyDown = function(){
  this.ruleStr += "Fx";
  this.runRule();
//  myAlert4("last:"+this.last.x+":"+this.last.y+":"+this.last.z);
};

this.turtlezUp = function(){
  this.ruleStr += "Fz";
  this.runRule();
//  myAlert4("last:"+this.last.x+":"+this.last.y+":"+this.last.z);
};
this.turtlezDown = function(){
  this.ruleStr += "Bz";
  this.runRule();
 // myAlert4("last:"+this.last.x+":"+this.last.y+":"+this.last.z);
};
this.turtlereset = function(){
//  this.ruleStr = "Sheri:";
      myAlert2(tree.turtleMode);
      this.turtleMode="tortus"
      this.dirControl.resetTxt = "move";
      this.dirControl.funct("tortus", 900, 420);
};
this.tortusxUp = function(){
  this.ruleStr += "My";
  this.runRule();
//  myAlert4("last:"+this.last.x+":"+this.last.y+":"+this.last.z);
  this.canvas.xyz.set(this.rule.last.x,this.rule.last.y,this.rule.last.z);
  this.canvas.grid(15);
  this.canvas.xyz.set(0,0,0);
};
this.tortusxDown = function(){
  this.ruleStr += "Wy";
  this.runRule();
//  myAlert4("last:"+this.last.x+":"+this.last.y+":"+this.last.z);
  this.canvas.xyz.set(this.rule.last.x,this.rule.last.y,this.rule.last.z);
  this.canvas.grid(15);
  this.canvas.xyz.set(0,0,0);
};
this.tortusyUp = function(){
  this.ruleStr += "Wx";
  this.runRule();
//  myAlert4("last:"+this.last.x+":"+this.last.y+":"+this.last.z);
  this.canvas.xyz.set(this.rule.last.x,this.rule.last.y,this.rule.last.z);
  this.canvas.grid(15);
  this.canvas.xyz.set(0,0,0);
};
this.tortusyDown = function(){
  this.ruleStr += "Mx";
  this.runRule();
//  myAlert4("last:"+this.last.x+":"+this.last.y+":"+this.last.z);
  this.canvas.xyz.set(this.rule.last.x,this.rule.last.y,this.rule.last.z);
  this.canvas.grid(15);
  this.canvas.xyz.set(0,0,0);
};
this.tortuszUp = function(){
  this.ruleStr += "Mz";
  this.runRule();
//  myAlert4("last:"+this.last.x+":"+this.last.y+":"+this.last.z);
  this.canvas.xyz.set(this.rule.last.x,this.rule.last.y,this.rule.last.z);
  this.canvas.grid(15);
  this.canvas.xyz.set(0,0,0);
};
this.tortuszDown = function(){
  this.ruleStr += "Wz";
  this.runRule();
//  myAlert4("last:"+this.last.x+":"+this.last.y+":"+this.last.z);
  this.canvas.xyz.set(this.rule.last.x,this.rule.last.y,this.rule.last.z);
  this.canvas.grid(15);
  this.canvas.xyz.set(0,0,0);
};
this.tortusreset = function(){
//  this.ruleStr = "Sheri:";
  myAlert2(tree.turtleMode);
  this.turtleMode="turtle"
  this.dirControl.setResetTxt("draw");
  this.dirControl.funct("turtle", 900, 420);
//  myAlert4("last:"+this.last.x+":"+this.last.y+":"+this.last.z);
  this.canvas.xyz.set(this.rule.last.x,this.rule.last.y,this.rule.last.z);
  this.canvas.grid(15);
  this.canvas.xyz.set(0,0,0);
};
this.RotatexUp = function(){
//   this.canvas.rotate.add(Math.PI/48,0,0);
   this.rotate.add(Math.PI/24,0,0);
   this.run();
//   this.frame.save();
};
this.RotatexDown = function(){
 //  this.canvas.rotate.sub(Math.PI/48,0,0);
   this.rotate.sub(Math.PI/24,0,0);
   this.run();
};
this.RotatezUp = function(){
 //  this.canvas.rotate.add(0,0,Math.PI/48);
   this.rotate.add(0,0,Math.PI/24);
   this.run();
};
this.RotatezDown = function(){
//   this.canvas.rotate.sub(0,0,Math.PI/48);
   this.rotate.sub(0,0,Math.PI/24);
   this.run();
};
this.RotateyUp = function(){
//  this.canvas.rotate.add(0,Math.PI/48,0);
  this.rotate.add(0,Math.PI/24,0);
   this.run();
};
this.RotateyDown = function(){
//   this.canvas.rotate.sub(0,Math.PI/24,0);
   this.rotate.sub(0,Math.PI/48,0);
   this.run();
};
this.Rotatereset = function(){
//   this.canvas.rotate.set(0,0,0);
//   this.rotate.set(0,0,0);
   if(this.turtleMode=="turtle"){
      myAlert(tree.turtleMode);
      this.dirControl.resetTxt = "move";
      this.dirControl.funct("turtle", 900, 420);
      }
   if(this.turtleMode=="tortus"){
      myAlert(tree.turtleMode); 
      this.dirControl.setResetTxt("draw");
      this.dirControl.funct("tortus", 900, 420);
      }

   this.run();
};
}