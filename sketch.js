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
    for (let i =0; i <cols; i++){
      grid[j][i]= { a: random(255), b: random(255)}
    }
  }
}


function showGrid(){
  
  for (let j =0; j < rows; j++){
    for (let i =0; i <cols; i++){
      fill(grid[j][i].a,grid[j][i].b,0)
      rect(i*sz,j*sz,sz,sz)
    }
  }
  
}


function diffuse(){
  
  next =[]
  for (let j =0; j < rows; j++){
    next[j]= [];
    for (let i =0; i <cols; i++){
      let a = grid[j][i].a
      let b = grid[j][i].b
      let va =  a + 
                (dA * laplaceA()) -
                (a * b *b) +
                (feed *(1-a));

      let vb = b + 
                (dB * laplaceB()) +
                (a * b *b) -
                ((k + feed)*b);
       
      next[j][i] = { a: va, b:vb }
    }
  }
  swap();
}


function laplaceA(){
    return 1;
}

function laplaceB(){
    return 1;
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