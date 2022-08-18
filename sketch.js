let grid= [];
let next =[];

let rows;
let cols;
let sz =5;

// vars for diffusion algorithm

let dA = 1;
let dB = 0.5;
let feed = 0.055;
let k = 0.062;

function setup() {
  createCanvas(400, 400);
  rows = floor(height/sz)
  cols = floor(width/sz)
  print(rows,cols)
  noStroke();
  background(255);
  makeGrid();
  showGrid();
  print(grid)
  diffuse()
  print(grid);
}

function draw(){
  diffuse();
  showGrid();
}

function makeGrid(){
  for (let j =0; j < rows; j++){
    grid[j]= [];
    next[j] = [];
    for (let i =0; i <cols; i++){
      grid[j][i]= { a: 1, b: 0}  //  fill with a
      next[j][i]= { a: 1, b: 0}
    }
  }
  for (let n = floor(rows/2); n < floor(rows/2)+5; n++){
    for(let m = floor(cols/2); m < floor(cols/2)+5; m++){
        grid[n][m].b =1 // put in alot of b in one spot

    }
   
  }
  
}


function showGrid(){
  
  for (let j =0; j < rows; j++){
    for (let i =0; i <cols; i++){
      let clr = floor (grid[j][i].a - grid[j][i].b) *255

      clr = constrain(clr, 0,255)
      fill(clr);
      rect(i*sz,j*sz,sz,sz)
    }
  }
  
}


function diffuse(){
  
  // next already existis
  for (let j =1; j < rows-1; j++){
    for (let i =1; i <cols-1; i++){
      let a = grid[j][i].a
      let b = grid[j][i].b
      let va =  a + 
                (dA * laplaceA(j,i)) -
                (a * b *b) +
                (feed *(1-a));

      let vb = b + 
                (dB * laplaceB(j,i)) +
                (a * b *b) -
                ((k + feed)*b);
       
       //va = constrain(va, 0, 1);
       vb = constrain(vb, 0,1);
      next[j][i] = { a: va, b:vb }
    }
  }
  swap();
}


function laplaceA(y,x){
    sum = 0;

    sum += grid[y][x].a * -1; //center
    sum += grid[y+1][x].a * 0.2  //top
    sum += grid[y-1][x].a * 0.2  // bottom
    sum += grid[y][x-1].a * 0.2  // left
    sum += grid[y][x+1].a * 0.2  // right
    sum += grid[y+1][x-1].a * 0.5  //top left
    sum += grid[y-1][x-1].a * 0.5  // bottom left
    sum += grid[y+1][x+1].a * 0.5  // top right
    sum += grid[y-1][x+1].a * 0.5  //  bottom right

    return sum;
}

function laplaceB(y,x){
    sum =0;

    sum += grid[y][x].b * -1; //center
    sum += grid[y+1][x].b * 0.2  //top
    sum += grid[y-1][x].b * 0.2  // bottom
    sum += grid[y][x-1].b * 0.2  // left
    sum += grid[y][x+1].b * 0.2  // right
    sum += grid[y+1][x-1].b * 0.5  //top left
    sum += grid[y-1][x-1].b * 0.5  // bottom left
    sum += grid[y+1][x+1].b * 0.5  // top right
    sum += grid[y-1][x+1].b * 0.5  //  bottom right



    return sum;
}

function swap(){
  // deep swap
  grid = []
  for (let j =0; j < rows; j++){
    grid[j] =[]
    for (let i =0; i <cols; i++){
      grid[j][i] = next[j][i]
    }
  }
}