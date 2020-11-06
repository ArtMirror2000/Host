var grid = new Array(50);
for (var i = 0; i < 50; i++) {
  grid[i] = new Array(50);
}

var alt_set = [];
var route_set = [];
var goal_reached = false;
var currentx = 0;
var currenty = 0;
var ycounter =0;

function Spot(i, j) {
  this.closed = false;
  this.block = false;
  this.x = (i * 10) + 5;
  this.y = (j * 10) + 5;
  this.show = function(col) {
    strokeWeight(1);
    fill(col);
    //noFill();
    square(i * 10, j * 10, 10);
  }
  this.neighbours = [];
  this.distances = [];
  this.slopes = [];
////////////////////////////////
  
  for (var nx = -1; nx < 2; nx++) {
    for (var ny = -1; ny < 2; ny++) {

      var v1 = createVector(495, 155, 0);
      var v2 = createVector(this.x + (nx * 10), this.y + (ny * 10), 0);
      this.neighbours.push(v2);

      this.distances.push(v1.dist(v2));
      
      var slope = (155-(this.y + (ny * 10))) / (495-(this.x + (nx * 10))); 
    // var slope =  (495-(this.x + (nx * 10))) / (155-(this.y + (ny * 10))) ;
    //   var slope =  (495-(this.y + (ny * 10))) / (155-(this.x + (nx * 10))) ;
    //  var slope = (155-(this.x + (nx * 10))) / (495-(this.y + (ny * 10))); 
      //if(slope==0){slope++;}

      //if(slope==0){slope++;}
      this.slopes.push(slope);
      
      //  console.log(this.distances);

    }
  }

  


  ///////////////////////////////
}//spot

//////////////////////////////////////\

function lowestValueAndKey(obj) {
  var [lowestItems] = Object.entries(obj).sort(([, v1], [, v2]) => v1 - v2);
  //return `Lowest value is ${lowestItems[1]}, with a key of ${lowestItems[0]}`;
  return lowestItems[0];
}

//////////////////////////////////////

function setup() {
  createCanvas(500, 500);
  //frameRate(1);


  for (var i = 0; i < 50; i++) {
    for (var j = 0; j < 50; j++) {
      grid[i][j] = new Spot(i, j);
      if (i == 0 && j == 0) {
        route_set[i] = new Spot(i, j);
      }
      if (i == 19 && j == 19) {
        grid[i][j].block = true;
      }
      if (i == 40 && j == 40) {
        grid[i][j].block = true;
      }
      if (i == 40 && j == 39) {        grid[i][j].block = true;      }
      //if (i == 40 && j == 41) {        grid[i][j].block = true;      }
     if (i == 40 && j == 13) {        grid[i][j].block = true;      }
         if (i == 40 && j == 12) {        grid[i][j].block = true;      }



      
    }
  }

 // noLoop();
  //console.log(grid);


} //setup




function draw() {



  for (var i = 0; i < 50; i++) {
    for (var j = 0; j < 50; j++) {

      if (grid[i][j].closed == true) {
        grid[i][j].show('rgba(255, 0, 0, 1)')
      }
      if (grid[i][j].closed == false) {
        grid[i][j].show('rgba(0, 255, 0, 1)')
      }
      if (grid[i][j].block == true) {
        grid[i][j].show('rgba(0, 0, 0, 1)')
      } else {
        grid[i][j].show('rgba(0, 0, 255, 1)');
      }
    }
  }

  for (var i = 0; i < route_set.length; i++) {
    if (route_set[i]) {
      route_set[i].show('rgba(0, 255, 0, 1)');
    }
  }

  for (var i = 0; i < alt_set.length; i++) {
    if (alt_set[i]) {
      alt_set[i].show('rgba(255, 0, 0, 1)');
    }
  }

  ///////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  //console.log(grid[0][0].neighbours[8].x)



  if (goal_reached == false) {

    var lowestdist = lowestValueAndKey(grid[currentx][currenty].distances);
    var lowestslope = lowestValueAndKey(grid[currentx][currenty].slopes);    
    console.log(`The lowest slope is: ${lowestslope}`);
    lowestslope = 4;
console.log(`The used slope ${lowestslope} is: ${grid[currentx][currenty].slopes[4]}`);
   
    
    var lowx = grid[currentx][currenty].neighbours[lowestdist].x;
    var lowy = grid[currentx][currenty].neighbours[lowestdist].y;
   // console.log(lowx);
    //console.log(route_set);
    
     var pathy = (1*grid[currentx][currenty].slopes[lowestslope])*grid[currentx][currenty].x;
    console.log(`pathy:${pathy} - lowy:${grid[currentx][currenty].y} and x: ${grid[currentx][currenty].x}`);
    
  if(pathy <= (lowy*1)){lowy = grid[currentx][currenty].neighbours[lowestslope+3].y;}
    else {lowy = grid[currentx][currenty].neighbours[lowestslope+4].y;}
    
    
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////

    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
        
 if (grid[i][j].x == lowx && grid[i][j].y == lowy && grid[i][j].block == false) {
          currentx = i;
          currenty = j;
          route_set.push(grid[i][j]);
               // console.log(grid[0][0].x);console.log(grid[0][0].y);
           //console.log(grid[i][j].slopes);
          // console.log(grid[i][j].distances);
          // console.log(grid[i][j].y);  console.log(lowy);     
          // console.log(grid[i][j].x); console.log(lowx); 
   
          if (lowx == 495 && lowy == 155) {
            goal_reached = true;console.log(route_set);
          }

        }


if (grid[i][j].x == lowx && grid[i][j].y == lowy && grid[i][j].block == true && grid[i][j+1].block == false) {
          j++;
          if (grid[i][j].block == false) {
            currentx = i;
            currenty = j;
            route_set.push(grid[i - 1][j - 1]);

            route_set.push(grid[i][j]);
            if (lowx == 495 && lowy == 155) {
              goal_reached = true;console.log(route_set);
            }
          }
        }//if
        
if (grid[i][j].x == lowx && grid[i][j].y == lowy && grid[i][j].block == true) {
         if(i<49){   
           //j--;
           i++; console.log('hello');
          if (grid[i][j].block == false) {
            currentx = i;
            currenty = j;
            route_set.push(grid[i - 1][j - 1]);

            route_set.push(grid[i][j]);
            if (lowx == 495 && lowy == 155) {
              goal_reached = true; console.log(route_set);
            }
          }
}//49
}//2nd if




      } //for j
    } //for i


    //console.log(route_set);
    //console.log(currentx);console.log(currenty);

  } // goal reached

} //draw