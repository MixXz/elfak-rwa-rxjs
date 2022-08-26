import { debounceTime, fromEvent, map } from "rxjs";
import { Match } from "../interfaces/Match";
import { Ticket } from "../interfaces/Ticket";
import { drawChosenMatch } from "../view/drawFunctions";
import { simulateMinutes } from "./matchTableLogic";

let ticket = new Ticket();

export function addMatch(host: HTMLElement, match: Match, outcome: string) {
  match.outcome = outcome;
  ticket.odd = Number((ticket.odd * getOdd(match)).toFixed(2));
  ticket.matches.push(match);

  drawChosenMatch(host, match, outcome);

  const oddLabel = document.querySelector(".odd-label");
  oddLabel.innerHTML = `Odd: ${ticket.odd}`;
  
  const winLabel = document.querySelector(".win-label");
  winLabel.innerHTML = `Win: ${
    ticket.stake === 0
      ? 0
      : Number((ticket.odd * Number(ticket.stake)).toFixed(2))
  } €`;
}

export function getStake() {
  const stakeInput = document.querySelector(".stake-input");
  fromEvent(stakeInput, "input")
    .pipe(
      debounceTime(200),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value)
    )
    .subscribe((stake) => {
      ticket.stake = Number(stake);
      const winLabel = document.querySelector(".win-label");
      winLabel.innerHTML = `Win: ${
        stake === "" || ticket.odd === 1
          ? 0
          : Number((ticket.odd * Number(stake)).toFixed(2))
      } €`;
    });
}

export function startSimulation(){
  ticket.matches.forEach(match => simulateMinutes(match));
}


function getOdd(match: Match): number {
  switch (match.outcome) {
    case "1":
      return match.homeTeamOdd;
    case "2":
      return match.guestTeamOdd;
    case "X":
      return match.tiedOdd;
    default:
      break;
  }
}
