import { SortingBase } from "./SortingBase";

export class InsertionSort extends SortingBase<{ i: number }> {
  private elemHovered = false;
  private hoveredElemIndex: number;

  constructor(arr: number[]) {
    super(arr, { i: 1 });
    this.statusMessage = 'Initialize one pointer "let i = 0"';
  }

  nextStep(): void {
    this.actions = [];
    if(!this.didFinish) {
        if (this.elemHovered) {
          if (this.arr[this.hoveredElemIndex] < this.arr[this.hoveredElemIndex - 1]) {
            this.swap(this.hoveredElemIndex, this.hoveredElemIndex - 1);
            this.hoveredElemIndex--;
          } else if(this.hoveredElemIndex === 0 || this.arr[this.hoveredElemIndex] >= this.arr[this.hoveredElemIndex - 1]) {
            this.actions.push({
                action:'DEHOVER_ELEMENT',
                index:this.hoveredElemIndex
            })
            this.statusMessage = `correct spot found for ${this.arr[this.hoveredElemIndex]}`
            this.elemHovered = false;
          }      
        } else if (this.arr[this.pointers.i] < this.arr[this.pointers.i - 1]) {
          this.actions.push({
            action: "HOVER_ELEMENT",
            index: this.pointers.i,
          });
          this.statusMessage = `Finding correct spot for elem ${this.arr[this.pointers.i]}`
          this.hoveredElemIndex = this.pointers.i;
          this.elemHovered = true;
        } else {
            this.statusMessage = "";
            if(this.pointers.i < this.arr.length-1) {
                this.incrementPointer("i"); 
            } else {this.finish()}
        }
    }

  }
}
