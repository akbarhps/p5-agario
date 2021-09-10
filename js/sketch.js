let planeOffsetX = 0;
let planeOffsetY = 0;

let blobs = [];
let mainBlob;

function setup() {
    createCanvas(windowWidth, windowHeight).parent('container');

    let radius = 50;
    let xPos = windowWidth / 2 - radius;
    let yPos = windowHeight / 2 - radius;
    mainBlob = new Blob(xPos, yPos, radius);
    mainBlob.isMainBlob = true;

    radius = 30;
    for (let i = 0; i < 20; i++) {
        xPos = random(radius, windowWidth - radius);
        yPos = random(radius, windowHeight - radius);
        blobs.push(new Blob(xPos, yPos, radius));
    }
}

function draw() {
    background(0);
    countCursorDistance();
    console.log(planeOffsetX, planeOffsetY);
    for (const blob of blobs) {
        blob.x += planeOffsetX;
        blob.y += planeOffsetY;

        if (blob.isOutOfView()) {
            moveBlobBasedOnOffset(blob);
        }

        if (mainBlob.isIntersect(blob)) {
            moveBlobBasedOnOffset(blob);
            mainBlob.grow();
        }

        blob.draw();
    }
    mainBlob.draw();
}

function countCursorDistance() {
    const xPos = mouseX - mainBlob.x;
    const yPos = mouseY - mainBlob.y;
    const distVector = createVector(xPos, yPos);
    distVector.normalize();
    distVector.mult(3);
    planeOffsetX = distVector.x * -1;
    planeOffsetY = distVector.y * -1;
}

function moveBlobBasedOnOffset(blob) {
    if (planeOffsetY > 0 && planeOffsetX > 0) {
        // generate random to left top
        if (random(0, 100) > 50) {
            blob.x = 0;
            blob.y = random(0, windowHeight / 2);
        } else {
            blob.x = random(0, windowWidth / 2);
            blob.y = 0;
        }
    } else if (planeOffsetY < 0 && planeOffsetX > 0) {
        // generate random to left side
        blob.x = random(0, windowWidth - blob.radius);
        blob.y = windowHeight;
    } else if (planeOffsetY > 0 && planeOffsetX < 0) {
        // generate random to right side
        blob.x = windowWidth;
        blob.y = random(0, windowHeight - blob.radius);
    } else {
        // generate random to bottom right
        if (random(0, 100) > 50) {
            blob.x = windowWidth;
            blob.y = random(windowHeight / 2, windowHeight);
        } else {
            blob.x = random(windowWidth / 2, windowWidth);
            blob.y = windowHeight;
        }
    }
}