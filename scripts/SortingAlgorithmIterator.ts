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
  |
    {
      action :'HOVER_ELEMENT',
      index:number
    }
  |
    {
      action :'DEHOVER_ELEMENT',
      index:number
    }
  | {
      action: 'FINISHED';
    };

export interface SortingAlgorithmIterator<T extends Record<string,number> = Record<string,number>> {
  nextStep(): void;
  getActions(): SortAction[];
  getStatusMessage() : string;
  getPointers(): T
}
