import { SortAction, SortingAlgorithmIterator } from './SortingAlgorithmIterator';
import { SortingBase } from './SortingBase';

export class BubbleSort extends SortingBase {

    constructor(arr:number[]) {
        super(arr,{i:1});
    }
    
    nextStep() {
        if(this.arr[this.pointers.i - 1] > this.arr[this.pointers.i]) {
            
        }

        
    }



}