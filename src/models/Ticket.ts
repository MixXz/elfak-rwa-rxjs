import { Match } from "./Match";

export type Euro = number;

export interface Ticket {
  matches: Match[];
  odd: number;
  stake: Euro;
  win: boolean;
}
