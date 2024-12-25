var timerId;

var listsize

var dz;

var Nx, Ny;

var list;
var start,conf;
var nameA="Start", nameB="Stop";

var cnv,ctx;
var A;

// Initial disrtibution of cells
function init(B){
    var i,j,p;
    p=list.value;
    for(i=0; i<B.length;i++){
        for(j=0; j<B[i].length;j++){
            if (Math.random()<p){
                B[i][j]=1 }
            else {
                B[i][j]=0  
            } 
        }
    }
}
// calc of neighbor cells
function getState(B,i,j){
    var im,ip,jm,jp,r
    if (i>0){
        im=i-1
    } else {
        im=B.length - 1
    }

    if (i<B.length -1 ){
        ip=i+1
    } else {
        ip=0
    }

    if (j > 0){
        jm=j-1
    } else {
        jm=B[i].length-1
    }
    
    if (j<B[i].length -1 ){
        jp=j+1
    } else {
        jp=0
    }
    r = B[i][jm] + B[i][jp] + B[im][j] + B[ip][j] + B[im][jm] + B[ip][jp] + B[im][jp] + B[ip][jm]

    return r
}

// new configation
function recalc(B) {

var nbs;
var C = new Array(Ny);

for(var i=0; i < C.length; i++){
    C[i]= new Array(Nx)}

for( i=0; i < C.length; i++){
    for( j=0; j < C[i].length; j++){
       nbs=getState(B,i,j)
       
        if (B[i][j] == 0) {
            if (nbs == 3){
                C[i][j]=1
            }  else {
                C[i][j]=0
            }
        } 
        else {
            if ((nbs == 2) || (nbs == 3)){
                C[i][j]=1
            } 
            else {
                C[i][j]=0
            }
        }
    }
}

return C;
}

// show of pic
function show(B){
    ctx.clearRect(0,0,cnv.width,cnv.height)
    ctx.fillStyle=document.getElementById("color").value
    for(i=0; i<B.length;i++){
        for(j=0; j<B[i].length;j++){
            if (B[i][j]==1){
                ctx.fillRect(dz*j,dz*i,dz,dz)
            }
        }
    }
}

// new configuration calculation
function showNext(){
    A=recalc(A);
    show(A)
}
//generation of initioal configuration
function config(){
    init(A)
    show(A)
}

window.onload=function(){
    cnv=document.getElementById("mycanvas")

    listsize=document.getElementById("sizelist")
    listsize.disabled=false
    var index1=1
    listsize.selectedIndex = index1
    dz=listsize.value

    Nx=Math.floor(window.innerWidth/dz)
    Ny=Math.floor(window.innerHeight/dz)
    
    cnv.width=Nx*dz;
    cnv.height=Ny*dz;
    document.getElementById("myform").style.width=cnv.width-10+"px"
    ctx=cnv.getContext("2d")
    conf=document.getElementById("conf")
    conf.disabled=false
    start=document.getElementById("start")
    start.value=nameA
    list=document.getElementById("prob")
    message = document.getElementById("message");
    list.disabled=false
    var index=1
    list.selectedIndex = index

    A = new Array(Ny)
    for(var k=0;k<A.length;k++){
        A[k]=new Array(Nx);
    }


    config();
    conf.onclick = function() {
        dz=listsize.value
        Nx=Math.floor(window.innerWidth/dz)
        Ny=Math.floor(window.innerHeight/dz)
        A = new Array(Ny)
        for(var k=0;k<A.length;k++){
        A[k]=new Array(Nx);
        }
        config()
    }

    list.onchange=conf.onclick
    listsize.onchange=conf.onclick

    start.onclick=function(){
        if(this.value==nameA) {
            dz=listsize.value
           // Nx=Math.floor(window.innerWidth/dz)
           // Ny=Math.floor(window.innerHeight/dz)
            list.disabled=true
            listsize.disabled=true
            conf.disabled=true
            this.value="done"
            timerId=setInterval(showNext,100)
        } else {
            list.disabled=false
            listsize.disabled=false
            conf.disabled=false
            this.value=nameA
            clearInterval(timerId)
        }
    }  
}