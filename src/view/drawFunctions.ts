import { Match } from "../interfaces/Match";
import { addMatch, startSimulation } from "../logic/ticketLogic";

let middleDiv: HTMLElement;

export function drawDashboard(host: HTMLElement) {
  const mainCont: HTMLElement = document.createElement("div");
  mainCont.className = "main-div";
  host.appendChild(mainCont);

  const titleDiv: HTMLElement = document.createElement("div");
  titleDiv.innerHTML = "Football Betting";
  titleDiv.className = "title-div";
  mainCont.appendChild(titleDiv);

  const cont: HTMLElement = document.createElement("div");
  cont.className = "cont-div";
  mainCont.appendChild(cont);

  const tableDiv: HTMLElement = document.createElement("div");
  tableDiv.className = "table-div";
  cont.appendChild(tableDiv);

  drawTicket(cont);
}

export function drawMatch(match: Match) {
  const host: HTMLElement = document.querySelector(".table-div");

  const matchDiv: HTMLElement = document.createElement("div");
  matchDiv.className = "match-div";
  matchDiv.id = `match${match.id}`;
  host.appendChild(matchDiv);

  const homeTeamDiv: HTMLElement = document.createElement("div");
  homeTeamDiv.className = "home-team-div";
  homeTeamDiv.innerHTML = match.homeTeam;
  matchDiv.appendChild(homeTeamDiv);

  const infoDiv: HTMLElement = document.createElement("div");
  infoDiv.className = "info-bar-div";
  matchDiv.appendChild(infoDiv);

  const guestTeamDiv: HTMLElement = document.createElement("div");
  guestTeamDiv.className = "guest-team-div";
  guestTeamDiv.innerHTML = match.guestTeam;
  matchDiv.appendChild(guestTeamDiv);

  drawInfoBar(infoDiv, match);
}

function drawInfoBar(host: HTMLElement, match: Match) {
  const resultDiv: HTMLElement = document.createElement("div");
  resultDiv.className = "result-div";
  host.appendChild(resultDiv);

  const resLabel: HTMLElement = document.createElement("label");
  resLabel.innerHTML = "-.-";
  resLabel.id = `match${match.id}-goals`;
  resultDiv.appendChild(resLabel);

  const minutesLabel: HTMLElement = document.createElement("label");
  minutesLabel.innerHTML = "-.-";
  minutesLabel.className = "minutes-label";
  minutesLabel.id = `match${match.id}-minutes`;
  resultDiv.appendChild(minutesLabel);

  const oddsDiv: HTMLElement = document.createElement("div");
  oddsDiv.className = "odds-div";
  host.appendChild(oddsDiv);

  const homeWinBtn: HTMLElement = document.createElement("button");
  homeWinBtn.innerHTML = `1: ${match.homeTeamOdd}`;
  homeWinBtn.onclick = () => {
    addMatch(middleDiv, match, "1");
    disableButtons(oddsDiv);
  };
  oddsDiv.appendChild(homeWinBtn);

  const tiedBtn: HTMLElement = document.createElement("button");
  tiedBtn.innerHTML = `X: ${match.tiedOdd}`;
  tiedBtn.onclick = () => {
    addMatch(middleDiv, match, "X");
    disableButtons(oddsDiv);
  };
  oddsDiv.appendChild(tiedBtn);

  const guestWinBtn: HTMLElement = document.createElement("button");
  guestWinBtn.innerHTML = `2: ${match.guestTeamOdd}`;
  guestWinBtn.onclick = () => {
    addMatch(middleDiv, match, "2");
    disableButtons(oddsDiv);
  };
  oddsDiv.appendChild(guestWinBtn);
}

function drawTicket(host: HTMLElement) {
  const ticketDiv: HTMLElement = document.createElement("div");
  ticketDiv.className = "ticket-div";
  host.appendChild(ticketDiv);

  const topDiv: HTMLElement = document.createElement("div");
  topDiv.className = "top-div";
  ticketDiv.appendChild(topDiv);

  middleDiv = document.createElement("div");
  middleDiv.className = "middle-div";
  ticketDiv.appendChild(middleDiv);

  const bottomDiv: HTMLElement = document.createElement("div");
  bottomDiv.className = "bottom-div";
  ticketDiv.appendChild(bottomDiv);

  const ticketLabel: HTMLElement = document.createElement("label");
  ticketLabel.innerHTML = "Ticket";
  ticketLabel.className = "ticket-label";
  topDiv.appendChild(ticketLabel);

  const balanceLabel: HTMLElement = document.createElement("label");
  balanceLabel.innerHTML = "Balance: 1000 €";
  balanceLabel.className = "balance-label";
  topDiv.appendChild(balanceLabel);

  const oddLabel: HTMLElement = document.createElement("label");
  oddLabel.innerHTML = "Odd: 0";
  oddLabel.className = "odd-label";
  bottomDiv.appendChild(oddLabel);

  const winLabel: HTMLElement = document.createElement("label");
  winLabel.innerHTML = "Win: 0 €";
  winLabel.className = "win-label";
  bottomDiv.appendChild(winLabel);

  const rowDiv: HTMLElement = document.createElement("div");
  rowDiv.className = "row-div";
  bottomDiv.appendChild(rowDiv);

  const stakeLabel: HTMLElement = document.createElement("label");
  stakeLabel.innerHTML = "Stake: ";
  stakeLabel.className = "odd-label";
  rowDiv.appendChild(stakeLabel);

  const stakeInput: HTMLElement = document.createElement("input");
  stakeInput.setAttribute("type", "number");
  stakeInput.setAttribute("min", "0");
  stakeInput.setAttribute("step", "10");
  stakeInput.className = "stake-input";
  rowDiv.appendChild(stakeInput);

  const submitBtn: HTMLElement = document.createElement("button");
  submitBtn.innerHTML = "Submit";
  submitBtn.className = "submit-btn";
  submitBtn.onclick = () => startSimulation();
  bottomDiv.appendChild(submitBtn);
}

export function drawChosenMatch(
  host: HTMLElement,
  match: Match,
  outcome: string
) {
  const chosenMatchDiv: HTMLElement = document.createElement("div");
  chosenMatchDiv.className = "chosen-match-div";
  chosenMatchDiv.id = `pair${match.id}`;
  host.appendChild(chosenMatchDiv);

  const leftDiv: HTMLElement = document.createElement("div");
  leftDiv.className = "chosen-match-left-div";
  chosenMatchDiv.appendChild(leftDiv);

  const rightDiv: HTMLElement = document.createElement("div");
  rightDiv.className = "chosen-match-right-div";
  chosenMatchDiv.appendChild(rightDiv);

  const team1Label: HTMLElement = document.createElement("label");
  team1Label.innerHTML = match.homeTeam;
  leftDiv.appendChild(team1Label);

  const team2Label: HTMLElement = document.createElement("label");
  team2Label.innerHTML = match.guestTeam;
  leftDiv.appendChild(team2Label);

  const winnerLabel: HTMLElement = document.createElement("label");
  winnerLabel.innerHTML = outcome;
  winnerLabel.className = "chosen-match-winner-lbl";
  rightDiv.appendChild(winnerLabel);

  const oddLabel: HTMLElement = document.createElement("label");
  oddLabel.innerHTML =
    outcome === "1"
      ? match.homeTeamOdd + ""
      : outcome === "2"
      ? match.guestTeamOdd + ""
      : match.tiedOdd + "";
  rightDiv.appendChild(oddLabel);
}

function disableButtons(div: HTMLElement) {
  const buttons = div.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
}
