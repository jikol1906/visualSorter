import { SelectionSort } from './SelectionSort';
import '../styles/styles.scss';
import $ from 'jquery';

const arrayContainer = $('.array__container');
const button = $('#gen');




button.on('click', () => {

  doNextStep();
});

let canSwap = true;
let arr : number[] = [];



function genNewArr(): void {
  
  arrayContainer.empty();

  for (let i = 0; i < 10; i++) {
    const num = Math.ceil(Math.random() * 130 + 20);

    arr.push(num);

    arrayContainer.append(
      $('<div>', {
        class: 'array__elem movable',
        id: i,
        css: {
          'height': `${(num / 150) * 100}%`,
          '--offset':0
        },
      }).text(num)
    );
  }
}

genNewArr();

function swap(i: number, j: number) {

  if (canSwap) {
    canSwap = false;
    swapInArr(i, j);
    swapInUI(i, j);
    setTimeout(() => {
      canSwap = true;
    }, .7 * 1000);
  }
  
}

function swapInArr(i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function swapInUI(i: number, j: number) {
  const leftElemIndex = Math.min(i, j);
  const rightElemIndex = Math.max(i, j);

  const left = $(`#${leftElemIndex}`);
  const right = $(`#${rightElemIndex}`);

  moveElem(left, rightElemIndex - leftElemIndex);
  moveElem(right, leftElemIndex - rightElemIndex);

  left.attr('id', rightElemIndex);
  right.attr('id', leftElemIndex);
}

function moveElem(elm: JQuery<HTMLElement>, stepsToMove: number) {
  const currentStepsMoved = parseInt(elm.css('--offset'));
  elm.css('--offset', stepsToMove + currentStepsMoved);
}

function movePointer(p: 'i' | 'j',steps:number) {
  const pointer = $(`#${p}`);
  const currentStepsMoved = pointer.css('--offset') || 0
  pointer.css('--offset',+currentStepsMoved+steps)
}

let tg = 0;

function doNextStep() {
  switch(tg) {
    case 0:
      movePointer('i',1);
      tg++;
      break;
    case 1:
      swap(0,1);
      tg++
      break;
    case 2:
      movePointer('j',4);
      tg++
      break;
    case 3:
      movePointer('j',-2);
      tg++
      break;
    case 4:
      movePointer('j',-2);
      tg++
      break;
  }
}


