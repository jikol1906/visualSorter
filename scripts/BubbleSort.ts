import { SortingBase } from './SortingBase';

export class BubbleSort extends SortingBase<{i:number,j:number}> {

    constructor(arr:number[]) {
        super(arr,{i:1,j:arr.length});
        this.statusMessage = 'Initialize two pointers "let i = 0" and "let j = arr.length"';
    }
    
    nextStep() {
        if(this.pointers.j === 1) {this.finish()}
        this.actions = [];
        if(!this.didFinish) {
            this.statusMessage = '';
            if(this.arr[this.pointers.i - 1] > this.arr[this.pointers.i]) {
              this.statusMessage += `${this.arr[this.pointers.i - 1]} > ${this.arr[this.pointers.i]} swapping. `
                this.doSwap();
            }
    
            if(this.pointers.i < this.pointers.j - 1) {
                this.incrementPointer("i")
            } else {
                this.statusMessage += 'Starting new round..';
                this.startNewRound()
            }
        }
        
    }

    private startNewRound() {
        this.pointers.i = 0;
        this.pointers.j--;
        
    
        this.actions.push({
          action: 'MOVE_POINTER',
          pointer: 'i',
          index: this.pointers.i,
        });
        this.actions.push({
          action: 'MOVE_POINTER',
          pointer: 'j',
          index: this.pointers.j,
        });
      }
      
    private doSwap() {
        this.swap(this.pointers.i - 1, this.pointers.i);
    }
}