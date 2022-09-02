import { NumberTicket } from "./models/numbersTicket";
import { Euro, Ticket } from "./models/ticket";

export const SERVER_ADDRESS = "http://localhost:3000";

export const STARTING_BALANCE: Euro = 1000;

export const INPUT_DEBOUNCE: number = 200;

export const MIN_MATCH_LENGTH: number = 90;
export const MAX_MATCH_LENGTH: number = 100;
export const MAX_NUM_GOALS: number = 4;
export const MATCH_MINUTE_INTERVAL: number = 100;

export const NUMBERS_TICKET_PRICE: number = 20;
export const NUMBERS_MIN_RANGE: number = 1;
export const NUMBERS_MAX_RANGE: number = 10;
export const NUMBERS_DRAW_INTERVAL: number = 200;
export const NUMBERS_DRAW_COUNT: number = 5;
export const NUMBERS_SUM: number = 50;
export const NUMBERS_JACKPOT: Euro = 10000;

export const PLAYER = {
  balance: STARTING_BALANCE,
};

export const TICKET: Ticket = {
  matches: [],
  odd: 1,
  stake: 0,
  win: true,
};

export const NUMBERS_TICKET: NumberTicket = {
  less: false,
  pairOdd: 1,
  pairEven: 2,
  lessOrGreaterWin: false,
  pairWin: false,
};
