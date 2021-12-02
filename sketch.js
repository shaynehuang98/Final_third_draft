const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight

let carouselImages = []
let effect1Images = []
let counter = 0


//const rightArrowHeight = 100, rightArrowWidth = 100
//const rightArrowPosition = {
//    x: canvasWidth - canvasWidth/4,
//    y: canvasHeight/2 - 50,
//}

// const leftArrowHeight = 100, leftArrowWidth = 100
// const leftArrowPosition = {
//     x: canvasWidth/2 - canvasWidth/4 - 95,
//     y: canvasHeight/2 - 50,
// }

const controlCircleSize = 20
let circlePositions
let randomImagePositions
let initX = canvasWidth/2, initY = canvasHeight/2
let destinationX, destinationY
let x = initX, y = initY
let distx
let disty
let trace
let hovering = false
function preload(){
    

    for(let i = 1; i < 11; i++){
        console.log(`${i}.0.png`) 
        carouselImages.push(loadImage(`assets/img/${i}.0.png`))
    }

    for(let i = 0; i < 10; i++){
        effect1Images.push(loadImage(`assets/1/1.${i}.jpg`))
    }
}

function setup (){
    createCanvas(canvasWidth, canvasHeight)
    destinationX = random(0, canvasWidth - 10), destinationY = random(0, canvasHeight - 10)
    circlePositions = Array.from({length: carouselImages.length}, (el, i) => {
        const x = canvasWidth/3 + i * controlCircleSize
        const y = canvasHeight - canvasHeight/6
        return {
            x,y
        }
    })

    randomImagePositions = Array.from({length: effect1Images.length}, () => {
        const x = random(canvasWidth/4, canvasWidth - canvasWidth/4 - 100)
        const y = random(canvasHeight/4, canvasHeight - canvasHeight/4 - 100)
        return {
            x, y
        }
    })
}

function draw(){
    background(255)
    if(!checkHover()){
        // drawRightArrow()
        // drawLeftArrow()
        circlePositions.forEach((position, idx) => {
            stroke(0)
            if(idx === counter % carouselImages.length){
                fill(0)
            }else{
                noFill()
            }
            
            ellipse(position.x, position.y, 30)
        })
    }
    

    //instead of this if then
    // we will create a function called imageEffect and pass in the counter value

    if(counter % carouselImages.length === 0){
        if (checkHover()&&!hovering){
            hovering = true
            image(carouselImages[counter % carouselImages.length], canvasWidth/4, canvasHeight/4, canvasWidth/2, canvasHeight/2)
            effect1()
            effect2()
        }else if(!checkHover()){
            hovering = false 
            image(carouselImages[counter % carouselImages.length], canvasWidth/4, canvasHeight/4, canvasWidth/2, canvasHeight/2)
        }

    }else {
        image(carouselImages[counter % carouselImages.length], canvasWidth/4, canvasHeight/4, canvasWidth/2, canvasHeight/2)
    }
   


    //CAROUSEL
    // depending on which item there will be a different effect
}

function mousePressed(){
    checkCircles(mouseX, mouseY)
    if(mouseX > rightArrowPosition.x &&
        mouseX < rightArrowPosition.x + rightArrowWidth &&
        mouseY > rightArrowPosition.y &&
        mouseY < rightArrowPosition.y + rightArrowHeight){
            counter++
        }
    checkCircles(mouseX, mouseY)
        if(mouseX > leftArrowPosition.x &&
            mouseX < leftArrowPosition.x + rightArrowWidth &&
            mouseY > leftArrowPosition.y &&
            mouseY < leftArrowPosition.y + rightArrowHeight){
                if (counter > 0){
                    counter --
                }else{
                    counter = carouselImages.length - 1
                }
            }
}

const checkCircles = (mX, mY) => {
    circlePositions.forEach((circlePosition, idx) => {
        if(mouseX > circlePosition.x - controlCircleSize/2 &&
            mouseX < circlePosition.x + controlCircleSize/2 &&
            mouseY > circlePosition.y - controlCircleSize/2 &&
            mouseY < circlePosition.y + controlCircleSize/2){
                counter = idx
            }
    })
}


// const drawRightArrow = () => {

//     fill(130)
//     //rect(rightArrowPosition.x, rightArrowPosition.y, rightArrowHeight, rightArrowWidth)
// //     fill(0)
// //     textSize(50)
// //     text('>', rightArrowPosition.x + 30, rightArrowPosition.y + 65) 
//  }

// const drawLeftArrow = () => {
//     fill(130)
//     //rect(leftArrowPosition.x, leftArrowPosition.y, leftArrowHeight, leftArrowWidth)
// //     fill(0)
// //     textSize(50)
// //     text('<', leftArrowPosition.x + 30, leftArrowPosition.y + 65)
//  }

const imageEffect = (counter) => {
    // decide which effect to use
    switch(counter){
        case '0' : //do one thing
        case '1' : // do another thing
    }
}


const checkHover = () => {
    if(mouseX > canvasWidth/4 && 
        mouseX < canvasWidth/4 + canvasWidth/2 &&
        mouseY > canvasHeight/4 && 
        mouseY < canvasHeight/4 + canvasHeight/2){
            return true
        }else{
            return false
        }
}


const effect1  = () => {
    background(255)
    x=0
    y=0
    effect1Images.forEach((img, i) => {
        row=i/3
        col=i%3
        x=row * 100 + canvasWidth/4 + random(-canvasWidth/4, canvasWidth/4)
        y=col * 100 + canvasHeight/4 + random(-canvasHeight/4, canvasHeight/4)
        //image(carouselImages[counter], randomImagePositions[i].x, randomImagePositions[i].y, 150, 150)
        image(img, x, y, 100, 100)
        // distx= 100
        // disty= 100
        // x+=distx/10
        // y+=disty/10
    })
}



const effect2 = () => {
        trace = color(255)
        trace.setAlpha(50)
        background(trace)
        image(carouselImages[counter], x, y, 100, 100)
        distx=destinationX-x
        disty=destinationY-y
        x+=distx/10
        image(carouselImages[counter], x, y, 100, 100)
        y+=disty/10
}