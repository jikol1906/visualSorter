import { SortAction, SortingAlgorithmIterator } from './SortingAlgorithmIterator';
import $ from 'jquery';

type Pointers = {[index:string]: number}

export abstract class SortingBase {  
  
  protected statusMessage: string;
  protected i: number;
  protected j: number;

  constructor(protected arr: number[]) {}

  protected swap(i: number, j: number) {
    const temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }

  public getStatusMessage() {
    return this.statusMessage;
  }
  
  

}
