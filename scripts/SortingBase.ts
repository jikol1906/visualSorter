import {
  SortAction,
  SortingAlgorithmIterator,
} from './SortingAlgorithmIterator';
import $ from 'jquery';

export abstract class SortingBase implements SortingAlgorithmIterator {
  protected statusMessage: string;
  protected actions: SortAction[];
  protected didFinish : boolean;
  constructor(
    protected arr: number[],
    protected readonly pointers: { [index: string]: number },
  ) {
    this.actions = [];
    this.didFinish = false;
  }

  abstract nextStep(): void;

  protected swap(i: number, j: number) {
    const temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }

  public getPointers() {
    return this.pointers;
  }

  public getStatusMessage() {
    return this.statusMessage;
  }

  public getActions() {
    return this.actions;
  }
}
