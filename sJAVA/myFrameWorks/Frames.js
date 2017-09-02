function Frame(name){
   this.name      = name;
   this.x         = 900;
   this.y         = 600;
   this.img       = null;
   this.frames    = [];
   this.frame     = 0;
   this.numFrames = 0;
   this.isStarted = false;
   this.interval  = 0;
   this.speed     = 100;
   this.myCanvas  = myDrawingCanvas;
   this.myContext = myDrawingContext;
//   this.animateMenu = new Menu("animateMenu");
}
Frame.prototype.switchCanvas = function(canvas = "drawing"){
    switch(canvas){
        case "drawing" :
           this.myCanvas  = myDrawingCanvas;
           this.myContext = myDrawingContext;
           break;
        case "menu" :
           this.myCanvas  = myMenuCanvas;
           this.myContext = myMenuContext;
           break;
        case "text" :
           this.myCanvas  = myTextCanvas;
           this.myContext = myTextContext;
           break;
        default :
           this.myCanvas  = myDrawingCanvas;
           this.myContext = myDrawingContext;
           break;
    }
};       
Frame.prototype.menu = function(x =this.x, y = this.y){
    this.x = x;
    this.y = y;
  let menu = new MenuThis(this,'frameMenu');
       menu.clear().setBGcolor('#DDDDDD')
       .btn( 'Faster', x+50 , y     , ['faster' ], 40,40, "CgTCTc[Tu[Tw" )
       .btn( 'SLower', x+100, y     , ['slower' ], 40,40, "CgTCTc[Tu[Tw" )
       .btn( 'Clear' , x+150, y     , ['clear'  ], 40,40, "CgTCTc[Tu[Tw" )
       .btn( 'Step'  , x+200, y     , ['step'   ], 40,40, "CgTCTc[Tu[Tw" );
   if(this.isStarted){
      menu.setBGcolor('#880000')
          .btnR("STOP" ,x, y, ['stop' ], 40,40, "CgTCTc");
      }
   else{
      menu.setBGcolor('#008800')
          .btnR("Start",x, y, ['start'], 40,40, "CrTCTc[Tu[Tw");
      }

};
Frame.prototype.setXY = function(x, y){
    this.x = x;
    this.y = y;
}
Frame.prototype.stepMenu = function(x = this.x, y = this.y){
    this.setXY(x, y);
   let stepMenu = new MenuThis(this, 'stepMenu');
//  console.log( new MenuThis(this,'stepMenu')
       stepMenu.clear().setBGcolor('cyan')
       .btn( "Save"           , x    , y     , ['save'         ], 44, 20)
       .btn( ""               , x+25 , y+22  , ['save'         ], 20, 20, "CgS2TCTc[TB"  ).setBGcolor('lightBlue')
       .btn(this.frame        , x+50 , y     , ['stepBack'     ], 20, 40, "CrWzWzTCTc[Tr")
       .btn(this.frames.length, x+75 , y     , ['step'         ], 20, 40, "CrWzTCTc[Tl"  ).setBGcolor('red')
       .btn( "D"              , x    , y+ 26 , ['deleteCurrent'], 20, 15, "CbTCTc[TB"    );
};
Frame.prototype.moveMenu = function(){
   var moveListner = new MyListener(this);
   moveListner.startMoveMenuListener();
};
Frame.prototype.clear = function(){
   this.numFrames = 0;
   this.frame     = 0;
   this.frames    = [];
   };
Frame.prototype.deleteCurrent = function(){
   this.frame-=1;
   if(this.frames.length > 1 && this.frame > -1){
      this.frames.splice(this.frame,1);
      this.numFrames--;
      myAlert("deleteCurrent:"+this.frame+":"+this.frames.length);
      return true;
      }
   myAlert("did not delete");
   this.frame+=1;
   this.stepMenu();
   return false;
};
Frame.prototype.save = function(){
    this.frames.push( this.get());
    this.numFrames++;
    this.stepMenu();
    //recorder.record("save frame:"+this.frame+":"+this.numFrames);
    };
Frame.prototype.get = function(){
   var imgHeight = this.myCanvas.height;
   var imgWidth = this.myCanvas.width;
  // sc.translate();
//   this.orgin.reset();
   this.img = this.myContext.getImageData(0,0,imgWidth,imgHeight);
//   this.orgin.setTo();
   return this.img;
};
Frame.prototype.animate = function(){
   var t = this;
   this.frame = 0;
   if(!this.isStarted){
      this.isStarted = true;
      this.interval = setInterval(function(){t.output();},this.speed);
   }
//   recorder.record("animate_frame:"+this.interval+":"+this.frame+":"+this.numFrames);
//   console.log("animate_frame:"+this.interval+":"+this.frame+":"+this.numFrames);
  // this.frame_output();
};
Frame.prototype.step = function(){
    this.output();
};
Frame.prototype.start = function(){
    var t = this;
//   this.frame = 0;
    if(!this.isStarted){
        this.isStarted = true;
        this.interval = setInterval(function(){t.output();},this.speed);
    }
    this.menu();
};
Frame.prototype.stop = function(){
   clearInterval(this.interval);
//   clearTimeout(this.interval);
   this.isStarted=false;
   this.interval=0;
   this.menu();
};

Frame.prototype.faster = function(){
   var t = this;
   clearInterval(this.interval);
   this.isStarted = false;
   this.speed -=20;
   if(this.speed < 0){
       this.speed = 5;
       }
//   this.frame = 0;
   if(!this.isStarted){
      this.isStarted = true;
      this.interval = setInterval(function(){t.output();},this.speed);
   }
   recorder.record("animation faster:"+this.speed);
};
Frame.prototype.slower = function(){
   var t = this;
   clearInterval(this.interval);
   this.isStarted = false;
   this.speed +=10;
//   this.frame = 0;
   if(!this.isStarted){
      this.isStarted = true;
      this.interval = setInterval(function(){t.output();},this.speed);
   }
   recorder.record("animation slower:"+this.speed);
};
Frame.prototype.stepBack = function(){
   this.frame-=1;
   if(this.frame >= this.frames.length){
        this.frame = 0;
      }
   else if(this.frame <  0){
        this.frame = this.frames.length-1;
      }

  this.img = this.frames[this.frame];   
  this.put();
  myAlert(this.frame);
  //this.frame-=1;
  this.stepMenu();
};
Frame.prototype.output = function(){
//   var img;
    this.frame+=1;
   if(this.frame >=  this.frames.length){
        this.frame = 0;
      }
   else if(this.frame <  0){
        this.frame = this.frames.length-1;
      }

   this.img = this.frames[this.frame];   
   this.put();
   //this.frame+=1;
   myAlert(this.frame);
   this.stepMenu();
};
Frame.prototype.last = function(){
//   var img;
   if(this.frame-2 < 0){}
   else{
      this.img = this.frames[this.frame-2];   
      this.put();
//      console.log("frame_output:"+this.frame+":"+this.numFrames);
      }
};
Frame.prototype.put = function(){
//   this.orgin.reset();
   if(this.img == null){
      console.log("Frame.put -> error: img == null");
      return false;
      };
   this.myContext.putImageData(this.img,0, 0);
   return true;
};


