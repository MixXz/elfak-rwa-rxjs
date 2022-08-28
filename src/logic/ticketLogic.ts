import { debounceTime, fromEvent, map } from "rxjs";
import { BALANCE, Euro } from "../helper";
import { Match } from "../models/Match";
import { Ticket } from "../models/Ticket";
import {
  disableAllButtons,
  disableButtons,
  drawChosenMatch,
  resetTicketView,
} from "../view/drawFunctions";
import { simulateMatch, waitSimulation } from "./matchTableLogic";

let ticket: Ticket = new Ticket();
let balance: Euro = BALANCE;

export const addMatch = (
  host: HTMLElement,
  match: Match,
  outcome: string
): void => {
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
};

export const getStake = (): void => {
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
};

export const checkPair = (match: Match): void => {
  const ticketPairDiv: HTMLElement = document.getElementById(`pair${match.id}`);
  if (match.result === match.outcome) {
    ticketPairDiv.style.backgroundColor = "#77DD77";
  } else {
    ticket.win = false;
    ticketPairDiv.style.backgroundColor = "#FF6961";
  }
};

export const checkTicket = (): void => {
  if (ticket.win) {
    const moneyWon: number = Number((ticket.odd * ticket.stake).toFixed(2));
    balance += moneyWon;

    alert(`YOU WON ${moneyWon} €!\nBalance: ${balance} €`);
    ticket.reset();
    resetTicketView(balance);
  } else {
    alert(`YOU LOST ${ticket.stake} €\nBalance: ${balance} €`);
    ticket.reset();
    resetTicketView(balance);
  }
};

export const startSimulation = (): void => {
  if (ticket.stake === 0) {
    alert("Enter stake!");
    return;
  }

  if (ticket.stake > balance) {
    alert("Insufficient funds!");
    return;
  }

  if (ticket.matches.length === 0) return;

  disableAllButtons();

  balance -= ticket.stake;

  const balanceLabel: HTMLElement = document.querySelector(".balance-label");
  balanceLabel.innerHTML = `Balance: ${balance} €`;

  ticket.matches.forEach((match) => simulateMatch(match));

  waitSimulation();
};

export const checkIfAdded = (match: Match): void => {
  if (ticket.matches.length === 0) return;

  ticket.matches.forEach((m) => {
    if (m.id === match.id) {
      const matchDiv: HTMLElement = document.getElementById(`match${match.id}`);
      disableButtons(matchDiv);
    }
  });
};

export const resetTicket = (): void => {
  ticket.reset();
};

export const addJackpot = (): void => {
  alert("YOU WON 10 000 € JACKPOT!");

  balance += 10000;

  const balLbl: HTMLElement = document.querySelector(".balance-label");
  balLbl.innerHTML = `Balance: ${balance} €`;
};

export const decreaseBalance = (price: Euro): void => {
  balance -= price;

  const balLbl: HTMLElement = document.querySelector(".balance-label");
  balLbl.innerHTML = `Balance: ${balance} €`;
};

const getOdd = (match: Match): number => {
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
};
