import { BubbleSort } from './BubbleSort';
import { SortingAlgorithmIterator } from './SortingAlgorithmIterator';
import { SelectionSort } from './SelectionSort';
import '../styles/styles.scss';
import $ from 'jquery';

const swapAnimationTime = +$(':root')
  .css('--swap-animation-time')
  .replace('s', '');

let interval: NodeJS.Timer;
const arrayContainer = $('.array__container');
const nextStepButton = $('#next-step');
const newArrayButton = $('#new');
const autoButton = $('#auto');
const statusmessage = $('#statusmessage');
let isSwapping = false;
let arr: number[] = [];
let sortingAlgoIterator: SortingAlgorithmIterator;
console.log(swapAnimationTime);

initialize();

nextStepButton.on('click', () => {
  doNextStep();
});

newArrayButton.on('click', () => {
  initialize();
});

autoButton.on('click', () => {
  if (!interval) {
    $(autoButton).text('Stop');
    interval = setInterval(() => {
      doNextStep();
    }, 200);
  } else {
    $(autoButton).text('Start');
    clearInterval(interval);
    interval = null;
  }
});

function initialize() {
  statusmessage.text('');
  genNewArr();

  sortingAlgoIterator = new SelectionSort(arr);

  statusmessage.text(sortingAlgoIterator.getStatusMessage());

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

  for (let i = 0; i < 12; i++) {
    const num = Math.ceil(Math.random() * 130 + 20);

    arr.push(num);

    const newElem = $('<div>', {
      class: 'array__elem movable',
      id: i,
      css: {
        height: `${(num / 150) * 100}%`,
      },
    }).append(`<div>${num}</div>`);

    arrayContainer.append(newElem);
  }
}

function swap(i: number, j: number) {
  if (!isSwapping) {
    isSwapping = true;
    swapInUI(i, j);
    setTimeout(() => {
      isSwapping = false;
    }, swapAnimationTime * 1000);
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
  applyScalingAnimation(elm);

  const currentStepsMoved = parseInt(elm.css('--offset')) || 0;
  elm.css('--offset', stepsToMove + currentStepsMoved);
}

function applyScalingAnimation(elm: JQuery<HTMLElement>) {
  elm.css('z-index', '100');

  const child = elm.children();
  child.css({
    animation: 'scaleUp ease-in-out var(--swap-animation-time)',
  });

  setTimeout(() => {
    child.css({ animation: '' });
    elm.css('z-index', '1');
  }, swapAnimationTime * 1000);
}

function markElem(index: number) {
  $(`#${index}`).css('background-color', 'red');
}

function movePointer(p: string, toIndex: number) {
  const pointer = $(`#${p}`);
  pointer.css('--offset', toIndex);
}

function doNextStep() {
  if (!isSwapping) {
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
        case 'MARK_AS_MINIMUM':
        // markElem(s.index)
        case 'FINISHED':
        // reset();
      }
    });
  }
}
