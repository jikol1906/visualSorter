import { SortingBase } from './SortingBase';
import $ from 'jquery';

export class SelectionSort extends SortingBase {
  private i: number;
  private j: number;

  constructor(
    container: JQuery<HTMLElement>,
    transitionTime: number,
    width: number,
    margin: number,
    
  ) {
    super(container, transitionTime, width, margin);
  }

  

  public nextStep(): void {
        
  }
}
