import { SelectionSort } from './SelectionSort';
import '../styles/styles.scss';
import $ from 'jquery';

const arrayContainer = $('.array__container');
const button = $('#gen');
const statusmessage = $('#statusmessage');

button.on('click', () => {
  doNextStep();
});

let canSwap = true;
let arr: number[] = [];

function genNewArr(): void {
  arrayContainer.empty();

  for (let i = 0; i < 5; i++) {
    const num = Math.ceil(Math.random() * 130 + 20);

    arr.push(num);

    arrayContainer.append(
      $('<div>', {
        class: 'array__elem movable',
        id: i,
        css: {
          height: `${(num / 150) * 100}%`,
        },
      }).text(num)
    );
  }
}

function swap(i: number, j: number) {
  if (canSwap) {
    canSwap = false;
    swapInUI(i, j);
    setTimeout(() => {
      canSwap = true;
    }, 0.7 * 1000);
  }
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
  const currentStepsMoved = parseInt(elm.css('--offset')) || 0;
  elm.css('--offset', stepsToMove + currentStepsMoved);
}

function movePointer(p: 'i' | 'j', index: number) {
  const pointer = $(`#${p}`);
  pointer.css('--offset', index);
}

genNewArr();
const ss = new SelectionSort(arr);


movePointer('i', 0);
movePointer('j', 1);

function doNextStep() {
  ss.nextStep();
  statusmessage.text(ss.statusmessage);
  ss.getActions().forEach((s) => {
    switch (s.action) {
      case 'MOVE_POINTER':
        if (s.pointer === 'j') {
          movePointer('j', s.index);
        } else {
          movePointer('i', s.index);
        }
        break;
      case 'SWAP':
        swap(s.indexOne,s.indexTwo);
        break;
      case 'FINISHED':
        // clearInterval(id)
    }
  });
}

// const id = setInterval(() => {
//   doNextStep();
// },150 )


