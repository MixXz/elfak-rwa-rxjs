import { Match } from "../models/Match";
import { addMatch, resetTicket, startSimulation } from "../logic/ticketLogic";
import { simulateNumbers } from "../logic/numbersLogic";

export const drawDashboard = (host: HTMLElement): void => {
  const mainCont: HTMLElement = document.createElement("div");
  mainCont.className = "main-div";
  host.appendChild(mainCont);

  const titleDiv: HTMLElement = document.createElement("div");
  titleDiv.innerHTML = "BETTING SIMULATOR";
  titleDiv.className = "title-div";
  mainCont.appendChild(titleDiv);

  const cont: HTMLElement = document.createElement("div");
  cont.className = "cont-div";
  mainCont.appendChild(cont);

  const tableDiv: HTMLElement = document.createElement("div");
  tableDiv.className = "table-div";
  cont.appendChild(tableDiv);

  const numbersDiv: HTMLElement = document.createElement("div");
  numbersDiv.className = "numbers-div";
  tableDiv.appendChild(numbersDiv);

  const searchInput: HTMLInputElement = document.createElement("input");
  searchInput.className = "search-input";
  searchInput.setAttribute("placeholder", "Search match");
  tableDiv.appendChild(searchInput);

  drawTicket(cont);
  drawNumberTicket(numbersDiv);
};

const drawTicket = (host: HTMLElement): void => {
  const ticketDiv: HTMLElement = document.createElement("div");
  ticketDiv.className = "ticket-div";
  host.appendChild(ticketDiv);

  const topDiv: HTMLElement = document.createElement("div");
  topDiv.className = "top-div";
  ticketDiv.appendChild(topDiv);

  const middleDiv = document.createElement("div");
  middleDiv.className = "middle-div";
  ticketDiv.appendChild(middleDiv);

  const bottomDiv: HTMLElement = document.createElement("div");
  bottomDiv.className = "bottom-div";
  ticketDiv.appendChild(bottomDiv);

  let rowDiv: HTMLElement = document.createElement("div");
  rowDiv.className = "ticket-close-div";
  topDiv.appendChild(rowDiv);

  const ticketLabel: HTMLElement = document.createElement("label");
  ticketLabel.innerHTML = "Ticket";
  ticketLabel.className = "ticket-label";
  rowDiv.appendChild(ticketLabel);

  const closeLabel: HTMLElement = document.createElement("label");
  closeLabel.innerHTML = "✖";
  closeLabel.className = "close-label";
  closeLabel.onclick = () => resetTicketView(-1);
  rowDiv.appendChild(closeLabel);

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

  rowDiv = document.createElement("div");
  rowDiv.className = "row-div";
  bottomDiv.appendChild(rowDiv);

  const stakeLabel: HTMLElement = document.createElement("label");
  stakeLabel.innerHTML = "Stake:";
  stakeLabel.style.marginRight = "10px";
  rowDiv.appendChild(stakeLabel);

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

const drawNumberTicket = (host: HTMLElement): void => {
  const oddNumbersDiv: HTMLElement = document.createElement("div");
  oddNumbersDiv.className = "odd-numbers-div";
  host.appendChild(oddNumbersDiv);

  let lbl: HTMLElement = document.createElement("label");
  lbl.innerHTML = "ODD";
  oddNumbersDiv.appendChild(lbl);

  lbl = document.createElement("label");
  lbl.className = "odd-number";
  lbl.innerHTML = "";
  lbl.style.fontSize = "80px";
  oddNumbersDiv.appendChild(lbl);

  const middleNumbersDiv: HTMLElement = document.createElement("div");
  middleNumbersDiv.className = "middle-numbers-div";
  host.appendChild(middleNumbersDiv);

  lbl = document.createElement("label");
  lbl.innerHTML = "WIN 10 000 € JACKPOT";
  lbl.style.fontSize = "20px";
  lbl.style.fontWeight = "600";
  middleNumbersDiv.appendChild(lbl);

  lbl = document.createElement("label");
  lbl.innerHTML = "Sum: 50";
  lbl.style.fontSize = "20px";
  middleNumbersDiv.appendChild(lbl);

  const checkboxDiv = document.createElement("div");
  checkboxDiv.className = "checkbox-div";
  middleNumbersDiv.appendChild(checkboxDiv);

  lbl = document.createElement("label");
  lbl.innerHTML = "Less";
  lbl.style.fontSize = "15px";
  checkboxDiv.appendChild(lbl);

  const lessCheck = document.createElement("input");
  lessCheck.setAttribute("type", "radio");
  lessCheck.setAttribute("name", "NekiName");
  lessCheck.checked = true;
  lessCheck.id = "less-check";
  checkboxDiv.appendChild(lessCheck);

  lbl = document.createElement("label");
  lbl.innerHTML = "Greater";
  lbl.style.fontSize = "15px";
  lbl.style.marginLeft = "10px";
  checkboxDiv.appendChild(lbl);

  const greaterCheck = document.createElement("input");
  greaterCheck.id = "greater-check";
  greaterCheck.setAttribute("type", "radio");
  greaterCheck.setAttribute("name", "NekiName");
  checkboxDiv.appendChild(greaterCheck);

  const pairDiv = document.createElement("div");
  pairDiv.className = "pair-div";
  middleNumbersDiv.appendChild(pairDiv);

  lbl = document.createElement("label");
  lbl.innerHTML = "Pair:";
  lbl.style.fontSize = "20px";
  lbl.style.marginRight = "10px";
  pairDiv.appendChild(lbl);

  const firstPairInput: HTMLInputElement = document.createElement("input");
  firstPairInput.className = "first-pair-input";
  firstPairInput.setAttribute("type", "number");
  firstPairInput.setAttribute("min", "1");
  firstPairInput.setAttribute("max", "39");
  firstPairInput.setAttribute("step", "2");
  firstPairInput.setAttribute("value", "1");
  firstPairInput.style.width = "30px";
  pairDiv.appendChild(firstPairInput);

  const secondPairInput: HTMLInputElement = document.createElement("input");
  secondPairInput.className = "second-pair-input";
  secondPairInput.setAttribute("type", "number");
  secondPairInput.setAttribute("min", "2");
  secondPairInput.setAttribute("max", "40");
  secondPairInput.setAttribute("step", "2");
  secondPairInput.setAttribute("value", "2");
  secondPairInput.style.width = "30px";
  pairDiv.appendChild(secondPairInput);

  const startBtn = document.createElement("button");
  startBtn.innerHTML = "START";
  startBtn.className = "start-btn";
  startBtn.onclick = () => simulateNumbers();
  middleNumbersDiv.appendChild(startBtn);

  lbl = document.createElement("label");
  lbl.innerHTML = "";
  lbl.className = "pairs-lbl";
  lbl.style.marginTop = "10px";
  middleNumbersDiv.appendChild(lbl);

  const evenNumbersDiv: HTMLElement = document.createElement("div");
  evenNumbersDiv.className = "even-numbers-div";
  host.appendChild(evenNumbersDiv);

  lbl = document.createElement("label");
  lbl.innerHTML = "EVEN";
  evenNumbersDiv.appendChild(lbl);

  lbl = document.createElement("label");
  lbl.className = "even-number";
  lbl.innerHTML = "";
  lbl.style.fontSize = "80px";
  evenNumbersDiv.appendChild(lbl);
};

const drawInfoBar = (host: HTMLElement, match: Match): void => {
  const middleDiv: HTMLElement = document.querySelector(".middle-div");

  const resultDiv: HTMLElement = document.createElement("div");
  resultDiv.className = "result-div";
  host.appendChild(resultDiv);

  const resLabel: HTMLElement = document.createElement("label");
  resLabel.innerHTML = "-.-";
  resLabel.className = "result-label";
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
};

export const drawMatch = (match: Match): void => {
  const host: HTMLElement = document.querySelector(".table-div");

  const matchDiv: HTMLElement = document.createElement("div");
  matchDiv.className = "match-div";
  matchDiv.id = `match${match.id}`;
  host.appendChild(matchDiv);

  const homeTeamDiv: HTMLElement = document.createElement("div");
  homeTeamDiv.className = "home-team-div";
  matchDiv.appendChild(homeTeamDiv);

  const homeTeamlogo: HTMLElement = document.createElement("div");
  homeTeamlogo.className = "home-team-logo-div";
  homeTeamDiv.appendChild(homeTeamlogo);

  let img = document.createElement("img");
  img.className = "img";
  img.src = `./logos/${match.homeTeamLogo}`;
  homeTeamlogo.appendChild(img);

  let lbl = document.createElement("label");
  lbl.innerHTML = match.homeTeam;
  lbl.style.marginRight = "10px";
  homeTeamDiv.appendChild(lbl);

  const infoDiv: HTMLElement = document.createElement("div");
  infoDiv.className = "info-bar-div";
  matchDiv.appendChild(infoDiv);

  const guestTeamDiv: HTMLElement = document.createElement("div");
  guestTeamDiv.className = "guest-team-div";
  matchDiv.appendChild(guestTeamDiv);

  const guestTeamLogo: HTMLElement = document.createElement("div");
  guestTeamLogo.className = "home-team-logo-div";
  guestTeamDiv.appendChild(guestTeamLogo);

  img = document.createElement("img");
  img.className = "img";
  img.src = `./logos/${match.guestTeamLogo}`;
  guestTeamLogo.appendChild(img);

  lbl = document.createElement("label");
  lbl.innerHTML = match.guestTeam;
  lbl.style.marginLeft = "10px";
  guestTeamDiv.appendChild(lbl);

  drawInfoBar(infoDiv, match);
};

export const drawChosenMatch = (
  host: HTMLElement,
  match: Match,
  outcome: string
): void => {
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
};

export const disableButtons = (div: HTMLElement): void => {
  const buttons = div.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
};

export const disableAllButtons = (): void => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
};

export const resetTicketView = (balance: number): void => {
  if (balance !== -1) {
    const balanceLabel: HTMLElement = document.querySelector(".balance-label");
    balanceLabel.innerHTML = `Balance: ${balance} €`;
  }

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

export const clearMatchTable = (): void => {
  const divs = document.querySelectorAll(".match-div");
  if (divs.length === 0) return;
  divs.forEach((pair) => pair.remove());
};

export const refreshMatchTable = (): void => {
  const resDivs = document.querySelectorAll(".result-label");
  const minutesDivs = document.querySelectorAll(".minutes-label");
  const btns = document.querySelectorAll("button");

  btns.forEach((btn) => (btn.disabled = false));
  resDivs.forEach((div) => (div.innerHTML = "-.-"));
  minutesDivs.forEach((div) => (div.innerHTML = "-.-"));
};
