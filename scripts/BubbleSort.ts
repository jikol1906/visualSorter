import { SortAction, SortingAlgorithmIterator } from './SortingAlgorithmIterator';
import { SortingBase } from './SortingBase';

export class BubbleSort extends SortingBase {

    readonly pointers:{i:number,j:number}

    constructor(arr:number[]) {
        super(arr);
        this.pointers = {i:1,j:arr.length}
        this.statusMessage = 'Initialize i';
    }
    
    nextStep() {
        if(this.pointers.j === 1) {this.finish()}
        this.actions = [];
        if(!this.didFinish) {
            if(this.arr[this.pointers.i - 1] > this.arr[this.pointers.i]) {
                this.doSwap();
            }
    
            if(this.pointers.i < this.pointers.j - 1) {
                this.incrementI()
            } else {
                this.startNewRound()
            }
        }
        
    }

    getPointers()  {
        return this.pointers;
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

    private incrementI() {
        this.pointers.i++;
        this.statusMessage = 'Incrementing i...';
        this.actions.push({
          action: 'MOVE_POINTER',
          pointer: 'i',
          index: this.pointers.i,
        });
      }

    private doSwap() {
        this.swap(this.pointers.i - 1, this.pointers.i);
    }
}