let blobs = [];
let mainBlob;

function setup() {
    createCanvas(windowWidth, windowHeight).parent('container');

    const radius = 50;
    const xPos = windowWidth / 2 - radius;
    const yPos = windowHeight / 2 - radius;
    mainBlob = new Blob(xPos, yPos, radius);
    mainBlob.isMainBlob = true;

    for (let i = 0; i < 10; i++) {
        generateRandomBlob();
    }
}

function draw() {
    for (const blob of blobs) {
        blob.draw();
    }
    countCursorDistance();
}

function countCursorDistance() {
    mainBlob.unDraw();

    const xPos = mouseX - mainBlob.x;
    const yPos = mouseY - mainBlob.y;
    const distVector = createVector(xPos, yPos);
    distVector.normalize();
    distVector.mult(3);
    mainBlob.move(distVector.x, distVector.y);

    for (let blob of blobs) {
        if (!mainBlob.isIntersect(blob)) {
            continue;
        }
        blob.unDraw();
        removeElementFromArray(blobs, blob);
        mainBlob.grow();
        generateRandomBlob();
    }

    mainBlob.draw();
}

function generateRandomBlob() {
    const radius = 30;
    const xPos = random(radius, windowWidth - radius);
    const yPos = random(radius, windowHeight - radius);
    const blob = new Blob(xPos, yPos, radius);
    blob.draw();
    blobs.push(blob);
}

function removeElementFromArray(array, element) {
    array.splice(array.indexOf(element), 1);
}