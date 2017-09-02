var myDrawingCanvas = document.getElementById("myDrawingCanvas");
var myDrawingContext = myDrawingCanvas.getContext("2d");
var myMenuCanvas = document.getElementById("myMenuCanvas");
var myMenuContext = myMenuCanvas.getContext("2d");
var myTxtCanvas = document.getElementById("myTxtCanvas");
var myTxtContext = myTxtCanvas.getContext("2d");
var currentCanvas = myDrawingCanvas;
var currentContext = myDrawingContext;
//start();
function start(){
   var drawing = new Drawing(0,0,0);
   drawing.setBGcolor('#CADF3E')
    .clearPage()
    .clearScreen("#CADF3E");
   drawing.xyz.set(600,100,100);
   drawing.grid(100);
   drawing.cubeSize(0,0,0,50);
   drawing.xyz.add(0,0,50);
   drawing.cubeSize(0,0,0,30);
   drawing.textXYZ("button Soft",0,55,0);

}

function Color(r,g,b){
   this.r = r;
   this.g = g;
   this.b = b;
   this.hexColor = "#FFFFFF";
}
Color.prototype.random_color = function(){
   var hexColor;
   var r = Math.random()*256;
   var g = Math.random()*256;
   var b = Math.random()*256;
   r = Math.round(r);
   g = Math.round(g);
   b = Math.round(b);
   hexColor = rgbToHex(r,g,b)
   return hexColor;
};
Color.prototype.rgbToHex = function(r,g,b){
   var hexColor = "#";
   hexColor += toHex(r);
   hexColor += toHex(g);
   hexColor += toHex(b);
   this.hexColor = hexColor;
   return hexColor;
};
Color.prototype.toHexColor =function(){
   var hexColor = "#";
   this.r = this.isHexRange(this.r);
   this.g = this.isHexRange(this.g);
   this.b = this.isHexRange(this.b);

   hexColor += toHex(this.r);
   hexColor += toHex(this.g);
   hexColor += toHex(this.b);
   this.hexColor = hexColor;
   return hexColor;
};
Color.prototype.isHexRange = function(num){
   if(num < 0){
      num = 0;
      }
   if(num > 255){
      num = 255;
      }
   return num;
};
Color.prototype.hexToRgb = function(hexColor){
   this.r = hexColor[1];
   this.r += hexColor[2];
   this.r = parseInt(this.r,16);
   
   this.g = hexColor[3];
   this.g += hexColor[4];
   this.g = parseInt(this.g,16);
  
   this.b = hexColor[5];
   this.b += hexColor[6];
   this.b = parseInt(this.b,16);
   return this;
};
Color.prototype.toHex = function(N) {
   var hex = "0123456789ABCDEF".charAt((N-N%16)/16)
      + "0123456789ABCDEF".charAt(N%16);
   return hex;
};
function cubeColor(xColor,yColor,zColor){
   this.x = xColor;
   this.y = yColor;
   this.z = zColor;
   this.xBack = xColor;
   this.yBack = yColor;
   this.zBack = zColor;
}
cubeColor.prototype.random = function(){
   this.x=random_hexColor();
   this.y=random_hexColor();
   this.z=random_hexColor();
   this.xBack=random_hexColor();  
   this.yBack=random_hexColor();
   this.zBack=random_hexColor();  

   return this;
};
cubeColor.prototype.set = function(xC,yC,zC){
   this.x=xC;
   this.y=yC;
   this.z=zC;
   this.xBack=xC;
   this.yBack=yC;
   this.zBaxk=zC;

   return this;
};

cubeColor.prototype.standard = function(){
   this.x="red";
   this.y="green";
   this.z="blue";
   this.xBack="red";
   this.yBack="green";
   this.zBack="blue";
   return this;
};
cubeColor.prototype.emty = function(){
   this.x="emty";
   this.y="emty";
   this.z="emty";
   this.xBack="emty";
   this.yBack="emty";
   this.zBack="emry";
   return this;
};


function Orgin(x,y){
//   this.myCanvas = myCanvas;
//   this.myContext = this.myCanvas.getContext("2d");
   this.x = x;
   this.y = y;//this.myCanvas.height- y;
   this.isSet = false;

this.resetMyContext = function(){
//   this.myContext = this.myCanvas.getContext("2d");
};
this.changeBy = function(x,y){
   this.x += x;
   this.y += y;
};
this.setXY = function(x,y){
//   this.myContext.resetTransform();
//   this.myContext.translate(this.x,this.y);
     this.x = x;
     this.y = y;
};
/*
this.setTo = function(){      
//   this.myContext.resetTransform();
   this.myContext.resetTransform();
   console.log("orgin"+this.x+":"+this.y);
   this.myContext.translate(this.x,this.y);
};
this.reset = function(){
   this.myContext.resetTransform();
//   this.myContext.translate(-this.x,-this.y);
};*/
Orgin.prototype.setTo = function(){
 //  console.log("setTo");
   if(!this.isSet){
  //    console.log("setTo:"+this.x+":"+this.y);
//      this.myContext.translate(this.x,this.y);
      }
   this.isSet = true;
};
Orgin.prototype.reset = function(){
   if(this.isSet){
 //     console.log("reset:"+this.x+":"+this.y);
 //     this.myContext.translate(-this.x,-this.y);
      }
   this.isSet = false;
};

}
function XY(x,y){
   this.x = x;
   this.y = y;
}
XY.prototype.set = function(xy){
   this.x = xy.x;
   this.y = xy.y;
   return this;
};
XY.prototype.add = function(xy){
   this.x += xy.x;
   this.y += xy.y;
   return this;
};
XY.prototype.sub =function(xy){
   this.x -= xy.x;
   this.y -= xy.y;
   return this;
};
XY.prototype.set = function(x,y){
   this.x = x;
   this.y = y;
   return this;
};
XY.prototype.add = function(x,y){
   this.x = x;
   this.y = y;
   return this;
};
XY.prototype.sub =function(x,y){
   this.x = x;
   this.y = y;
   return this;
};

function Point(x,y,z){
   this.x=x;
   this.y=y;
   this.z=z;
}
Point.prototype.add = function(x,y,z){
   this.x += x;
   this.y += y;
   this.z += z;
   return this;
};
Point.prototype.sub = function(x,y,z){
   this.x -= x;
   this.y -= y;
   this.z -= z;
   return this;
};
Point.prototype.mult = function(x,y,z){
   this.x *= x;
   this.y *= y;
   this.z *= z;
   return this;
};
Point.prototype.mod = function(x,y,z){
   this.x %= x;
   this.y %= y;
   this.z %= z;
   return this;
};
Point.prototype.setP = function(point){
   this.x = point.x;
   this.y = point.y;
   this.z = point.z;
   return this;
}; 
Point.prototype.set = function(x,y,z){
   this.x = x;
   this.y = y;
   this.z = z;
   return this;
};
Point.prototype.record = function(txt,record){
   var txt = txt+":x:"+this.x.toFixed(2)+":y:"+this.y.toFixed(2)+":z:"+this.z.toFixed(2);
   record.record(txt);  
   return txt; 
};  
Point.prototype.log = function(txt){
   console.log(txt+"x:"+this.x+"y:"+this.y+"z:"+this.z); 
};


function Drawing(x = 0, y = 0, z = 0, myCanvas = currentCanvas){
   this.myCanvas = myCanvas;
   this.myContext = myCanvas.getContext("2d");
   this.expandSelectXYZtypeMenu = true;///not Using
   this.selectXYZmenuX = 30;
   this.selectXYZmenuY = 420;
   this.xyz = new Point(x, y, z);
   this.rotationOrgin = new Point(0,0,0);
   this.rotate = new Point(0,0,0);
   this.orgin = new Orgin(600,350);
   this.XYZtype = "flatX";
   this.cube = new Point(0,0,0);
   this.cColor = new cubeColor("red","green","blue");
   this.cube.size = 50;
   this.x_xy = 0;//this.to_x();
   this.y_xy = 0;//this.to_y();
   this.rot_x = Math.PI*7/6;
   this.rot_y = Math.PI*5/3;
   this.rot_z = 0;
   this.size = 100;
   this.scale = 1;
   this.pScale = 5000;
   this.color = "blue";
   this.txtColor = "green";
   this.BGcolor = "slateBlue";
   this.txtSize = 14;
   this.txtFont = "Courier New";
   this.hexColor = "#888888";//this.get_hexColor();
 
//   console.log(Drawing.caller.name+":"+this.constructor.name+":"+x+":"+y+":"+z);
//   this.orgin.setTo();
}
Drawing.prototype.setCanvas = function( canvas ){
    //console.log(this.myCanvas)
    this.myCanvas = canvas;
    //console.log(this.myCanvas)
    this.myContext = this.myCanvas.getContext("2d");
    return this;
};
Drawing.prototype.switchCanvas = function(canvas){
   switch(canvas){
      case "drawing":
         this.myCanvas  = myDrawingCanvas;
         this.myContext = myDrawingContext;
         currentCanvas  = myDrawingCanvas;
         currentContext = myDrawingContext;
         break;
      case "txt": 
         this.myCanvas  = myTxtCanvas;
         this.myContext = myTxtContext;
         currentCanvas  = myTxtCanvas;
         currentContext = myTxtContext;
         break;
      case "menu":
         this.myCanvas  = myMenuCanvas;
         this.myContext = myMenuContext;
         currentCanvas  = myMenuCanvas;
         currentContext = myMenuContext;
         break;
      }
    return this;
};
Drawing.prototype.clearRect = function(x,y, width, height){
   this.myContext.clearRect(x, y, width, height);
   return this;
};
Drawing.prototype.clearPage = function(){
   this.myContext.clearRect(0,0,this.myCanvas.width,this.myCanvas.height);
   return this;
}; 
Drawing.prototype.clearTxtScreen = function(hexColor){
   myTxtContext.clearRect(0,0,this.myCanvas.width,this.myCanvas.height);
   return this;
};
Drawing.prototype.clearScreen = function(hexColor = this.BGcolor){
   this.myContext.fillStyle=hexColor;
   this.myContext.fillRect(0,0,this.myCanvas.width,this.myCanvas.height);
   this.BGcolor = hexColor;  
   return this;
};
Drawing.prototype.clearScreenRandom = function(){
   var hexColor = this.random_hexColor();
   this.myContext.fillStyle=hexColor;  
   console.log("clearScreen:Random"+hexColor);
   this.myContext.fillRect(0,0,this.myCanvas.width,this.myCanvas.height);
   this.BGcolor = hexColor; 
//   console.log(this);
   return hexColor;
};
Drawing.prototype.setXYZtype = function(...arg){
   console.log("Start.XYZtype:"+this.XYZtype+"type:"+arg);
   console.log(typeof arg[0]+":"+arg[0].toString()+":"+arg[0]);
   console.log(arg[1]);
   console.log(arg);
switch(arg[0].toString()){
   case "1" :
      this.XYZtype = "flatX";
      this.flatX();
      break;
   case "2" :
      this.XYZtype = "old";
      this.old();
      break;
   case "3" :
      this.XYZtype = "iso";
      this.iso();
      break;
   case "4" :
      this.XYZtype = "iso2";
      this.iso2();
      break;
   case "5" :
      this.XYZtype = "ortho";
      this.ortho();
      break;
   case "6" :
      this.XYZtype = "ortho2";
      this.ortho2();
      break;
   }
//   this.clearSelectXYZmenu();
   if( arg[1] ){
       arg[1]();
   }
};
Drawing.prototype.selectXYZtype = function(callback = null){
    var selectMenu = new MenuThis(this, "selectXYZ");
    var x = this.selectXYZmenuX;
    var y = this.selectXYZmenuY;
    this.rotate.set(0,0,0);
     console.log(callback);

     selectMenu.clear().setTxtColor("blue").setBGcolor(null)
               .textXY(this.XYZtype,x,y-27).setTxtColor("yellow")
               .textXY("flatX" ,x    ,y+40)
               .textXY("iso"   ,x+2  ,y+100)
               .textXY("old"   ,x+53 ,y+40)
               .textXY("ortho2",x+102,y+100)
               .textXY("iso2"  ,x+53,y+100)
               .textXY("ortho" ,x+102,y+40).setTxtColor("green")
               .btnR("X", x-25 , y    , [],20,15).setTxtColor("red")
               .btn("M", x-25 , y-27 , ["moveSelectXYZmenu",callback],20).setTxtColor("#CADF3E")
               .btn("" , x    , y    , ["setXYZtype",1,callback], 40)
               .btn("" , x    , y+60 , ["setXYZtype",3,callback], 40)
               .btn("" , x+50 , y    , ["setXYZtype",2,callback], 40)
               .btn("" , x+50 , y+60 , ["setXYZtype",4,callback], 40)
               .btn("" , x+100, y    , ["setXYZtype",5,callback], 40)
               .btn("" , x+100, y+60 , ["setXYZtype",6,callback], 40);
     let cv = new Canvas(x,y).createDeadCanvas( 200, 150, "selectXYZ" )
     cv.canvas.style.zIndex = -1;
     this.setCanvas(cv.canvas).setTxtSize(10).setColor("red")
         .clearPage()
         .flatX().gridInBoxXY(0,0,40)
         .iso().gridInBoxXY(0,0+60,40)
         .old().gridInBoxXY(0+50,0,40)
         .iso2().gridInBoxXY(0+50,0+60,40)
         .ortho().gridInBoxXY(0+100,0,40)
         .ortho2().gridInBoxXY(0+100,0+60,40)
         .switchCanvas("drawing")
         .setCurrentXYZtype();


};

Drawing.prototype.moveSelectXYZmenu = function(callback){
    let tempOnmousedown = document.onmousedown;
    let tempOnmousemove = document.onmousemove;
    document.onmousedown = () =>
    {   
        this.selectXYZmenuX = event.clientX;
        this.selectXYZmenuY = event.clientY;
        this.selectXYZtype(callback);
        document.onmousedown = tempOnmousedown;
        document.onmousemove = tempOnmousemove;

       
    };
    document.onmousemove = () =>
    {
        this.selectXYZmenuX = event.clientX;
        this.selectXYZmenuY = event.clientY;
        this.selectXYZtype(callback);
    };
};
Drawing.prototype.setCurrentXYZtype = function(){
   switch(this.XYZtype){
      case "flatX":
         this.flatX();
         break;
      case "ortho":
         this.ortho();
         break;
      case "iso":
         this.iso();
         break;
      case "ortho2":
         this.ortho2();
         break;
      case "iso2":
         this.iso2();
         break;
      case "old":
         this.old();
         break;
      }
};

Drawing.prototype.old = function(){
   this.rot_x = Math.PI*7/6;
   this.rot_y = Math.PI*5/3;
   this.rot_z = 0;
   return this;
//   this.rectXY(-580,0,50,20);
//   this.text_xy("old",-580,5);
};
Drawing.prototype.iso = function(){
   this.rot_x = Math.PI/6;
   this.rot_y = Math.PI*2/3;
   this.rot_z = 0;
   return this;
//   this.rectXY(-580,0,50,20);
//   this.textXY("iso",-580,5);
};
Drawing.prototype.iso2 = function(){
   this.rot_x = Math.PI*5/6;
   this.rot_y = Math.PI*4/3;
   this.rot_z = 0;
   return this;
//   this.rectXY(-580,0,50,20);
//  this.text_xy("iso2",-580,5);
};
Drawing.prototype.ortho = function(){
   this.rot_x = Math.PI/4;
   this.rot_y = Math.PI*3/4;
   this.rot_z = 0;
   return this;
//   this.rectXY(-580,0,50,20);
//   this.text_xy("ortho",-580,5);
};
Drawing.prototype.ortho2 = function(){
   this.rot_x = Math.PI*3/4;
   this.rot_y = Math.PI*5/4;
   this.rot_z = 0;
   return this;
 //  this.rectXY(-580,0,50,20);
//   this.text_xy("ortho2",-580,5);
};
Drawing.prototype.flatX = function(){
   this.rot_x = Math.PI;
   this.rot_y = Math.PI*7/6;
   this.rot_z = 0;
   return this;
 //  this.setTxtSize(16);
//   this.textXYinBox("flatX",540,260,"green","blue");
};
Drawing.prototype.textXYZ = function(txt,x,y,z){
   var point = new Point(this.xyz.x,this.xyz.y,this.xyz.z);
   var f_txt = this.txtSize+"px Arial";
   this.xyz.add(x,y,z);
   this.myContext.font = f_txt;
   this.myContext.fillStyle = this.txtColor;
   this.myContext.fillText(txt,this.to_x(),this.to_y());
//   this.xyz.sub(x,y,z);
   this.xyz.set(point.x,point.y,point.z);
//   console.log("text_out:"+txt+":"+this.to_x());
   return this;
};
Drawing.prototype.rectXY = function(x,y, width, height){
   this.myContext.fillStyle = this.color;
   this.myContext.beginPath();
   this.myContext.fillRect(x,y,width, height);
   this.myContext.closePath();
   return this;
};
Drawing.prototype.textXY = function(txt,x,y){
   var f_txt = this.txtSize+"px "+this.txtFont;
   this.myContext.font = f_txt;
   this.myContext.fillStyle = this.txtColor;
   this.myContext.fillText(txt,x,y)
   return this;
};
Drawing.prototype.textXYinBox = function(txt,x,y,txtColor,bgColor){
   var f_txt = this.txtSize+"px "+this.txtFont;
   this.myContext.font = f_txt;
//   var width = this.myContext.measureText(txt).width+20;
   var height = this.txtSize * 1.3;
   var yoff = this.txtSize/2-2;
   var width = this.myContext.measureText(txt).width+yoff;//this.txtSize;
   this.myContext.fillStyle = bgColor; 
   this.myContext.fillRect(x-yoff,yoff+y,width,-height);
   this.myContext.fillStyle = txtColor;
   this.myContext.fillText(txt,x,y);
   return this;
};
Drawing.prototype.textXYinBoxWidth = function(txt,x,y,txtColor,bgColor,maxWidth){
   var f_txt = this.txtSize+"px "+this.txtFont;
   this.myContext.font = f_txt;
   var width = this.myContext.measureText(txt).width;
   var height = Math.round(this.txtSize * 1.3);
   var yoff = this.txtSize/2-2;
   var numberOfLines = 0;
   var wideTxt = "nothing";
   var sliceTxt = txt;

   if(false && width < maxWidth){
      this.myContext.fillStyle = bgColor; 
      this.myContext.fillRect(x-yoff,yoff+y,maxWidth+this.txtSize,-height);
      this.myContext.fillStyle = txtColor;
      this.myContext.fillText(txt,x,y);
      }
    else{
      i = 0;
      for(var c in txt){
         wideTxt = sliceTxt.slice(0,i);
         width = this.myContext.measureText(wideTxt).width;
//         recorder.record("textInBoxWidth.width:"+width.toFixed(0)+"::::i:"+i);
//         recorder.record("wideTxt:"+wideTxt);
         if(width > maxWidth || sliceTxt[i] =="\n"){
            this.myContext.fillStyle = bgColor; 
            this.myContext.fillRect(x-yoff,numberOfLines*height+y+yoff,maxWidth+this.txtSize,-height);
            this.myContext.fillStyle = txtColor;
            this.myContext.fillText(wideTxt,x,y+numberOfLines*height);
            if(sliceTxt[i] =="\n"){
               i++;
               }
            sliceTxt = sliceTxt.slice(i);
            numberOfLines++;
            i=0;
            }
            i++;
         }
      }
      this.myContext.fillStyle = bgColor; 
      this.myContext.fillRect(x-yoff,numberOfLines*height+y+yoff,maxWidth+this.txtSize,-height);
      this.myContext.fillStyle = txtColor;
      this.myContext.fillText(sliceTxt,x,y+numberOfLines*height);
   return this;

};
Drawing.prototype.textXYinBoxShort = function(txt,x,y,txtColor,bgColor){
   var f_txt = this.txtSize+"px "+this.txtFont;
   this.myContext.font = f_txt;
   var height = this.txtSize * 1.3;
   var yoff = this.txtSize/2-2;
   var width = this.myContext.measureText(txt).width+5;
   this.myContext.fillStyle = bgColor; 
   this.myContext.fillRect(x,yoff+y,width,-height);
   this.myContext.fillStyle = txtColor;
   this.myContext.fillText(txt,x,y);
   return this;
};
Drawing.prototype.textXYcharAtColor= function(chemStr,x,y, charArray = [0], colorsArray = ['blue']){
   var x = x;
   var y = y;
   let placeInArray = 0;
   var txt = "";
   var width = 0;
   var str = chemStr;
   if( str instanceof Array ){
      str = chemStr[0];
   }
   for(let i=0;  i < str.length ; i++){
      if ( charArray[placeInArray] === i) {
             this.textXY(txt,x+width,y,"red","blue");
             width += this.myContext.measureText(txt).width;       
             this.textXYinBoxTight(str[i],x+width,y,colorsArray[placeInArray++],'blue');
             width += this.myContext.measureText(str[i]).width;
             txt = "";
             }
          else{
             txt += str[i];
         }
      }
      this.textXY(txt,x+width,y);//,"red","blue");
   return this;
};

Drawing.prototype.printChemicalStr= function(chemStr,x,y){
   var x = x;
   var y = y;
   let tempSize = this.txtSize;
   var txt = "";
   var width = 0;
   var str = chemStr;
   if( str instanceof Array ){
      str = chemStr[0];
   }
   for(let i=0;  i < str.length ; i++){
      if (!isNaN(parseInt(str.substr(i), 10))) {
             this.setTxtSize(tempSize);
             this.textXY(txt,x+width,y,"red","blue");
             width += this.myContext.measureText(txt).width; 
             this.setTxtSize(Math.round(tempSize*3/4));      
             this.textXY(str[i],x+width,y+4,"red","blue");
             width += this.myContext.measureText(str[i]).width;
             txt = "";
             }
          else{
             txt += str[i];
         }
      }
      this.setTxtSize(tempSize);
      this.textXY(txt,x+width,y);//,"red","blue");
   return this;
};
Drawing.prototype.printChemicalStrCenter= function(str,x,y){
//   var x = x;
//   var y = y;
   var txt = "";
   var width = 0;
   var halfWidth = this.myContext.measureText("C").width/2;
   var txtSize = this.txtSize;
   this.myContext.textBaseline = "middle";
   this.myContext.textAlign = "center";
   for(let i=0;  i < str.length ; i++){
      if (!isNaN(parseInt(str.substr(i), 10))) {
//   this.myContext.textBaseline = "middle";
//             this.myContext.textAlign = "center";
             this.setTxtSize(txtSize);
             this.textXY(txt,x+width-halfWidth,y,"red","blue");
             width += this.myContext.measureText(txt).width; 
             this.setTxtSize(txtSize*3/4); 
//             this.myContext.textBaseline = "alphabetic";
//             this.myContext.textAlign = "start";     
             this.textXY(str[i],x+width-(halfWidth*4/3),y+4,"red","blue");
             width += this.myContext.measureText(str[i]).width;
             txt = "";

             }
          else{
             txt += str[i];
         }
      }
//   this.myContext.textBaseline = "middle";
//   this.myContext.textAlign = "center";
   this.setTxtSize(txtSize);
   this.textXY(txt,x+width-halfWidth,y,"red","blue");
   this.myContext.textBaseline = "alphabetic";
   this.myContext.textAlign = "start";
   return this;
};
Drawing.prototype.textXYinBoxTight = function(txt,x,y,txtColor,bgColor){
   var f_txt = this.txtSize+"px "+this.txtFont;
   this.myContext.font = f_txt;
   var height = this.txtSize;
   var yoff = 2;
   var width = this.myContext.measureText(txt).width;
   this.myContext.fillStyle = bgColor;
   this.myContext.fillRect(Math.floor(x),y+yoff,width,-height);
   this.myContext.fillStyle = txtColor;
   this.myContext.fillText(txt,Math.floor(x),y);
   return this;
};
Drawing.prototype.textXYcenter = function(txt,x,y){
   var f_txt = this.txtSize+"px "+this.txtFont;
   this.myContext.textBaseline = "middle";
   this.myContext.textAlign = "center";
   this.myContext.font = f_txt;
   this.myContext.fillStyle = this.txtColor;
   this.myContext.fillText(txt,x,y)
   this.myContext.textBaseline = "alphabetic";
   this.myContext.textAlign = "start";
   return this;
};
Drawing.prototype.textXYcenterInBox= function(txt,x,y){
   var f_txt = this.txtSize+"px "+this.txtFont;
   this.myContext.textBaseline = "middle";
   this.myContext.textAlign = "center";
   this.myContext.font = f_txt;
   this.myContext.fillStyle = "#CADF3E"; 
   var height = this.txtSize * 1.1;
   var yoff = height/2;
   var width = this.myContext.measureText(txt).width+yoff;//this.txtSize;
   var xoff = width/2;
   this.myContext.fillRect(x-xoff, y-yoff, width, height);
   this.myContext.fillStyle = this.txtColor;
   this.myContext.fillText(txt,x,y)
   this.myContext.textBaseline = "alphabetic";
   this.myContext.textAlign = "start";
   return this;
};
Drawing.prototype.postXYZinBox = function(x,y,txtColor,bgColor){
   this.textXYinBox("x:"+this.xyz.x.toFixed(0)+"y:"+this.xyz.y.toFixed(0)+"z:"+this.xyz.z.toFixed(0),x,y,txtColor,bgColor);
   return this;
};
Drawing.prototype.setBGcolor = function(color){
   this.BGcolor = color;
   myDrawingCanvas.style.backgroundColor = color;
   return this;
};
Drawing.prototype.setColor = function(color){
   this.color = color;
   return this;
};
Drawing.prototype.setTxtSize = function(size){
   this.txtSize = size;
   return this;
};
Drawing.prototype.setTxtColor = function(color){
   this.txtColor = color;
   return this;
};

Drawing.prototype.setFont = function(num){
   switch(num){
      case 1 :
         this.txtFont = "Courier New";
         break;
      case 2 :
         this.txtFont = "Arial Black"
         break;
      case 3 :
         this.txtFont = "Times New Roman"
         break;
      case 4 :
          this.txtFont = "Lucida Sans Unicode"
         break;
      }
   return this;
};

Drawing.prototype.gridInBox = function(x,y,z){
   var point = new Point(this.xyz.x,this.xyz.y,this.xyz.z);
   var xyPoint = new Point(0,0,0);
   this.xyz.add(x,y,z);
   this.rect(0,0,0,80,80);
   this.grid(90);
//   this.rectx(75,75,"#FFFFFF");
//   this.recty(75,75,"#FFFFFF");
//   this.rectz(75,75,"#FFFFFF");
//   this.xyz = this.toXYZ(40,40);
   xyPoint = this.toXYZ(40,-20);
   this.xyz.add(xyPoint.x,xyPoint.y,xyPoint.z);
   this.grid(45);
   this.xyz.set(point.x,point.y,point.z);
};
Drawing.prototype.gridInBoxXY = function(x,y,size){
   var point = new Point(this.xyz.x,this.xyz.y,this.xyz.z);
   var xyPoint = new Point(0,0,0);
   this.color = "#DDEEBB";
   this.rectXY(x,y,size,size);
   this.xyz.set(0,0,0);
   xyPoint = this.toXYZ(x+size/2,y+size*3/4);
   this.xyz.add(xyPoint.x,xyPoint.y,xyPoint.z);
   this.grid(size*2/3);
   this.xyz.set(point.x,point.y,point.z);
   return this;
};

Drawing.prototype.toXYZ = function(x,y){
    var point = new Point(0,0,0);
    if(Math.abs(Math.cos(this.rot_x)) > 0.5){
       point.x = (x-this.orgin.x) / Math.cos(this.rot_x);
       point.z = (this.orgin.y-y) - point.x * Math.sin(this.rot_x);
       }
     else{
       point.x = (x-this.orgin.x) / Math.cos(this.rot_y);
       point.z = (this.orgin.y-y) - point.x * Math.sin(this.rot_y) ;        
       }


//    var txt = "toXYZ:::"+point.x.toFixed(2)+":"+point.y.toFixed(2)+":"+point.z.toFixed(2)+"<br>from::"+x+":"+y;
//    Math.sin(this.rot_x) + y / Math.cos(this.rot_y);
//    myAlert3(txt);
//    console.log(txt);
    return point;
};
Drawing.prototype.rect = function(x,y,z,width,height){
   var point = new Point(this.xyz.x,this.xyz.y,this.xyz.z);
   this.xyz.add(x,y,z);
   this.myContext.fillStyle=this.color; 
   this.myContext.fillRect(this.to_x(),this.to_y(),width,-height);
   this.xyz.set(point.x,point.y,point.z);
};
Drawing.prototype.grid = function(size){//coord_draw
    this.cColor.standard();
    this.color = this.cColor.x;
    this.moveTo(size,0,0);
    this.lineTo(0,0,0);
    this.color = this.cColor.y;
    this.moveTo(0,size,0);
    this.lineTo(0,0,0);
    this.color = this.cColor.z;
    this.moveTo(0,0,size);
    this.lineTo(0,0,0);
 
};
Drawing.prototype.rectx = function(x,y,color){
   this.moveTo(0,0,0);
   this.lineTo(0,0,y);
   this.lineTo(x,0,y);
   this.lineTo(x,0,0);
   this.lineTo(0,0,0);

   this.myContext.fillStyle=color;
   this.myContext.fill();
};
Drawing.prototype.recty = function(x,y,color){
   this.moveTo(0,0,0);
   this.lineTo(0,0,y);
   this.lineTo(0,x,y);
   this.lineTo(0,x,0);
   this.lineTo(0,0,0);

   this.myContext.fillStyle=color;
   this.myContext.fill();
};
Drawing.prototype.rectz = function(x,y,color){
   this.moveTo(0,0,0);
   this.lineTo(x,0,0);
   this.lineTo(x,y,0);
   this.lineTo(0,y,0);
   this.lineTo(0,0,0);

   this.myContext.fillStyle=color;
   this.myContext.fill();
};
Drawing.prototype.rectCube = function(x,y,z){
   //top
   this.color = "blue";//this.get_hexColor();
   this.moveTo(0,y,z);
   this.lineTo(0,0,z);
   this.lineTo(x,0,z);
   this.lineTo(x,y,z);
   this.lineTo(0,y,z);
  // sc.fillStyle=this.cColor.z;//"blue";//this.get_hexColor();//"#000088";
  // sc.fill();
   //y-side
   this.color = "green";
   this.moveTo(0,y,z);
   this.lineTo(0,y,0);
   this.lineTo(x,y,0);
   this.lineTo(x,y,z);
   this.lineTo(0,y,z);
  // sc.fillStyle=this.cColor.y;//"red";//this.get_hexColor();//"#008800";
  // sc.fill()
   //x-side
   this.color = "red";
   this.moveTo(x,0,z);
   this.lineTo(x,0,0);
   this.lineTo(x,y,0);
   this.lineTo(x,y,z);
   this.lineTo(x,0,z);
   //x-backside
   this.color = "red";
   this.moveTo(0,0,z);
   this.lineTo(0,0,0);
   this.lineTo(0,y,0);
   this.lineTo(0,y,z);
   this.lineTo(0,0,z);
   //y-backside
   this.color = "green";
   this.moveTo(0,0,z);
   this.lineTo(0,0,0);
   this.lineTo(x,0,0);
   this.lineTo(x,0,z);
   this.lineTo(0,0,z);


//   sc.fillStyle=this.cColor.x;//("green";//this.get_hexColor();//"#880000";
//   sc.fill();
};
Drawing.prototype.cubeSize = function(x = 0, y = 0 , z = 0, size = 50){
//bottom
   this.color = this.cColor.zBack;//this.get_hexColor();
   this.moveTo(x     , y+size, z);
   this.lineTo(x     , y     , z);
   this.lineTo(x+size, y+size, z);
   this.lineTo(x     , y+size, z);
   this.myContext.fillStyle=this.cColor.zBack;//"blue";//this.get_hexColor();//"#000088";
   this.myContext.fill();
   //y-backside
   this.color = this.cColor.yBack;
   this.moveTo(x     , y     , z+size);
   this.lineTo(x     , y     , z);
   this.lineTo(x+size, y     , z);
   this.lineTo(x+size, y     , z+size);
   this.lineTo(x     , y     , z+size);
   this.myContext.fillStyle=this.cColor.yBack;//"red";//this.get_hexColor();//"#008800";
   this.myContext.fill()
   //x-backside
   this.color = this.cColor.xBack;
   this.moveTo(x     , y     , z+size);
   this.lineTo(x     , y     , z);
   this.lineTo(x     , y+size, z);
   this.lineTo(x     , y+size, z+size);
   this.lineTo(x     , y     , z+size);
   this.myContext.fillStyle=this.cColor.xBack;//("green";//this.get_hexColor();//"#880000";
   this.myContext.fill();

   //x-side
   this.color = this.cColor.x;
   this.moveTo(x+size, y     , z+size);
   this.lineTo(x+size, y     , z);
   this.lineTo(x+size, y+size, z);
   this.lineTo(x+size, y+size, z+size);
   this.lineTo(x+size, y     , z+size);
   this.myContext.fillStyle=this.cColor.x;//("green";//this.get_hexColor();//"#880000";
   this.myContext.fill();
   
   //y-side
   this.color = this.cColor.y;
   this.moveTo(x     , y+size, z+size);
   this.lineTo(x     , y+size, z);
   this.lineTo(x+size, y+size, z);
   this.lineTo(x+size, y+size, z+size);
   this.lineTo(x     , y+size, z+size);
   this.myContext.fillStyle=this.cColor.y;//"red";//this.get_hexColor();//"#008800";
   this.myContext.fill()

   //top
   this.color = this.cColor.z;//this.get_hexColor();
   this.moveTo(x     , y+size, z+size);
   this.lineTo(x     , y     , z+size);
   this.lineTo(x+size, y     , z+size);
   this.lineTo(x+size, y+size, z+size);
   this.lineTo(x     , y+size, z+size);
   this.myContext.fillStyle=this.cColor.z;//"blue";//this.get_hexColor();//"#000088";
   this.myContext.fill();
};
Drawing.prototype.get_hexColor = function(x = this.x, y = this.y, z = this.z){
      var r;
      var g;
      var b;
      r=(y*255)/(this.size);
      g=(x*255)/(this.size);
      b=(z*255)/(this.size);
      if(b < 0){
         b = -b;
         }
      if(b > 255){
         b = 255;
         }
      if(g < 0){
         g = -g;
         }
      if(g > 255){
         g = 255;
         }  
      if(r < 0){
         r = -r;
         }
      if(r > 255){
         r = 255;
         }
      r = Math.round(r);
      b = Math.round(b);
      g = Math.round(g);
      this.hexColor = this.rgbToHex(r,g,b);
//      console.log("this.hexColor:"+this.hexColor);
   return this.hexColor;
};
Drawing.prototype.set_color_xyz = function(){
   this.color = this.get_hexColor();
};
Drawing.prototype.triangle = function(x,y,z,size){
   var point = new Point(this.xyz.x,this.xyz.y,this.xyz.z);
   this.xyz.add(x,y,z);
   this.moveTo(0,0,0);
   this.lineTo(size,0,size/2);
   this.moveTo(size,0,size/2);
   this.lineTo(size,0,-size/2);
   this.moveTo(size,0,-size/2);
   this.lineTo(0,0,0);
   this.myContext.fillStyle=this.color;
   this.myContext.fill();
   this.xyz.set(point.x,point.y,point.z);
   return this;
};
Drawing.prototype.triangleXY = function(x,y, sizeX, sizeY = sizeX, dir = "up", color=this.color){
    console.log(x,y,sizeX,sizeY,dir,color)
    switch(dir){
        case "up":
            this.moveToXY(x,sizeY+y)
            this.lineToXYopen(x+sizeX/2, y);
            this.lineToXYclose(x+sizeX, sizeY+y);
            break;
        case "down":
            this.moveToXY(x,y)
            this.lineToXYopen(x+sizeX/2, sizeY+y);
            this.lineToXYclose(x+sizeX, y);
            break;
        case "right":
            this.moveToXY(x,y)
            this.lineToXYopen(x+sizeX, sizeY/2+y);
            this.lineToXYclose(x, sizeY+y);
            break;
        case "left":
            this.moveToXY(x+sizeX,y)
            this.lineToXYopen(x, sizeY/2+y);
            this.lineToXYclose(x+sizeX, sizeY+y);
            break;
        default:
            break;
    }
    this.myContext.fillStyle=color;
    this.myContext.fill();
    return this;
};
Drawing.prototype.arcBetweenPositionsXY = function(x, y, radius, position1, position2, color = this.color){
    this.myContext.beginPath();
    this.myContext.arc(x,y , radius, (position1+15)*Math.PI/30, (position2+15)*Math.PI/30);  
    this.myContext.strokeStyle = color;
    this.myContext.stroke();
    return this;
};
Drawing.prototype.arcFill = function(radius,color){
    var point = new Point(this.xyz.x,this.xyz.y,this.xyz.z);
    var rad = radius*(1+this.xyz.y/this.pScale)
    this.myContext.beginPath();
    this.myContext.arc(this.to_x(),this.to_y(), rad,0,2*Math.PI);  
    this.myContext.fillStyle=this.color;
    this.myContext.fill();
    this.xyz.log();
    this.xyz.set(point.x,point.y,point.z);
    return this;
};
Drawing.prototype.circleXYZ = function(x,y,z,radius){
   var point = new Point(this.xyz.x,this.xyz.y,this.xyz.z);
   var rad = Math.abs(radius);
   this.xyz.add(x,y,z);
   this.myContext.beginPath();
   this.to_x();
   this.to_y();
   this.myContext.arc(this.x_xy,this.y_xy,rad,0,2*Math.PI);
   this.myContext.strokeStyle = this.color;
   this.myContext.stroke();
   this.xyz.set(point.x,point.y,point.z);
   return this;
};
Drawing.prototype.circleXY = function(x,y,radius){
   this.myContext.beginPath();
   this.myContext.arc(x,y,radius,0,2*Math.PI);
   this.myContext.strokeStyle = this.color;
   this.myContext.stroke();
   return this;
}
Drawing.prototype.circleXYsolid = function(x,y,radius){
   this.myContext.beginPath();
   this.myContext.arc(x,y,radius,0,2*Math.PI);
   this.myContext.strokeStyle = this.color;
   this.myContext.fillStyle = this.color;
   this.myContext.fill();
   return this;
};
Drawing.prototype.circleAbsXYZ = function(x,y,z,radius){
   var rad = radius;
   var point = new Point(this.xyz.x,this.xyz.y,this.xyz.z);
   this.xyz.set(x,y,z);
   this.myContext.beginPath();
   this.to_x();
   this.to_y();
//   myAlert7(this.x_xy+":"+this.y_xy+":"+rad);
   this.myContext.arc(this.x_xy,this.y_xy,rad,0,2*Math.PI);
   this.myContext.strokeStyle = this.color;
   this.myContext.stroke();
   this.xyz.set(point.x,point.y,point.z);
   return this;
};
Drawing.prototype.circle = function(radius){
   var point = new Point(this.xyz.x,this.xyz.y,this.xyz.z);
   var rad = radius;
   this.myContext.beginPath();
   this.to_x();
   this.to_y();
//   myAlert7(this.x_xy+":"+this.y_xy+":"+rad);
   this.myContext.arc(this.x_xy,this.y_xy,rad,0,2*Math.PI);
   this.myContext.strokeStyle = this.color;
   this.myContext.stroke();
   this.xyz.set(point.x,point.y,point.z);
   return this;
};
Drawing.prototype.moveTo = function(x,y,z){
   var point = new Point(this.xyz.x,this.xyz.y,this.xyz.z);
   this.xyz.add(x,y,z);
//   console.log("moveTo");
   this.to_x();
   this.to_y();
   this.myContext.beginPath();
   this.myContext.moveTo(this.x_xy,this.y_xy);
   this.xyz.set(point.x,point.y,point.z);
//   console.log("temp_point:"+this.xyz.x+":"+this.xyz.z);
   return this;
};
Drawing.prototype.moveToXY = function(x,y){
    this.myContext.beginPath();
    this.myContext.moveTo(x,y);
//   console.log("temp_point:"+this.xyz.x+":"+this.xyz.z);
   return this;
};
Drawing.prototype.lineToXYopen = function(x,y){
    this.myContext.lineTo(x,y);
   return this;
};
Drawing.prototype.lineToXYclose = function(x,y){
    this.myContext.lineTo(x,y);
    this.myContext.strokeStyle = this.color;
    this.myContext.closePath();
    this.myContext.stroke();
   return this;
};
Drawing.prototype.lineToXYfill = function(x,y){
    this.myContext.lineTo(x,y);
    this.myContext.strokeStyle = this.color;
    this.myContext.closePath();
    this.myContext.fill();
   return this;
};
Drawing.prototype.reactionArrow = function(x,y,dir,size,color){
    this.color = color;
   this.myContext.fillStyle=this.color;
    this.moveToXY(x,y);
    switch(dir){
      case "leftBottom":
         this.lineToXYopen(x+27,y+5);
         this.lineToXYfill(x+18,y);
         this.moveToXY(x,y);
         this.lineToXY(x+size,y);
         break;
      case "rightTop":
         this.lineToXY(x+size,y);
         this.lineToXYopen(x+size-27,y-5);
         this.lineToXYfill(x+size-18,y);
//         this.moveToXY(x,y);
//         this.lineToXY(x+size,y);
         break;
      case "left":
         this.lineToXYopen(x+18,y+4);
         this.lineToXYopen(x+15,y);
         this.lineToXYfill(x+18,y-4);
         this.moveToXY(x,y);
         this.lineToXY(x+size,y);
         break;
      case "right":
         this.moveToXY(x+size,y);
         this.lineToXYopen(x+size-18,y-4);
         this.lineToXYopen(x+size-15,y);
         this.lineToXYfill(x+size-18,y+4);
         this.moveToXY(x,y);
         this.lineToXY(x+size,y);
         break;
      case "double":
         this.lineToXYopen(x+18,y+4);
         this.lineToXYopen(x+15,y);
         this.lineToXYfill(x+18,y-4);
         this.moveToXY(x+size,y);
         this.lineToXYopen(x+size-18,y-4);
         this.lineToXYopen(x+size-15,y);
         this.lineToXYfill(x+size-18,y+4);
         this.moveToXY(x,y);
         this.lineToXY(x+size,y);
         break;

      }
   return this;
};
Drawing.prototype.close = function(x,y){
    this.myContext.strokeStyle = this.color;
    this.myContext.closePath();
    this.myContext.stroke();
   return this;
};
Drawing.prototype.fill = function(color){
  this.myContext.fillStyle=color;
  this.myContext.fill();
   return this;
};
Drawing.prototype.lineToXY = function(x,y){
    this.myContext.lineTo(x,y);
    this.myContext.strokeStyle = this.color;
    this.myContext.stroke();
   return this;
};
Drawing.prototype.octagon = function(x,y,size){
    var tx = x;
    var ty = y;
    this.circleXY(x,y,2);
    this.moveToXY(x,y);
    for(var i=0; i < 8 ; i++ ){
       tx +=size*Math.cos(i*Math.PI/4);
       ty +=size*Math.sin(i*Math.PI/4);
       this.lineToXYopen(tx,ty);
       }
    this.close();
   return this;
};
Drawing.prototype.pentagon = function(x,y,size){
    var tx = x;
    var ty = y;
    this.circleXY(x,y,2);
    this.moveToXY(x,y);
    for(var i=0; i < 5 ; i++ ){
       tx +=size*Math.cos(i*Math.PI/2.5);
       ty +=size*Math.sin(i*Math.PI/2.5);
       this.lineToXYopen(tx,ty);
       }
    this.close();
};
Drawing.prototype.hexagon = function(x,y,size){
    var tx = x;
    var ty = y;
    this.circleXY(x,y,1);
    this.moveToXY(x,y);
    for(var i=0; i < 6 ; i++ ){
       tx +=size*Math.cos(i*Math.PI/3);
       ty +=size*Math.sin(i*Math.PI/3);
       this.lineToXYopen(tx,ty);    
       }
    this.close();
};
Drawing.prototype.octagonSideLine = function(x,y,size,line){
    var tx = x;
    var ty = y;
    this.circleXY(x,y,2);
    for(var i=0; i < line ; i++ ){
       tx +=size*Math.cos(i*Math.PI/4);
       ty +=size*Math.sin(i*Math.PI/4);
       }
    this.moveToXY(tx,ty);
       tx +=size*Math.cos(line*Math.PI/4);
       ty +=size*Math.sin(line*Math.PI/4);
//   this.color = "red";
    this.lineToXY(tx,ty);
};
Drawing.prototype.agon = function(x,y,size,sides,startAngle){
    var tx = x;
    var ty = y;
    var angle = startAngle;
    var sidesd2 = sides/2;
//    this.color = "cyan";
//    this.circleXY(x,y,2);
    this.moveToXY(tx,ty);
    for(var i=0; i < sides ; i++ ){
       tx +=size*Math.cos(angle);
       ty +=size*Math.sin(angle);
       angle += Math.PI/sidesd2;
       this.lineToXYopen(tx,ty);
       }
    this.close();
};
Drawing.prototype.agonSide = function(x,y,size,line,sides,startAngle){
    var tx = x;
    var ty = y;
    var sidesd2 = sides/2;
//    this.circleXY(x,y,2);
    for(var i=0; i < line ; i++ ){
       tx +=size*Math.cos(i*Math.PI/sidesd2+startAngle);
       ty +=size*Math.sin(i*Math.PI/sidesd2+startAngle);
       }
//       if(line[i]){
          this.moveToXY(tx,ty);
          tx +=size*Math.cos(line*Math.PI/sidesd2+startAngle);
          ty +=size*Math.sin(line*Math.PI/sidesd2+startAngle);
          this.lineToXY(tx,ty);
//       }
};
Drawing.prototype.spike = function(x,y,size,spike,startAngle){

    var tx = x;
    var ty = y;
    var angled2 = Math.PI/30;
       this.moveToXY(tx,ty);
       tx+=size*Math.cos((spike)*angled2+startAngle);
       ty+=size*Math.sin((spike)*angled2+startAngle);
       this.lineToXY(tx,ty);
};
Drawing.prototype.inSideSpike = function(x,y,size,spike,startAngle){
    var tx = x;
    var ty = y;
    var angled2 = Math.PI/30;
       tx+=(size/8)*Math.cos((spike)*angled2+startAngle+Math.PI/2);
       ty+=(size/8)*Math.sin((spike)*angled2+startAngle+Math.PI/2);
       tx+=(size/12)*Math.cos((spike)*angled2+startAngle);
       ty+=(size/12)*Math.sin((spike)*angled2+startAngle);
       this.moveToXY(tx,ty);
       tx+=size*(5/6)*Math.cos((spike)*angled2+startAngle);
       ty+=size*(5/6)*Math.sin((spike)*angled2+startAngle);
       this.myContext.lineWidth = 3;
       this.lineToXY(tx,ty);       this.myContext.lineWidth = 1;

};
Drawing.prototype.inSideDashed = function(x,y,size,spike,startAngle){
    var tx = x;
    var ty = y;
    var angled2 = Math.PI/30;
       tx+=(size/8)*Math.cos((spike)*angled2+startAngle+Math.PI/2);
       ty+=(size/8)*Math.sin((spike)*angled2+startAngle+Math.PI/2);
       tx+=(size/12)*Math.cos((spike)*angled2+startAngle);
       ty+=(size/12)*Math.sin((spike)*angled2+startAngle);
       this.moveToXY(tx,ty);
       tx+=size*(5/6)*Math.cos((spike)*angled2+startAngle);
       ty+=size*(5/6)*Math.sin((spike)*angled2+startAngle);
       this.myContext.lineWidth = 3;
       this.myContext.setLineDash([7, 3]);
       this.lineToXY(tx,ty);
       this.myContext.lineWidth = 1;
       this.myContext.setLineDash([]);
};
Drawing.prototype.setLineWidth = function( width = 1){
    this.myContext.lineWidth = width;
    return this;
};
Drawing.prototype.outSideSpike = function(x,y,size,spike,startAngle){
    var tx = x;
    var ty = y;
    var angled2 = Math.PI/30;
       tx+=(size/8)*Math.cos((spike)*angled2+startAngle-Math.PI/2);
       ty+=(size/8)*Math.sin((spike)*angled2+startAngle-Math.PI/2);
       tx+=(size/12)*Math.cos((spike)*angled2+startAngle);
       ty+=(size/12)*Math.sin((spike)*angled2+startAngle);
       this.moveToXY(tx,ty);
       tx+=size*(5/6)*Math.cos((spike)*angled2+startAngle);
       ty+=size*(5/6)*Math.sin((spike)*angled2+startAngle);
       this.myContext.lineWidth = 3;
       this.lineToXY(tx,ty);
       this.myContext.lineWidth = 1;
};
Drawing.prototype.doubleSpike = function(x,y,size,spike,startAngle){
    var tx = x;
    var ty = y;
    var angled2 = Math.PI/30;
       tx+=(size/8)*Math.cos((spike)*angled2+startAngle+Math.PI/2);
       ty+=(size/8)*Math.sin((spike)*angled2+startAngle+Math.PI/2);
       this.moveToXY(tx,ty);
       tx+=size*Math.cos((spike)*angled2+startAngle);
       ty+=size*Math.sin((spike)*angled2+startAngle);
       this.lineToXY(tx,ty);
       tx=x+(size/8)*Math.cos((spike)*angled2+startAngle-Math.PI/2);
       ty=y+(size/8)*Math.sin((spike)*angled2+startAngle-Math.PI/2);
       this.moveToXY(tx,ty);
       tx+=size*Math.cos((spike)*angled2+startAngle);
       ty+=size*Math.sin((spike)*angled2+startAngle);
       this.lineToXY(tx,ty);
};
Drawing.prototype.wedgeBond = function(x,y,size,spike,startAngle){

    var tx = x;
    var ty = y;
    var angled2 = Math.PI/30;
       this.moveToXY(tx,ty);
       tx+=4*Math.cos((spike)*angled2+startAngle+Math.PI/2);
       ty+=4*Math.sin((spike)*angled2+startAngle+Math.PI/2);
//       this.moveToXY(tx,ty);
       tx+=size*Math.cos((spike)*angled2+startAngle);
       ty+=size*Math.sin((spike)*angled2+startAngle);
       this.lineToXYopen(tx,ty);
       tx=x+4*Math.cos((spike)*angled2+startAngle-Math.PI/2);
       ty=y+4*Math.sin((spike)*angled2+startAngle-Math.PI/2);
 //      this.moveToXY(tx,ty);
       tx+=size*Math.cos((spike)*angled2+startAngle);
       ty+=size*Math.sin((spike)*angled2+startAngle);
       this.lineToXYclose(tx,ty);
       this.fill(this.color);
};
Drawing.prototype.hatchedWedgeBond = function(x,y,size,spike,startAngle){

    var tx = x;
    var ty = y;
    var angled2 = Math.PI/30;
       tx+=5*Math.cos((spike)*angled2+startAngle+Math.PI/2);
       ty+=5*Math.sin((spike)*angled2+startAngle+Math.PI/2);
       tx+=size*Math.cos((spike)*angled2+startAngle);
       ty+=size*Math.sin((spike)*angled2+startAngle);
       this.moveToXY(tx,ty);
       tx=x+5*Math.cos((spike)*angled2+startAngle-Math.PI/2);
       ty=y+5*Math.sin((spike)*angled2+startAngle-Math.PI/2);
       tx+=size*Math.cos((spike)*angled2+startAngle);
       ty+=size*Math.sin((spike)*angled2+startAngle);
       this.lineToXYopen(tx,ty);
       tx=x+4*Math.cos((spike)*angled2+startAngle-Math.PI/2);
       ty=y+4*Math.sin((spike)*angled2+startAngle-Math.PI/2);
       tx+=size*7/8*Math.cos((spike)*angled2+startAngle);
       ty+=size*7/8*Math.sin((spike)*angled2+startAngle);
       this.lineToXYopen(tx,ty);
       tx=x+4*Math.cos((spike)*angled2+startAngle+Math.PI/2);
       ty=y+4*Math.sin((spike)*angled2+startAngle+Math.PI/2);
       tx+=size*7/8*Math.cos((spike)*angled2+startAngle);
       ty+=size*7/8*Math.sin((spike)*angled2+startAngle);
       this.lineToXYclose(tx,ty);
       this.fill(this.color);

       tx=x+4*Math.cos((spike)*angled2+startAngle+Math.PI/2);
       ty=y+4*Math.sin((spike)*angled2+startAngle+Math.PI/2);
       tx+=size*3/4*Math.cos((spike)*angled2+startAngle);
       ty+=size*3/4*Math.sin((spike)*angled2+startAngle);
       this.moveToXY(tx,ty);
       tx=x+4*Math.cos((spike)*angled2+startAngle-Math.PI/2);
       ty=y+4*Math.sin((spike)*angled2+startAngle-Math.PI/2);
       tx+=size*3/4*Math.cos((spike)*angled2+startAngle);
       ty+=size*3/4*Math.sin((spike)*angled2+startAngle);
       this.lineToXYopen(tx,ty);
       tx=x+3*Math.cos((spike)*angled2+startAngle-Math.PI/2);
       ty=y+3*Math.sin((spike)*angled2+startAngle-Math.PI/2);
       tx+=size*5/8*Math.cos((spike)*angled2+startAngle);
       ty+=size*5/8*Math.sin((spike)*angled2+startAngle);
       this.lineToXYopen(tx,ty);
       tx=x+3*Math.cos((spike)*angled2+startAngle+Math.PI/2);
       ty=y+3*Math.sin((spike)*angled2+startAngle+Math.PI/2);
       tx+=size*5/8*Math.cos((spike)*angled2+startAngle);
       ty+=size*5/8*Math.sin((spike)*angled2+startAngle);
       this.lineToXYclose(tx,ty);
       this.fill(this.color);

       tx=x+3*Math.cos((spike)*angled2+startAngle+Math.PI/2);
       ty=y+3*Math.sin((spike)*angled2+startAngle+Math.PI/2);
       tx+=size*1/2*Math.cos((spike)*angled2+startAngle);
       ty+=size*1/2*Math.sin((spike)*angled2+startAngle);
       this.moveToXY(tx,ty);
       tx=x+3*Math.cos((spike)*angled2+startAngle-Math.PI/2);
       ty=y+3*Math.sin((spike)*angled2+startAngle-Math.PI/2);
       tx+=size*1/2*Math.cos((spike)*angled2+startAngle);
       ty+=size*1/2*Math.sin((spike)*angled2+startAngle);
       this.lineToXYopen(tx,ty);
       tx=x+2*Math.cos((spike)*angled2+startAngle-Math.PI/2);
       ty=y+2*Math.sin((spike)*angled2+startAngle-Math.PI/2);
       tx+=size*3/8*Math.cos((spike)*angled2+startAngle);
       ty+=size*3/8*Math.sin((spike)*angled2+startAngle);
       this.lineToXYopen(tx,ty);
       tx=x+2*Math.cos((spike)*angled2+startAngle+Math.PI/2);
       ty=y+2*Math.sin((spike)*angled2+startAngle+Math.PI/2);
       tx+=size*3/8*Math.cos((spike)*angled2+startAngle);
       ty+=size*3/8*Math.sin((spike)*angled2+startAngle);
       this.lineToXYclose(tx,ty);
       this.fill(this.color);

       tx=x+2*Math.cos((spike)*angled2+startAngle+Math.PI/2);
       ty=y+2*Math.sin((spike)*angled2+startAngle+Math.PI/2);
       tx+=size*1/4*Math.cos((spike)*angled2+startAngle);
       ty+=size*1/4*Math.sin((spike)*angled2+startAngle);
       this.moveToXY(tx,ty);
       tx=x+2*Math.cos((spike)*angled2+startAngle-Math.PI/2);
       ty=y+2*Math.sin((spike)*angled2+startAngle-Math.PI/2);
       tx+=size*1/4*Math.cos((spike)*angled2+startAngle);
       ty+=size*1/4*Math.sin((spike)*angled2+startAngle);
       this.lineToXYopen(tx,ty);
       this.lineToXYclose(x,y);
       this.fill(this.color);


};

Drawing.prototype.calcAngleAdd =function(sides){
   switch(sides){
      case false:
         return Math.PI/12;//Math.PI/2;////0
         break;
      case 8:
         return -Math.PI/8;
         break;
      case 7:
         return -Math.PI/14;
         break;
      case 6:
         return 0;
         break;
      case 5:
         return Math.PI/10;
         break;
      case 4:
         return Math.PI/4;
         break;
      case 3:
         return Math.PI/2;
         break;
      case 2:
         return Math.PI;
         break;
      case 1:
         return 0;
         break;
      }
};

Drawing.prototype.agonSpike = function(x,y,size,spike,sides,startAngle){
    var tx = x;
    var ty = y;
    var angleAdd = this.calcAngleAdd(sides);
    var angled2 = Math.PI/(sides/2);
    for(var i=0; i < spike ; i++ ){
       tx +=size*Math.cos(i*angled2+startAngle);
       ty +=size*Math.sin(i*angled2+startAngle);
       }
       this.moveToXY(tx,ty);

       tx+=size*Math.cos(--i*angled2-angled2+startAngle+angleAdd);
       ty+=size*Math.sin(i*angled2-angled2+startAngle+angleAdd);
       this.lineToXY(tx,ty);
};
Drawing.prototype.agonHatchedWedgeBond = function(x,y,size,spike,sides,startAngle){
    var tx = x;
    var ty = y;
    var angleAdd = this.calcAngleAdd(sides);
    var angled2 = Math.PI/(sides/2);
    for(var i=0; i < spike ; i++ ){
       tx +=size*Math.cos(i*angled2+startAngle);
       ty +=size*Math.sin(i*angled2+startAngle);

       }
       var ttx=tx;
       var tty=ty;
       tx+=5*Math.cos((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       ty+=5*Math.sin((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       tx+=size*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.moveToXY(tx,ty);
       tx=ttx+5*Math.cos((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       ty=tty+5*Math.sin((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       tx+=size*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.lineToXYopen(tx,ty);
       tx=ttx+4*Math.cos((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       ty=tty+4*Math.sin((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       tx+=size*7/8*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*7/8*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.lineToXYopen(tx,ty);
       tx=ttx+4*Math.cos((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       ty=tty+4*Math.sin((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       tx+=size*7/8*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*7/8*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.lineToXYclose(tx,ty);
       this.fill(this.color);

       tx=ttx+4*Math.cos((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       ty=tty+4*Math.sin((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       tx+=size*3/4*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*3/4*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.moveToXY(tx,ty);
       tx=ttx+4*Math.cos((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       ty=tty+4*Math.sin((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       tx+=size*3/4*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*3/4*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.lineToXYopen(tx,ty);
       tx=ttx+3*Math.cos((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       ty=tty+3*Math.sin((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       tx+=size*5/8*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*5/8*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.lineToXYopen(tx,ty);
       tx=ttx+3*Math.cos((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       ty=tty+3*Math.sin((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       tx+=size*5/8*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*5/8*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.lineToXYclose(tx,ty);
       this.fill(this.color);

       tx=ttx+3*Math.cos((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       ty=tty+3*Math.sin((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       tx+=size*1/2*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*1/2*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.moveToXY(tx,ty);
       tx=ttx+3*Math.cos((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       ty=tty+3*Math.sin((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       tx+=size*1/2*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*1/2*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.lineToXYopen(tx,ty);
       tx=ttx+2*Math.cos((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       ty=tty+2*Math.sin((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       tx+=size*3/8*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*3/8*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.lineToXYopen(tx,ty);
       tx=ttx+2*Math.cos((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       ty=tty+2*Math.sin((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       tx+=size*3/8*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*3/8*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.lineToXYclose(tx,ty);
       this.fill(this.color);

       tx=ttx+2*Math.cos((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       ty=tty+2*Math.sin((spike-2)*angled2+startAngle+Math.PI/2+angleAdd);
       tx+=size*1/4*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*1/4*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.moveToXY(tx,ty);
       tx=ttx+2*Math.cos((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       ty=tty+2*Math.sin((spike-2)*angled2+startAngle-Math.PI/2+angleAdd);
       tx+=size*1/4*Math.cos((spike-2)*angled2+startAngle+angleAdd);
       ty+=size*1/4*Math.sin((spike-2)*angled2+startAngle+angleAdd);
       this.lineToXYopen(tx,ty);
       this.lineToXYclose(ttx,tty);
       this.fill(this.color);
};
Drawing.prototype.agonWedgeBond = function(x,y,size,spike,sides,startAngle){
    var tx = x;
    var ty = y;
    var angleAdd = this.calcAngleAdd(sides);
    var angled2 = Math.PI/(sides/2);
    for(var i=0; i < spike ; i++ ){
       tx +=size*Math.cos(i*angled2+startAngle);
       ty +=size*Math.sin(i*angled2+startAngle);

       }
       var ttx=tx+4*Math.cos(((spike-1))*angled2-angled2+startAngle+angleAdd+Math.PI/2);
       var tty=ty+4*Math.sin(((spike-1))*angled2-angled2+startAngle+angleAdd+Math.PI/2);
       this.moveToXY(tx,ty);
       ttx+=size*Math.cos((spike-1)*angled2-angled2+startAngle+angleAdd);
       tty+=size*Math.sin((spike-1)*angled2-angled2+startAngle+angleAdd);
       this.lineToXYopen(ttx,tty);
       tx+=4*Math.cos(((spike-1))*angled2-angled2+startAngle+angleAdd-Math.PI/2);
       ty+=4*Math.sin(((spike-1))*angled2-angled2+startAngle+angleAdd-Math.PI/2);
//       this.moveToXY(tx,ty);
       tx+=size*Math.cos((spike-1)*angled2-angled2+startAngle+angleAdd);
       ty+=size*Math.sin((spike-1)*angled2-angled2+startAngle+angleAdd);
       this.lineToXYclose(tx,ty);
       this.fill(this.color);
};
Drawing.prototype.agonDoubleSpike = function(x,y,size,spike,sides,startAngle){
    var tx = x;
    var ty = y;
    var angleAdd = this.calcAngleAdd(sides);
    var angled2 = Math.PI/(sides/2);
    for(var i=0; i < spike ; i++ ){
       tx +=size*Math.cos(i*angled2+startAngle);
       ty +=size*Math.sin(i*angled2+startAngle);

       }
       var ttx=tx+3*Math.cos(((spike-1))*angled2-angled2+startAngle+angleAdd+Math.PI/2);
       var tty=ty+3*Math.sin(((spike-1))*angled2-angled2+startAngle+angleAdd+Math.PI/2);
       this.moveToXY(ttx,tty);
       ttx+=size*Math.cos((spike-1)*angled2-angled2+startAngle+angleAdd);
       tty+=size*Math.sin((spike-1)*angled2-angled2+startAngle+angleAdd);
       this.lineToXY(ttx,tty);
       tx+=3*Math.cos(((spike-1))*angled2-angled2+startAngle+angleAdd-Math.PI/2);
       ty+=3*Math.sin(((spike-1))*angled2-angled2+startAngle+angleAdd-Math.PI/2);
       this.moveToXY(tx,ty);
       tx+=size*Math.cos((spike-1)*angled2-angled2+startAngle+angleAdd);
       ty+=size*Math.sin((spike-1)*angled2-angled2+startAngle+angleAdd);
       this.lineToXY(tx,ty);
};

Drawing.prototype.agonAtAgonSpike = function(x,y,size,spike,sides,nodeSides,startAngle){
    var tx = x;
    var ty = y;

    var angleAdd = this.calcAngleAdd(sides);
    var angled2 = Math.PI/(sides/2);
    for(var i=0; i < spike ; i++ ){
       tx +=size*Math.cos(i*angled2+startAngle);
       ty +=size*Math.sin(i*angled2+startAngle);
       }
       this.moveToXY(tx,ty);
       tx+=size*Math.cos(--i*angled2-angled2+startAngle+angleAdd);
       ty+=size*Math.sin(i*angled2-angled2+startAngle+angleAdd);
       this.lineToXY(tx,ty);
       var nextStartAngle =  i*angled2-angled2+startAngle+Math.PI/(nodeSides)-Math.PI/2+angleAdd;
       this.agon(tx,ty,size,nodeSides,nextStartAngle);
   return nextStartAngle;
};
Drawing.prototype.agonTxtPoint = function(txt,x,y,size,spike,sides,startAngle){
    var tx = (x-myDrawingContext.measureText(txt).width/2);
    var ty = y-1+this.txtSize/2;
    var angled2 = Math.PI/(sides/2);
    for(var i=0; i < spike ; i++ ){
       tx +=size*Math.cos(i*angled2+startAngle);
       ty +=size*Math.sin(i*angled2+startAngle);
       }
       this.textXYinBoxTight(txt,Math.floor(tx),Math.floor(ty),"red","#CADF3E");
};
Drawing.prototype.txtSpike = function(txt,x,y,size,spike,startAngle,color){
    var tx = (x-myDrawingContext.measureText(txt).width/2);
    var ty = y-1+this.txtSize/2;
    var angled2 = Math.PI/30;
       tx+=size*Math.cos((spike)*angled2+startAngle);
       ty+=size*Math.sin((spike)*angled2+startAngle);
    this.textXYinBoxTight(txt,Math.floor(tx),Math.floor(ty),color,"#CADF3E");
};
Drawing.prototypeagonSpike = function(x,y,size,spike,sides,startAngle){
    var tx = x;
    var ty = y;
    var angleAdd = this.calcAngleAdd(sides);
    var angled2 = Math.PI/(sides/2);
    for(var i=0; i < spike ; i++ ){
       tx +=size*Math.cos(i*angled2+startAngle);
       ty +=size*Math.sin(i*angled2+startAngle);
       }
       this.moveToXY(tx,ty);

       tx+=size*Math.cos(--i*angled2-angled2+startAngle+angleAdd);
       ty+=size*Math.sin(i*angled2-angled2+startAngle+angleAdd);
       this.lineToXY(tx,ty);
};
Drawing.prototype.agonTxtSpike = function(txt,x,y,size,spike,sides,startAngle){
    var tx = (x-myDrawingContext.measureText(txt).width/2);
    var ty = y-1+this.txtSize/2;
    var angleAdd = this.calcAngleAdd(sides);
    var angled2 = Math.PI/(sides/2);
    for(var i=0; i < spike ; i++ ){
       tx +=size*Math.cos(i*angled2+startAngle);
       ty +=size*Math.sin(i*angled2+startAngle);
       }
    tx+=size*Math.cos(--i*angled2-angled2+startAngle+angleAdd);
    ty+=size*Math.sin(i*angled2-angled2+startAngle+angleAdd);
    this.textXYinBoxTight(txt,Math.floor(tx),Math.floor(ty),this.color,"#CADF3E");
};

Drawing.prototype.lineTo = function(x,y,z){
    var point = new Point(this.xyz.x,this.xyz.y,this.xyz.z);   
    this.xyz.add(x,y,z);
    this.to_x();
    this.to_y();
    this.myContext.lineTo(this.x_xy,this.y_xy);
    this.myContext.strokeStyle = this.color;
    this.myContext.stroke();
    this.xyz.set(point.x,point.y,point.z);
    return this;
};
Drawing.prototype.postXYZrotation = function(x,y){
   var rnd = 1;
   var txt="Rotation";
   this.setTxtSize(10);
   this.txtColor = "black";
   this.text_xy(txt,x,y);
   rnd = this.rotate.x*180/Math.PI;
   rnd = Math.round(rnd);
   txt = "x: "+ rnd;
   this.text_xy(txt,x+20,y+15);
   rnd = this.rotate.y*180/Math.PI;
   rnd = Math.round(rnd);
   txt = "y: "+ rnd;
   this.text_xy(txt,x+20,y+30);
   rnd = this.rotate.z*180/Math.PI;
   rnd = Math.round(rnd);
   txt = "z: "+ rnd;
   this.text_xy(txt,x+20,y+45); 
};
Drawing.prototype.rotateXyz = function(x,y,z,rotate){
    var tx,ty,tz;
    this.xyz.sub(x,y,z);
    ty=this.xyz.y*Math.cos(rotate.x)
         -this.xyz.z*Math.sin(rotate.x);
    tz=this.xyz.y*Math.sin(rotate.x)
              +this.xyz.z*Math.cos(rotate.x);
    this.xyz.y=ty;
    this.xyz.z=tz;
    tz=this.xyz.x*Math.cos(rotate.y)
         +this.xyz.z*Math.sin(rotate.y);
    tx=-this.xyz.x*Math.sin(rotate.y)
               +this.xyz.z*Math.cos(rotate.y);
    this.xyz.x=tx;

    tx=this.xyz.x*Math.cos(rotate.z)
         -this.xyz.y*Math.sin(rotate.z);
    ty=this.xyz.x*Math.sin(this.rotate.z)
               +this.xyz.y*Math.cos(rotate.z);

    this.xyz.set(tx,ty,tz);
    this.xyz.add(x,y,z);
};
Drawing.prototype.rotate_x = function(){
    var y_out;
    this.xyz.sub(this.rotationOrgin.x,this.rotationOrgin.y,
                 this.rotationOrgin.z);
    y_out=this.xyz.y*Math.cos(this.rotate.x)
         -this.xyz.z*Math.sin(this.rotate.x);
    this.xyz.z=this.xyz.y*Math.sin(this.rotate.x)
              +this.xyz.z*Math.cos(this.rotate.x);
    this.xyz.y=y_out;
    this.xyz.add(this.rotationOrgin.x,this.rotationOrgin.y,
                 this.rotationOrgin.z);

    return this.xyz;
};   
Drawing.prototype.rotate_y = function(){
    var x_out;
    this.xyz.sub(this.rotationOrgin.x,
                 this.rotationOrgin.y,
                 this.rotationOrgin.z);

    x_out=this.xyz.x*Math.cos(this.rotate.y)
         +this.xyz.z*Math.sin(this.rotate.y);
    this.xyz.z=-this.xyz.x*Math.sin(this.rotate.y)
               +this.xyz.z*Math.cos(this.rotate.y);
    this.xyz.x=x_out;

     this.xyz.add(this.rotationOrgin.x,
                  this.rotationOrgin.y,
                  this.rotationOrgin.z);

    return this.xyz;
};
Drawing.prototype.rotate_z = function(){
    var x_out;
    this.xyz.sub(this.rotationOrgin.x,this.rotationOrgin.y,
                 this.rotationOrgin.z);

    x_out=this.xyz.x*Math.cos(this.rotate.z)
         -this.xyz.y*Math.sin(this.rotate.z);
    this.xyz.y=this.xyz.x*Math.sin(this.rotate.z)
               +this.xyz.y*Math.cos(this.rotate.z);
    this.xyz.x=x_out;
    this.xyz.add(this.rotationOrgin.x,this.rotationOrgin.y,
                 this.rotationOrgin.z);

    return this.xyz;
};
Drawing.prototype.checkRotate = function(){
    if(this.rotate.x != 0){
       this.rotate_x();
       } 
    if(this.rotate.y != 0){
      this.rotate_y();
      }
    if(this.rotate.z != 0){
      this.rotate_z();
      }
};

Drawing.prototype.to_x = function(){
    this.checkRotate();
    this.x_xy=this.xyz.x*Math.cos(this.rot_x)*this.scale;
    this.x_xy+=this.xyz.y*Math.cos(this.rot_y)*this.scale+this.orgin.x;
//    this.x_xy += this.xyz.z*(1+this.xyz.x/this.pScale);
//    this.xyz.log("to_x:_"+this.x_xy);
    return this.x_xy   
};
Drawing.prototype.to_y = function(){
//    this.checkRotate();  
//    this.y_xy = Math.cos(this.rot_y)*(this.xyz.y);
    this.y_xy = Math.sin(this.rot_x)*(this.xyz.x)*this.scale;
    this.y_xy += Math.sin(this.rot_y)*(this.xyz.y)*this.scale;
//    var perspectiveScale = this.y_xy/this.pScale; 
//    if(perspectiveScale>1){
//       perspectiveScale = 0;
//       perspectiveScale /= Math.abs(perspectiveScale);
//       }
    this.y_xy += this.xyz.z;//*(1-(perspectiveScale));//(1+this.xyz.y)*(1+this.xyz.x)/this.pScale;
    this.y_xy=this.orgin.y-this.y_xy;
//    this.xyz.log("to_y:_");
    return this.y_xy;
};
/*
this.to_x = function(){
//   console.log("to_x:"+this.rot_z+":"+this.rot_x+":"+this.rot_y+":"+this.rot_z);
    this.x_xy=this.xyz.x*Math.cos(this.rot_x)*(1+this.xyz.y/this.pScale);
    this.x_xy+=this.xyz.y*Math.cos(this.rot_y);
  //  console.log("this.x_xy:"+this.x_xy+":"+x+":"+y+":"+z);
    return this.x_xy;   
};
this.to_y = function(){
//    console.log("to_y:"+this.rot_z+":"+this.rot_x+":"+this.rot_y);
//      var zScale = this.xyz.y/pScale+this.xyz.x/pScale;
//      zScale = Math.sqrt(zScale);
//     this.y_xy=this.xyz.z*(1+zScale);
       
    this.y_xy = Math.sin(this.rot_y)*(this.xyz.y);
    this.y_xy += Math.sin(this.rot_x)*(this.xyz.x);
    this.y_xy += this.xyz.z*(1+this.xyz.y/this.pScale);
    this.y_xy=-this.y_xy;
  //  console.log("this.y_xy:"+this.y_xy+":"+x+":"+y+":"+z);
    return this.y_xy;
};*/
this.rotate_aboutZ = function(angle){
//   console.log(this.rot_z+":"+this.rot_x+":"+this.rot_y);
   this.rot_z +=angle;
   this.rot_x +=angle;
   this.rot_y +=angle;
//   console.log(this.rot_z+":"+this.rot_x+":"+this.rot_y);

};
Drawing.prototype.colorPicker = function(x,y){
   var pickColor = "white";
   this.ortho();

   for(var r=0 ; r < 255 ; r+=16){
     for(var g=0 ; g < 255 ; g+=16){
        for(var b=0 ; b < 255 ; b+=16){
           pickColor = this.rgbToHex(r,g,b);
           this.color = pickColor;
           this.xyz.set(r/2+x,g/2+y,b/2);/////////////////////////////////////////////////////////
           this.circle(1);
           }
        }
     }
return pickColor;
};
Drawing.prototype.rotatexUp = function(callback = null){
    var i;
    for (i=0;i<1;i++){
       this.rotate.add(Math.PI/48,0,0);
       }
    if(callback)callback();
};
Drawing.prototype.rotatexDown = function(callback = null){
    var i;
    for (i=0;i<1;i++){
       this.rotate.sub(Math.PI/48,0,0);
       }
    if(callback)callback();

};
Drawing.prototype.rotatezUp = function(callback = null){
   this.rotate.add(0,0,Math.PI/48);
    if(callback)callback();
};
Drawing.prototype.rotatezDown = function(callback = null){
    var i;
    for (i=0;i<1;i++){
       this.rotate.sub(0,0,Math.PI/48);
       }
    if(callback)callback();
};
Drawing.prototype.rotateyUp = function(callback = null){
    var i;
    for (i=0;i<1;i++){
       this.rotate.add(0,Math.PI/48,0);
       }
    if(callback)callback();
};
Drawing.prototype.rotateyDown = function(callback = null){
    this.rotate.sub(0,Math.PI/48,0);
    if(callback)callback();
};
Drawing.prototype.rotateReset = function(callback = null){
    this.rotate.set(0,0,0);
    if(callback)callback();
};

Drawing.prototype.rotateOut = function(x,y){
   var rnd = 1;
   var txt="Rotation";
   this.setTxtSize(12);
   this.txtColor = "blue";
   this.color = "slateGrey";
   this.rectXY(x-5,y-13,52,67);
   this.color = "lightBlue";
   this.rectXY(x-2,y-10,46,60);
   this.textXY(txt,x,y);
   txt += "<br>x:"+this.rotate.x.toFixed(2)+
          "<br>y:"+this.rotate.y.toFixed(2)+
          "<br>z:"+this.rotate.z.toFixed(2);
   myAlert4(txt);

   rnd = this.rotate.x*180/Math.PI;
   rnd = Math.round(rnd);
   txt = "x: "+ rnd;
   this.textXY(txt,x+5,y+15);
   rnd = this.rotate.y*180/Math.PI;
   rnd = Math.round(rnd);
   txt = "y: "+ rnd;
   this.textXY(txt,x+5,y+30);
   rnd = this.rotate.z*180/Math.PI;
   rnd = Math.round(rnd);
   txt = "z: "+ rnd;
   this.textXY(txt,x+5,y+45);  
};
Drawing.prototype.random_hexColor = function(){
   var hexColor;
   var r = Math.random()*256;
   var g = Math.random()*256;
   var b = Math.random()*256;
   r = Math.round(r);
   g = Math.round(g);
   b = Math.round(b);
   var hexColor = this.rgbToHex(r,g,b);
   return hexColor;
};
Drawing.prototype.rgbToHex = function(r,g,b){
   var hexColor = "#";
   hexColor += this.toHex(r);
   hexColor += this.toHex(g);
   hexColor += this.toHex(b);
   return hexColor;
};
Drawing.prototype.toHex =function(N) {
   var hex = "0123456789ABCDEF".charAt((N-N%16)/16)
      + "0123456789ABCDEF".charAt(N%16);
   return hex;
};

