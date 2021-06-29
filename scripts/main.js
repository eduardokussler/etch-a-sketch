let gridSize = 32;
const sketchboard = document.querySelector('#sketchboard');
const body = document.querySelector('body');
let erase = false;

sketchboard.style.display = 'grid';
sketchboard.style.width = '100vw';
sketchboard.style.height = '100vh';
sketchboard.style.margin = 0;
sketchboard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr`;
sketchboard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

sketchboard.addEventListener('click', () => {
  erase = !erase;
});

function createDivsGrid() {
  let divs = new Array(gridSize);
  for(let i = 0; i < divs.length; i++){
    divs[i] = new Array(gridSize);
  }
  return divs;
}

function createDivs() {
  let divs = createDivsGrid();
  for(let i = 0; i < divs.length; i++) {
    for(let j = 0; j < divs[0].length; j++) {
      divs[i][j] = document.createElement('div');
    }
  }
  return divs;
}

function appendToSketchboard(divGrid) {
  for(let i = 0; i < divGrid.length; i++) {
    for(let j = 0; j < divGrid[0].length; j++) {
      sketchboard.appendChild(divGrid[i][j]);
    }
  }
}

function alterClassDivs(divs, className) {
  for(let i = 0; i < divs.length; i++) {
    for(let j = 0; j < divs[0].length; j++) {
      divs[i][j].classList.add(className);
    }
  }
}

function addOnHoverEventListener(divs) {
    for(let i = 0; i < divs.length; i++) {
      for(let j = 0; j < divs[0].length; j++) {
          divs[i][j].addEventListener('mouseover', (e) => {
            if(erase) {
              e.target.classList.remove('selected');
            } else {
              e.target.classList.add('selected');
            }
          });
      }
    }
}

function addClickEventListener(divs) {
  for(let i = 0; i < divs.length; i++) {
    for(let j = 0; j < divs[0].length; j++) {
      divs[i][j].addEventListener('click', (e) => {
        e.target.classList.toggle('selected');
      })
    }
  }
}

function removeSelected(divs) {
  for(let i = 0; i < divs.length; i++) {
    for(let j = 0; j < divs[0].length; j++) {
      divs[i][j].classList.remove('selected');
    }
  }
}

function changeSize() {
  let newSize = Number.parseInt(prompt('Size: '));
  if(newSize < 16 || newSize === NaN) {
    newSize = 16;
  }
  if(newSize > 150) {
    newSize = 150;
  }
  gridSize = newSize;
  resetSketchBoard();
}

function removeCurrentDivs() {
  while(sketchboard.firstChild) {
    sketchboard.removeChild(sketchboard.lastChild);
  }
}

function resetSketchBoard() {
  let divs = createDivs();
  removeCurrentDivs();
  alterClassDivs(divs, 'box')
  removeSelected(divs);
  appendToSketchboard(divs);
  addClickEventListener(divs);
  addOnHoverEventListener(divs);
}


let button = document.createElement('button');
button.innerText = 'Change gridsize';
button.onclick = changeSize;
body.appendChild(button);
resetSketchBoard(32);