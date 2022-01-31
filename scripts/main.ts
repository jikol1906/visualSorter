import { BubbleSort } from './BubbleSort';
import { SortingAlgorithmIterator } from './SortingAlgorithmIterator';
import { SelectionSort } from './SelectionSort';
import '../styles/styles.scss';
import {algorithms,Algorithm} from './types'
import $ from 'jquery';
import { InsertionSort } from './InsertionSort';

const swapAnimationTime = +$(':root')
  .css('--swap-animation-time')
  .replace('s', '');

let interval: NodeJS.Timer;
const arrayContainer = $('.array__container');
const nextStepButton = $('#next-step');
const newArrayButton = $('#new');
const algoButtons = $("#algorithm-buttons");
const autoButton = $('#auto');
const statusmessage = $('#statusmessage');
let isSwapping = false;
let arr: number[] = [];
let currentAlgorithm : Algorithm = 'Selection Sort';
let sortingAlgoIterator: SortingAlgorithmIterator;

algoButtons.on("click","*",(e) => {
  algoButtons.children().removeClass("active")
  $(e.target).addClass("active")
  currentAlgorithm = $(e.target).text() as Algorithm
  initialize();
})

initializeButtons();
initialize();

nextStepButton.on('click', () => {
  doNextStep();
});

newArrayButton.on('click', () => {
  initialize();
});

autoButton.on('click', () => {
  toggleAutoClick();
});

function startAutoClick() {
  autoButton.html('<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M12 6h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" fill="currentColor"/><path d="M22 6h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" fill="currentColor"/></svg>');
  interval = setInterval(() => {
    doNextStep();
  }, 400);
}

function stopAutoClick() {
  autoButton.html('<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M7 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.482-.876l20 11a1 1 0 0 1 0 1.752l-20 11A1 1 0 0 1 7 28z" fill="currentColor"/></svg>');
  clearInterval(interval);
  interval = null;
}

function toggleAutoClick() {
  if (!interval) {
    startAutoClick()
  } else {
    stopAutoClick()
  }
}

function initialize() {
  statusmessage.text('');
  stopAutoClick()
  genNewArr();

  

  switch(currentAlgorithm) {
    case 'Selection Sort':
      sortingAlgoIterator = new SelectionSort(arr);
      break;
    case 'Bubble Sort':
      sortingAlgoIterator = new BubbleSort(arr);
      break
    case 'Insertion Sort':
        sortingAlgoIterator = new InsertionSort(arr);
      break

  }
  

  statusmessage.text(sortingAlgoIterator.getStatusMessage());

  addPointers();
}


function initializeButtons() {
  let firstAppended = false;
  algorithms.forEach(a => {
    algoButtons.append(`<button class="${!firstAppended ? "active": ""}">${a}</button>`)
    firstAppended = true
  })
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
  if(!isSwapping) {
    isSwapping = true;
    const leftElemIndex = Math.min(i, j);
    const rightElemIndex = Math.max(i, j);
  
    const left = $(`#${leftElemIndex}`);
    const right = $(`#${rightElemIndex}`);

    left.css('z-index', '100');
    right.css('z-index', '100');
  
    moveElem(left, rightElemIndex - leftElemIndex);
    moveElem(right, leftElemIndex - rightElemIndex);
  
    left.attr('id', rightElemIndex);
    right.attr('id', leftElemIndex);

    setTimeout(() => {
      left.css('z-index', '1');
      right.css('z-index', '1');
      isSwapping = false;
    }, swapAnimationTime * 1000);
  }
}

function moveElem(elm: JQuery<HTMLElement>, stepsToMove: number) {
  if(!elm.children().hasClass("hovered")) {
    applyScalingAnimation(elm);
  }

  const currentStepsMoved = parseInt(elm.css('--offset')) || 0;
  elm.css('--offset', stepsToMove + currentStepsMoved);
}

function applyScalingAnimation(elm: JQuery<HTMLElement>) {

  const child = elm.children();
  child.css({
    animation: 'scaleUp ease-in-out var(--swap-animation-time)',
  });

  setTimeout(() => {
    child.css({ animation: '' });
  }, swapAnimationTime * 1000);
}

function hoverElem(index: number) {
  const child = $(`#${index}`).children();
  child.attr("data-hovered","true")
  child.addClass("hovered")

}
function deHoverElem(index: number) {
  const child = $(`#${index}`).children();
  child.removeAttr("data-hovered")
  child.removeClass("hovered")

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
        case 'HOVER_ELEMENT':
          hoverElem(s.index)
          break;
        case 'DEHOVER_ELEMENT':
          deHoverElem(s.index)
          break;
        case 'FINISHED':
          stopAutoClick();
        // reset();
      }
    });
  }
}
