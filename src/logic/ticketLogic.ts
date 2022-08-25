import { Match } from "../interfaces/Match";
import { Ticket } from "../interfaces/Ticket";
import { drawChosenMatch } from "../view/drawFunctions";

let ticket = new Ticket();

export function addMatch(host: HTMLElement, match: Match, outcome: string) {
  match.outcome = outcome;
  ticket.odd = Number((ticket.odd * getOdd(match)).toFixed(2));
  ticket.matches.push(match);

  drawChosenMatch(host, match, outcome);
  const oddLabel = document.querySelector(".odd-label");
  oddLabel.innerHTML = `Odd: ${ticket.odd}`;
  console.log(ticket);
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
