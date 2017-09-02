function Event( myThis){
    this.myThis          = myThis;
    this.lastOrgin       = 0;
    this.lastDrop        = null;
    this.lastTxt         = new XY(null, null);
    this.txtOutput       = "";
    this.txtStack        = [];
    this.onStates        = [];
    this.dropNumberCount = 0;
    this.drawMode        = false;
}
Event.prototype.editTxt = function(box, callback){
    console.log(box+":"+callback);
    this.txtOutput.length = 0;
    this.txtStack.length  = 0;
    this.txtOutput        = "";
    this.txtStack         = [];
    this.saveOnStates();
    document.onmousedown = (event) => {if(event.button == 1){
                                          this.resetOnStates();
                                          this.textControl();
                                      }};
    document.onkeydown   = (event) => this.txtInput(event, box, callback);
    document.onclick     = (event) => this.setTxtOrgin(event);
};
Event.prototype.textInput = function(box){
    console.log(box);
    this.txtOutput.length = 0;
    this.txtStack.length  = 0;
    this.txtOutput        = "";
    this.txtStack         = [];
    this.saveOnStates();
    document.onmousedown = (event) => {if(event.button == 1){
                                          this.resetOnStates();
                                          this.textControl();
                                      }};
    document.onkeydown   = (event) => this.txtInput(event,box);
    document.onclick     = (event) => this.setTxtOrgin(event);
};
Event.prototype.textControl = function(){
    document.onkeydown = (event) => this.txtControl(event);
};
Event.prototype.sketch = function(color){
    this.saveOnStates();
    this.startSketch(event, color);

};
Event.prototype.startSketch = function(e,color){
    this.lastDrop = e;
    document.onmousedown = ()      => this.drawMode = true;
    document.onmouseup   = ()      => this.drawMode = false;
    document.onmousemove = (event) => this.sketcher(event, color);
};
Event.prototype.line = function(color){
    this.saveOnStates();
    this.startLine(event, color);

};
Event.prototype.startLine = function(event, color){
    let start = {};
    let end   = {};
    this.saveOnStates();
    this.myThis.frame.get();
    document.onclick = (event) => {
        console.log("firstClick")
        start = {x: event.clientX, y: event.clientY};
        console.log(start)
        startLine();
    };
    startLine = () =>{
        document.onclick = (event) => {
            console.log("secondClick")
            end   = {x: event.clientX, y: event.clientY};
            this.myThis.frame.put();
            if( event.ctrlKey ){
                drawLineOrtho();
                if( Math.abs(start.x-end.x) >= Math.abs(start.y-end.y)){
                    start = {x: end.x, y: start.y};
                }
                else{ 
                    start = {x: start.x, y: end.y};
                }
            }
            else{
                drawLine();
                start = {x: end.x, y: end.y};  
            }
            this.myThis.frame.get();
        };
        document.onmousemove = (event) => {
            console.log("secondMove")
            end   = {x: event.clientX, y: event.clientY};
            this.myThis.frame.put();
            if( event.ctrlKey ){
                drawLineOrtho();
            }
            else{
                drawLine();
            }
        };
    };
    drawLine = () => {
        this.myThis.canvas.setColor(color);
        this.myThis.canvas.moveToXY(start.x, start.y);
        this.myThis.canvas.lineToXY(end.x, end.y );
    }
    drawLineOrtho = () => {
        this.myThis.canvas.setColor(color);
        if( Math.abs(start.x-end.x) >= Math.abs(start.y-end.y)){
            this.myThis.canvas.moveToXY(start.x, start.y);
            this.myThis.canvas.lineToXY(end.x  , start.y  );
        }
        else{
            this.myThis.canvas.moveToXY(start.x, start.y);
            this.myThis.canvas.lineToXY(start.x, end.y );
        }
    }
};
Event.prototype.dropSymbol = function(...drop){
    myAlert3("dropSymbol:", drop);
    this.saveOnStates();
    document.onmouseup   = (event) => this.dropper(event, drop);
};
Event.prototype.drop = function(item){
    console.log(item)
    document.onmousedown = (event) => {if(event.button == 1){
                                          this.resetOnStates();
                                      }};
    document.onclick     = (event) => this.dropper(event,item);
};
Event.prototype.dropper = function(e, drop){
   myAlert3("drop:"+drop+":e.button:"+e.button+e.clientX);
   this.myThis.frame.put();
   if(e.button == 1){
       this.resetOnStates();
       }
   else{
      if(typeof this.myThis.canvas[drop[0]] === 'function'){
         this.myThis.canvas[drop[0]](e.clientX,e.clientY,drop[1],drop[2],drop[3]);
         }
      else if(typeof drop[0] === 'string'){
         this.myThis.canvas.txtSize=drop[1];
         this.myThis.canvas.textXY(drop[0],e.clientX,e.clientY);
         }
      }
    this.myThis.frame.get();
};
Event.prototype.sketcher = function(e,color){
   var radius = 1;
   console.log(e.button);
   this.myThis.frame.put();
   if(e.button === 1){
      this.resetOnStates();
      this.myThis.color = color;
      }
   else{
      if(this.drawMode){
          if(color === "#CADF3E"){
             radius = 20;
             this.myThis.canvas.setColor(color).circleXYsolid(e.clientX,e.clientY,radius);
             }
         this.myThis.canvas.setColor(color).moveToXY(this.lastDrop.clientX,this.lastDrop.clientY);
         this.myThis.canvas.lineToXY(e.clientX,e.clientY);
         }
      }
   this.lastDrop = e;
   this.myThis.frame.get();
};
Event.prototype.dropNumber= function(){
   this.dropNumberCount = 1;
    this.saveOnStates();
    document.onmousedown = (event) => {if(event.button==1){this.resetOnStates();}};
    document.onmouseup   = (event) => this.dropNumberEvent(event);
};
Event.prototype.dropNumberEvent = function(e){
   if( e.button === 1){
       this.resetOnStates();
       return;
   }
   this.myThis.startFrame.put();
   this.myThis.frame.put();
   this.setTxtOrgin(event);
   this.myThis.canvas.setTxtSize(11);
   this.myThis.canvas.setFont(1);
   this.myThis.canvas.textXY(this.dropNumberCount,this.lastTxt.x,this.lastTxt.y);
   this.dropNumberCount += 1;
   this.myThis.frame.get();
   this.myThis.startFrame.get();
};
Event.prototype.moveOrgin = function(){
   this.saveOnStates();
   document.onclick =     (event) => this.moveOrginToClick(event);
};
Event.prototype.moveMenu= function(){
    this.saveOnStates();
    document.onmousedown = (event) => this.moveMenuToClick(event);
    document.onmousemove = (event) => this.dragMenuWithMouse(event);
};
Event.prototype.dragMenuWithMouse = function(e) {
  //this.frame.put();
  this.myThis.x = e.clientX+25;//Math.round(e.clientX / 50)*50;
  this.myThis.y = e.clientY-55;//Math.round(e.clientY / 50)*50;
  this.myThis.menu();
};
Event.prototype.saveOnStates = function(){
    let onStates = {};
    onStates.onmousemove   = document.onmousemove;
    onStates.onmousedown   = document.onmousedown;
    onStates.onmouseup     = document.onmouseup;
    onStates.onwheel       = document.onwheel;
    onStates.oncontextmenu = document.oncontextmenu;
    onStates.onclick       = document.onclick;
    onStates.ondblclick    = document.ondblclick;
    onStates.onkeypress    = document.onkeypress;
    onStates.onkeydown     = document.ondown;
    this.onStates.push(onStates);
    return onStates;
};
Event.prototype.resetOnStates = function(){
    if( this.onStates[this.onStates.length-1] ){
        let onStates = this.onStates[this.onStates.length-1];
        this.onStates.pop();
        document.onmousemove   = onStates.onmousemove;
        document.onmousedown   = onStates.onmousedown;
        document.onmouseup     = onStates.onmouseup;
        document.onwhee        = onStates.onwheel;
        document.oncontextmenu = onStates.oncontextmenu;
        document.onclick       = onStates.onclick;
        document.ondblclick    = onStates.ondblclick;
        document.onkeypress    = onStates.onkeypress;
        document.ondown        = onStates.onkeydown;
        return onStates;
    }
    return "empty";
};
Event.prototype.moveMenuCallback = function(callback){
    this.saveOnStates();
    document.onmouseup   = (event) => this.moveMenuToClickCallback(event, callback);
    document.onmousemove = (event) => this.dragMenuWithMouseCallback(event, callback);
};
Event.prototype.moveMenuToClickCallback = function(e, callback) {
    if(  callback instanceof Array){
        this.myThis[callback[0]](callback[1], e.clientX, e.clientY);
    }
    else{
        this.myThis[callback](e.clientX,e.clientY);
    }
  this.resetOnStates();
};
Event.prototype.dragMenuWithMouseCallback = function(e, callback) {
    if( callback instanceof Array){
        this.myThis[callback[0]](callback[1],e.clientX, e.clientY);
    }
    else{
        this.myThis[callback](e.clientX,e.clientY);
    }
};
Event.prototype.moveMenuToClick = function(e) {
//  this.myThis.coverRect();
  this.frame.put();
  this.myThis.x = Math.round((e.clientX+25) / 50)*50; 
  this.myThis.y = Math.round((e.clientY-55) / 50)*50;
  this.myThis.menu();
  this.stopDropListener();
};
Event.prototype.moveOrginToClick = function(e) {
  this.lastOrgin = e;
  this.myThis.canvas.orgin.x = e.clientX;
  this.myThis.canvas.orgin.y = e.clientY;
  if(this.myThis.lastXY){
      this.myThis.lastXY.x = e.clientX;
      this.myThis.lastXY.y = e.clientY;
  }
};
Event.prototype.postMouse = function(e,x=1000,y=5) {
  this.myThis.canvas.setColor("blue").setTxtSize(11)
      .rectXY((e.offsetX-e.clientX)+x,y,130,36)
      .textXYinBox(e.clientX, (e.offsetX-e.clientX)+5  +x, 15+y, "blue", "lightBlue")
      .textXYinBox(e.clientY, (e.offsetX-e.clientX)+40 +x, 15+y, "blue", "lightBlue")
      .textXYinBox(e.screenX, (e.offsetX-e.clientX)+65 +x, 15+y, "blue", "lightBlue")
      .textXYinBox(e.screenY, (e.offsetX-e.clientX)+100+x, 15+y, "blue", "lightBlue")
      .textXYinBox(e.offsetX, (e.offsetX-e.clientX)+5  +x, 28+y, "blue", "lightBlue")
      .textXYinBox(e.offsetY, (e.offsetX-e.clientX)+40 +x, 28+y, "blue", "lightBlue");
  if(this.lastOrgin.clientX !== undefined){
     this.myThis.canvas.textXYinBox(this.lastOrgin.clientX,(e.offsetX-e.clientX)+65 +x, 28+y, "blue", "lightBlue")
                       .textXYinBox(this.lastOrgin.clientY,(e.offsetX-e.clientX)+100+x, 28+y, "blue", "lightBlue");
     }
};
Event.prototype.returnLastEventXY = function(){
  return new XY(this.lastOrgin.clientX,this.lastOrgin.clientY);
};
Event.prototype.setTxtOrgin = function(e) {
  this.txtOutput       = "";
  this.txtStack.length = 0;
  this.lastTxt.x       = e.clientX;
  this.lastTxt.y       = e.clientY;

};

Event.prototype.txtInput = function(e, box, callback = false){
  myAlert3("e.key:"+e.key+":e.keyCode:"+e.keyCode);
  this.myThis.canvas.setTxtSize(12);
  this.myThis.canvas.setFont(1);
  switch(e.keyCode){
    //left
    case 16 :
    case 17 :
    case 18 :
    case 19 :
    case 20 :
    case 9 : 
      myAlert3("dont save");
      break;
    //Backspace
    case 8 :
      myAlert3("backspace");
      this.txtOutput = this.txtOutput.slice(0,this.txtOutput.length-1);
      this.myThis.canvas.textXYinBox(this.txtOutput+"  ",this.lastTxt.x,this.lastTxt.y,"blue","#CADF3E");
      break;
    //Enter
    case 13 :
      if( callback ){
           this.myThis[callback](this.txtOutput, this.lastTxt.x, this.lastTxt.y);
           this.resetOnStates();
           this.textControl();
      } else{
          this.txtStack.push(this.txtOutput);
          this.txtOutput = "";
          this.lastTxt.y += this.myThis.canvas.txtSize*1.2;
      }
      break;
    case 27 :
      this.resetOnStates();
      this.textControl();
      break;
    default:
      this.txtOutput += e.key;
      if(box == true){
          this.myThis.canvas.textXY(this.txtOutput,this.lastTxt.x,this.lastTxt.y);
          }
      else{
          this.myThis.canvas.textXYinBox(this.txtOutput,this.lastTxt.x,this.lastTxt.y,"blue","#CADF3E");
          }
      break;
     }

};
Event.prototype.txtControl = function(e){
  myAlert3("e.key:"+e.key+":e.keyCode:"+e.keyCode);
  switch(e.keyCode){
    //left
    case 16 :
    case 17 :
    case 18 :
    case 19 :
    case 20 :
       break;
    case 65 :  //a
       this.myThis.frame.step();
       break;
    case 66 :  //b
       this.myThis.addMethyl(5);
       break;  
    case 67 :  //c
       this.myThis.clearScreen("#CADF3E");
       break;   
    case 83 :  //s
       this.myThis.frame.save();
       break;
    case 68 :  //d
       this.myThis.deleteNode();
       break;
    case 77 :  //m
       this.myThis.moveCompound(true);
       break;
    case 78 :  //n
       this.myThis.newCompound();
       break;
    case 81 :  //q
       this.myThis.compound.menu.clear();
       break;
    case 82 :  //r
       this.myThis.incAtom();
       break;
    case 84 :  //t
       this.myThis.decAtom();
       break;
    case 86 :  //v
       this.myThis.addMethyl(55);
       break;
    case 87 :  //w
       this.myThis.moveCompound(false);
       break;
    case 88 :  //x
       this.myThis.frame.deleteCurrent();
       break;
    case 90 :  //z
       this.myThis.frame.stepBack();
       break;
    case 69 :  //e
       this.myThis.postCompoundElements();
       break;
    case 70 :  //f
       this.myThis.postSmilesAtom();
       break;
    //Tab
    case 9 : 
      this.myThis.postCompoundAtomNums();
      break;
    case 37 : 
      this.myThis.incNum(5);
      break;
    case 38 : 
      this.myThis.incAtom();
      break;
    case 39 : 
      this.myThis.decNum(5);
      break;
    case 40 : 
      this.myThis.decAtom();
      break;
    //Backspace
    case 8 :
      break;
    //space
    case 32 :
    //Enter
    case 13 :
      this.myThis.addChain(1);
      break;
    //escape
    case 27 :
      this.resetOnStates();
      break;
    default:
      break;
     }
   this.myThis.lineMenu();
};


Event.prototype.moveOrgin = function(e, orgin){
    console.log("moveOrgin Error")
  //myAlert3("e.key:"+e.key+":e.keyCode:"+e.keyCode);
 // this.txtOutput += e.key;
/*   switch(e.keyCode){
    //left
    case 37 :
    case 65 :
      this.myThis.canvas.orgin.changeBy(-30,0);
      this.myThis.run();
      break;
    //top
    case 38 :
    case 87 :
      this.myThis.canvas.orgin.changeBy(0,-30);
      this.myThis.run();
      break;
    //right
    case 39 :
    case 68 :
      this.myThis.canvas.orgin.changeBy(30,0);
      this.myThis.run();
      break;
    //bottom
    case 40 :
    case 88 :
      this.myThis.canvas.orgin.changeBy(0,30);
      this.myThis.run();
      break;
     }
//  console.log(e.which);
//  recorder.record("event.which:"+e.which);
  recorder.recordPost("event.keyCode:"+String.fromCharCode(e.keyCode));
  this.myThis.canvas.textXYinBox(e.keyCode,1150,20,"blue","lightBlue");*/
};

/////////////////////////////////////////////////////////////////////////////////////////////////////
function Recorder(name){
/////////////////////////////////////////////////////////////////////////////////////////////////////

   this.name = name;
   this.recordStr = [];//[ "start:"+this.name ];
   this.canvas = new Drawing(0,0,0);
   this.myTime = new Date();
   this.BGcolor = "teal";
   this.canvas.txtColor = "cyan"
   this.canvas.color = "green"

   this.currentRecord = 0;
   this.isStarted = false;
   this.topToBottom = false;
   this.interval = 0;
   this.speed = 500;
   this.x = 35;
   this.y = 660;
}
Recorder.prototype.menu = function(){
   var recordMenu = new MenuThis(this, "recorMenu");
   recordMenu.clear()
    .text(this.name+" Control",this.x,this.y-20)
    .text(this.recordStr.length,this.x+250,this.y)
    .text(this.recordStr[this.recordStr.length-1],this.x+250,this.y+15)
    .setBGcolor('#DDDDDD')
    .btn("Post<br>REC", this.x    , this.y , ["post"],  30, 20, "CbS2WxTx")
    .btn("Clear"      , this.x+200, this.y , ["clear"], 30, 20, "CgTCTc[Tu[Tw");
   if(this.isStarted){
       recordMenu.btn("Stop<br>scroll", this.x+40 , this.y, () => { this.stop();this.menu()} ,30, 20, "CrS2WxTx")
      .btn("Faster"         , this.x+80 , this.y, ["faster"]           , 30, 20, "CbWxTlWxTl")
      .btn("Slower"         , this.x+120, this.y, ["slower"]           , 30, 20, "CbTrMxTr")
      .btn("reset<br>count" , this.x+160, this.y, ["zeroCurrentRecord"], 30, 20, "CbTrMxTr");
      }
   else{
    recordMenu.btn("Start<br>scroll",this.x+40,this.y, () => {this.startScroll();this.menu()},30, 20,"CbWxTl")
      .btn("Page"           , this.x+80 , this.y, ["postPage"], 30, 20, "CgTCTc[Tu[Tw")
      .btn("Step"           , this.x+120, this.y, ["step"]    , 30, 20, "CgTCTc[Tu[Tw")
      .btn("Step<br>back"   , this.x+160, this.y, ["stepBack"], 30, 20, "CgTCTc[Tu[Tw");
      }
   if(this.topToBottom){
      recordMenu.setBGcolor("yellow")
          .btn("topToBottom" ,this.x+125, this.y-15, () => {this.topToBottom=false;this.menu()},60,12);
//      recorder.record("menu.topToBottom:"+this.topToBottom);
      }
   else{
      recordMenu.setBGcolor("white")
          .btn("bottomToTop" ,this.x+125, this.y-15, () => {this.topToBottom=true;this.menu()},60,12);
//      recorder.record("menu.topToBottom:"+this.topToBottom);
      }
/////Xout/Move
   recordMenu.btn("X",this.x-25,this.y   ,["clearMenu"], 20 , 20 , "CrTC");
   recordMenu.btn("M",this.x-25,this.y+25,["moveMenu"] , 20 , 20 , "CgTc");

}; 
Recorder.prototype.moveMenu = function(){
//     this.canvas.color = this.myThis.canvas.BGcolor;
//     this.canvas.rectXY(this.x,this.y,150,100);
     var moveListner = new Event(this);
     moveListner.startMoveMenuListener();
};
Recorder.prototype.clearMenu = function(){
   var recordMenu = new MenuThis(this, "recorMenu");
   recordMenu.clear();
};
Recorder.prototype.coverRect = function(){
   myMenuContext.clearRect(this.x-25,this.y-15,255,60);
   myTxtContext.clearRect( this.x-10,this.y-15,350,-400);
};
Recorder.prototype.run = function(){
//   this.menuClear();
//   circles.start();   
};
Recorder.prototype.startRecord = function(name){
 //  this.recordStr.push(name);
   this.record("start"+this.name)
};
Recorder.prototype.now = function(){
   var myNow = new Date();
   return myNow.toLocaleTimeString();
}; 
Recorder.prototype.time = function(){;
   this.record(this.now());
}; 
Recorder.prototype.timeGMT = function(){
 //  this.record(this.myTime());
}; 
Recorder.prototype.record = function(text){
   this.recordStr.push(text);
   return this.recordStr;
};
Recorder.prototype.recordPost = function(text){
   this.recordStr.push(text);
   this.post();
   return this.recordStr;
};
Recorder.prototype.returnRecordStr = function(){
   return this.recordStr;
};
Recorder.prototype.postHeader = function(){
   this.canvas.switchCanvas("txt");
   this.canvas.setTxtSize(14);
   this.canvas.clearRect(this.x-10,this.y-15,450,-400);
   this.canvas.color = this.BGcolor;
   this.canvas.rectXY(this.x-10,this.y-15,320,-400);
   this.canvas.textXYinBox(this.name,this.x,this.y-32,"green","#EEDDAA");
   this.canvas.textXYinBox(this.now(),this.x+155,this.y-32,"green","#EEDDAA");
   this.canvas.setTxtSize(10);
};
Recorder.prototype.post = function(){
   this.postHeader();
   for(i = 1; this.recordStr[this.recordStr.length-i] && i<30 ; i++){
       this.canvas.textXYinBox(this.recordStr.length -i+":"+this.recordStr[this.recordStr.length -i],
                                 this.x,this.y-i*12-40,"green","cyan");
     }
   this.canvas.switchCanvas("drawing");
};
Recorder.prototype.postScroll= function(){
   this.postHeader();
   if(this.topToBottom){
//   var j = 0;
      for(var i = 1 ; i < 30 ; i++){//this.recordStr[this.currentRecord-i] && i < 30
         this.verifyCurrentRecord();
         this.canvas.textXYinBox(this.currentRecord-i+":"+this.recordStr[this.currentRecord-i],this.x,this.y-i*12-40,"green","cyan");
//     if(!(this.recordStr[this.currentRecord-i])){
//        this.canvas.textXYinBox(this.recordStr.length-j+":"+this.recordStr[this.recordStr.length-j++],this.x,this.y-/i*12-40,"green","cyan");       
//        }
 //    else{
     this.canvas.textXYinBox(this.currentRecord-i+":"+this.recordStr[this.currentRecord-i],this.x,this.y-i*12-40,"green","cyan");
 //      }
         }
      }
   else{
     this.postScrollDown();
     }
   this.canvas.switchCanvas("drawing");
};
Recorder.prototype.postScrollDown= function(){
   this.postHeader();
   var j = 0;
   for(var i = 1 ; i < 30 ; i++){//this.recordStr[this.currentRecord-i] && i < 30
     this.verifyCurrentRecord();
     if(!(this.recordStr[this.currentRecord+i])){
        this.canvas.textXYinBox(this.recordStr.length+j+":"+this.recordStr[this.recordStr.length+j++],this.x,this.y-i*12-40,"green","cyan");       
        }
     else{
     this.canvas.textXYinBox(this.currentRecord+i+":"+this.recordStr[this.currentRecord+i],this.x,this.y-i*12-40,"green","cyan");
        }
     }
   this.canvas.switchCanvas("drawing");
};
Recorder.prototype.postPage = function(){
   this.postHeader();
   for(var i = 1 ; this.recordStr[this.currentRecord] && i < 30; i++){
     this.incCurrentRecord(-1);
     this.canvas.textXYinBox(this.currentRecord+":"+this.recordStr[this.currentRecord],this.x,this.y-i*12-40,"green","cyan");
     }
   this.canvas.switchCanvas("drawing");
};

Recorder.prototype.postCurrent = function(){
    this.verifyCurrentRecord();
    this.postHeader();
    this.canvas.textXYinBox(this.currentRecord+":"+this.recordStr[this.currentRecord],
                               this.x+55,this.y+10,this.canvas.txtColor,this.canvas.color);
};
Recorder.prototype.incCurrentRecord = function(by){
   this.currentRecord += by;
   this.verifyCurrentRecord();
};
Recorder.prototype.verifyCurrentRecord = function(){
   if(this.currentRecord >=  this.recordStr.length){
        this.currentRecord = 0;
      }
   if(this.currentRecord < 0){
      this.currentRecord = this.recordStr.length-1;
      }
   return this.currentRecord;
};
Recorder.prototype.zeroCurrentRecord = function(){
   this.currentRecord = 0;
   recorder.record("zeroCurrentRecord:"+this.currentRecord);
   return this.currentRecord;
};

Recorder.prototype.postLastNumberOf = function(num){
   this.canvas.setTxtSize(10);
   var i = this.currentRecord;
   this.canvas.color = "blue";
   this.canvas.rectXY(x-10,y+25,195,-num*12-50);
   this.canvas.textXYinBox(this.name,x,y+12,"green","grey");
   for(i = 1; this.recordStr[this.recordStr.length -i]; i++){
     if( this.currentRecord >= this.recordStr.length-1){
         this.currentRecord = 0;
        }
     this.canvas.textXYinBox(this.recordStr[this.recordStr.length -i],this.x,this.y-i*12-40,"green","cyan");
     }
};
Recorder.prototype.clear = function(){
   this.currentRecord = 0;
   this.recordStr = [];
//   recorder.record("recorder.clear:");
 };
Recorder.prototype.animate = function(){
   var t = this;
   this.frame = 0;
   if(!this.isStarted){
      this.isStarted = true;
      this.interval = setInterval(function(){t.step();},this.speed);
   }
//   recorder.record("Start Scroll:"+this.interval+":"+this.currentRecord+":"+this.recortStr.length);
};
Recorder.prototype.stepBack = function(){
   this.incCurrentRecord(-1);
   this.postScroll();
};
Recorder.prototype.step = function(){
   this.incCurrentRecord(1);
   this.postScroll();
};
Recorder.prototype.startScroll = function(){
   var t = this;
   if(!this.isStarted){
      this.isStarted = true;
      this.interval = setInterval(function(){t.stepBack();},this.speed);
   }
//   recorder.record("recorder.startScroll"+this.speed);
};
Recorder.prototype.stop = function(){
   clearInterval(this.interval);
   this.isStarted=false;
   this.interval=0;
};
Recorder.prototype.faster = function(){
   var t = this;
   clearInterval(this.interval);
   this.isStarted = false;
   this.speed -=50;
   if(this.speed <= 0){
       this.speed = 20;
       }
   if(!this.isStarted){
      this.isStarted = true;
      this.interval = setInterval(function(){t.step();},this.speed);
   }
//   recorder.record("recorder.faster:"+this.speed);
};
Recorder.prototype.slower = function(){
   var t = this;
   clearInterval(this.interval);
   this.isStarted = false;
   this.speed +=50;
   if(!this.isStarted){
      this.isStarted = true;
      this.interval = setInterval(function(){t.step();},this.speed);
   }
//   recorder.record("recorder.slower:"+this.speed);
};
   

   
