import {
  SortAction,
  SortingAlgorithmIterator,
} from './SortingAlgorithmIterator';
import { SortingBase } from './SortingBase';

export class SelectionSort
  extends SortingBase
  implements SortingAlgorithmIterator {
  private actions: SortAction[];


  private currMinValue: number;

  constructor(arr: number[]) {
    super(arr);
    this.i = 0;
    this.j = 1;
    this.currMinValue = 0;
    this.actions = [];
  }

  public getActions() {
    return this.actions;
  }

  public nextStep() {
    this.actions = [];

    if (this.arr[this.j] < this.arr[this.currMinValue]) {
      this.markNewMinimumValue();
    } else if (this.j === this.arr.length - 1) {
      this.doSwap();
      if (this.i !== this.arr.length - 2) {
        this.startNewRound();
      } else {
        this.finish();
      }
    } else {
      this.incrementJ();
    }
  }

  private finish() {
    this.statusMessage = 'Finished';
    this.actions.push({
      action: 'FINISHED',
    });
  }

  private markNewMinimumValue() {
    this.statusMessage = `mark ${
      this.arr[this.j]
    } as new current minimum value`;
    this.currMinValue = this.j;
    this.actions.push({
      action: 'MARK_AS_MINIMUM',
      index: this.j,
    });
  }

  private doSwap() {
    if (this.currMinValue !== this.i) {
      this.statusMessage = `swapping ${this.arr[this.i]} and ${
        this.arr[this.currMinValue]
      }`;
      this.actions.push({
        action: 'SWAP',
        indexOne: this.currMinValue,
        indexTwo: this.i,
      });
      this.swap(this.i, this.currMinValue);
    } else {
      this.statusMessage = `No swaps. ${this.arr[this.i]} is already sorted`;
    }
  }

  private incrementJ() {
    this.j++;
    this.statusMessage = 'Incrementing j...';
    this.actions.push({
      action: 'MOVE_POINTER',
      pointer: 'j',
      index: this.j,
    });
  }

  private startNewRound() {
    this.i++;
    this.j = this.i + 1;
    this.currMinValue = this.i;

    this.actions.push({
      action: 'MOVE_POINTER',
      pointer: 'i',
      index: this.i,
    });
    this.actions.push({
      action: 'MOVE_POINTER',
      pointer: 'j',
      index: this.j,
    });
  }
}
