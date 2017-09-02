class Canvas {
    constructor(x = 50, y = 200, Id = Math.round(Math.random()*10000)){
        this.position = {x: x, y: y};
        this.size = {
                        height: 100,
                        width:  100,
                    };
        this.color = {
            text:       'green',
            background: 'slateBlue',
            line:       'red',
            border:     'blue',
            borderRadius:     0,
            borderWidthidth:  2
        };
        this.textSize = 10;
        this.Id = Id;
        this.canvas = document.createElement("CANVAS");
        this.text = this.Id;
        this.callback = {
            onclick:         null,
            onmouseout:      null,
            onmousewheel:    null,
            onmousemove:     null,
            onmousedown:     null,
            onmouseover:     null,
            oncontextmenu:   () => { this.menu(); event.preventDefault() },
            oncmouseleave:   null,
            oncmousenter:    null,
            oncmouseleave:   null,
            startUp:         null,
        }
        this.drawArray = [
            { 
                myMethod: "textXY",
                myArgs: [ "text", 100, 20]       
            },
                        { 
                myMethod: "setColor",
                myArgs: [ "red" ]       
            },
                        { 
                myMethod: "textXYinBox",
                myArgs: [ this.text, 20, 20, "red", "blue"]       
            },
            { 
                myMethod: "circleXY",
                myArgs: [ 50, 70, 20]
            },            { 
                myMethod: "circleXYsolid",
                myArgs: [ 50, 70, 10]
            }
        ];
        //this.postProperties(20, 490);
    }
    menu(x = this.position.x, y = this.position.y){
        //this.menuHead(x,y)
        this.menuEnd(x,y)
    }
    menuHead(x = this.position.x, y = this.position.y, head){
        const canvasMenu = new MenuThis(this, 'canvasMenu'+this.Id);
        canvasMenu.clear().setBGcolor('white')
                .textXY(this.Id, x   , y-50, ["enterId", x   , y-50], "white")
                .css("borderRadius", "2px")
                .rectXY(         x-58, y-35, 85 , 145, 'slateGrey', -1)
                .css("borderRadius", "5px")
                .btnR( 'X'     , x-25, y-25, ['']           , 15, 15, "Cr,TC")
                .textXR('o-o'  , x-25, y-10, ['minamize']).setBGcolor('yellow')
                .btnR( 'M<br>V', x-50, y-25, ['move']       , 20, 30)
        return canvasMenu;
    }
    menuEnd(x = this.position.x, y = this.position.y){
                this.menuHead(x,y)
                .rectXY(         x-5 , y-30, 230,  30, 'teal')
                .css("borderRadius", "4px")
                .setBGcolor('green')
                .btn(   'F'  , x    ,  y-25, ['filesMenu']   , 20)
                .btn(   'S'  , x+25 ,  y-25, ['settingsMenu'], 20)
                .btn(   'T'  , x+50 ,  y-25, ['logToConsole'], 20)
                .btn(   'Dr' , x+100,  y-25, ['drawingMenu'] , 20)
                .btn(   'D'  , x+125,  y-25, ['draw']        , 20)
                .btn(   'J'  , x+150,  y-25, ['drawArrayJSON'], 20)
                .btnR(  'Re' , x+175,  y-25, ['remove']       , 20)
                .btnR(  'Sp' , x+200,  y-25, ['spawn', x+50, y+50 ], 20);
    }
    settingsMenu(x = this.position.x, y = this.position.y-25){
        const settingsMenu = new MenuThis(this, 'settingsMenu'+this.Id);
        settingsMenu.clear().setBGcolor('red')
                .btnR('X'     , x+28 ,  y+8 , ['']                   , 15)
                .setTxtColor(this.color.text).setBGcolor(this.color.background)
                .btnR( 'color', x+25 ,  y-15 , ['selectBGColor']      , 45, 20).setBGcolor("cyan")
                .btn(     'H' , x+75 ,  y-15 , ['modifyHeight',   25 ] , 20)
                .btn(     'h' , x+100,  y-15 , ['modifyHeight',  -25 ] , 20)
                .btn(     'W' , x+125,  y-15 , ['modifyWidth',    25 ] , 20)
                .btn(     'w' , x+150,  y-15 , ['modifyWidth',   -25 ] , 20)
                .btn( 'border', x+175,  y-15 , ['selectBorderColor'  ] , 45, 20).setBGcolor('yellow')
                .btn(  '0'    , x+175,  y-40 , ['setBorderRadius',  0] , 15)
                .btn(  '4'    , x+175,  y-60 , ['setBorderRadius',  4] , 15)
                .btn(  '8'    , x+175,  y-80 , ['setBorderRadius',  8] , 15)
                .btn(  '16'   , x+175,  y-100, ['setBorderRadius', 16] , 15)
                .btn(  '32'   , x+175,  y-120, ['setBorderRadius', 32] , 15).setBGcolor('lightBlue')
                .btn(  '0'    , x+200,  y-40 , ['setBorderWidth',   0] , 15)
                .btn(  '1'    , x+200,  y-60 , ['setBorderWidth',   1] , 15)
                .btn(  '4'    , x+200,  y-80 , ['setBorderWidth',   4] , 15)
                .btn(  '8'    , x+200,  y-100, ['setBorderWidth',   8] , 15)
                .btn(  '16'   , x+200,  y-120, ['setBorderWidth',  16] , 15);
        this.postProperties(20, 490);
    } 
    drawingMenu(x = this.position.x, y = this.position.y){
        const drawingMenu = new MenuThis(this, 'drawingMenu'+this.Id);
        drawingMenu.clear().setBGcolor('red')
                .btnR('X', x+100, y-20, [''], 15)
                .setTxtColor(this.color.text).setBGcolor("white")
                .btn( 'circle' , x-50 ,  y+10 , ['drawCircle']   , 30, 15)
                .btn(    'line', x-50 ,  y+30 , ['drawLine' ]       , 30, 15)
                .btn(    '3'   , x-70 ,  y+30 , ['lineWidth', 3 ]   , 15, 15)
                .btn(    '5'   , x-90 ,  y+30 , ['lineWidth', 5 ]   , 15, 15)
                .btn(    '7'   , x-110,  y+30 , ['lineWidth', 7 ]   , 15, 15)
                .btn(    '1'   , x-130,  y+30 , ['lineWidth', 1 ]   , 15, 15)
                .btn(    'rect', x-50 ,  y+50 , ['drawRect']        , 30, 15)
                .btn(   'color', x-50 ,  y+70 , ['selectLineColor'] , 30, 15)
                .btn(   'color', x-75 ,  y+90 , ['selectTextColor'] , 20, 15)
                .btn(   '12'   , x-95 ,  y+90 , ['setTextSize', 12] , 15, 15)
                .btn(   '16'   , x-115,  y+90 , ['setTextSize', 16] , 15, 15)
                .btn(   '24'   , x-135,  y+90 , ['setTextSize', 24] , 15, 15)
                .btn(    'text', x-50 ,  y+90 , ['drawText' ]       , 30, 15)
                .btn(  'C<br>L', x-13 ,  y+10 , ['drawClear' ]      , 10, 30)
                .btn(  'B<br>K', x-13 ,  y+45 , ['drawBack' ]       , 10, 30);
    }
    filesMenu(x = this.position.x, y = this.position.y){
        const filesMenu = new MenuThis(this, 'settingsMenu'+this.Id);
        filesMenu.setBGcolor('red')
            .clear()
            .btnR('X'  , x+3,  y-18, ['']         , 15) 
            .setTxtColor(this.color.text)
            .setBGcolor("white")
            //.btnR('save'     , x+25 ,  y-25, ['saveFile']        , 45, 20)
            .btnR('saveAs'   , x+25 ,  y-15, ['saveFileAs']      , 45, 15)
            .btnR('open'     , x+75 ,  y-15, ['openFile']        , 45, 15)
            .btnR('new'      , x+125,  y-15, ['openFile']        , 22, 15)
            .btnR('callback' , x+150,  y-15, ['selectCallback', x+230, y-25] , 45, 15)
            .btnR('on/off'   , x+200,  y-15, ['toggleOnclick']   , 30, 15)
            .btnR('sCallback', x+235,  y-15, ['selectStartUpCallback', x+230, y-25] , 50, 15);
    } 
    postProperties(x = this.position.x, y = this.position.y){
        const propertiesMenu = new MenuThis(this, "propsMenu");
        propertiesMenu.clear().setBGcolor('white')
            .rectXY(                 x-5  , y-5,  210, 85)
            .btnR("X"               ,x-3  , y-3, [""], 10)
            .textXY(this.Id         ,x+15 , y-18, ["enterId", x+15, y-20])
            .css('backgroundColor', 'yellow')
            .textXY('x:'            ,x+10 , y)
            .textXY(this.position.x ,x+30 , y)
            .textXY('y:'            ,x+10 , y+20)
            .textXY(this.position.y ,x+30 , y+20)
            .textXY('hieght:'       ,x+10 , y+40)
            .textXY(this.size.height,x+50 , y+40)
            .textXY('width:'        ,x+10 , y+60)
            .textXY(this.size.width ,x+50 , y+60)
            .textXY('callback:'     ,x+85 , y+40, ["selectCallback", x+130, y+40])
            .textXY(this.callback.onclick   ,x+85 , y+60)
            .textXY('evalStarUp'    ,x+75 , y+20  , () => this.evalStartUpCallback() )
            .textXY('showStartUp'   ,x+66 , y   , () => this.showStartUpCallback() )
            .setTxtColor(this.color.text)
            .textXY(this.color.text      , x+140, y,['changeColor'])
            .setTxtColor(this.color.background)
            .textXY(this.color.background, x+140, y+20,['selectBGColor'])
             //console.log(this.canvas.onclick)
        if( this.canvas.onclick == "() => this.move()" ){
            propertiesMenu.textXY( "off", x+140, y+40, ["toggleOnclick"]);
        }
    }
    drawClear(){
        this.drawArray.length = 0;
        this.draw();
    }
    drawBack(){
        if(this.drawArray.length){       
            this.drawArray.pop();
        }
        this.draw();
    }
    drawCircle(solid){
        let holdOnclick = this.canvas.onclick;
        let holdOnmousemove = this.canvas.onmousemove;
        let start = {};
        let startCircle = (e) => {
            start = { x : e.offsetX, y : e.offsetY};
            this.canvas.onclick     = (event) => completeCircle(event);
            this.canvas.onmousemove = (event) => tempCircle(event);
            }
        let tempCircle = (e) => {
                let r = Math.hypot(e.offsetX-start.x, e.offsetY-start.y);
                this.draw().circleXY(start.x, start.y ,r);
            }
        let completeCircle = (e) => {
            let r = Number((Math.hypot(e.offsetX-start.x, e.offsetY-start.y)).toFixed(1));
            let solid = '';
            if( event.ctrlKey ){
                solid = 'solid';
                console.log(solid)
            }
            this.drawArray.push({myMethod: "circleXY"+solid, myArgs: [start.x, start.y, r]});
            this.draw();
            this.canvas.onclick = holdOnclick;
            this.canvas.onmousemove = holdOnmousemove;
        }
        this.canvas.onclick = (event) => startCircle(event);
    }
    lineWidth( width = 1){
        this.drawArray.push({myMethod: "setLineWidth", myArgs: [width]});
    }       
    drawLine(){
        let start = {};
        let end   = {};
        let beginning = {};
        let holdOnclick = this.canvas.onclick;
        let holdOnmousemove = this.canvas.onmousemove;
        let startLine = (x, y) => {
            start = { x : x, y : y};
            this.canvas.onclick     = (event) => endLine(event); 
            this.canvas.onmousemove = (event) => tempLine(event);
        };
        let tempLine = (e) => {
            end =  { x : e.offsetX, y : e.offsetY};
            if( event.ctrlKey){
                drawLine(this.draw());
            }
            else if( event.shiftlKey){
                drawLine(this.draw());
            }
            else{
                drawLineOrtho(this.draw());
            }
        };
        let endLine = (e) => {
            //this.drawArray.push({myMethod: "moveToXY", myArgs: [start.x, start.y]});
            this.drawArray.push({myMethod: "lineToXY", myArgs: [end.x  , end.y  ]});
            startLine(end.x, end.y);
            this.draw();
        };
        let drawLine = (drawing) => {
            drawing.setColor(this.color.line);
            drawing.moveToXY(start.x, start.y);
            drawing.lineToXY(end.x, end.y );
        };
        let lineToBeginning = (drawing) => {
            console.log(beginning);
            this.drawArray.pop();
            this.drawArray.push({myMethod: "lineToXYclose", myArgs: [end.x  , end.y  ]});
            //drawing.setColor(this.color.line);
            //drawing.moveToXY(end.x, end.y);
            //drawing.lineToXY(beginning.x, beginning.y );
            //this.drawArray.push({myMethod: "moveToXY", myArgs: [start.x    , start.y    ]});
            //this.drawArray.push({myMethod: "lineToXY", myArgs: [beginning.x, beginning.y]})
        };
        let drawLineOrtho = (drawing) => {
            drawing.setColor(this.color.line);
            if( Math.abs(start.x-end.x) >= Math.abs(start.y-end.y)){
                drawing.moveToXY(start.x, start.y);
                drawing.lineToXY(end.x  , start.y  );
                end.y = start.y;
            }
            else{
                drawing.moveToXY(start.x, start.y);
                drawing.lineToXY(start.x, end.y );
                end.x = start.x;
            }
        };
        this.canvas.onclick = (event) => {
            beginning = { x : event.offsetX, y : event.offsetY };
            console.log(beginning);
            startLine(event.offsetX, event.offsetY);
            this.drawArray.push({myMethod: "moveToXY", myArgs: [start.x, start.y]} ) };
        this.canvas.onmousedown = (event) => {
            if( event.button === 1 && event.shiftKey){
                lineToBeginning(this.draw());
                this.canvas.onclick = holdOnclick;
                this.canvas.onmousemove = holdOnmousemove;
                this.canvas.onmousedown = null;
                this.draw();
            }
            else if( event.button === 1){
                this.canvas.onclick = holdOnclick;
                this.canvas.onmousemove = holdOnmousemove;
                this.canvas.onmousedown = null;
                this.draw();
            }
        }
    }
    drawRect(){
        let start = {};
        let end   = {};
        let holdOnclick = this.canvas.onclick;
        let holdOnmousemove = this.canvas.onmousemove;
        let startRect = (x, y) => {
            start = { x : x, y : y};
            //start = { x : e.offsetX, y : e.offsetY};
            this.canvas.onclick = (event) => completeRect(event); 
            this.canvas.onmousemove = (event) => tempRect(event);
        }
        let tempRect = (e) => {
            this.draw()
                .rectXY(start.x, start.y, e.offsetX-start.x, e.offsetY-start.y);
        }
        let completeRect = (e) => {
            let end=  { x : e.offsetX, y : e.offsetY};
            this.drawArray.push({myMethod: "rectXY", myArgs: [start.x, start.y, e.offsetX-start.x, e.offsetY-start.y]});
            this.draw();
            this.canvas.onclick = holdOnclick;
            this.canvas.onmousemove = holdOnmousemove;
        }
        this.canvas.onclick = (event) => startRect( event.offsetX, event.offsetY)
    }
    drawArraySetColor(color){
        this.drawArray.push({myMethod: "setColor", myArgs: [color]})
        this.color.line = color;
    }
    drawArraySetTextColor(color){
        this.drawArray.push({myMethod: "setTxtColor", myArgs: [color]})
        this.color.text = color;
    }
    drawArraySetTextSize(size){
        this.drawArray.push({myMethod: "setTxtSize", myArgs: [size]})

    }
    drawText(){
        new TextInput(this.canvas, "drawArrayAddText", this).setColor( this.color ).setTextSize(this.textSize).start();
    }
    drawArrayAddText(txt, x, y){
        this.drawArray.push({myMethod: "textXY", myArgs: [txt, x, y]})
        this.draw();
        this.canvas.onclick = () => this.move();
    }
    selectLineColor(){
         const pickColor = new Colors(this, this.position.x+5, this.position.y+this.size.height+35).menuLong(['drawArraySetColor']); 
    }
    selectTextColor(){
         const pickColor = new Colors(this, this.position.x+5, this.position.y+this.size.height+35).menuLong(['drawArraySetTextColor']);    
    }
    selectBGColor(){
        const pickColor = new Colors(this, this.position.x, this.position.y).menuLong(['setBGColor']);    
    }
    selectBorderColor(){
        const pickColor = new Colors(this, this.position.x, this.position.y).menuLong(['setBorderColor']);    
    }
    setLineColor(color){
        this.color.line = color;
        return this;
    }
    setTextSize(size){
        this.drawArraySetTextSize(size);
        this.textSize = size;
    }
    setTextColor(color){
        this.color.text = color;
        return this;
    }
    setBorderColor(color){
        this.canvas.style.borderColor = color;
        this.color.border = color;
        return this;
    }
    setBGColor(color){
        this.color.background = color;
        this.canvas.style.backgroundColor = color;
        return this;
    }
    enterId(x, y){
        const select = new MenuThis(this, 'canvasMenu'+this.Id).clear();
        select.input(null, x, y, ["setId"]);
    }
    setId(newId){
        this.remove();
        this.Id = newId;
        this.canvas.id = "canvas"+newId;
        console.log("newCanvas"+this.canvas.id)
        this.append();
    }
    resetDrawArray(drawArray){
        this.drawArray.length = 0;
        console.log(this.drawArray);
        return this;
    }
    setDrawArray(drawArray){
        this.drawArray = drawArray;
        return this;
    }
    toggleOnclick(flag){
        if( flag || this.callback === null){
            this.canvas.onclick = () => this.move();
        }
        else{
            this.setCallback( this.callback );
        }
        this.postProperties(20, 490);
        
    }
    selectCallback(x, y){
        const select = new MenuThis(this, "propsMenu");
        select.input('callback', x, y, ["setCallback"], 75);
    }
    //selectCallbackNumber(x, y){
       // const select = new MenuThis(this, "propsMenu");
       // select.input(null,["setCallbackNum"], x, y);
    //}
    //setCallbackNum(num){
    //    this.callback = num;
    //}
    setCallbackFor(callbackType, callback){
        this.canvas[callbackType] = callback;
        this.callback[callbackType] = callback;
        return this;
    }
    setCallback(callback){
        //console.log(typeof callback);
        //console.log( /[a-z][A-Z]/.test( callback ));
        if( typeof callback === 'string' && (/[a-z,A-Z]/.test(callback)) ){
            //callback = eval(callback);
        }
        this.callback.onclick = callback;
        this.canvas.onclick = () => this.runCallback(callback);
        //this.postProperties(10, 10);
        return this;
    }    
    selectStartUpCallback(x, y){
        const select = new MenuThis(this, "propsMenu");
        select.input('sCallback', x, y, ["setStartUpCallbackTA"], 80 );
    }
    setStartUpCallbackTA(TAid){
        console.log(TAid)
        let ta = document.getElementById("textArea"+TAid)
        console.log(ta.value)
        this.callback.startUp = ta.value;
    }
    setStartUpCallback(startUpCallback){
        this.callback.startUp = startUpCallback;
        return this;
    }
    evalStartUpCallback(){
        if( this.callback.startUp != null ){
            eval(this.callback.startUp);
        }
        return this;
    }
    showStartUpCallback(){
        let callbackText = this.jsHead("startUp");
        if(this.callback.startUp){
            callbackText = this.callback.startUp;
        }
        new Note(50,50,this.Id+".startUp").create(10,50, callbackText)
    }
    runCallback(callback){
        console.log(typeof callback)
        if( document.getElementById("textArea" + callback) !== null ){
            console.log("TAasJS:", callback)
            eval( document.getElementById("textArea" + callback).value );
        }
        else if( typeof callback !== 'function'){//'string' && (/[a-z,A-Z]/.test(callback)) ){
            console.log("callbackAsString:", callback)
            eval(callback);
        }
        else if( typeof callback === "function"){
            console.log("RealCallback:", callback)
            callback();
        }

    }
    setBorderRadius( radius ){
        this.canvas.style.borderRadius = radius+'px';
        this.color.borderRadius = radius;
        return this;
    }
    setBorderWidth( width ){
        this.canvas.style.borderWidth = width+'px';
        this.color.borderWidth = width;
        return this;
    }
    selectTxtSize(by){   
    }
    selectFont(){
    }
    bringToTop(){
        document.body.removeChild(this.canvas);
        document.body.appendChild(this.canvas);
    }
    move(offsetX = 5){
        let holdOnclick     = this.callback.onclick;
        let holdOnmousemove = document.onmousemove;
        let holdOnmousedown = document.onmousedown;
        this.callback.onclick = null;
        document.onmousedown= (event) =>{
            this.canvas.style.top =  event.clientY+"px";
            this.canvas.style.left = offsetX+event.clientX+"px";
            this.position.x = offsetX+event.clientX;
            this.position.y = event.clientY;
            console.log('Canvas.move:', this.position.x, this.position.y);
            document.onclick     = holdOnclick
            document.onmousedown = holdOnmousemove;
            document.onmousemove = holdOnmousedown;
            this.canvas.onclick  = holdOnclick;
            //setTimeout( (() => {this.canvas.onclick = () => this.move();
            //                    this.postProperties(20, 490);
            //                   }), 1000);
            //console.log(this);
            return this;
        }
        document.onmousemove = (event) =>{
            //event.stopPropagation();
            this.position.x = offsetX+event.clientX;
            this.position.y = event.clientY;
            this.canvas.style.top = event.clientY+"px";
            this.canvas.style.left = offsetX+event.clientX+"px";
            //this.postProperties(20, 490);
        }
        
    }
    draw(){
        console.log('draw');
        let  drawing = new Drawing(0,0,0, this.canvas);
        drawing.clearPage();
        for( let i = 0; i < this.drawArray.length; i++){
            //console.log(this.drawArray[i].myMethod + '(' + this.drawArray[i].myArgs + ')');
            drawing[this.drawArray[i].myMethod](...this.drawArray[i].myArgs);
        }
        return drawing;
    }
    modifyWidth(by){
        this.canvas.width = this.canvas.width + by;
        this.size.width = this.canvas.width;
       // this.canvas.style.width = (Number(this.canvas.style.width.slice(0,-2)) + by)+"px";
       // this.size.width = Number(this.canvas.style.width.slice(0,-2));

    }
    modifyHeight(by){
        this.canvas.height = this.canvas.height + by;
        this.size.height = this.canvas.height;
        //this.canvas.style.height = (Number(this.canvas.style.height.slice(0,-2)) + by)+"px"
        //this.size.height = Number(this.canvas.style.height.slice(0,-2));
    }
    logToConsole(){
        //const txtArea = document.getElementById("textArea");
        console.log(this.canvas);
        this.bringToTop();
    }
    jsHead(type = 'draw'){
        let fakeJSON = '//<pre>'+this.Id+'.draw\n';
        fakeJSON += '((x, y) => {\n';
        fakeJSON +='let m = new Runner()\n';
        fakeJSON +='new Drawing( 0, 0, 0, '+ this.canvas.id+')\n';
        return fakeJSON;
    }
    drawArrayObjectToString(codeStrObj, x = 0, y = 0){
        let fakeJSON = "";
            if( codeStrObj.myMethod.slice(0,3) !== "set" &&
                codeStrObj.myMethod.slice(0,4) !== "text" 
              ){
                    fakeJSON+="."+codeStrObj.myMethod+"( x+"+(codeStrObj.myArgs[0]-x)
                                 +",  y+"+(codeStrObj.myArgs[1]-y);

                    //fakeJSON+=codeStrObj.myArgs[2];
                    if( codeStrObj.myArgs.slice(2).length > 0 ){
                         console.log(codeStrObj.myArgs.slice(2))
                        fakeJSON+=","+JSON.stringify(codeStrObj.myArgs.slice(2)).slice(1,-1)
                    }
                fakeJSON+=")\n" ;
            }
            else if( codeStrObj.myMethod.slice(0,4) === "text" ){
                    fakeJSON+="."+codeStrObj.myMethod+"( '"+codeStrObj.myArgs[0]
                                 +"', x+"+(codeStrObj.myArgs[1]-x)
                                 +",  y+"+(codeStrObj.myArgs[2]-y);
                    if( codeStrObj.myArgs.slice(3).length > 0 ){
                         console.log(codeStrObj.myArgs.slice(3))
                        fakeJSON+=","+JSON.stringify(codeStrObj.myArgs.slice(3)).slice(1,-1)
                    }
                fakeJSON+=")\n" ;
            }
            else{
                fakeJSON += "." +codeStrObj.myMethod +"("+JSON.stringify(codeStrObj.myArgs).slice(1,-1)+")\n" ;
            }
        return fakeJSON;
    }
    drawArrayJSON(type = 'draw'){
        //let drawArrJSON = JSON.stringify( this.drawArray );
        let fakeJSON = this.jsHead();
        for( let i = 0; this.drawArray[i]; i++){
            fakeJSON += this.drawArrayObjectToString( this.drawArray[i] );
            //fakeJSON += "." +this.drawArray[i].myMethod +"("+JSON.stringify(this.drawArray[i].myArgs).slice(1,-1)+")\n" ;
            //fakeJSON += "Text.canvas." + this.drawArray[i].myMethod  + " " + JSON.stringify(this.drawArray[i].myArgs) + "\n" ;
        }
        fakeJSON += "})(0 , 0);"
        new Note( 110 ,130, this.Id+'.'+type).create(9,49,fakeJSON);
        this.logJSON();
    }
    createFromJSON(myJSON){
        let myJSONobj = JSON.parse(myJSON);
        console.log(myJSONobj.callback);
        new Canvas(myJSONobj.x, myJSONobj.y, myJSONobj.Id)            
            .create(myJSONobj.width, myJSONobj.height, myJSONobj.Id)
            .setBGColor(myJSONobj.BGcolor)
            .setTextColor(myJSONobj.txtColor)
            .setBorderColor(myJSONobj.borderColor)
            .setBorderWidth(myJSONobj.borderWidth)
            .setBorderRadius(myJSONobj.borderRadius)
            .setCallback(myJSONobj.callback)
            .setStartUpCallback( myJSONobj.callback.startUp )
            .evalStartUpCallback()
            .setDrawArray(JSON.parse(JSON.stringify(myJSONobj.drawArray)))
            ;
    }
    logJSON(){
        let JSONcanvas = {  
                            Id: this.Id,
                            x: this.position.x,
                            y: this.position.y,
                            height: this.canvas.height,
                            width: this.canvas.width,
                            txtColor: this.color.text,
                            BGcolor: this.color.background,
                            borderRadius: this.color.borderRadius,
                            borderColor: this.color.border,
                            borderWidth: this.color.borderWidth,
                            drawArray: this.drawArray,
                            startUpCallback: this.startUpCallback,
                            callback: this.callback
                       }
        console.log("Canvas.createFromJSON", JSON.stringify(JSONcanvas));
        //this.createFromJSON(JSON.stringify(JSONcanvas));
        return JSON.stringify(JSONcanvas);
    }
    saveFile(){
        new Files(this)
            .saveFile(this.logJSON(), "canvas"+this.Id+".JSONcv");
    }
    saveFileAs(x = this.position.x, y = this.position.y){
        new Files(this)
            .setFileExtension(".JSONcv")
            .saveFileAs(this.logJSON(), x, y);
        
    }
    openFile(){
        let results;
        new Files(this)
            .setCallback('spawnFromFile')
            .setAccept('.JSONcv')
            .loadFile(results);
    }
    spawnFromFile(fileTxt){
        this.createFromJSON(fileTxt);      
    }
    minamize(){
        console.log("minimize")
        this.remove();
        new MenuThis(this, "min"+this.Id).setBGcolor('white')
        .btnR(this.Id, this.position.x, this.position.y, ["append"], 45, 20)
    }
    append(){
        document.body.appendChild(this.canvas);
    }
    remove(){
        document.body.removeChild(this.canvas);
    }
    create(width = this.size.width, height = this.size.height, Id = this.Id){
        console.log("Canvas.create:(", width, height, Id);
        
        this.Id = Id;       
        this.size.height = height;
        this.size.width = width;
        
        this.canvas.id = "canvas"+this.Id;
        this.canvas.style.position = "absolute";
        this.canvas.style.top = this.position.y +"px";
        this.canvas.style.left = this.position.x +"px";
        
        this.canvas.height = height;
        this.canvas.width = width; 

        // this.canvas.style.zIndex= -2;
                this.canvas.style.borderColor  = this.color.border;
                this.canvas.style.borderWidth  = this.color.borderWidth;
                this.canvas.style.borderRadius = this.color.borderRadius;
        this.canvas.style.borderStyle = "solid";
        this.canvas.style.backgroundColor = this.color.background;
        this.canvas.onclick      = this.callback.onclick;
        this.canvas.oncontextmenu = this.callback.oncontextmenu;
        this.canvas.onmouseover  = () => {
            if( event.shiftKey)
            this.postProperties(20, 490);
        } 
        document.body.appendChild(this.canvas);
        return this;
    }
    createDeadCanvas(width = this.size.width, 
                     height = this.size.height, 
                     Id = "canvas"+this.Id,
                     zIndex = null){
        this.canvas.id = Id;
        this.canvas.style.position = "absolute";
        this.canvas.style.top = this.position.y +"px";
        this.canvas.style.left = this.position.x +"px";        
        this.canvas.height = height;
        this.canvas.width = width; 
        this.size.height = height;
        this.size.width = width;
        this.canvas.style.zIndex= zIndex;
        document.body.appendChild(this.canvas);
        return this;
    }
    spawn(x = this.position.x, y = this.position.y){
        return new Canvas(x, y, this.Id+"spawn" )
            .create(this.size.width, this.size.height)
            .setBGColor(this.color.background)
            .setDrawArray(this.drawArray)
            .move();
    }
}

//new Canvas().create(250,450);
