import { SortAction, SortingAlgorithmIterator } from './SortingAlgorithmIterator';
import { SortingBase } from './SortingBase';

export class BubbleSort extends SortingBase implements SortingAlgorithmIterator {

    constructor(arr:number[]) {
        super(arr);
    }
    
    nextStep(): void {
        
    }
    getActions(): SortAction[] {
        throw new Error('Method not implemented.');
    }


}