
let windowWidth;
let windowHeight;

let scrollY =0;
let relativeScrollY =0;
let totalScrollHeight =0;
let currentScene =0;

let prevDuration =0;
let pixelDuration =0;

let mouseX, mouseY;



let aniKeyFrames =[
    {//logo out
        aniVal:{
            opacity:[1,0],
            logoMove:[0, -100]
        }
    },
    {//city1 out 
        aniVal:{
            imgMoveRight:[(window.innerWidth*0.1), (window.innerWidth+(window.innerWidth*0.2))]
        }
    },
    {//city2 out
        aniVal:{
            imgMoveLeft:[0,-(window.innerWidth*0.5)]
        }
    },
    {//city3 out
        aniVal:{
            imgMoveRight:[-(window.innerWidth*0.4), window.innerWidth*0.6]
        }
    },
    {//city4
        aniVal:{
            opacity:[1,0],
            imgMoveDown:[0, window.innerWidth*0.5625],
            imgMoveRight:[0,window.innerWidth*0.5]
        }
    },
    {//city5
        aniVal:{
            opacity:[1,0],
            imgMoveDown:[0,window.innerWidth*0.5625],
            imgMoveLeft:[0,-(window.innerWidth*0.5)]
        }
    },
    {//cityTOJungle
        aniVal:{
            imgMoveUp:[window.innerWidth*0.5625,0]
        }
    },
    {//jungle1
        aniVal:{
            imgMoveRight:[window.innerWidth,0],
            imgMoveLeft:[-(window.innerWidth),0]
        }
    },
    {//jungle2
        aniVal:{
            opacity:[0,1],
            imgMoveDown:[(window.innerWidth*0.6),0],
            imgMoveLeft:[-(window.innerWidth),0]
        }
    },
    {//jungle3
        aniVal:{
            imgMoveRight:[-(window.innerWidth*0.2),window.innerWidth*1.2]
        }
    },
    {//jungle4
        aniVal:{
            imgMoveRight:[window.innerWidth,0],
            imgMoveLeft:[-(window.innerWidth),0]
        }
    },
    {//jungle5
        aniVal:{
            imgMoveRight:[-(window.innerWidth*0.6), window.innerWidth*0.55]
        }
    },
    {//jungle6
        aniVal:{
            opacity:[1,0],
            imgMoveDown:[(window.innerWidth*0.6),0],
            imgMoveLeft:[-(window.innerWidth),0],
            imgMoveRight:[window.innerWidth*0.55,-(window.innerWidth*0.4)]
        }
    },
    {//jungle7
        aniVal:{
            imgMoveRight:[-(window.innerWidth*0.8), (window.innerWidth*0.6)],
            imgMoveLeft:[window.innerWidth*0.8,-(window.innerWidth*0.6)]
        }
    },
    {//jungle8
        aniVal:{
            imgMoveRight:[window.innerWidth,0],
            imgMoveLeft:[-(window.innerWidth),0]
        }
    },
    {//jungleToSea
        aniVal:{
            imgMoveUp:[window.innerWidth*0.5625,0],
            imgMoveUp2:[0,-(window.innerWidth*0.5625)],
            imgMoveRight:[-(window.innerWidth*0.2), window.innerWidth*0.4]
        }
    },
    {//Seain
        aniVal:{
            imgMoveUp:[window.innerWidth*0.5625,0],
            imgMoveUp2:[0,-(window.innerWidth*0.5625)]
        }
    },
    {//Sea1
        aniVal:{
            imgMoveRight:[-(window.innerWidth*0.8),0],
            opacity:[0,1], 
            imgMoveDown:[0,0]       
        }
    },
    {//Sea2
        aniVal:{
            imgMoveUp:[window.innerWidth*0.6, -(window.innerWidth*0.8)],  
            imgMoveRight:[-(window.innerWidth*0.4),window.innerWidth*0.8]
        }
    },
    {//Sea3
        aniVal:{
            imgMoveLeft:[window.innerWidth*0.8,0],
            opacity:[0,1], 
            imgMoveDown:[0,0]   
        }
    },
    {//Sea5-1
        aniVal:{
            opacity:[0,1], 
            imgMoveDown:[0,0]
        }
    },
    {//Sea5-2
        aniVal:{
            opacity:[0,1], 
            imgMoveDown:[0,0]
        }
    }
]
//console.log(aniKeyFrames[1]);

let elbody = document.body;

function init()
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    
    render();
    resizeHandler();
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);
}

function scrollHandler()
{
    
    scrollY = window.pageYOffset;
    //console.log(scrollY);

    if(scrollY < 0 || scrollY > (totalScrollHeight - windowHeight))
    {
        return;
    }
    if(scrollY > pixelDuration + prevDuration)
    {
        prevDuration += pixelDuration;
        currentScene++;
    }
    else if(scrollY < prevDuration)
    {
        currentScene--;
        prevDuration -= pixelDuration;
    }

    relativeScrollY = scrollY - prevDuration;

    render(currentScene);
    //console.log(currentScene);
}

function resizeHandler()
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    
    totalScrollHeight =0;
    pixelDuration = windowHeight * 0.5;

    for(let i=0; i<aniKeyFrames.length; i++)
    {
        totalScrollHeight += pixelDuration;
    }

    totalScrollHeight += windowHeight;

    elbody.style.height = totalScrollHeight + 'px';
    
}

function render(nowState)
{
    let targetElem = document.querySelectorAll('.contents');
    

    switch(nowState)
    {
        case 0 :{
            //logo
            let opacityVal, logoMoveVal;
            let scrollAniElem = targetElem[0].querySelectorAll('.sa');
            opacityVal = calcAni(aniKeyFrames[0].aniVal.opacity);
            logoMoveVal = calcAni(aniKeyFrames[0].aniVal.logoMove);

            scrollAniElem[0].style.opacity=opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + logoMoveVal + 'px)';

            
        }break;
        case 1 :{
            let moveRightVal1, moveRightVal2;
            let scrollAniElem = targetElem[1].querySelectorAll('.sa');
            moveRightVal1 = calcAni(aniKeyFrames[1].aniVal.imgMoveRight);
            moveRightVal2 = calcAni(aniKeyFrames[1].aniVal.imgMoveRight)+calcAni(aniKeyFrames[1].aniVal.imgMoveRight)*0.2;

            scrollAniElem[0].style.transform="translateX("+moveRightVal1+"px)";
            scrollAniElem[1].style.transform="translateX("+moveRightVal1+"px)";
            //console.log(scrollAniElem[1]);
            scrollAniElem[2].style.transform="translateX("+moveRightVal2+"px)";
            scrollAniElem[3].style.transform="translateX("+moveRightVal2+"px)";

            
        }break;
        case 2 :{

            let moveLeftVal;
            let scrollAniElem = targetElem[2].querySelectorAll('.sa');
            moveLeftVal = calcAni(aniKeyFrames[2].aniVal.imgMoveLeft);

            scrollAniElem[0].style.transform="translateX("+moveLeftVal+"px)";
        }break;
        case 3 :{

            let moveRightVal;
            let scrollAniElem = targetElem[3].querySelectorAll('.sa');
            moveRightVal = calcAni(aniKeyFrames[3].aniVal.imgMoveRight);

            scrollAniElem[0].style.transform="translateX("+moveRightVal+"px)";
            scrollAniElem[1].style.transform="translateX("+moveRightVal+"px)";
        }break;
        case 4 :{

            let moveRightVal, moveDownVal, opacityVal;
            let scrollAniElem = targetElem[4].querySelectorAll('.sa');
            moveRightVal = calcAni(aniKeyFrames[4].aniVal.imgMoveRight);
            moveDownVal = calcAni(aniKeyFrames[4].aniVal.imgMoveDown);
            opacityVal = calcAni(aniKeyFrames[4].aniVal.opacity);

            scrollAniElem[0].style.opacity=opacityVal;
            scrollAniElem[0].style.transform='translateY('+moveDownVal+"px)";
            scrollAniElem[1].style.opacity=opacityVal;
            scrollAniElem[1].style.transform='translateY('+moveDownVal+"px)";
            scrollAniElem[2].style.transform='translateX('+moveRightVal+"px)";
            
        }break;
        case 5 :{

            let moveLeftVal, moveDownVal, opacityVal;
            let scrollAniElem = targetElem[5].querySelectorAll('.sa');
            let scrollAniElem2 = targetElem[3].querySelectorAll('.sa');
            moveLeftVal = calcAni(aniKeyFrames[5].aniVal.imgMoveLeft);
            moveDownVal = calcAni(aniKeyFrames[5].aniVal.imgMoveDown);
            opacityVal = calcAni(aniKeyFrames[5].aniVal.opacity);

            scrollAniElem[0].style.opacity=opacityVal;
            scrollAniElem[0].style.transform='translateY('+moveDownVal+"px)";
            scrollAniElem[1].style.opacity=opacityVal;
            scrollAniElem[1].style.transform='translateY('+moveDownVal+"px)";
            scrollAniElem[2].style.opacity=opacityVal;
            scrollAniElem[2].style.transform='translateY('+moveDownVal+"px)";
            scrollAniElem2[0].style.opacity=opacityVal;
            scrollAniElem2[0].style.transform='translateY('+moveDownVal+"px)";
            scrollAniElem2[1].style.transform='translateY('+moveDownVal+"px)";
            scrollAniElem[3].style.transform='translateX('+moveLeftVal+"px)";
            
        }break;
        case 6:{
            let moveUpVal;
            let scrollAniElem = targetElem[6].querySelectorAll('.sa');
            moveUpVal = calcAni(aniKeyFrames[6].aniVal.imgMoveUp);
            scrollAniElem[1].style.transform='translateY('+moveUpVal+"px)";
        }break;
        case 7:{//jungle1
            let moveLeftVal, moveRightVal;
            let scrollAniElem = targetElem[7].querySelectorAll('.sa');
            moveLeftVal = calcAni(aniKeyFrames[7].aniVal.imgMoveLeft);
            moveRightVal = calcAni(aniKeyFrames[7].aniVal.imgMoveRight);

            scrollAniElem[0].style.transform='translateX('+moveRightVal+"px)";
            scrollAniElem[1].style.transform='translateX('+moveRightVal+"px)";
            scrollAniElem[2].style.transform='translateX('+moveLeftVal+"px)";
            scrollAniElem[3].style.transform='translateX('+moveRightVal+"px)";
            scrollAniElem[4].style.transform='translateX('+moveRightVal+"px)";
            scrollAniElem[5].style.transform='translateX('+moveRightVal+"px)";
        }break;
        case 8:{
            let opacityVal, moveLeftVal, moveDownVal;
            let scrollAniElem=targetElem[8].querySelectorAll('.sa');
            opacityVal = calcAni(aniKeyFrames[8].aniVal.opacity);
            moveDownVal = calcAni(aniKeyFrames[8].aniVal.imgMoveDown);
            moveLeftVal=calcAni(aniKeyFrames[8].aniVal.imgMoveLeft);

            scrollAniElem[0].style.opacity=opacityVal;
            scrollAniElem[0].style.transform='translateY('+moveDownVal+'px)';
            scrollAniElem[1].style.transform='translateX('+moveLeftVal+'px)';
        }break;
        case 9:{
            let moveRightVal;
            let scrollAniElem = targetElem[9].querySelectorAll('.sa');
            moveRightVal=calcAni(aniKeyFrames[9].aniVal.imgMoveRight);

            scrollAniElem[0].style.transform='translateX('+moveRightVal+'px)';
            scrollAniElem[1].style.transform='translateX('+moveRightVal+'px)';
        }break;
        case 10:{
            let moveLeftVal, moveRightVal;
            let scrollAniElem = targetElem[10].querySelectorAll('.sa');
            moveLeftVal = calcAni(aniKeyFrames[10].aniVal.imgMoveLeft);
            moveRightVal = calcAni(aniKeyFrames[10].aniVal.imgMoveRight);

            scrollAniElem[0].style.transform='translateX('+moveRightVal+"px)";
            scrollAniElem[1].style.transform='translateX('+moveLeftVal+"px)";
        }break;
        case 11 :{

            let moveRightVal;
            let scrollAniElem = targetElem[11].querySelectorAll('.sa');
            moveRightVal = calcAni(aniKeyFrames[11].aniVal.imgMoveRight);

            scrollAniElem[0].style.transform="translateX("+moveRightVal+"px)";
            scrollAniElem[1].style.transform="translateX("+moveRightVal+"px)";
        }break;
        case 12:{
            let opacityVal, moveLeftVal, moveDownVal, moveRightVal;
            let scrollAniElem=targetElem[12].querySelectorAll('.sa');
            opacityVal = calcAni(aniKeyFrames[12].aniVal.opacity);
            moveDownVal = calcAni(aniKeyFrames[12].aniVal.imgMoveDown);
            moveLeftVal=calcAni(aniKeyFrames[12].aniVal.imgMoveLeft);

            scrollAniElem[2].style.opacity=opacityVal;
            scrollAniElem[2].style.transform='translateY('+moveDownVal+'px)';
            scrollAniElem[1].style.transform='translateX('+moveLeftVal+'px)';
            scrollAniElem[0].style.transform='translateX('+moveLeftVal+'px)';

            
        }break;
        case 14:{
            let  moveLeftVal, moveRightVal;
            let scrollAniElem=targetElem[13].querySelectorAll('.sa');
            moveRightVal = calcAni(aniKeyFrames[13].aniVal.imgMoveRight);
            moveLeftVal=calcAni(aniKeyFrames[13].aniVal.imgMoveLeft);

            scrollAniElem[0].style.transform='translateX('+moveLeftVal+'px)';
            scrollAniElem[1].style.transform='translateX('+moveLeftVal+'px)';
            scrollAniElem[2].style.transform='translateX('+moveRightVal+'px)';
            scrollAniElem[3].style.transform='translateX('+moveRightVal+'px)';
        }break;
        case 13:{
            let moveLeftVal, moveRightVal, moveRightVal2;
            let scrollAniElem2 = targetElem[11].querySelectorAll('.sa');
            let scrollAniElem = targetElem[14].querySelectorAll('.sa');
            moveLeftVal = calcAni(aniKeyFrames[14].aniVal.imgMoveLeft);
            moveRightVal = calcAni(aniKeyFrames[14].aniVal.imgMoveRight);
            moveRightVal2 = calcAni(aniKeyFrames[12].aniVal.imgMoveRight);

            scrollAniElem[0].style.transform='translateX('+moveRightVal+"px)";
            scrollAniElem[1].style.transform='translateX('+moveLeftVal+"px)";

            scrollAniElem2[0].style.transform="translateX("+moveRightVal2+"px)";
            scrollAniElem2[1].style.transform="translateX("+moveRightVal2+"px)";
        }break;
        case 15:{
            let moveRightVal, moveUpVal, moveUpVal2;
            let scrollAniElem = targetElem[15].querySelectorAll('.sa');
            moveRightVal = calcAni(aniKeyFrames[15].aniVal.imgMoveRight);
            moveUpVal= calcAni(aniKeyFrames[15].aniVal.imgMoveUp);
            moveUpVal2= calcAni(aniKeyFrames[15].aniVal.imgMoveUp2);

            scrollAniElem[0].style.transform='translateY('+moveUpVal+"px)";
            scrollAniElem[1].style.transform='translateY('+moveUpVal+"px)";
            scrollAniElem[2].style.transform='translateX('+moveRightVal+"px)";
            scrollAniElem[3].style.transform='translateX('+moveRightVal+"px)";

            targetElem[6].style.transform='translateY('+moveUpVal2+"px)";
            targetElem[7].style.transform='translateY('+moveUpVal2+"px)";
            targetElem[8].style.transform='translateY('+moveUpVal2+"px)";
            targetElem[9].style.transform='translateY('+moveUpVal2+"px)";
            targetElem[10].style.transform='translateY('+moveUpVal2+"px)";
            targetElem[11].style.transform='translateY('+moveUpVal2+"px)";
            targetElem[12].style.transform='translateY('+moveUpVal2+"px)";
            targetElem[13].style.transform='translateY('+moveUpVal2+"px)";
            targetElem[14].style.transform='translateY('+moveUpVal2+"px)";
        }break;
        case 16:{
            let moveUpVal, moveUpVal2;
            let scrollAniElem = targetElem[15].querySelectorAll('.sa');
            moveUpVal= calcAni(aniKeyFrames[16].aniVal.imgMoveUp);
            moveUpVal2= calcAni(aniKeyFrames[16].aniVal.imgMoveUp2);

            scrollAniElem[1].style.transform='translateY('+moveUpVal2+"px)";
            scrollAniElem[2].style.transform='translateX(40vw) translateY('+moveUpVal2+"px)";
            scrollAniElem[3].style.transform='translateX(40vw) translateY('+moveUpVal2+"px)";

            targetElem[20].style.transform='translateY('+moveUpVal+"px)";
        }break;
        case 17:{
            let moveRightVal, opacityVal;
            let scrollAniElem = targetElem[17].querySelectorAll('.sa');
            moveRightVal= calcAni(aniKeyFrames[17].aniVal.imgMoveRight);
            opacityVal= calcAni(aniKeyFrames[17].aniVal.opacity);

            scrollAniElem[0].style.transform='translateX('+moveRightVal+'px)';
            scrollAniElem[1].style.transform='translateX('+moveRightVal+'px)';
            scrollAniElem[2].style.opacity=opacityVal;

        }break;
        case 18:{
            let moveUpVal, moveRightVal;
            let scrollAniElem = targetElem[18].querySelectorAll('.sa');
            moveUpVal= calcAni(aniKeyFrames[18].aniVal.imgMoveUp);
            moveRightVal = calcAni(aniKeyFrames[18].aniVal.imgMoveRight);

            scrollAniElem[0].style.transform='translateX('+moveRightVal+'px) translateY('+moveUpVal+'px)';
            scrollAniElem[1].style.transform='translateX('+moveRightVal+'px) translateY('+moveUpVal+'px)';

        }break;
        case 19:{
            let moveLeftVal, opacityVal;
            let scrollAniElem = targetElem[19].querySelectorAll('.sa');
            moveLeftVal = calcAni(aniKeyFrames[19].aniVal.imgMoveLeft);
            opacityVal = calcAni(aniKeyFrames[19].aniVal.opacity);

            scrollAniElem[0].style.transform='translateX('+moveLeftVal+'px)';
            scrollAniElem[1].style.opacity=opacityVal;

        }break;
        case 20:{

        }break;
        case 21:{
            let  opacityVal;
            let scrollAniElem = targetElem[21].querySelectorAll('.sa');
            opacityVal = calcAni(aniKeyFrames[21].aniVal.opacity);

            scrollAniElem[0].style.opacity=opacityVal;
            scrollAniElem[1].style.opacity=opacityVal;
            
            if(scrollAniElem[1].style.opacity>=0.9)
            {
                scrollAniElem[0].style.display = 'block';
            }
            else{
                scrollAniElem[0].style.display = 'none';
            }

            //console.log(opacityVal);

        }break;
    }
}

function calcAni(value)
{
    return( relativeScrollY / pixelDuration ) * (value[1] - value[0]) +value[0] ;
}

let animal = document.querySelectorAll('.animal');
let info = document.querySelectorAll('.info');

function roadAnimal(num, mouseX, mouseY) {

    if (animal[num]) {
        let animalRect = animal[num].getBoundingClientRect();
        let animalTop = animalRect.top;
        let animalLeft = animalRect.left;
        let animalWidth = animalRect.width;
        let animalHeight = animalRect.height;

        if (mouseX >= animalLeft && mouseX <= animalLeft + animalWidth &&
            mouseY >= animalTop && mouseY <= animalTop + animalHeight) {
                info[num].style.opacity = 1;
                
        } else {
            info[num].style.opacity = 0;
        }
    } else {
        //console.log('Invalid index:', num);
    }
}

document.addEventListener('mousemove',function(event)
{
    mouseX = event.clientX;
    mouseY = event.clientY;
    for(let i=0; i < animal.length; i++)
    {
        roadAnimal(i, mouseX, mouseY);
    }
})

init();
ready();

function ready()
{
    let targetElem = document.querySelectorAll('.contents');
    let readyRight, readyLeft, readyDown,  readyUp;

            for(let i =0; i<targetElem.length; i++)
            {
                readyRight = targetElem[i].querySelectorAll('.moveRight');
                readyLeft = targetElem[i].querySelectorAll('.moveLeft');
                readyDown = targetElem[i].querySelectorAll('.moveDown');
                readyUp = targetElem[i].querySelectorAll('.moveUp');
                for(let r=0; r<readyRight.length; r++)
                {
                    readyRight[r].style.transform = 'translateX(' + aniKeyFrames[i].aniVal.imgMoveRight[0] + 'px)';
                }
                for(let l=0; l<readyLeft.length; l++)
                {
                    readyLeft[l].style.transform = 'translateX(' + aniKeyFrames[i].aniVal.imgMoveLeft[0] + 'px)';
                }
                for(let d=0; d<readyDown.length; d++)
                {
                    readyDown[d].style.transform = 'translateY(' + aniKeyFrames[i].aniVal.imgMoveDown[0] + 'px)';
                    readyDown[d].style.opacity =0;
                }
                for(let u=0; u<readyUp.length; u++)
                {
                    readyUp[u].style.transform = 'translateY(' + aniKeyFrames[i].aniVal.imgMoveUp[0] + 'px)';
                }
                
            }
            targetElem[20].style.transform='translateY(56.25vw)';
            
}

