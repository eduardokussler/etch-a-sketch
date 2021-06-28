const gridSize = 32;
const body = document.querySelector('body');
let erase = false;

body.style.display = 'grid';
body.style.width = '90vw';
body.style.height = '90vh';
body.style.gridTemplateColumns = `repeat(${gridSize}, 1fr`;
body.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

body.addEventListener('click', () => {
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

function appendToBody(divGrid) {
  for(let i = 0; i < divGrid.length; i++) {
    for(let j = 0; j < divGrid[0].length; j++) {
      body.appendChild(divGrid[i][j]);
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



let divs = createDivs();
alterClassDivs(divs, 'box')
appendToBody(divs);
addClickEventListener(divs);
addOnHoverEventListener(divs);
let button = document.createElement('button');
button.innerText = 'Change gridsize';
body.appendChild(button);