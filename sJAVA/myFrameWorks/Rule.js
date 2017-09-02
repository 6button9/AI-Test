//////////////////////////////////////////////////////////////////////////
Rule = function(x,y,z, canvas = myDrawingCanvas){
//////////////////////////////////////////////////////////////////////////
  this.canvas = new Drawing(0,0,0, canvas);
  this.last = new Point(0,0,0);
  this.rotate = new Point(0,0,0);
  this.rulesStr = "Joelle:";
       

this.calcOffsets = function(radius,angle){
   var point = new Point(0,0,0);
   point.x = Math.cos(angle.x)*radius+Math.sin(angle.x)*radius;
   point.y = Math.sin(angle.y)*radius-Math.cos(angle.y)*radius;
   point.z = Math.cos(angle.z)*radius;
    console.log(point, angle)
   return point;   
};
      
this.rules = function(x,y,z,str,size,depth,j){
   var point = new Point(x,y,z);;
   var ruleSize = size;
   this.rulesStr = "rules:";
   var rulesRotate = new Point(0,0,0);
   for(var i = j+1 ; i < str.length ; i++ ){
      switch(str[i]){
        case "e":
//          if(depth == 0){
            this.canvas.setCurrentXYZtype();
//            this.canvas.rotate.set(this.rotate.x,this.rotate.y,this.rotate.z);
            this.canvas.setTxtSize(ruleSize/2)
            this.canvas.xyz.set(x,y,z);
            this.canvas.textXYZ(depth,0,0,10);
            this.rulesStr+="e";
//            }

            break;
        case "A":
            switch(str[i+1]){
               case "3":
                  this.rulesStr+="A3";
//                  ruleSize = depth * size;
//                  point = this.calcOffsets(0.2*depth,ruleSize);
//                  point = this.calcOffsets(-0.2*depth,ruleSize);
//                  this.rule(x+point.x,y+point.y,z+point.z,str,ruleSize,depth-1);
                  point = this.calcOffsets(depth*size,rulesRotate);
                  this.rule(x+point.x,y+point.y,z+point.z,str,ruleSize,depth-1);
                  point = this.calcOffsets(-depth*size,rulesRotate);
                  this.rule(x+point.x,y+point.y,z+point.z,str,ruleSize,depth-1);
                  break;
              case "0":
//                  this.record+="+z";
//                  this.rulesStr+="A0";
//                  this.rotate.add(rulesRotate.x,rulesRotate.y,rulesRotate.z);///////////////////
                  this.rule(x,y,z,str,ruleSize,depth-1);
//                  this.canvas.rotate.add(rulesRotate.x,rulesRotate.y,rulesRotate.z);///////////////////

                  break;
/*               case "y":
                  this.rulesStr+="+y";
                  this.rule(x,-y,z,str,ruleSize,depth-1);
                  this.record+="+y";
                  break;
               case "z":
                  this.record+="+z";
                  this.rulesStr+="+z";
                  this.rule(x,y,z,str,ruleSize,depth-1);
                  break;*/
               default:
                  break;
               }
            break;
/*
         case "L":
            switch(str[i+1]){
               case "b":
                  line.moveTo(head.x,head.y,head.z);
                  line.lineTo(0,0,0);
                  break;
               case "y":
                  line.rot_y += 0.3;
                  break;
               case "z":
                  line.rot_z += 0.3;
                  break;
               default:
                  missedStr = str[i+1];
                  break;
               }      
            break;
*/
         case "+":
            switch(str[i+1]){
               case "x":
//                  this.record+="+x";
                  this.rulesStr+="+x";
                  rulesRotate.add(Math.PI/12,0,0);
 //                 this.rule(-x,y,z,str,ruleSize,depth-1);
                  break;
               case "y":
                  this.rulesStr+="+y";
                  rulesRotate.add(0,Math.PI/12,0);
//                  this.rule(x,-y,z,str,ruleSize,depth-1);
//                  this.record+="+y";
                  break;
               case "z":
                  rulesRotate.add(0,0,Math.PI/12);
//                  this.record+="+z";
                  this.rulesStr+="+z";
//                  this.rule(x,y,-z,str,ruleSize,depth-1);
                  break;
               default:
                  break;
               }
            break;
         case "F":
            switch(str[i+1]){
               case "x":
 //                 this.record+="Fx";
                  this.rulesStr+="Fx";
                  this.rule(x+size,y,z,str,ruleSize,depth-1);
                  break;
               case "y":
 //                 this.record+="Fy";
                  this.rulesStr+="Fy"
                  this.rule(x,y+size,z,str,ruleSize,depth-1);
                  break;
               case "z":
//                  this.record+="Fz";
                  this.rulesStr+="Fz"
                  this.rule(x,y,z+size,str,ruleSize,depth-1);
                  break;  
               default:     
                  break;

               }

            break;
         case "B":
            switch(str[i+1]){
               case "x":
//                  this.record+="Bx";
                  this.rulesStr+="Bx"
                  this.rule(x-size,y,z,str,ruleSize,depth-1);
                  break;
               case "y":
                 this.rulesStr+="By"
//                  this.record+="By";
                  this.rule(x,y-size,z,str,ruleSize,depth-1);
                  break;
               case "z":
                 this.rulesStr+="Bz"
//                  this.record+="Bz";
                  this.rule(x,y,z-size,str,ruleSize,depth-1);
                  break;       
               }
            break;

         case "S":
            switch(str[i+1]){
               case "D":
                  this.rulesStr+="s*d";
                  ruleSize =depth * size;
                  break;
               case "d":
                  this.rulesStr+="s/d"
                  ruleSize = size/(depth+1);
                  break;
               case "2":
                  this.rulesStr+="s/2"
                  ruleSize = size/2;
                  break;  
              case "1":
                  this.rulesStr+="size"
                  ruleSize = size;
                  break;    
              case "0":
                  this.rulesStr+="size"
                  ruleSize = size;
                  break;                
               }
            break;
         case "*":
//            this.selectSpawnExpand=false;
//            this.canvas.setCurrentXYZtype();//should be able to fix in selectXYZtype?
//            this.canvas.rotate.add(rulesRotate.x,rulesRotate.y,rulesRotate.z);///////////////////
            //this.canvas.xyz.set(point.x,point.y,point.z);
            //this.canvas.color = "red";
            //this.canvas.circle(3);
            //this.canvas.circle(2);
            //this.canvas.circle(1);
            this.canvas.rotate.add(rulesRotate.x,rulesRotate.y,rulesRotate.z);///////////////////

            return i;
            break;
         default:

            break;

         }
//         i++;
     }
return i;   
}; 
this.rule = function(x,y,z,str,size,depth, cv = myDrawingCanvas){
   var line = new Drawing(x,y,z, cv);
   var returnTo = new Point(0,0,0);
   var head = [new Point(0,0,0)];
    //this.canvas.clearPage();
   line.XYZtype = this.canvas.XYZtype;
   line.orgin = this.canvas.orgin;
//   line.rotate = this.canvas.rotate;
 //  line.rotate.set(this.rotate.x,this.rotate.y,this.rotate.z);  
   line.rotate.set(this.canvas.rotate.x,this.canvas.rotate.y,this.canvas.rotate.z);
   line.rotate.add(this.rotate.x,this.rotate.y,this.rotate.z);
   line.setCurrentXYZtype();



   if( depth > -1){
//      this.tail.push(new Point(x,y,z));
      }
   var missedStr = "";

   for(var i=0; str[i]  && depth > 0 ; i++){
      switch(str[i]){
         case "F":
            switch(str[i+1]){
               case "x":
                  line.moveTo(0,0,0);
                  line.xyz.add(size,0,0);
                  line.lineTo(0,0,0);
                  i++;
                  break;
               case "y":
                  line.moveTo(0,0,0);
                  line.xyz.add(0,size,0);
                  line.lineTo(0,0,0);
                  i++;
                  break;
               case "z":
                  line.moveTo(0,0,0);
                  line.xyz.add(0,0,size);
                  line.lineTo(0,0,0)
                  i++;
                  break;
               case "x":
                  line.moveTo(0,0,0);
                  line.xyz.add(size,0,0);
                  line.lineTo(0,0,0);
                  i++;
                  break;
               case "w":
                  line.moveTo(0,0,0);
                  line.xyz.add(size,0,size);
                  line.lineTo(0,0,0);
                  i++;
                  break;
               case "v":
                  line.moveTo(0,0,0);
                  line.xyz.add(size,size,0);
                  line.lineTo(0,0,0);
                  i++;
                  break;
               case "u":
                  line.moveTo(0,0,0);
                  line.xyz.add(0,size,size);
                  line.lineTo(0,0,0);
                  i++;
                  break;
               case "t":
                  line.moveTo(0,0,0);
                  line.xyz.sub(size,0,size);
                  line.lineTo(0,0,0);
                  i++;
                  break;
               case "s":
                  line.moveTo(0,0,0);
                  line.xyz.sub(size,size,0);
                  line.lineTo(0,0,0);
                  i++;
                  break;
               case "r":
                  line.moveTo(0,0,0);
                  line.xyz.sub(0,size,size);
                  line.lineTo(0,0,0);
                  i++;
                  break;
              case "q":
                  line.moveTo(0,0,0);
                  line.xyz.sub(size,size,size);
                  line.lineTo(0,0,0);
                  i++;
                  break;
               case "n":
                  line.moveTo(0,0,0);
                  line.xyz.sub(size,size,0);
                  line.lineTo(0,0,0);
                  i++;
                  break;  
               default:
                  missedStr = str[i+1];
                  break;
               }      
            break;

         case "B":
            switch(str[i+1]){
               case "x":
                  line.moveTo(0,0,0);
                  line.xyz.sub(size,0,0);
                  line.lineTo(0,0,0);
                  break;
               case "y":
                  line.moveTo(0,0,0);
                  line.xyz.sub(0,size,0);
                  line.lineTo(0,0,0);
                  break;
               case "z":
                  line.moveTo(0,0,0);
                  line.xyz.sub(0,0,size);
                  line.lineTo(0,0,0);
                  break;
               default:
                  missedStr = str[i+1];
                  break;
               }      
            break;

         case "M":
            switch(str[i+1]){
               case "x":
                  line.xyz.add(size,0,0);
                  break;
               case "y":
                  line.xyz.add(0,size,0);
                  break;
               case "z":
                  line.xyz.add(0,0,size);
                  break;
               default:
                  missedStr = str[i+1];
                  break;
               }      
            break;
         case "W":
            switch(str[i+1]){
               case "x":
                  line.xyz.sub(size,0,0);
                  break;
               case "y":
                  line.xyz.sub(0,size,0);
                  break;
               case "z":
                  line.xyz.sub(0,0,size);
                  break;
               default:
                  missedStr = str[i+1];
                  break;
               }      
            break;
         case "+":
            switch(str[i+1]){
               case "x":
               //   this.rotate.x += 0.3;
                  line.rotate.add(0.3,0,0);
                  break;
               case "y":
               //   this.rotate.y += 0.3; 
                  line.rotate.add(0,0.3,0);
                  break;
               case "z":
               //  this.rotate.z += 0.3;
                  line.rotate.add(0,0,0.3);
                  break;
               default:
                  missedStr = str[i+1];
                  break;
               }      
            break;

         case "[":
               returnTo.set(line.xyz.x,line.xyz.y,line.xyz.z);
               line.circle(3);
               line.circle(2);
               line.circle(1);
               break;
 
         case "]":
               line.xyz.set(returnTo.x,returnTo.y,returnTo.z);    
            break;
         case "L":
            switch(str[i+1]){
               case "b":
//                  this.record += "Lb";
                  var h = 3;
                  var m = 3;
                  for(h = 2 ; h < 5 && this.head[this.head.length-h] && this.tail[this.head.length-h] ; h++){
//                     this.record+=":::"+this.head[this.head.length-h].x+"::"
                                       +this.head[this.head.length-h].y+":"
                                       +this.head[this.head.length-h].z;
                     m = h  ;
//                     line.color = "black";
                     line.circleAbsXYZ(this.head[this.head.length-h].x,
                                          this.head[this.head.length-h].y,
                                          this.head[this.head.length-h].z,3); 
                     line.circleAbsXYZ(this.head[this.head.length-h].x,
                                          this.head[this.head.length-h].y,
                                          this.head[this.head.length-h].z,4); 
                     line.circleAbsXYZ(this.head[this.head.length-h].x,
                                          this.head[this.head.length-h].y,
                                          this.head[this.head.length-h].z,4); 
//                     line.moveTo(this.head[this.head.length-h].x,
//                                          this.head[this.head.length-h].y,
//                                          this.head[this.head.length-h].z);
//                     line.lineTo(0,0,0);
//                     line.color = "blue";
//                     line.moveTo(this.head[this.head.length-h].x,
//                                          this.head[this.head.length-h].y,
//                                          this.head[this.head.length-h].z);
 //                    line.color = "red";
                     line.txtColor = "red";
                     myAlert(h+":"+depth);
                     line.circleAbsXYZ(this.tail[this.tail.length-m].x,
                                       this.tail[this.tail.length-m].y,
                                       this.tail[this.tail.length-m].z,3);
                     line.circleAbsXYZ(this.tail[this.tail.length-m].x,
                                       this.tail[this.tail.length-m].y,
                                       this.tail[this.tail.length-m].z,2);
                     line.color = "black";
                     line.moveTo(this.head[this.head.length-h].x,
                                          this.head[this.head.length-h].y,
                                          this.head[this.head.length-h].z);

                     line.lineTo(this.tail[this.tail.length-m].x,
                                          this.tail[this.tail.length-m].y,
                                          this.tail[this.tail.length-m].z);
/*                     line.color = "red";
                     line.circle(5);
                     line.color = "blue";
                     line.circle(10);
                     line.color = "green";
                     line.circle(15);*/
//                     h++;
                     }
                  break;
               }      
            break;
      case "S":
            switch(str[i+1]){
                case "(":
                    let end = (/[)]/).exec(str.slice(i+1));
                    console.log(end, str[i+2], str[i+end.index+1])
                    this.size = Number(str.slice(i+2, end.index+i+1));
                    size = this.size;
                    console.log("this.size", this.size)
                    i = end.index+i+1;
                    break;
               case "1":
                  size = 30;
                  this.size = size;
                  i++;
                  break;
               case "2":
                  size *= 2;
                  this.size = size;
                  i++;
                  break;
               case "3":
                  size = 50;
                  this.size = size;
                  i++;
                  break;
               case "d":
                  size /= 2;
                  this.size = size;
                  i++;
                  break;
               case "x":
                  size = Math.round(Math.random()*60);
                  this.size = size;
                  i++;
                  break;
               default:
                  missedStr = str[i+1];
                  break;
               }      

       case "C":
            switch(str[i+1]){
               case "r":
                  line.color = "red";
                  this.color = line.color;
                  break;
               case "g":
                  line.color = "green";
                  this.color = line.color;
                  break;
               case "b":
                  line.color = "blue";
                  this.color = line.color;
                  break;
               case "x":
                  line.color = line.random_hexColor();
                  this.color = line.color;
                  break;
               default:
                  missedStr = str[i+1];
                  break;
               }      
            break;
         case "n":
            switch(str[i+1]){
               case "i":
                  line.setTxtSize(Math.round(size/3));
                  line.textXYZ("i:"+i,0,0,10);
               break;
               case "x":
                  line.setTxtSize(9);
                  line.textXYZ(":"+line.xyz.x.toFixed(2),+5,0,25);
                  line.textXYZ(":"+line.xyz.y.toFixed(2),+5,0,15);
                  line.textXYZ(":"+line.xyz.z.toFixed(2),+5,0,5);
               break;
            }
            break;
         case "T":
            switch(str[i+1]){
               case "B":
//                  line.color = "red";
                  line.triangle(0,0,0,10);      
                  line.triangle(2,0,0,8); 
                  line.triangle(3,0,0,6);
                  line.triangle(4,0,0,4);
                  line.triangle(5,0,0,2);
                  line.triangle(0,0,0,-10);      
                  line.triangle(-2,0,0,-8); 
                  line.triangle(-3,0,0,-6);
                  line.triangle(-4,0,0,-4);
                  line.triangle(-5,0,0,-2);
               break;
               case "l":

                  line.triangle(0,0,0,10);      
                  line.triangle(2,0,0,8); 
                  line.triangle(3,0,0,6);
                  line.triangle(4,0,0,4);
                  line.triangle(5,0,0,2);
               break;
               case "r":
                  line.triangle(0,0,0,-10);      
                  line.triangle(-2,0,0,-8); 
                  line.triangle(-3,0,0,-6);
                  line.triangle(-4,0,0,-4);
                  line.triangle(-5,0,0,-2);
               break;
               case "u":
                  line.triangle(0,0,0,-10);      
                  line.triangle(-2,0,0,-8); 
                  line.triangle(-3,0,0,-6);
                  line.triangle(-4,0,0,-4);
                  line.triangle(-5,0,0,-2);
               break;
               case "d":
                  line.triangle(0,0,0,-10);      
                  line.triangle(-2,0,0,-8); 
                  line.triangle(-3,0,0,-6);
                  line.triangle(-4,0,0,-4);
                  line.triangle(-5,0,0,-2);
               break;
               case "x":
                  line.rectx(size,size/2,line.color);
               break;
               case "y":
                  line.recty(size,size/2,line.color);
               break;
               case "z":
                  line.rectz(size,size/2,line.color);
               break;
               case "c":
                  line.circle(size/2);      
               break;
               case "v":
                  line.moveTo(0,0,0);
                  line.xyz.set(returnTo.x,returnTo.y,returnTo.z);   
                  line.lineTo(0,0,0);
               break;
               case "C":
                  line.circle(size);      
                  break;
               case "b":
                  line.cubeSize(size);      
               break;
               case "g":
                  line.grid(size);      
               break;
            }
         break;
         case "*":
//            this.selectSpawnExpand=true;
//            this.record += "*:"+i;
            line.color = "blue";
            line.circle(3);
            line.circle(2);
            line.circle(1);

            if(depth > 0){
//               this.head.push(new Point(line.xyz.x,line.xyz.y,line.xyz.z));
               i =this.rules(line.xyz.x,line.xyz.y,line.xyz.z,str,size,depth,i);
               }
            else {
               i = this.ruleStr.length;
               }
//            this.record += "*:"+i;
            break;
         case "o":
            if(size > 5){
 //             this.rule(line.xyz.z,line.xyz.x,line.xyz.y,str,size*0.6);
 //              this.rule(line.xyz.x,line.xyz.x,line.xyz.z,str,size*0.5);
//              this.rule(line.xyz.y,line.xyz.z,line.xyz.x,str,size*0.4);
//               line.rot_x += 0.4;
//               line.rot_y += 0.4;
               this.rule(-line.xyz.x,line.xyz.y,-line.xyz.z,str,size*0.6);
               this.rule(line.xyz.x,-line.xyz.y,line.xyz.z,str,size*0.6);
               this.rule(line.xyz.x,line.xyz.y,-line.xyz.z,str,size*0.6);

               }
            break;

         default:
            missedStr += str[i];
            break;
         }
//         i++;
      }
//   line.text_xy(str,-280,0);
//   line.text_xy("missed:"+missedStr,-280,-30);
this.last.set(line.xyz.x,line.xyz.y,line.xyz.z);
return i;
};
}
