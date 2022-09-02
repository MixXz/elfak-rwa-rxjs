import { Match } from "../models/match";
import { addMatch } from "../logic/ticketLogic";
import { drawTicket } from "./ticketView";
import { drawNumberTicket } from "./numberTicketView";
import { createDiv, createLabel } from "../common";

export const drawDashboard = (host: HTMLElement): void => {
  const mainCont: HTMLElement = createDiv(host, "main-div");

  const titleDiv: HTMLElement = createDiv(mainCont, "title-div");
  titleDiv.innerHTML = "BETTING SIMULATOR";

  const cont: HTMLElement = createDiv(mainCont, "cont-div");

  const tableDiv: HTMLElement = createDiv(cont, "table-div");

  const numbersDiv: HTMLElement = createDiv(tableDiv, "numbers-div");

  const searchInput: HTMLInputElement = document.createElement("input");
  searchInput.className = "search-input";
  searchInput.setAttribute("placeholder", "Search match");
  tableDiv.appendChild(searchInput);

  drawTicket(cont);
  drawNumberTicket(numbersDiv);
};

export const drawMatch = (match: Match): void => {
  const host: HTMLElement = document.querySelector(".table-div");

  const matchDiv: HTMLElement = createDiv(host, "match-div");
  matchDiv.id = `match${match.id}`;

  const homeTeamDiv: HTMLElement = createDiv(matchDiv, "home-team-div");

  const homeTeamlogo: HTMLElement = createDiv(
    homeTeamDiv,
    "home-team-logo-div"
  );

  let img = document.createElement("img");
  img.className = "img";
  img.src = `./logos/${match.homeTeamLogo}`;
  homeTeamlogo.appendChild(img);

  let lbl = createLabel(homeTeamDiv);
  lbl.innerHTML = match.homeTeam;
  lbl.style.marginRight = "10px";

  const infoDiv: HTMLElement = createDiv(matchDiv, "info-bar-div");

  const guestTeamDiv: HTMLElement = createDiv(matchDiv, "guest-team-div");

  const guestTeamLogo: HTMLElement = createDiv(
    guestTeamDiv,
    "home-team-logo-div"
  );

  img = document.createElement("img");
  img.className = "img";
  img.src = `./logos/${match.guestTeamLogo}`;
  guestTeamLogo.appendChild(img);

  lbl = createLabel(guestTeamDiv);
  lbl.innerHTML = match.guestTeam;
  lbl.style.marginLeft = "10px";

  drawInfoBar(infoDiv, match);
};

const drawInfoBar = (host: HTMLElement, match: Match): void => {
  const middleDiv: HTMLElement = document.querySelector(".middle-div");

  const resultDiv: HTMLElement = createDiv(host, "result-div");

  const resLabel: HTMLElement = createLabel(resultDiv, "result-label");
  resLabel.innerHTML = "-.-";
  resLabel.id = `match${match.id}-goals`;

  const minutesLabel: HTMLElement = createLabel(resultDiv, "minutes-label");
  minutesLabel.innerHTML = "-.-";
  minutesLabel.id = `match${match.id}-minutes`;

  const oddsDiv: HTMLElement = createDiv(host, "odds-div");

  const homeWinBtn: HTMLElement = document.createElement("button");
  homeWinBtn.innerHTML = `1 ${match.homeTeamOdd}`;
  homeWinBtn.className = "match-odd-btn";
  homeWinBtn.onclick = () => {
    addMatch(middleDiv, match, "1");
    disableButtons(oddsDiv);
  };
  oddsDiv.appendChild(homeWinBtn);

  const tiedBtn: HTMLElement = document.createElement("button");
  tiedBtn.innerHTML = `X ${match.tiedOdd}`;
  tiedBtn.className = "match-odd-btn";
  tiedBtn.onclick = () => {
    addMatch(middleDiv, match, "X");
    disableButtons(oddsDiv);
  };
  oddsDiv.appendChild(tiedBtn);

  const guestWinBtn: HTMLElement = document.createElement("button");
  guestWinBtn.innerHTML = `2 ${match.guestTeamOdd}`;
  guestWinBtn.className = "match-odd-btn";
  guestWinBtn.onclick = () => {
    addMatch(middleDiv, match, "2");
    disableButtons(oddsDiv);
  };
  oddsDiv.appendChild(guestWinBtn);
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

export const updateMinutesLabel = (match: Match, minute: number) => {
  const minutesLabel: HTMLElement = document.getElementById(
    `match${match.id}-minutes`
  );
  minutesLabel.innerHTML = `${minute}'`;
};

export const updateGoalLabel = (
  match: Match,
  homeGoals: number,
  guestGoals: number
) => {
  const goalsLabel: HTMLElement = document.getElementById(
    `match${match.id}-goals`
  );
  goalsLabel.innerHTML = `${homeGoals} : ${guestGoals}`;
};

export const disableButtons = (div: HTMLElement): void => {
  const buttons = div.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
};

export const disableAllButtons = (): void => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
};
