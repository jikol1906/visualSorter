import {
  SortAction,
  SortingAlgorithmIterator,
} from './SortingAlgorithmIterator';


export abstract class SortingBase implements SortingAlgorithmIterator {
  protected statusMessage: string;
  protected actions: SortAction[];
  protected didFinish : boolean;
  constructor(
    protected arr: number[],
  ) {
    this.actions = [];
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

  abstract getPointers(): {[pointerName:string]:number};

  public getStatusMessage() {
    return this.statusMessage;
  }

  public getActions() {
    return this.actions;
  }
}
