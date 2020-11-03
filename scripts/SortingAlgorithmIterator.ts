export type SortAction =
  | {
      action: 'SWAP';
      indexOne: number;
      indexTwo: number;
    }
  | {
      action: 'MOVE_POINTER';
      pointer: string;
      index: number;
    }
  | {
      action: 'MARK_AS_MINIMUM';
      index: number;
    }
  | {
      action: 'FINISHED';
    };

export interface SortingAlgorithmIterator {
  nextStep(): void;
  getActions(): SortAction[];
  getStatusMessage() : string;
  getPointers(): {[pointerName:string]:number}
}
