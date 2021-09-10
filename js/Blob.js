class Blob {
    x = 0;
    y = 0;
    radius = 0;
    isMainBlob = false;

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    isOutOfView() {
        return this.x < 0 || this.x > windowWidth || this.y < 0 || this.y > windowHeight;
    }

    isIntersect(blob) {
        let thisR = this.radius / 2;
        let otherR = blob.radius / 2;
        let top = this.y - thisR <= blob.y - otherR;
        let left = this.x - thisR <= blob.x - otherR;
        let bottom = this.y + thisR >= blob.y + otherR;
        let right = this.x + thisR >= blob.x + otherR;
        return top && left && bottom && right;
    }

    grow() {
        this.radius += 2.5;
    }

    draw() {
        if (this.isMainBlob) {
            fill(255, 0, 0);
        } else {
            fill(255);
        }
        circle(this.x, this.y, this.radius);
    }
}