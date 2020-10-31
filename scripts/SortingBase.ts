import $ from 'jquery';

export class SortingBase {
  protected container: JQuery<HTMLElement>;
  protected arr: number[];
  private transitionTime: number;
  private width: number;
  private margin: number;
  private canSwap: boolean = true;

  constructor(
    container: JQuery<HTMLElement>,
    transitionTime: number,
    width: number,
    margin: number
  ) {
    this.container = container;
    this.transitionTime = transitionTime;
    this.width = width;
    this.margin = margin;
    this.arr = [];
  }

  public initialize() {
    this.container.css('--elem-width', `${this.width}px`);
  }

  public genNewArr(): void {
    const arrayContainer = this.container.children().first();
    arrayContainer.empty();

    for (let i = 0; i < 10; i++) {
      const num = Math.ceil(Math.random() * 130 + 20);

      this.arr.push(num);

      arrayContainer.append(
        $('<div>', {
          class: 'elem',
          id: i,
          css: {
            '--elem-height': `${(num / 150) * 100}%`,
            '--elem-width': `${this.width}px`,
            transition: `transform ${this.transitionTime}s linear`,

            margin: `0 ${this.margin}px`,
          },
        }).text(num)
      );
    }
  }

  public swap(i: number, j: number) {
    if (this.canSwap) {
      this.canSwap = false;
      this.swapInArr(i, j);
      this.swapInUI(i, j);
      setTimeout(() => {
        this.canSwap = true;
      }, this.transitionTime * 1000);
    }
  }

  private swapInArr(i: number, j: number) {
    const temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }

  private swapInUI(i: number, j: number) {
    const leftElemIndex = Math.min(i, j);
    const rightElemIndex = Math.max(i, j);

    const left = $(`#${leftElemIndex}`);
    const right = $(`#${rightElemIndex}`);

    this.moveElem(left, rightElemIndex - leftElemIndex);
    this.moveElem(right, leftElemIndex - rightElemIndex);

    left.attr('id', rightElemIndex);
    right.attr('id', leftElemIndex);
  }

  private moveElem(elm: JQuery<HTMLElement>, stepsToMove: number) {
    const distanceToMove = stepsToMove * (this.width + this.margin * 2);
    const currTransformVal = this.getCurrTransformVal(elm);
    elm.css('transform', `translateX(${currTransformVal + distanceToMove}px)`);
  }

  private getCurrTransformVal(elm: JQuery<HTMLElement>) {
    const matrix = elm.css('transform');
    if (matrix === 'none') return 0;
    return +matrix.split(',')[4];
  }
}
