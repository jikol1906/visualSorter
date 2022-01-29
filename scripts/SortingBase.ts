import {
  SortAction,
  SortingAlgorithmIterator,
} from './SortingAlgorithmIterator';


export abstract class SortingBase<T extends Record<string,number> = Record<string,number>> implements SortingAlgorithmIterator {
  protected statusMessage: string;
  protected actions: SortAction[];
  protected didFinish : boolean;
  protected pointers : T;
  constructor(
    protected arr: number[],
    pointers: T,
  ) {
    this.actions = [];
    this.pointers = pointers;
    this.didFinish = false;
  }

  abstract nextStep(): void;

  protected swap(i: number, j: number) {
    const temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;

    this.actions.push({
      action: 'SWAP',
      indexOne: i,
      indexTwo: j
  });
  }

  protected finish() {
    this.statusMessage = 'Finished';
    this.actions.push({
      action: 'FINISHED',
    });
    this.didFinish = true;
  }

  public getPointers() {
    return this.pointers
  }

  public getStatusMessage() {
    return this.statusMessage;
  }

  public getActions() {
    return this.actions;
  }
}
