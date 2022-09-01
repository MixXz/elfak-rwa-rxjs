import { PLAYER, TICKET } from "../constants";
import { Match } from "../models/Match";
import { createDiv, createLabel } from "../common";
import { resetTicket, startSimulation } from "../logic/ticketLogic";
import { refreshMatchTable } from "./matchView";

export const drawTicket = (host: HTMLElement): void => {
  const ticketDiv: HTMLElement = createDiv(host, "ticket-div");

  const topDiv: HTMLElement = createDiv(ticketDiv, "top-div");
  createDiv(ticketDiv, "middle-div");
  const bottomDiv: HTMLElement = createDiv(ticketDiv, "bottom-div");

  let rowDiv: HTMLElement = createDiv(topDiv, "ticket-close-div");

  const ticketLabel: HTMLElement = createLabel(rowDiv, "ticket-label");
  ticketLabel.innerHTML = "Ticket";

  const closeLabel: HTMLElement = createLabel(rowDiv, "close-label");
  closeLabel.innerHTML = "✖";
  closeLabel.onclick = () => resetTicketView();

  const balanceLabel: HTMLElement = createLabel(topDiv, "balance-label");
  balanceLabel.innerHTML = `Balance: ${PLAYER.balance} €`;

  const oddLabel: HTMLElement = createLabel(bottomDiv, "odd-label");
  oddLabel.innerHTML = "Odd: 0";

  const winLabel: HTMLElement = createLabel(bottomDiv, "win-label");
  winLabel.innerHTML = "Win: 0 €";

  rowDiv = createDiv(bottomDiv, "row-div");

  const stakeLabel: HTMLElement = createLabel(rowDiv);
  stakeLabel.innerHTML = "Stake:";
  stakeLabel.style.marginRight = "10px";

  const stakeInput: HTMLElement = document.createElement("input");
  stakeInput.setAttribute("type", "number");
  stakeInput.setAttribute("min", "0");
  stakeInput.setAttribute("step", "10");
  stakeInput.setAttribute("value", "0");
  stakeInput.className = "stake-input";
  rowDiv.appendChild(stakeInput);

  const submitBtn: HTMLElement = document.createElement("button");
  submitBtn.innerHTML = "Submit";
  submitBtn.className = "submit-btn";
  submitBtn.onclick = () => startSimulation();
  bottomDiv.appendChild(submitBtn);
};

export const drawChosenMatch = (
  host: HTMLElement,
  match: Match,
  outcome: string
): void => {
  const chosenMatchDiv: HTMLElement = createDiv(host, "chosen-match-div");
  chosenMatchDiv.id = `pair${match.id}`;

  const leftDiv: HTMLElement = createDiv(
    chosenMatchDiv,
    "chosen-match-left-div"
  );

  const rightDiv: HTMLElement = createDiv(
    chosenMatchDiv,
    "chosen-match-right-div"
  );

  const team1Label: HTMLElement = createLabel(leftDiv);
  team1Label.innerHTML = match.homeTeam;

  const team2Label: HTMLElement = createLabel(leftDiv);
  team2Label.innerHTML = match.guestTeam;

  const winnerLabel: HTMLElement = createLabel(
    rightDiv,
    "chosen-match-winner-lbl"
  );
  winnerLabel.innerHTML = outcome;

  const oddLabel: HTMLElement = createLabel(rightDiv);
  oddLabel.innerHTML =
    outcome === "1"
      ? match.homeTeamOdd + ""
      : outcome === "2"
      ? match.guestTeamOdd + ""
      : match.tiedOdd + "";
};

export const resetTicketView = (): void => {
  updateBalanceLabel();

  const oddLabel: HTMLElement = document.querySelector(".odd-label");
  oddLabel.innerHTML = "Odd: 0";

  const winLabel: HTMLElement = document.querySelector(".win-label");
  winLabel.innerHTML = "Win: 0 €";

  const stakeInput: HTMLInputElement = document.querySelector(".stake-input");
  stakeInput.value = "0";

  clearTicket();
  refreshMatchTable();
};

export const clearTicket = (): void => {
  const divs = document.querySelectorAll(".chosen-match-div");
  if (divs.length === 0) return;

  divs.forEach((pair) => pair.remove());

  resetTicket();
};

export const updateBalanceLabel = () => {
  const balanceLabel: HTMLElement = document.querySelector(".balance-label");
  balanceLabel.innerHTML = `Balance: ${PLAYER.balance} €`;
};

export const refreshTicketLabels = (): void => {
  const oddLabel = document.querySelector(".odd-label");
  oddLabel.innerHTML = `Odd: ${TICKET.odd}`;

  const winLabel = document.querySelector(".win-label");
  winLabel.innerHTML = `Win: ${
    TICKET.stake === 0
      ? 0
      : Number((TICKET.odd * Number(TICKET.stake)).toFixed(2))
  } €`;
};

export const updateWinLabel = (stake: string): void => {
  const winLabel = document.querySelector(".win-label");
  winLabel.innerHTML = `Win: ${
    stake === "" || TICKET.odd === 1
      ? 0
      : Number((TICKET.odd * Number(stake)).toFixed(2))
  } €`;
};
