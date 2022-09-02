import { Match } from "./match";

export type Euro = number;

export interface Ticket {
  matches: Match[];
  odd: number;
  stake: Euro;
  win: boolean;
}
