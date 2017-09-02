//AI Node Creator

var aiController = new AIcontroller("aiController");
var recorder = new Recorder("recorder");
aiController.menu();
//recorder.menu();


function AIconnection(node,color,other,direction){
   this.stregth = Math.random();
   this.color = color;
   this.other = other;
   this.direction = direction;
   this.node = node;
}
function How(color,other,direction,error){
   this.error = error;
   this.color = color;
   this.other = other;
   this.direction = direction;
}
function AInode(node,color,other,direction){
   this.node = node;
   this.connection = [];
   this.inComming = [];
   this.color = color;
   this.other = other;
   this.direction = direction;
   this.value = 1;

//   this.recordNode();
/*
this.verifyNode = function(n){
   if(!(this.nodes[n])){
      this.nodes[n] = 0;
      }
};
this.pushNode = function(num){
   if(num == 0){
      this.nodes.push(1);
      this.nodes[this.nodes.length-1] = 0;
      }
   else{
      this.nodes.push(num);
      }
};*/
this.recordNode = function(){
   recorder.record(this.node);
   recorder.record(this.connection.length);
   recorder.record(this.color);
   recorder.record(this.other);
   recorder.record(this.direction);
};
}


function AIcontroller(name){
   this.name = name;
   this.location = new Drawing(0,0,0);
   this.location.setXYZtype("flatX");
   this.laneOne = [];
   this.numNodes = 6;
   this.minNodes = 3;
   this.maxNodes = this.numNodes + 2;
   var currentNode = 0;
//   this.matrix = new Matrix(this.name+".aiNode",this);
//   this.matrix[0] = new AInode(1,1,[1]);
   this.colors = [ "yellow","green","blue","cyan","olive","red","teal","orange","violet","forestGreen",
                   "lime","white","sienna","blueGreen","pink","aqua","brown","coral","indianRed",
                   "darkCyan","darkGreen","darkRed","darkSeaGreen","darkSlateBlue","darkViolet",
                   "gold","silver","tourquise","tan"];//,"magenta"
   this.other = [ "big","small","hot","cold","rain","snow","car","boat","house","baby","cat","dog" ];
   this.direction = [ "up","down","left","right","sidewaze" ];

this.menu = function(){
   netMenu = new MenuThis(this,"myAIMenu");
   netMenu.clear().setBGcolor('#CADF3E')
    .btn("create"          ,  900, 500, () => this.create()         , 40, 20, "CrTc")
    .btn("calc"            ,  900, 530, () => this.calc()           , 40, 20, "CrTc")
    .btn("plot"            ,  900, 560, () => this.plot()           , 40, 20, "CrTc")
    .btn("Show<br>connect" , 1000, 450, () => this.showConnections(), 40, 35, "CrTc")
    .setBGcolor('#CADF3E')
    .btn("change<br>Colors", 1050, 450, () => this.changeLaneColors(), 40, 40)
    .btn("adjust"          , 1100, 450, () => this.runAdjust()       , 40)
//Min number of Nodes
   .btn("Min"              ,  900,  10, () => { this.minNodes += 1; this.menu() }, 40, 20, "CgWxTc")
   .text(this.minNodes     ,  910,  37, "lightBlue")
   .btn("-"+this.minNodes  ,  900,  35, () => { this.minNodes -= 1; this.menu() }, 40, 20, "CgWxTc")
//Max number of Nodes
   .btn("Max"              ,  950,  10, () => { this.maxNodes += 1; this.menu() }, 40, 20, "CgWxTC")
   .text(this.maxNodes     ,  960,  37,"lightBlue")
   .btn(".-"+this.maxNodes ,  950,  35, () => { this.maxNodes -= 1; this.menu() } , 40, 20, "CrMxTC")
//number of Nodes
   .btn("Nodes"            , 1000,  10, () => { this.numNodes += 1; this.menu() } , 40, 20, "CgWxTr")
   .text(this.numNodes     , 1010,  37,"lightBlue")
   .btn("-"+this.numNodes  , 1000,  35, () => { this.numNodes -= 1; this.menu() } , 40, 20, "CrWxTr");

};
this.create = function(){
   this.laneOne=[];
   this.createLane(this.numNodes);
   this.drawLane();  
};
this.runAdjust = function(){
   var desired = 15;
   var test = 5;
   for( var i = 0 ; i < 100 ; i++ ){
      test = Math.random()*5;
//   this.resetLane(test);
      this.calcLane();
      var error1 = this.calcOutput(test);
      this.drawLane();
      error1 = Math.abs((desired-error1)/desired);
      var how = this.decideHow(error1)
      this.adjustLane(how);
      this.resetLane(test);
      this.calcLane();
      var error2 = this.calcOutput(test);
      error2 = Math.abs((desired-error2)/desired);
      this.calc();
      this.location.textXY(error1.toFixed(4)+"..: :.."+error2.toFixed(4),950,530);
      if((error1) < (error2)){
         this.unAdjustLane(how);
         this.calc();
         this.location.textXY(error1.toFixed(4)+"..: :.."+error2.toFixed(4),950,510);
      }
   }
   this.plot();
};
this.calc = function(){
   this.resetLane(5);
   this.calcLane();
   this.drawLane();
   this.location.setTxtSize(14);
   this.location.textXYinBox("5  ::"+this.calcOutput(5).toFixed(4),950,568,"slateBlue","lightBlue");
   this.resetLane(1);
   this.calcLane();
   this.location.textXYinBox("1  ::"+this.calcOutput(1).toFixed(4),950,550,"slateBlue","lightBlue");
   this.resetLane(10);
   this.calcLane();
   this.location.textXYinBox("10::"+this.calcOutput(10).toFixed(4),950,586,"slateBlue","lightBlue");
};
this.plot = function(){
   var x = 0;
   var avg = 0;
   var out = 0;
   this.location.flatX();
   this.location.grid(100);
//Legend
   this.location.color = "blue";
   this.location.circleXY(1020,300,1);
   this.location.textXY("sin(x)",1030,300);
   this.location.color = "cyan";
   this.location.circleXY(1020,320,2);
   this.location.textXY("1/sin(x),sin(x)",1030,320);

   this.location.color = "yellow";
   this.location.circleXY(1020,340,2);
   this.location.textXY("(x)",1030,340);
   this.location.color = "pink";
   this.location.circleXY(1020,360,3);
   this.location.textXY("1/(x),(x)",1030,360);

   this.location.color = "green";
   this.location.circleXY(1020,380,2);
   this.location.textXY("(x)log(x)",1030,380);
   this.location.color = "teal";
   this.location.circleXY(1020,400,3);
   this.location.textXY("1/(x)Log(x),(x)log(x)",1030,400);

   for( y = -6.28; y<=Math.PI*2 ; y+=0.05 ){
      x = Math.sin(y);
      this.location.color = "blue";
      this.resetLane(x);
      this.calcLane();
      out = this.calcOutput(x)*2;
      avg = out;
      this.location.circleXYZ(x*30,0,out*50,1);
      this.resetLane(1);
      this.calcLane();

      out = this.calcOutput(x)*2;
      avg += out;
      this.location.circleXYZ(x*30,0,out*50,4);

      this.location.color = "cyan";
      this.resetLane(1/x);
      this.calcLane();

      out = this.calcOutput(x)*2;
      avg += out;
      this.location.circleXYZ(x*30,0,out,2);
//      this.location.color = "green";
//      this.resetLane(Math.random());
//      this.calcLane();
//      this.location.circleXYZ(0,x*30,this.calcOutput(x)*5,3);
      x = y;
      this.location.color = "yellow";
      this.resetLane(x);
      this.calcLane();

      out = this.calcOutput(x)*2;
      avg += out;
      this.location.circleXYZ(x*30,0,out,1);

      this.resetLane(1);
      this.calcLane();

      out = this.calcOutput(x)*2;
      avg += out;
      this.location.circleXYZ(x*30,0,out,0.5);

      this.location.color = "pink";
      this.resetLane(x);
      this.calcLane();

      out = this.calcOutput(1/x)*2;
      avg += out;
      this.location.circleXYZ(x*30,0,out,1);

      x = y*Math.exp(y);
      this.location.color = "green";
      this.resetLane(x);
      this.calcLane();
      out = this.calcOutput(x)*2;
      avg += out;
      this.location.circleXYZ(x*20,0,out,2);
      this.location.color = "teal";
      this.resetLane(1/x);
      this.calcLane();
      out = this.calcOutput(x)*2;
      avg += out;
      this.location.circleXYZ(x*20,0,out,3);
      avg /= 8;
      this.location.color = "red";
      this.location.circleXYZ(x*20,0,avg,4);
      }
};     
this.drawLane = function(){ 
   recorder.record("drawLane");
   this.location.clearScreen("#CADFEE");  
   recorder.record((this.laneOne[0])); 
   for(var i = 0 ; this.laneOne[i] ; i++){
         this.drawNode(i%5*200+50,120+Math.floor(i/5)*120, this.laneOne[i]);   
      }
   return -1;
};
this.showConnections = function(){
   this.drawLane();
   if( currentNode > this.laneOne.length-1 ){
      currentNode = 0;
      }
   this.drawNodeConnections(currentNode++);
};
this.drawNodeConnections = function(node){
   var x = (node%5)*200+70;
   var y = 145+(Math.floor(node/5)*120);
   var iny = 0;
   var inx = 0;

//Rudoff Nose
   this.location.color = "red";
   this.location.circleXY(x,y,4);
   this.location.circleXY(x,y,3);
   this.location.color = "blue";
   this.location.circleXY(x,y,2);
   this.location.circleXY(x,y,1);
//Outgoing
   for(var i = 0 ; this.laneOne[node].connection[i] ; i++){
      this.location.color = this.laneOne[node].connection[i].color;
      this.location.moveToXY(x+119,y-65+i*100/this.laneOne[node].connection.length);
      this.lineToNodeI(this.laneOne[node].connection[i].node);
      }   
//Incomming
   for(var i = 0 ; this.laneOne[node].inComming[i] ; i++){
//      this.location.color = "black";
//      this.location.moveToXY(x,y);
      inx = (this.laneOne[node].inComming[i]%5)*200+70;
      iny = 145+(Math.floor((this.laneOne[node].inComming[i])/5)*120);
      for(var m = 0 ; this.laneOne[this.laneOne[node].inComming[i]].connection[m] ; m++){
         if(this.laneOne[this.laneOne[node].inComming[i]].connection[m].node == node){
            this.location.moveToXY(x,y);
            this.location.color = this.laneOne[this.laneOne[node].inComming[i]].connection[m].color;
            this.location.lineToXY(inx+119,iny-65+m*100/this.laneOne[this.laneOne[node].inComming[i]].connection.length);
            }
        }
//      this.lineToNodeI(this.laneOne[node].inComming[i]-1);
      }    
};
this.drawOutgoingIfX = function(node,x){
   var x = (node%5)*200+70;
   var y = 145+(Math.floor(node/5)*120);
   for(var i = 0 ; this.laneOne[node].connection[i] ; i++){
      if( this.laneOne[node].connection[i] == x){
         this.location.color = this.laneOne[node].connection[i].color;
         this.location.moveToXY(x+119,y-65+i*100/this.laneOne[node].connection.length);
         this.lineToNodeI(this.laneOne[node].connection[i].node);
         }
      } 
};
         
this.lineToNodeI = function(i){
   this.location.lineToXY(i%5*200+50,120+Math.floor(i/5)*120); 
   this.location.circleXY(i%5*200+50,120+Math.floor(i/5)*120,2) 
};
this.drawNode = function(x,y,aiNode){
   var txt = "node:"+aiNode.node;
   recorder.record(txt);
   this.location.setTxtSize(10);
   this.location.setFont(1);  
   this.location.textXY(txt,x,y-5);
   this.location.textXY(aiNode.other,x,y-17);
   this.location.textXY(aiNode.direction,x,y-29);
   this.location.textXY(aiNode.value.toFixed(2),x,y-41);
   this.location.color= "green";
   this.location.moveToXY(x,y);
   this.location.lineToXYopen(x+35,y);
   this.location.lineToXYopen(x+35,y-50);
   this.location.lineToXYopen(x+40,y-50);
   this.location.lineToXYclose(x+40,y+50);
   this.location.fill(aiNode.color);
   txt = "Incoming:";
   for(var i = 0 ; aiNode.inComming[i] ; i ++){
         txt += aiNode.inComming[i]+",";
      }   
   this.location.textXY(txt,x,y-55);
   for(var i = 0 ; aiNode.connection[i] ; i++){
      this.location.color = aiNode.connection[i].color;
      this.location.moveToXY(x+40,y-40+i*100/aiNode.connection.length);
      this.location.lineToXY(x+125,y-40+i*100/aiNode.connection.length);
      this.location.circleXY(x+132,y-40+i*100/aiNode.connection.length,7);
//      this.location.moveToXY(x+139,y-40+i*100/aiNode.connection.length);
//      this.lineToNodeI(aiNode.connection[i].node);
      this.location.textXY(aiNode.connection[i].node              , x+129,y-37+i*100/aiNode.connection.length);
      this.location.textXY(aiNode.connection[i].stregth.toFixed(2), x+42 ,y-42+(i*100/aiNode.connection.length));
      this.location.textXY(aiNode.connection[i].direction         , x+67 ,y-42+(i*100/aiNode.connection.length));
      this.location.textXY(aiNode.connection[i].other             , x+100,y-42+(i*100/aiNode.connection.length));
      }      
};
this.changeLaneColors = function(){
   for(var i=0 ; this.laneOne[i] ; i++ ){
      for(var j=0 ; this.laneOne[i].connection[j]; j++ ){
         this.laneOne[i].connection[j].color = this.colors[Math.round(Math.random()*(this.colors.length-1))];
         }
      } 
   this.drawLane();  
};  
this.decideHow = function(error){
   var     c = this.colors[Math.round(Math.random()*(this.colors.length-1))];
   var     o = this.other[Math.round(Math.random()*(this.other.length-1))];
   var     d = this.direction[Math.round(Math.random()*(this.direction.length-1))];
   var how = new How(c,o,d,error);
   return how;
};

this.findInComming = function(){

   for(var i=0 ; this.laneOne[i] ; i++ ){
      for(var j=0 ; this.laneOne[i].connection[j]; j++ ){
         this.laneOne[this.laneOne[i].connection[j].node].inComming.push(([i]));
         }
      } 
//   return this;
};
this.adjustLane = function(how){
   var change = 0;
   for(var i=0 ; this.laneOne[i] ; i++ ){
      for(var j=0 ; this.laneOne[i].connection[j]; j++ ){
         if(this.laneOne[i].connection[j].color == how.color){// && 
            //this.laneOne[i].connection[j].direction == how.direction){
            if( Math.abs(how.error) > 1){
               this.laneOne[i].connection[j].stregth += 1/how.error;
               }
            else{
               this.laneOne[i].connection[j].stregth += how.error;
               }
            change += 1;
            }
         if(this.laneOne[i].connection[j].other == how.other){// && 
            //this.laneOne[i].connection[j].direction == how.direction){
            if( Math.abs(how.error) > 1){
               this.laneOne[i].connection[j].stregth -= 1/how.error;
               }
            else{
               this.laneOne[i].connection[j].stregth -= how.error;
               }
            change += 1;
            }
         }
      }   
   return change;
};
 
this.unAdjustLane = function(how){
   var change = 0;
   for(var i=this.laneOne.length-1 ; i >= 0 ; i-- ){
      for(var j=this.laneOne[i].connection.length-1 ; j >= 0; j--){
         if(this.laneOne[i].connection[j].color == how.color){// && 
            //this.laneOne[i].connection[j].direction == how.direction){
            if( Math.abs(how.error) > 1){
               this.laneOne[i].connection[j].stregth -= 1/how.error;
               }
            else{
               this.laneOne[i].connection[j].stregth -= how.error;
               }
            change += 1;
            }
         if(this.laneOne[i].connection[j].other == how.other){ //&& 
            //this.laneOne[i].connection[j].direction == how.direction){
            if( Math.abs(how.error) > 1){
               this.laneOne[i].connection[j].stregth += 1/how.error;
               }
            else{
               this.laneOne[i].connection[j].stregth += how.error;
               }
            change += 1;
            }
         }
      }   
   return change;
};   
   
this.resetLane = function(input){
   for(var i=0 ; this.laneOne[i] ; i++ ){
      this.laneOne[i].value = input;
      }
};
this.createLane = function(depth){ 
   var c = this.colors[Math.round(Math.random()*(this.colors.length-1))];
   var o = this.other[Math.round(Math.random()*(this.other.length-1))];
   var d = this.direction[Math.round(Math.random()*(this.direction.length-1))];
   var num = 0;
   recorder.record(c+o+d);  
   for(var i = 0 ; i < depth ; i++){
         c = this.colors[Math.round(Math.random()*(this.colors.length-1))];
         o = this.other[Math.round(Math.random()*(this.other.length-1))];
         d = this.direction[Math.round(Math.random()*(this.direction.length-1))];
         this.laneOne.push( new AInode(i,c,o,d));
         this.laneOne[i].recordNode();
         numNodes = Math.floor(Math.random()*(this.maxNodes));
         if( numNodes < this.minNodes ){ 
            numNodes = this.minNodes-1;
            }
         for(var n = 0 ; n <= numNodes ; n++){
            num = Math.floor(Math.random()*(depth));
            c = this.colors[Math.round(Math.random()*(this.colors.length-1))];
            o = this.other[Math.round(Math.random()*(this.other.length-1))];
            d = this.direction[Math.round(Math.random()*(this.direction.length-1))];
            this.laneOne[i].connection.push(new AIconnection(num,c,o,d));      
            }
     }
   this.findInComming();
   return -1;
};
this.calcLane = function(){
   for(var i=0 ; this.laneOne[i] ; i++ ){
      for(var j=0 ; this.laneOne[i].connection[j]; j++ ){
         if(this.laneOne[i].connection[j].direction == "up"){
            this.laneOne[i].value += 1/(1-this.laneOne[i].connection[j].stregth*this.laneOne[this.laneOne[i].connection[j].node].value);
            }
         else if(this.laneOne[i].connection[j].direction == "down"){
            this.laneOne[i].value -= 1/(1-this.laneOne[i].connection[j].stregth*this.laneOne[this.laneOne[i].connection[j].node].value);
            }
         else if(this.laneOne[i].connection[j].direction == "right"){
            this.laneOne[i].value *= 1/(1-this.laneOne[i].connection[j].stregth*this.laneOne[this.laneOne[i].connection[j].node].value);
            }
         else if(this.laneOne[i].connection[j].direction == "left"){
            this.laneOne[i].value /= 1/(1-this.laneOne[i].connection[j].stregth*this.laneOne[this.laneOne[i].connection[j].node].value);
            }
         else if(this.laneOne[i].connection[j].direction == "sidewize"){
            this.laneOne[i].value %= 1/(1-this.laneOne[i].connection[j].stregth*this.laneOne[this.laneOne[i].connection[j].node].value);
            }
         }
      }
};  
this.calcOutput = function(x){
   var output = x;
   for(var i=0 ; this.laneOne[i] ; i++ ){
         if(this.laneOne[i].direction == "up"){
            output += this.laneOne[i].value;
            }
         else if(this.laneOne[i].direction == "down"){
            output -= this.laneOne[i].value;
            }
         else if(this.laneOne[i].direction == "right"){
            output *= this.laneOne[i].value;
            }
         else if(this.laneOne[i].direction == "left"){
            output /= this.laneOne[i].value;
            }
         else if(this.laneOne[i].direction == "sidewize"){
            output %= this.laneOne[i].value;
            }
      }
   return output;
}; 
} 
  

