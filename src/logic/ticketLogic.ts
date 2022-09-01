import { TICKET, PLAYER, INPUT_DEBOUNCE } from "../constants";
import { debounceTime, fromEvent, map } from "rxjs";
import { Match } from "../models/Match";
import { disableAllButtons, disableButtons } from "../view/matchView";
import { simulateMatch, waitSimulation } from "./matchTableLogic";
import {
  drawChosenMatch,
  refreshTicketLabels,
  resetTicketView,
  updateBalanceLabel,
  updateWinLabel,
} from "../view/ticketView";

export const addMatch = (
  host: HTMLElement,
  match: Match,
  outcome: string
): void => {
  match.outcome = outcome;

  TICKET.odd = Number((TICKET.odd * getOdd(match)).toFixed(2));
  TICKET.matches.push(match);

  drawChosenMatch(host, match, outcome);
  refreshTicketLabels();
};

export const getStake = (): void => {
  const stakeInput: HTMLInputElement = document.querySelector(".stake-input");
  fromEvent(stakeInput, "input")
    .pipe(
      debounceTime(INPUT_DEBOUNCE),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value)
    )
    .subscribe((stake) => {
      TICKET.stake = Number(stake);

      updateWinLabel(stake);
    });
};

export const startSimulation = (): void => {
  if (TICKET.stake === 0) {
    alert("Enter stake!");
    return;
  }

  if (TICKET.stake > PLAYER.balance) {
    alert("Insufficient funds!");
    return;
  }

  if (TICKET.matches.length === 0) return;

  PLAYER.balance -= TICKET.stake;

  disableAllButtons();
  updateBalanceLabel();

  TICKET.matches.forEach((match) => simulateMatch(match));

  waitSimulation();
};

export const checkPair = (match: Match): void => {
  const ticketPairDiv: HTMLElement = document.getElementById(`pair${match.id}`);
  if (match.result === match.outcome) {
    ticketPairDiv.style.backgroundColor = "#77DD77";
  } else {
    TICKET.win = false;
    ticketPairDiv.style.backgroundColor = "#FF6961";
  }
};

export const checkTicket = (): void => {
  if (TICKET.win) {
    const moneyWon: number = Number((TICKET.odd * TICKET.stake).toFixed(2));
    PLAYER.balance += moneyWon;

    alert(`YOU WON ${moneyWon} €!\nBalance: ${PLAYER.balance} €`);
    resetTicket();
    resetTicketView();
  } else {
    alert(`YOU LOST ${TICKET.stake} €\nBalance: ${PLAYER.balance} €`);
    resetTicket();
    resetTicketView();
  }
};

export const checkIfAdded = (match: Match): void => {
  if (TICKET.matches.length === 0) return;

  TICKET.matches.forEach((m) => {
    if (m.id === match.id) {
      const matchDiv: HTMLElement = document.getElementById(`match${match.id}`);
      disableButtons(matchDiv);
    }
  });
};

export const resetTicket = (): void => {
  TICKET.matches = [];
  TICKET.odd = 1;
  TICKET.stake = 0;
  TICKET.win = true;
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
