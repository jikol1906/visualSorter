import { BubbleSort } from './BubbleSort';
import { SortingAlgorithmIterator } from './SortingAlgorithmIterator';
import { SelectionSort } from './SelectionSort';
import '../styles/styles.scss';
import $ from 'jquery';

const arrayContainer = $('.array__container');
const nextStepButton = $('#next-step');
const newArrayButton = $('#new');
const statusmessage = $('#statusmessage');
let canSwap = true;
let arr: number[] = [];
let sortingAlgoIterator: SortingAlgorithmIterator;

initialize();

nextStepButton.on('click', () => {
  doNextStep();
});

newArrayButton.on('click', () => {
  initialize();
});

function initialize() {
  genNewArr();

  sortingAlgoIterator = new SelectionSort(arr);

  addPointers();
}

function addPointers() {
  const pointers = sortingAlgoIterator.getPointers();

  $('.array__pointers').empty();

  Object.keys(pointers).forEach((pointer) => {
    $(`<span id="${pointer}" class="movable">${pointer}</span>`).appendTo(
      '.array__pointers'
    );
    movePointer(pointer, pointers[pointer]);
  });
}

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

function movePointer(p: string, toIndex: number) {
  const pointer = $(`#${p}`);
  pointer.css('--offset', toIndex);
}

function doNextStep() {
  sortingAlgoIterator.nextStep();
  statusmessage.text(sortingAlgoIterator.getStatusMessage());
  sortingAlgoIterator.getActions().forEach((s) => {
    switch (s.action) {
      case 'MOVE_POINTER':
        movePointer(s.pointer, s.index);
        break;
      case 'SWAP':
        swap(s.indexOne, s.indexTwo);
        break;
      case 'FINISHED':
      // reset();
    }
  });
}

// 
