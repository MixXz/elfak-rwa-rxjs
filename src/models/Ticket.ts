import { Euro } from "../helper";
import { Match } from "./Match";

export class Ticket {
  matches: Match[];
  odd: number;
  stake: Euro;
  win: boolean;

  constructor() {
    this.matches = [];
    this.odd = 1;
    this.stake = 0;
    this.win = true;
  }

  reset() {
    this.matches = [];
    this.odd = 1;
    this.stake = 0;
    this.win = true;
  }
}
