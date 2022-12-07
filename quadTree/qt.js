class Point{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
    }
}

class Boundary {
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    contains(point){
        return (point.x >= this.x &&
            point.x <= this.x + this.width &&
            point.y >= this.y &&
            point.y <= this.y + this.height
            );
    }
}

class QuadTree {
    constructor(x, y, width, height, capacity){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.capacity = capacity;
        this.points = [];
        this.isDivided = false;
    }
    
    contains(point){
        return (point.x >= this.x &&
            point.x <= this.x + this.width &&
            point.y >= this.y &&
            point.y <= this.y + this.height
            );
    }

    intersect(range){
        let p1 = new Point(range.x,range.y);
        let p2 = new Point(range.x + range.width, range.y);
        let p3 = new Point(range.x + range.width,range.y + range.height);
        let p4 = new Point(range.x,range.y + range.height);

        let p5 = new Point(this.x,this.y);
        let p6 = new Point(this.x + this.width, this.y);
        let p7 = new Point(this.x + this.width,this.y + this.height);
        let p8 = new Point(this.x,this.y + this.height);

        return ( this.contains(p1) || 
        this.contains(p2) || 
        this.contains(p3) || 
        this.contains(p4) ||
        range.contains(p5) ||
        range.contains(p6) ||
        range.contains(p7) ||
        range.contains(p8)
        );
    }

    subDivide(){
         
        this.nw = new QuadTree(this.x,this.y,this.width / 2,this.height / 2,this.capacity);
        this.ne = new QuadTree(this.x + (this.width / 2),this.y,this.width / 2,this.height / 2,this.capacity);
        this.sw = new QuadTree(this.x,this.y + (this.height / 2),this.width / 2,this.height / 2,this.capacity);
        this.se = new QuadTree(this.x + (this.width / 2),this.y + (this.height / 2),this.width / 2,this.height / 2,this.capacity);
        this.isDivided = true;
    }

    insert(point){

        if (!this.contains(point)){
            return false;
        }

        if (!(this.points.length >= 4)){
            this.points.push(point);
            return true;
        } else {
            if(!this.isDivided){
                this.subDivide();
            }
            if (this.nw.insert(point)){
                return true;
            } else if (this.ne.insert(point)){
                return true;
            } else if (this.sw.insert(point)){
                return true;
            } else if (this.se.insert(point)){
                return true;
            }
        }
    }

    query(range,arr){
        if(!arr){
            arr = [];
        }
        if(!this.intersect(range)){
            return;
        } else {
            for ( let p of this.points){
                if(range.contains(p)){
                    arr.push(p);
                }
            }
            if(this.isDivided){
                this.nw.query(range, arr);
                this.ne.query(range, arr);
                this.sw.query(range, arr);
                this.se.query(range, arr);
            }
        }
        return arr;
    }

    show() {
        c.beginPath();
        c.rect(this.x,this.y,this.width, this.height);
        c.stroke();
        for (let p of this.points){
            c.beginPath();
            c.arc(p.x,p.y,p.r,0,Math.PI*2);
            c.stroke();
        }
        if(this.isDivided){
            this.nw.show();
            this.ne.show();
            this.sw.show();
            this.se.show();
        }
    }
}

var qt = new QuadTree(0,0,canvas.width,canvas.height,4);
for(let i=0; i < 500; i++){
    let dot = new Point(Math.random()*qt.width, Math.random()*qt.height,3);
    qt.insert(dot);
}

qt.show();


for(let i = 0; i < qt.points.length; i++){
    for(let j=0; j<qt.points.length;j++){
        if (i == j){
            continue;
        }
        if( Math.sqrt(Math.pow(qt.points[i].x - qt.points[j].x, 2) + Math.pow(qt.points[i].y - qt.points[j].y, 2)) < qt.points[i].r + qt.points[j].r ){
            c.beginPath();
            c.arc(qt.points[i].x,qt.points[i].y,qt.points[i].r,0,Math.PI * 2);
            c.fillStyle = 'red';
            c.fill();
            c.beginPath();
            c.arc(qt.points[j].x,qt.points[j].y,qt.points[j].r,0,Math.PI * 2);
            c.fillStyle = 'red';
            c.fill();
        }
    }
}

/* 
var range = new Boundary(Math.random()*canvas.width,Math.random()*canvas.height,200,200);

c.beginPath();
c.rect(range.x, range.y,range.width,range.height);
c.strokeStyle = 'red';
c.stroke();

var points = qt.query(range, points);
const radius = 2


for (let p of points){
    c.beginPath();
    c.arc(p.x,p.y,p.r,0,Math.PI * 2);
    c.fillStyle = 'red';
    c.fill();
}

console.log(points); */