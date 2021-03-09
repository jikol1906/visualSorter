import { SortingAlgorithmIterator } from './SortingAlgorithmIterator';
import { SortingBase } from './SortingBase';

export class SelectionSort extends SortingBase {
  private currMinValue: number;

  constructor(arr: number[]) {
    super(arr, { j: 1, i: 0 });
    this.currMinValue = 0;
    this.statusMessage = 'Initialize two pointers "let i = 0" and "let j = i+1".'
  }

  public nextStep() {
    this.actions = [];
    
    if (!this.didFinish) {
      if (this.arr[this.pointers.j] < this.arr[this.currMinValue]) {
        this.markNewMinimumValue();
      } else if (this.pointers.j === this.arr.length - 1) {
        this.doSwap();
        if (this.pointers.i !== this.arr.length - 2) {
          this.startNewRound();
        } else {
          this.finish();
        }
      } else {
        this.incrementJ();
      }
    }
  }

  private finish() {
    this.statusMessage = 'Finished';
    this.actions.push({
      action: 'FINISHED',
    });
    this.didFinish = true;
  }

  private markNewMinimumValue() {
    this.statusMessage = `mark ${
      this.arr[this.pointers.j]
    } as new current minimum value`;
    this.currMinValue = this.pointers.j;
    this.actions.push({
      action: 'MARK_AS_MINIMUM',
      index: this.pointers.j,
    });
  }

  private doSwap() {
    if (this.currMinValue !== this.pointers.i) {
      this.statusMessage = `swapping ${this.arr[this.pointers.i]} and ${
        this.arr[this.currMinValue]
      } and incrementing i`;
      this.actions.push({
        action: 'SWAP',
        indexOne: this.currMinValue,
        indexTwo: this.pointers.i,
      });
      this.swap(this.pointers.i, this.currMinValue);
    } else {
      this.statusMessage = `No swaps. ${
        this.arr[this.pointers.i]
      } is already sorted`;
    }
  }

  private incrementJ() {
    this.pointers.j++;
    this.statusMessage = 'Incrementing j...';
    this.actions.push({
      action: 'MOVE_POINTER',
      pointer: 'j',
      index: this.pointers.j,
    });
  }

  private startNewRound() {
    this.pointers.i++;
    this.pointers.j = this.pointers.i + 1;
    this.currMinValue = this.pointers.i;

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
}
