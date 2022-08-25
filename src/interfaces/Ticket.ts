import { Match } from "./Match";

export class Ticket {
    matches: Match[];
    odd: number;
    stake: number;
    win: number;
    constructor(){
        this.matches = [];
        this.odd = 1;
        this.stake = 0;
        this.win = 0;
    }
}