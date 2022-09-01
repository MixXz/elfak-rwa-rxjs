import { createDiv, createLabel } from "../common";
import { simulateNumbers } from "../logic/numbersLogic";

export const drawNumberTicket = (host: HTMLElement): void => {
  const oddNumbersDiv: HTMLElement = createDiv(host, "odd-numbers-div");

  let lbl: HTMLElement = createLabel(oddNumbersDiv);
  lbl.innerHTML = "ODD";

  lbl = createLabel(oddNumbersDiv, "odd-number");
  lbl.innerHTML = "";
  lbl.style.fontSize = "80px";

  const middleNumbersDiv: HTMLElement = createDiv(host, "middle-numbers-div");

  lbl = createLabel(middleNumbersDiv);
  lbl.innerHTML = "Lucky Numbers";
  lbl.style.fontSize = "20px";
  lbl.style.fontWeight = "600";

  lbl = createLabel(middleNumbersDiv);
  lbl.innerHTML = "Win 10 000 € Jackpot";
  lbl.style.fontSize = "15px";
  lbl.style.fontWeight = "600";

  const checkboxDiv = createDiv(middleNumbersDiv, "checkbox-div");

  lbl = createLabel(checkboxDiv);
  lbl.innerHTML = "Less";
  lbl.style.fontSize = "15px";
  lbl.style.marginLeft = "20px";

  const lessCheck = document.createElement("input");
  lessCheck.setAttribute("type", "radio");
  lessCheck.setAttribute("name", "NekiName");
  lessCheck.checked = true;
  lessCheck.id = "less-check";
  checkboxDiv.appendChild(lessCheck);

  lbl = createLabel(checkboxDiv);
  lbl.innerHTML = " < Sum 50 >";
  lbl.style.fontSize = "20px";

  const greaterCheck = document.createElement("input");
  greaterCheck.id = "greater-check";
  greaterCheck.setAttribute("type", "radio");
  greaterCheck.setAttribute("name", "NekiName");
  checkboxDiv.appendChild(greaterCheck);

  lbl = createLabel(checkboxDiv);
  lbl.innerHTML = "Greater";
  lbl.style.fontSize = "15px";

  const pairDiv = createDiv(middleNumbersDiv, "pair-div");

  lbl = createLabel(pairDiv);
  lbl.innerHTML = "Pair:";
  lbl.style.fontSize = "20px";
  lbl.style.marginRight = "10px";

  const firstPairInput: HTMLInputElement = document.createElement("input");
  firstPairInput.className = "first-pair-input";
  firstPairInput.setAttribute("type", "number");
  firstPairInput.setAttribute("min", "1");
  firstPairInput.setAttribute("max", "9");
  firstPairInput.setAttribute("step", "2");
  firstPairInput.setAttribute("value", "1");
  firstPairInput.style.width = "30px";
  pairDiv.appendChild(firstPairInput);

  const secondPairInput: HTMLInputElement = document.createElement("input");
  secondPairInput.className = "second-pair-input";
  secondPairInput.setAttribute("type", "number");
  secondPairInput.setAttribute("min", "2");
  secondPairInput.setAttribute("max", "10");
  secondPairInput.setAttribute("step", "2");
  secondPairInput.setAttribute("value", "2");
  secondPairInput.style.width = "30px";
  pairDiv.appendChild(secondPairInput);

  const startBtn = document.createElement("button");
  startBtn.innerHTML = "START";
  startBtn.className = "start-btn";
  startBtn.onclick = () => simulateNumbers();
  middleNumbersDiv.appendChild(startBtn);

  lbl = createLabel(middleNumbersDiv, "pairs-lbl");
  lbl.innerHTML = "";
  lbl.style.marginTop = "10px";

  const evenNumbersDiv: HTMLElement = createDiv(host, "even-numbers-div");

  lbl = createLabel(evenNumbersDiv);
  lbl.innerHTML = "EVEN";

  lbl = createLabel(evenNumbersDiv, "even-number");
  lbl.innerHTML = "";
  lbl.style.fontSize = "80px";
};

export const updateOddNumLabel = (num: number): void => {
  const lbl = document.querySelector(".odd-number");
  lbl.innerHTML = `${num}`;
};

export const updateEvenNumLabel = (num: number): void => {
  const lbl = document.querySelector(".even-number");
  lbl.innerHTML = `${num}`;
};

export const resetNumTicketView = (): void => {
  const lbl = document.querySelector(".pairs-lbl");
  lbl.innerHTML = "";

  let btn: HTMLButtonElement = <HTMLButtonElement>(
    document.querySelector(".start-btn")
  );
  btn.disabled = true;
};
