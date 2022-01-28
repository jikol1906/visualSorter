import { SortAction, SortingAlgorithmIterator } from './SortingAlgorithmIterator';
import { SortingBase } from './SortingBase';

export class BubbleSort extends SortingBase {

    readonly pointers:{i:number,j:number}

    constructor(arr:number[]) {
        super(arr);
        this.pointers = {i:1,j:arr.length}
    }
    
    nextStep() {
        if(this.arr[this.pointers.i - 1] > this.arr[this.pointers.i]) {
            this.doSwap();
        }

        
    }

    getPointers()  {
        return this.pointers;
    }



    private doSwap() {
        this.swap(this.pointers.i - 1, this.pointers.i);
    }
}