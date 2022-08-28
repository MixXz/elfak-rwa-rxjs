export class NumberTicket {
  less: boolean;
  pairOdd: number;
  pairEven: number;
  lessOrGreaterWin: boolean;
  pairWin: boolean;

  constructor() {
    this.less = false;
    this.pairOdd = 1;
    this.pairEven = 2;
    this.lessOrGreaterWin = false;
    this.pairWin = false;
  }
}
