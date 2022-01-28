import { SortAction, SortingAlgorithmIterator } from './SortingAlgorithmIterator';
import { SortingBase } from './SortingBase';

export class BubbleSort extends SortingBase {

    constructor(arr:number[]) {
        super(arr,{j:1,i:arr.length-1});
        
    }
    
    nextStep() {
        if(this.arr[this.pointers.i - 1] > this.arr[this.pointers.i]) {
            this.doSwap();
        }

        
    }




    private doSwap() {
        this.swap(this.pointers.i - 1, this.pointers.i);
    }
}