import { SortingAlgorithmIterator } from './SortingAlgorithmIterator';
import { SelectionSort } from './SelectionSort';
import '../styles/styles.scss';
import $ from 'jquery';

const arrayContainer = $('.array__container');
const button = $('#gen');
const statusmessage = $('#statusmessage');
let canSwap = true;
let arr: number[] = [];
genNewArr();

let ss: SortingAlgorithmIterator = new SelectionSort(arr);

movePointer('i', 0);
movePointer('j', 1);

button.on('click', () => {
  doNextStep();
});



function genNewArr(): void {
  arr = [];
  arrayContainer.empty();

  for (let i = 0; i < 10; i++) {
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



function reset() {
  genNewArr();
  ss = new SelectionSort(arr);

  movePointer('i', 0);
  movePointer('j', 1);
}

// $('.array__elem').each(i => {
//   console.log(i);
//   console.log($(this));

//   $(this).css({
//     // animation:'jump 1s ease-in-out;',
//     // 'animation-delay':i+'s'
//     background:'red'
//   })
// })

// $('.array__elem').each(function (index) {
//   $(this).css({
//     animation: `jump 2s ease-in-out infinite`,
//     'animation-delay': index * 0.05 + 's',
//   });
// });

function doNextStep() {
  ss.nextStep();
  statusmessage.text(ss.getStatusMessage());
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
        swap(s.indexOne, s.indexTwo);
        break;
      case 'FINISHED':
        // reset();
    }
  });
}

// const id = setInterval(() => {
//   doNextStep();
// }, 200);
