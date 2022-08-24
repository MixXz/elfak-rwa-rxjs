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

  drawMatchTable(cont);
  drawTicket(cont);
}

function drawMatchTable(host: HTMLElement) {
  const tableDiv: HTMLElement = document.createElement("div");
  tableDiv.className = "table-div";
  host.appendChild(tableDiv);

  drawMatch(tableDiv);
  drawMatch(tableDiv);
  drawMatch(tableDiv);
  drawMatch(tableDiv);
  drawMatch(tableDiv);
  drawMatch(tableDiv);
}
function drawMatch(host: HTMLElement) {
  const matchDiv: HTMLElement = document.createElement("div");
  matchDiv.className = "match-div";
  host.appendChild(matchDiv);
}
function drawTicket(host: HTMLElement) {
  const ticketDiv: HTMLElement = document.createElement("div");
  ticketDiv.className = "ticket-div";
  host.appendChild(ticketDiv);

  const topDiv: HTMLElement = document.createElement("div");
  topDiv.className = "top-div";
  ticketDiv.appendChild(topDiv);

  const middleDiv: HTMLElement = document.createElement("div");
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
  oddLabel.innerHTML = "Odd: 10.5";
  oddLabel.className = "odd-label";
  bottomDiv.appendChild(oddLabel);

  const winLabel: HTMLElement = document.createElement("label");
  winLabel.innerHTML = "Win: 1050 RSD";
  winLabel.className = "odd-label";
  bottomDiv.appendChild(winLabel);

  const rowDiv: HTMLElement = document.createElement("div");
  rowDiv.className = "row-div";
  bottomDiv.appendChild(rowDiv);

  const stakeLabel: HTMLElement = document.createElement("label");
  stakeLabel.innerHTML = "Stake: ";
  stakeLabel.className = "odd-label";
  rowDiv.appendChild(stakeLabel);

  const stakeInput: HTMLElement = document.createElement("input");
  rowDiv.appendChild(stakeInput);

  const submitBtn: HTMLElement = document.createElement("button");
  submitBtn.innerHTML = "Submit";
  submitBtn.className = "submit-btn";
  bottomDiv.appendChild(submitBtn);

  drawChosenMatch(middleDiv);
  drawChosenMatch(middleDiv);
  drawChosenMatch(middleDiv);
  drawChosenMatch(middleDiv);
  drawChosenMatch(middleDiv);
  drawChosenMatch(middleDiv);
}

function drawChosenMatch(host: HTMLElement) {
  const chosenMatchDiv: HTMLElement = document.createElement("div");
  chosenMatchDiv.className = "chosen-match-div";
  host.appendChild(chosenMatchDiv);

  const leftDiv: HTMLElement = document.createElement("div");
  leftDiv.className = "chosen-match-left-div";
  chosenMatchDiv.appendChild(leftDiv);

  const rightDiv: HTMLElement = document.createElement("div");
  rightDiv.className = "chosen-match-right-div";
  chosenMatchDiv.appendChild(rightDiv);

  const team1Label: HTMLElement = document.createElement("label");
  team1Label.innerHTML = "Bayern";
  leftDiv.appendChild(team1Label);

  const team2Label: HTMLElement = document.createElement("label");
  team2Label.innerHTML = "Crvena Zvezda";
  leftDiv.appendChild(team2Label);

  const winnerLabel: HTMLElement = document.createElement("label");
  winnerLabel.innerHTML = "1";
  winnerLabel.className = "chosen-match-winner-lbl";
  rightDiv.appendChild(winnerLabel);

  const oddLabel: HTMLElement = document.createElement("label");
  oddLabel.innerHTML = "3.51";
  rightDiv.appendChild(oddLabel);
}
