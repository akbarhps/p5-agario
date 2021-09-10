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
    for (const blob of blobs) {
        blob.x += planeOffsetX;
        blob.y += planeOffsetY;

        if(blob.isOutOfView()) {
            moveBlobToRandomCoordinate(blob);
        }
        if (mainBlob.isIntersect(blob)) {
            moveBlobToRandomCoordinate(blob);
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

function moveBlobToRandomCoordinate(blob) {
    blob.x = random(blob.radius, windowWidth - blob.radius);
    blob.y = random(blob.radius, windowHeight - blob.radius);
}