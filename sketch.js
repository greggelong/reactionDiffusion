let grid= [];
let next =[];

let rows;
let cols;
let sz =5;

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
      let va = grid[j][i].a+5%255
      let vb = grid[j][i].b-5%255
      next[j][i] = { a: va, b:vb }
    }
  }
  swap();
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