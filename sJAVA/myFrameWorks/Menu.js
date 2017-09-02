///////////////////////////
function DirControl(myThis = this, myId = "dirControl"){
    this.myThis = myThis;
    this.resetTxt = "reset";

this.setResetTxt = function(txt){
   this.resetTxt = txt;
};

this.funct = function(funct, x, y, callback = null){
    let dirMenu = new MenuThis(this.myThis, funct)
    dirMenu.clear()
    .textXY(funct     , x    , y-5)
    .btnR( 'X'     , x-25, y-25, []            , 15, 15, "Cr,TC")
    .textXY('o-o'  , x-25, y-10, () => dirMenu.minamize()).setBGcolor('yellow')
    .btn( 'M<br>V' , x-45, y-25, () => dirMenu.move(), 15, 30)
    .setBGcolor('teal')
    .btn("-x-"        , x    , y+35 , [funct+'xUp'  , callback]  , 40, 20)
    .btn("-^-"        , x+50 , y    , [funct+'zUp'  , callback]  , 40, 20)
    .btn("-v-"        , x+50 , y+50 , [funct+'zDown', callback], 40, 20)
    .btn("-x-"        , x+100, y+12 , [funct+'xDown', callback], 40, 20)
    .btn("-y-"        , x+100, y+35 , [funct+'yUp'  , callback]  , 40, 20)
    .btn("-y-"        , x    , y+12 , [funct+'yDown', callback], 40, 20)
    .btn(this.resetTxt, x+50 , y+25 , [funct+'Reset', callback], 40, 20);

};
this.functXYcontrol = function(funct){
   var txt = "<div>"+funct+"</div>";
   this.menu.print(txt);
   txt ='<div class="dirControlBoarder"></div>'; 
   txt +='<div><button class="left" onclick ="'+funct+'Left()"><-x-</button>';
   txt +='<button class="up" onclick ="'+funct+'Up()">_^_</button>';
   txt +='<button class="down" onclick ="'+funct+'Down()">_v_</button>';
   txt +='<button class="right" onclick ="'+funct+'Right()">-x-></button>';
//   txt +='<button class="reset" onclick ="'+funct+'reset()">reset</button></div>';
   this.menu.print(txt);
};
}
class MenuThis{
    constructor(myThis = window, Id = 'id_' + Math.random(), xo = 0, yo = 0){
        this.Id = Id;
        this.myThis = myThis;
        this.location = {x:xo, y:yo}
        this.items = [];  //test for relavalance
        this.BGcolor     = null; 
        this.txtColor    = "navy";
        this.borderColor = "navy";
        this.borderWidth = 1; //testing 1 VS 1
        this.txtSize     = 12;
        this.txtAlign    = "center",
        this.onRemove    = null;
        this.mouseover   = { isOn: false, callback: null };
        this.contextMenu = null;
        this.childOjbs   = [];
        this.data        = {};
    }
    setContextMenuCallback(callback){
        this.contextMenu = callback;
        return this;
    }
    setMouseoverCallback (callback){;
        this.mouseover.callback = callback;
        return this;
    }
    setMouseoverIsOn (flag){
        this.mouseover.isOn = flag;
        return this;
    }
    setOnRemove (callBack){
        this.onRemove = callBack;
        return this;
    }
    setBGcolor (color){
        this.BGcolor = color;
        return this;
    }
    setBorderColor (color){
        this.borderColor = color;
        return this;
    }
    setBorderWidth (width){
        this.borderWidth = width;
        return this;
    }
    setTxtColor (color){
        this.txtColor = color;
        return this;
    }
    setTxtSize (size){
        this.txtSize = size;
        return this;
    }
    setTxtAlign (align){
        this.txtAlign = align;
        return this;
    }
    pushLastChild(){
        this.childObjs.push(document.body.lastChild);
        return this;
    }
    action(action, callback){
        let lastM = document.body.lastChild;
        lastM[action] = callback;
        return this;
    }
    attribute(attr, propSetting){
        let lastM = document.body.lastChild;
        lastM.setAttribute(attr, propSetting);
        return this;
    }
    property(prop, propSetting){
        let lastM = document.body.lastChild;
        //console.log(lastM);
        lastM[prop] = propSetting;
        return this;
    }
    css(prop, propSetting, lastM = document.body.lastChild){
        //let lastM = document.body.lastChild;
        lastM.style[prop] = propSetting;
        return this;
    }
    itemRemoveTimer( mils = 10){
        let lastM = document.body.lastChild;
        setTimeout( ()=> document.body.removeChild(lastM), mils*1000);
        return this;
    }
    hide( vis ){
        let lastM = document.body.lastChild;
        if(vis){
            document.body.removeChild(lastM);
        }else{
            document.body.appendChild(lastM);
        }
    }
    appendTagHTML(match, text){
        let matchM  = document.getElementsByTagName(match);
        _.map( matchM, (x) => {  if(x)if( x.id === this.Id ){
                                 x.innerHTML += text; }});
    }
    appendNameHTML(match, text){
        let matchM  = document.body.getElementsByName(match);
        _.map( matchM, (x) => {  if(x)if( x.id === this.Id ){
                                 x.innerHTML += text; }});
    }
    appendClassHTML(match, text){
        let matchM  = document.body.getElementsByClassName(match);
        console.log(matchM)
        _.map( matchM, (x) => {  if(x)if( x.id === this.Id ){
                                 x.innerHTML += text; }});
    }
    modifyPropertyByTag(match, prop, how){
        let matchM  = document.getElementsByTagName(match);
        _.map( matchM, (x) => {  if(x)if( x.id === this.Id ){
                                 x[prop] = how; }});
    }
    modifyPropertyByName(match, prop, how){
        let matchM  = document.getElementsByName(match);
        _.map( matchM, (x) => {  if(x)if( x.id === this.Id ){
                                 console.log(prop, how, x)
                                 x[prop] = how; }});
    }
    modifyPropertyByClass(match, prop, how){
        let matchM  = document.getElementsByClassName(match);
        _.map( matchM, (x) => {  if(x)if( x.id === this.Id ){
                                 x[prop] = how; }});
    }
    modifyCssByTag(match, prop, how){
        let matchM  = document.getElementsByTagName(match);
        _.map( matchM, (x) => {  if(x)if( x.id === this.Id ){
                                 x.style[prop] = how; }});
    }
    modifyCssByName(match, prop, how){
        let matchM  = document.getElementsByName(match);
        _.map( matchM, (x) => {  if(x)if( x.id === this.Id ){
                                 x.style[prop] = how; }});
    }
    modifyCssByClass(match, prop, how){
        let matchM  = document.getElementsByClassName(match);
        _.map( matchM, (x) => {  if(x)if( x.id === this.Id ){
                                 x.style[prop] = how; }});
    }
    removeByTag(match){
        let matchM  = document.getElementsByTagName(match);
        _.map( matchM, (x) => {  if(x)if( x.id === this.Id ){
                                     document.body.removeChild(x); }});
    }
    removeByName(match){
        let matchM  = document.getElementsByName(match);
        _.map( matchM, (x) => {  if(x)if( x.id === this.Id ){
                                     document.body.removeChild(x); }})
    }
    removeByClass(match){
        let matchM  = document.getElementsByClassName(match);
        _.map( matchM, (x) => {  if(x)if( x.id === this.Id ){
                                     document.body.removeChild(x); }})
    }
    createKey(dataKey, valueKey = "innerHTML"){
        //console.log(dataKey, valueKey)
        this.data[dataKey] = document.body.lastChild;
        //console.log(this.data[bindDataKey][valueKey])
        return this;
    }
    returnDataBinding(key){
        let lastChild = document.body.lastChild;
        return (x) => lastChild[key] = x;
    }
    setData(bindDataKey, valueKey, value){
        console.log(bindDataKey, valueKey, value)
        this.data[bindDataKey][valueKey] = value;
        console.log(this.data[bindDataKey][valueKey])
        return this;
    }
}
MenuThis.prototype.menuRemoveTimer = function( seconds = 10){
    setTimeout( () => this.clear(), seconds*1000);
    return this;
}
MenuThis.prototype.move = function(callback = null, offsetX = 2, offsetY = 0){
        console.log(event.layerX, event.layerY)
        console.log(event.pageX, event.pageY)
        console.log(event.clientX, event.clientY)
    let holdMousemove = document.onmousemove;
    console.log(holdMousemove)
    let holdOnclick   = document.onclick;
    let holdMousedown   = document.onmousedown;
    console.log(holdOnclick)
    this.load();
    //this.location.x = Number(this.items[0].style.left.slice(0, -2));
    //this.location.y = Number(this.items[0].style.left.slice(0, -2));
    let firstMove = { x: offsetX+event.layerX, y: offsetY+event.layerY };
    this.moveBy(firstMove.x, firstMove.y);
    document.onmousemove = () => {
        //console.log(event)
        this.moveBy(event.movementX, event.movementY);
    }
    document.onmousedown = () =>{
        event.stopPropagation();
        console.log("onCLick:before:", this.location.x, this.location.y)
        //this.location.x = event.pageX;//+firstMove.x;
        //this.location.y = event.pageY;//+firstMove.y;
        console.log("onCLick:after:", this.location.x, this.location.y)
        console.log("LayerX: ",event.layerX, event.layerY)
        console.log("PageY: ",event.pageX, event.pageY)
        console.log(event.clientX, event.clientY)
        if(callback !== null){
            callback(event.pageX+offsetX, event.pageY+offsetY);
        }
        console.log(holdMousemove)
        document.onmousemove = holdMousemove;
        document.onmousedown = holdMousedown;
        document.onclick = holdOnclick;
    }
    return this;
}
MenuThis.prototype.minamize= function(offsetX = 0, offsetY = 0){
    this.clear();
    //console.log(this.items)
    let mnu = new MenuThis(null, this.Id+"minimize").btnR(   '-'+this.Id+'-', 
                Number(this.items[0].style.left.slice(0, -2)) + offsetX,
                Number(this.items[0].style.top.slice( 0, -2)) + offsetY,
                () => this.unClear(), 40, 15)
                .css('backgroundColor','white');
    return this;
}
MenuThis.prototype.moveBy= function(dx, dy){
   // console.log("moveBy:", dx, dy)
    this.items.forEach( (x) => {
        x.style.left = (Number(x.style.left.slice(0,-2)) + dx)+"px";
        x.style.top  = (Number(x.style.top.slice( 0,-2)) + dy)+"px";

    });
    this.location.x = Number(this.items[0].style.left.slice(0,-2));
    this.location.y = Number(this.items[0].style.top.slice(0,-2));
    return this;
}
MenuThis.prototype.unClear = function(){
    this.items.forEach( (x) => document.body.appendChild(x) );
    return this;
}
MenuThis.prototype.load = function(){
   var x = document.getElementById(this.Id);
   this.items = [];
   while(x != null){
       if( x.id === this.Id){
            this.items.push(x);
        }
      x = x.nextElementSibling;
      }
   return this;
};
MenuThis.prototype.clear = function(){
   var x = document.getElementById(this.Id);
   this.items = [];
   while(x != null){
       if( x.id === this.Id){
            this.items.push(x);
            document.body.removeChild(x);
        }
      x = document.getElementById(this.Id);
      }
    //console.log(this.items)
   return this;
};
MenuThis.prototype.menuHead = function(txt, x = this.position.x, y = this.position.y, callback = null){
    this.setBGcolor('white')
        .textXY( txt   , x, y-50, [null], "white")
        .css("borderRadius", "2px")
        .rectXY(         x-5, y-30, 50 , 40, 'slateGrey')
        .css("borderRadius", "5px")
        .btnR(    'X'    , x+25, y-25, callback, 15, 15, "Cr,TC")
        .textXY(  'o-o'  , x+25, y-10, () => this.minamize() )
        .setBGcolor('yellow')
        .btn(    'M<br>V', x   , y-25, () => this.move(), 20, 30)
    return this;
};
MenuThis.prototype.callbackToString = function (callback, head = "") {//test
    let myOnClick = head+'this.myThis';
    let textCallback = 'this.myThis';
    if( this.myThis === null){
        myOnClick = '';
    }
    if( typeof callback !== 'string' ) {
        for( let i = 0; callback[i]; i++){
            myOnClick += '[callback['+i+']]';
            if(typeof eval(myOnClick) === "function" ){
                console.log("functionFound")
                console.log(callback[i+1])
                myOnClick += '(...callback.slice('+(i+1)+'))';
                break;
            }
        }
    }
    else{
        return callback;
    }
    return myOnClick;
};
MenuThis.prototype.radioButton = function(txt, x, y, callback, group = "myRadio"){
    console.log('checkbox')
   var t = this;
   var tx = x-this.borderWidth;
   var ty = y-this.borderWidth;
   let newDiv = document.createElement("input");
   // console.log(this.Id);
    newDiv.id = this.Id;
    newDiv.style.position = "absolute";
    newDiv.style.top      = ty+"px"; 
    newDiv.style.left     = tx+"px"; 
    newDiv.value          = txt;
    newDiv.name           = group;
    newDiv.checked        = "";
    newDiv.type           = "radio";


    let txtDiv = document.createElement("div");
    txtDiv.id = this.Id;
    txtDiv.style.position = "absolute";
    txtDiv.style.top      = ty+"px"; 
    txtDiv.style.left     = (tx+30)+"px";
    txtDiv.innerHTML      = txt;
    document.body.appendChild(txtDiv);
    newDiv.onchange = (e) => {  callback(e);
                                newDiv.checked = "checked";     
                                if( newDiv.checked && false){
                                    if(newDiv.value === 'checked'){
                                        txtDiv.innerHTML = "<strike>"+txt+"</strike>";
                                    }else{
                                       txtDiv.innerHTML = newDiv.value 
                                    }

                                }
                                else{
                                    console.log("radioButton.else");   
                                }
                                //document.body.appendChild(txtDiv);
                           };
    document.body.appendChild(newDiv);
    return this;
}
MenuThis.prototype.checkbox = function(txt, x, y, callback, sizeX = 20, sizeY = sizeX){
    console.log('checkbox')
   var t = this;
   var tx = x-this.borderWidth;
   var ty = y-this.borderWidth;
   let newDiv = document.createElement("input");
    console.log(this.Id);
   newDiv.id = this.Id;
   newDiv.name = txt;
   newDiv.style.position = "absolute";
   newDiv.style.top      = ty+"px"; 
   newDiv.style.left     = tx+"px"; 
   newDiv.value          = "checkbox";
   //newDiv.checked        = "checked";
   newDiv.type           = "checkbox";
   //newDiv.innerHTML      = txt;
   //newDiv.style.fontSize = this.txtSize+"px";
   //newDiv.style.borderStyle = "solid";
   //newDiv.style.borderWidth = this.borderWidth+"px";
   //newDiv.style.borderColor = this.borderColor;
   //newDiv.style.color = this.txtColor;
   //newDiv.style.borderRadius="3px";
   //newDiv.style.backgroundColor   = inputBGcolor;


   let txtDiv = document.createElement("div");
   txtDiv.id = this.Id;
   txtDiv.style.position = "absolute";
   txtDiv.style.top      = ty+"px"; 
   txtDiv.style.left     = (tx+30)+"px";
   txtDiv.innerHTML      = txt;
   document.body.appendChild(txtDiv);
   newDiv.onchange = () => {    callback(newDiv.checked)
                                if(txtDiv){
                                    //document.body.removeChild(txtDiv);       
                                }
                                if( newDiv.checked){
                                    txtDiv.innerHTML = "<strike>"+txt+"</strike>";
                                }
                                else{
                                    txtDiv.innerHTML = txt;   
                                }
                                //document.body.appendChild(txtDiv);
                           };
   document.body.appendChild(newDiv);
   return this;
}
MenuThis.prototype.checkboxOnOff = function(txtOn, txtOff, x, y, callback, sizeX = 20, sizeY = sizeX){
    console.log('checkbox')
   var t = this;
   var tx = x-this.borderWidth;
   var ty = y-this.borderWidth;
   let newDiv = document.createElement("input");
    console.log(this.Id);
   newDiv.id = this.Id;
   newDiv.name = txtOn;
   newDiv.style.position = "absolute";
   newDiv.style.top      = ty+"px"; 
   newDiv.style.left     = tx+"px"; 
   newDiv.value          = "checkbox";
   newDiv.checked        = false;
   newDiv.type           = "checkbox";
   //newDiv.innerHTML      = txt;
   //newDiv.style.fontSize = this.txtSize+"px";
   //newDiv.style.borderStyle = "solid";
   //newDiv.style.borderWidth = this.borderWidth+"px";
   //newDiv.style.borderColor = this.borderColor;
   //newDiv.style.color = this.txtColor;
   //newDiv.style.borderRadius="3px";
   //newDiv.style.backgroundColor   = inputBGcolor;


   let txtDiv = document.createElement("div");
   txtDiv.id = this.Id;
   txtDiv.style.position = "absolute";
   txtDiv.style.top      = ty+"px"; 
   txtDiv.style.left     = (tx+30)+"px";
   txtDiv.innerHTML      = txtOn;

   document.body.appendChild(txtDiv);

   newDiv.onchange = () => {
                                console.log(newDiv.checked)
                                console.log(event)
                                if(txtDiv){
                                    //document.body.removeChild(txtDiv);       
                                }
                                if( newDiv.checked){
                                    callback(newDiv.checked);
                                    txtDiv.innerHTML = txtOff;
                                }
                                else{
                                    callback(newDiv.checked);
                                    txtDiv.innerHTML = txtOn;   
                                }
                                //document.body.appendChild(txtDiv);
                           };
   document.body.appendChild(newDiv);
   return this;
}
MenuThis.prototype.input = function(txt, x, y, callback = null,
                                       xOffset= 0,
                                       deleteOnInput= true,
                                       defaultValue= '', 
                                       inputBGcolor= 'pink' ){
   var tx = x-this.borderWidth;
   var ty = y-this.borderWidth;
   let newDiv = document.createElement("input");
   newDiv.id = this.Id;
   newDiv.style.position = "absolute";
   newDiv.style.top = ty+"px"; 
   newDiv.style.left = tx+"px"; 
   newDiv.value = defaultValue;
   //newDiv.autofocus = true;
   newDiv.type  = "text";//Testing
   newDiv.style.fontSize = this.txtSize+"px";
   newDiv.style.borderStyle = "solid";
   newDiv.style.borderWidth = this.borderWidth+"px";
   newDiv.style.borderColor = this.borderColor;
   newDiv.style.color = this.txtColor;
   newDiv.style.borderRadius="3px";
   newDiv.style.backgroundColor   = inputBGcolor;
   if( callback !== null ){
        newDiv.onchange = () => {   if(typeof callback === 'function'){
                                        callback(event);
                                        //event.target.value = ''; //this was causing a blur event or a second onchange
                                    }
                                    else if( typeof callback === 'string'){
                                        eval(callback);
                                    }
                                    else{
                                        this.myThis[callback](newDiv.value);
                                    }
                                    if(deleteOnInput){
                                        if(newDiv.parentNode === document.body){
                                            newDiv.remove();
                                        }
                                        if( txt !== null ){
                                           document.body.removeChild(newSubmit);
                                        }
                                    }
                                    event.target.value = ''; //SO, I moved it here 
                                };
        //newDiv.onblur = () => {
            //if(deleteOnInput){
                //console.log("blur(newDiv)", newDiv, event )
                //newDiv.remove();
                //if( txt !== null ){
                    //document.body.removeChild(newSubmit);
                //}
           // }
       //};
  }

    if( txt !== null){
        var newSubmit = document.createElement("input");
        let xoff = xOffset;
        if(xOffset === 0){
            xoff = (2+txt.length)*10;
        }
        console.log(xoff);
        newSubmit.id = this.Id;
        newSubmit.style.position    = "absolute";
        newSubmit.style.top         = ty+"px"; 
        newSubmit.style.left        = tx-xoff+"px";
        newSubmit.style.textAlign   = "left";
        newSubmit.value             = txt;
        newSubmit.type              = "submit";// "submit"
        newSubmit.style.fontSize    = this.txtSize+"px";
        newSubmit.style.borderStyle = "solid";
        newSubmit.style.borderWidth = this.borderWidth+"px";
        newSubmit.style.borderColor = this.borderColor;
        newSubmit.style.color       = this.txtColor;
        newSubmit.style.backgroundColor   = this.BGcolor;
        newSubmit.style.borderRadius= "3px";
        newSubmit.onclick = () => 
            {   if(typeof callback === 'function'){
                    callback(event);
                    //event.target.value = ''; //reset target value
                }
                else if( typeof callback === 'string'){
                                        eval(callback);
                                    }
                                    else{
                                        this.myThis[callback](newDiv.value);
                                    }
                                    if(deleteOnInput){
                                        console.log("removeChild(newDiv)", newDiv)
                                        document.body.removeChild(newDiv);
                                        if( txt !== null ){
                                           document.body.removeChild(newSubmit);
                                        }
                                    }
        };
        document.body.appendChild(newSubmit); 
    }
   document.body.appendChild(newDiv);
   return this;
}

MenuThis.prototype.select= function(txt, x, y, callback = null, options=[null]){
   let t = this;
   let newDiv = document.createElement('SELECT');
    newDiv.id                    = this.Id;
    //newDiv.name                  = txt;
    newDiv.style.position        = "absolute";
    newDiv.style.top             = y+"px"; 
    newDiv.style.left            = x+"px"; 
    newDiv.style.textAlign       = this.txtAlign;
    newDiv.style.fontSize        = this.txtSize+"px";
    newDiv.style.color           = this.txtColor;
    newDiv.style.backgroundColor = this.BGcolor;
    if( callback !== null ){
        newDiv.onclick = (e) => {    
                                    if( typeof callback === 'function'){
                                        callback(e);
                                    }
                                    else if( typeof callback === 'string'){
                                        console.log(callback)
                                        eval(callback);
                                    }
                                    else{
                                        eval(this.callbackToString(callback));
                                    }
                               };
    }
    for(let i = 0; options[i]; i++){
        let option = document.createElement("option");
        option.text = options[i];
        option.value = options[i];
        newDiv.add(option);
    }
    document.body.appendChild(newDiv);
    //newDiv.innerHTML = txt;
    return this;
}
MenuThis.prototype.img= function(src, x, y, callback = null, width = 200, height = 200){
    let newDiv = document.createElement('img');
    newDiv.id                    = this.Id;
    newDiv.setAttribute('src',     src);
    newDiv.style.position        = "absolute";
    newDiv.style.top             = y+"px"; 
    newDiv.style.left            = x+"px"; 
    newDiv.style.height          = height+"px";
    newDiv.style.width           = width+"px";
    newDiv.style.bordStyle       = "solid";
    newDiv.style.borderColor     = this.borderColor;
    newDiv.style.borderWidth     = this.borderWidth;
    if( callback !== null ){
        newDiv.onclick = () => {    
                                    if( typeof callback === 'function'){
                                        callback();
                                    }
                                    else if( typeof callback === 'string'){
                                        console.log(callback)
                                        eval(callback);
                                    }
                                    else{
                                        eval(this.callbackToString(callback));
                                    }
                               };
    }
    document.body.appendChild(newDiv);
    return this;
}
MenuThis.prototype.createTag= function(tag, txt, x, y, callback = null){
   let t = this;
   let newDiv = document.createElement(tag);
    newDiv.id                    = this.Id;
    //newDiv.name                  = "menu";
    newDiv.style.position        = "absolute";
    newDiv.style.top             = y+"px"; 
    newDiv.style.left            = x+"px"; 
    newDiv.style.textAlign       = this.txtAlign;
    newDiv.style.fontSize        = this.txtSize+"px";
    newDiv.style.color           = this.txtColor;
    newDiv.style.backgroundColor = this.BGcolor;
    if( callback !== null ){
        newDiv.onclick = () => {    
                                    if( typeof callback === 'function'){
                                        callback();
                                    }
                                    else if( typeof callback === 'string'){
                                        console.log(callback)
                                        eval(callback);
                                    }
                                    else{
                                        eval(this.callbackToString(callback));
                                    }
                               };
    }
    document.body.appendChild(newDiv);
    newDiv.innerHTML = txt;
    return this;
}
MenuThis.prototype.createTagR= function(tag, txt, x, y, callback = null){
   let t = this;
   let newDiv = document.createElement(tag);
                document.body.appendChild(newDiv); 
    newDiv.id                 = this.Id;
    newDiv.name               = "menu";
    newDiv.setAttribute(        "class", "menu");
    newDiv.style.position     = "absolute";
    newDiv.style.top          = y+"px"; 
    newDiv.style.left         = x+"px"; 
    newDiv.style.textAlign       = this.txtAlign;
    newDiv.style.fontSize        = this.txtSize+"px";
    newDiv.style.color           = this.txtColor;
    newDiv.style.backgroundColor = this.BGcolor;
    if( callback !== null ){
        newDiv.onclick = () => {    this.clear();
                                    if( this.onRemove ){
                                        this.onRemove();
                                    }
                                    if( typeof callback === 'function'){
                                        callback();
                                    }
                                    else if( typeof callback === 'string'){
                                        console.log(callback)
                                        eval(callback);
                                    }
                                    else{
                                        eval(this.callbackToString(callback));
                                    }
                               };
    }
    newDiv.innerHTML = txt;
    return this;
}
MenuThis.prototype.btnDivR = function(txt, callback, x, y, sizeX, sizeY = sizeX){
   let t = this;
   let tx = x-this.borderWidth;
   let ty = y-this.borderWidth;
   let newDiv = document.createElement("div");
    newDiv.id                 = this.Id;
    newDiv.style.position     = "absolute";
    newDiv.style.top          = ty+"px"; 
    newDiv.style.left         = tx+"px"; 
    newDiv.style.height       = sizeY+"px";
    newDiv.style.width        = sizeX+"px";
    newDiv.style.textAlign    = this.txtAlign;
    newDiv.style.fontSize     = this.txtSize+"px";
    newDiv.style.borderStyle  = "solid";
    newDiv.style.borderWidth  = this.borderWidth+"px";
    newDiv.style.borderColor  = this.borderColor;
    newDiv.style.color        = this.txtColor;
    newDiv.style.borderRadius = "3px";

    if( callback !== null ){
        newDiv.onclick = () => {    this.clear();
                                    if( this.onRemove ){
                                        this.onRemove();
                                    }
                                    if( typeof callback === 'function'){
                                        callback();
                                    }
                                    else if( typeof callback === 'string'){
                                        console.log(callback)
                                        eval(callback);
                                    }
                                    else{
                                        eval(this.callbackToString(callback));
                                    }
                               };
    }
    if ( this.mouseover.isOn ) {
       console.log(this.mouseover);
       tcallback = JSON.parse(JSON.stringify(this.mouseover.callback));
       newDiv.onmouseover = () => t.myThis[tcallback[0]](...tcallback.slice(1));
    }
    else {
      newDiv.onmouseover = null;
    }
    document.body.appendChild(newDiv);
    newDiv.innerHTML = txt;
}
MenuThis.prototype.btnDiv = function(txt, callback, x, y, sizeX, sizeY = sizeX){
   var t = this;
   var tx = x-this.borderWidth;
   var ty = y-this.borderWidth;
   var newDiv = document.createElement("div");
  newDiv.id = this.Id;
  newDiv.style.position = "absolute";
  newDiv.style.top = ty+"px"; 
  newDiv.style.left = tx+"px";  
  newDiv.style.height = sizeY+"px";
  newDiv.style.width = sizeX+"px";
  newDiv.style.textAlign = this.txtAlign;
  newDiv.style.fontSize = this.txtSize+"px";
  newDiv.style.borderStyle = "solid";
  newDiv.style.borderWidth = this.borderWidth+"px";
  newDiv.style.borderColor = this.borderColor;
  newDiv.style.color = this.txtColor;
  newDiv.style.borderRadius="3px";

  if( callback !== null ){
        newDiv.onclick = () => {   
                                    if( typeof callback === 'function'){
                                        callback();
                                    }
                                    else if( typeof callback === 'string'){
                                        console.log(callback)
                                        eval(callback);
                                    }
                                    else{
                                        eval(this.callbackToString(callback));
                                    }
                                    event.stopPropagation();
                               };
    }
    if ( this.mouseover.isOn ) {
       console.log(this.mouseover);
       tcallback = JSON.parse(JSON.stringify(this.mouseover.callback));
       newDiv.onmouseover = () => t.myThis[tcallback[0]](...tcallback.slice(1));
    }
    else {
      newDiv.onmouseover = null;
    }
    document.body.appendChild(newDiv);
    newDiv.innerHTML = txt;
}
MenuThis.prototype.rect = function(x , y, width, height, color = this.BGcolor, zIndx = 0 ) { 
    let cv = new Canvas(x,y).createDeadCanvas( width, height, this.Id, zIndx )
    var ctx = new Drawing(0,0,0, cv.canvas);
    ctx.setColor(color).rectXY(0, 0, width, height);
    return this;
}
MenuThis.prototype.rectXY = function(x , y, width, height, color = this.BGcolor, zIndx = 0 ) { 
    this.rect(x , y, width, height, color, zIndx )
    return this;
}
MenuThis.prototype.triangle = function(x , y, width, height, dir = "up", color = this.BGcolor, zIndx = 0 ) { 
    let cv = new Canvas(x,y).createDeadCanvas( width, height, this.Id, zIndx )
    var ctx = new Drawing(0,0,0, cv.canvas);
    ctx.setColor(color).triangleXY(0, 0, width, height, dir);
    return this;
}
MenuThis.prototype.text = function(txt ,x ,y , callback = null, BGcolor = null, txtColor = null) { 
   var newDiv = document.createElement("div");
    newDiv.id                      = this.Id;
    newDiv.style.position          = "absolute";
    newDiv.style.top               = y+"px"; 
    newDiv.style.left              = x+"px";
    newDiv.style.textAlign         = "left";
    newDiv.style.fontSize          = this.txtSize+"px";
    newDiv.style.color             = this.txtColor;
    if( txtColor !== null){
            newDiv.style.color = txtColor;
    }
    if( BGcolor !== null){
            newDiv.style.backgroundColor = BGcolor;
    }
    if( callback !== null ){
        newDiv.onclick = () => {
                                    if( typeof callback === 'function'){
                                        callback();
                                    }
                                    else if( typeof callback === 'string'){
                                        console.log(callback)
                                        eval(callback);
                                    }
                                    else{
                                        eval(this.callbackToString(callback));
                                    }
                               };
    }
    document.body.appendChild(newDiv);
    newDiv.innerHTML = txt;
    return this;
}
MenuThis.prototype.textXY = function(txt ,x ,y , callback = null, BGcolor = null, txtColor = null) { 
    this.text(txt ,x ,y , callback, BGcolor, txtColor)
    return this;
}
MenuThis.prototype.textXR = function(txt ,x ,y , callback = null, BGcolor = null, txtColor = null) { 
   var newDiv = document.createElement("div");
    newDiv.id                      = this.Id;
    newDiv.style.position          = "absolute";
    newDiv.style.top               = y+"px"; 
    newDiv.style.left              = x+"px";
    newDiv.style.textAlign         = "left";
    newDiv.style.fontSize          = this.txtSize+"px";
    newDiv.style.color             = this.txtColor;
        if( txtColor !== null){
            newDiv.style.color = txtColor;
    }
    if( BGcolor !== null){
            newDiv.style.backgroundColor = this.BGcolor;
    }
    if( callback !== null ){
        newDiv.onclick = () => {    this.clear();
                                    if( this.onRemove ){
                                        this.onRemove();
                                    }
                                    if( typeof callback === 'function'){
                                        callback();
                                    }
                                    else if( typeof callback === 'string'){
                                        console.log(callback)
                                        eval(callback);
                                    }
                                    else{
                                        eval(this.callbackToString(callback));
                                    }
                               };
    }
    else{
        newDiv.onclick = () => {    this.clear();
                                    if( this.onRemove ){
                                        this.onRemove();
                                    }
                              };
    }
    document.body.appendChild(newDiv);
    newDiv.innerHTML = txt;
    return this;
}
MenuThis.prototype.btnR = function(boxName, x , y , callback, boxSizeX, boxSizeY = boxSizeX, ruleStr = ""){
   let cv = new Canvas(x,y).createDeadCanvas( boxSizeX, boxSizeY, this.Id )
   var treeB = new Rule(0,0,0, cv.canvas);
   treeB.canvas.orgin.setXY(0,0)
   treeB.canvas.flatX();
   treeB.ruleStr=ruleStr;
   if(this.BGcolor){
      treeB.canvas.setColor(this.BGcolor).rectXY(0,0,boxSizeX,boxSizeY);
   }
   xyPoint = treeB.canvas.toXYZ((boxSizeX/2),(boxSizeY/2));
   treeB.rule(xyPoint.x,xyPoint.y,xyPoint.z,treeB.ruleStr,boxSizeX/4,1, cv.canvas); 
   this.btnDivR(boxName,callback,x,y,boxSizeX,boxSizeY);

   return this;
}
MenuThis.prototype.btn = function(boxName, x , y, callback, boxSizeX, boxSizeY = boxSizeX, ruleStr = ""){
   let cv = new Canvas(x,y).createDeadCanvas( boxSizeX, boxSizeY, this.Id )
   var treeB = new Rule(0,0,0, cv.canvas);
   treeB.canvas.orgin.setXY(0,0)
   treeB.canvas.flatX();
   treeB.ruleStr=ruleStr;
   if(this.BGcolor){
      treeB.canvas.setColor(this.BGcolor).rectXY(0,0,boxSizeX,boxSizeY);
   }
   xyPoint = treeB.canvas.toXYZ((boxSizeX/2),(boxSizeY/2));
   treeB.rule(xyPoint.x,xyPoint.y,xyPoint.z,treeB.ruleStr,boxSizeX/4,1, cv.canvas); 
   this.btnDiv(boxName,callback,x,y,boxSizeX,boxSizeY);
   return this;
}



