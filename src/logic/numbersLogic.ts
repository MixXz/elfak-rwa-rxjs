import {
  finalize,
  interval,
  map,
  merge,
  Observable,
  reduce,
  take,
  zip,
} from "rxjs";
import { NumberTicket } from "../models/NumberTicket";
import { addJackpot, decreaseBalance } from "./ticketLogic";

let numberTicket: NumberTicket = new NumberTicket();

let oddInterval: Observable<number | number[]>;
let evenInterval: Observable<number | number[]>;

export const simulateNumbers = (): void => {
  getInputs();
  decreaseBalance(10);

  oddInterval = interval(200).pipe(
    map(() => generateOddNumber()),
    take(5)
  );

  evenInterval = interval(200).pipe(
    map(() => generateEvenNumber()),
    take(5)
  );

  oddInterval.subscribe((num) => {
    const lbl = document.querySelector(".odd-number");
    lbl.innerHTML = `${num}`;
  });

  evenInterval.subscribe((num) => {
    const lbl = document.querySelector(".even-number");
    lbl.innerHTML = `${num}`;
  });

  checkPairNums();
  checkSum();

  const lbl = document.querySelector(".pairs-lbl");
  lbl.innerHTML = "";

  let btn: HTMLButtonElement = <HTMLButtonElement>(
    document.querySelector(".start-btn")
  );
  btn.disabled = true;
};

const checkPairNums = (): void => {
  zip(oddInterval, evenInterval)
    .pipe(map(([odd, even]) => ({ odd, even })))
    .subscribe((x) => {
      if (x.even === numberTicket.pairEven && x.odd === numberTicket.pairOdd) {
        numberTicket.pairWin = true;
      }
      const lbl = document.querySelector(".pairs-lbl");
      lbl.innerHTML += `[${x.odd}, ${x.even}] `;
    });
};

const checkSum = (): void => {
  merge(oddInterval, evenInterval)
    .pipe(reduce((acc: number, x: number) => acc + x, 0))
    .subscribe((sum) => {
      if ((numberTicket.less && sum < 50) || (!numberTicket.less && sum > 50)) {
        numberTicket.lessOrGreaterWin = true;
      }

      if (numberTicket.lessOrGreaterWin && numberTicket.pairWin) {
        setTimeout(() => {
          addJackpot();
        }, 300);
        numberTicket.pairWin = false;
        numberTicket.lessOrGreaterWin = false;
      }

      const lbl = document.querySelector(".pairs-lbl");
      lbl.innerHTML += `SUM = ${sum}`;

      let btn: HTMLButtonElement = <HTMLButtonElement>(
        document.querySelector(".start-btn")
      );
      btn.disabled = false;
    });
};

const getInputs = (): void => {
  const less: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("less-check")
  );
  const num1: HTMLInputElement = <HTMLInputElement>(
    document.querySelector(".first-pair-input")
  );
  const num2: HTMLInputElement = <HTMLInputElement>(
    document.querySelector(".second-pair-input")
  );

  numberTicket.pairOdd = Number(num1.value);
  numberTicket.pairEven = Number(num2.value);
  numberTicket.less = less.checked;
};

const generateOddNumber = (): number => {
  let randNum: number = Math.floor(Math.random() * 9) + 1;
  if (randNum % 2 === 0) {
    if (randNum === 40) {
      randNum = randNum - 1;
    } else {
      randNum = randNum + 1;
    }
  }

  return randNum;
};

const generateEvenNumber = (): number => {
  let randNum: number = Math.floor(Math.random() * 8) + 2;
  if (randNum % 2 === 1) {
    randNum = randNum + 1;
  }

  return randNum;
};
