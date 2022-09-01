import {
  NUMBERS_DRAW_COUNT,
  NUMBERS_DRAW_INTERVAL,
  NUMBERS_JACKPOT,
  NUMBERS_MAX_RANGE,
  NUMBERS_MIN_RANGE,
  NUMBERS_SUM,
  NUMBERS_TICKET,
  NUMBERS_TICKET_PRICE,
  PLAYER,
} from "../constants";
import { interval, map, merge, Observable, reduce, take, zip } from "rxjs";
import { getRandomNum } from "../common";
import {
  resetNumTicketView,
  updateEvenNumLabel,
  updateOddNumLabel,
} from "../view/numberTicketView";
import { updateBalanceLabel } from "../view/ticketView";

export const simulateNumbers = (): void => {
  getInputs();

  PLAYER.balance -= NUMBERS_TICKET_PRICE;

  const oddInterval = interval(NUMBERS_DRAW_INTERVAL).pipe(
    map(() => generateOddNumber()),
    take(NUMBERS_DRAW_COUNT)
  );

  const evenInterval = interval(NUMBERS_DRAW_INTERVAL).pipe(
    map(() => generateEvenNumber()),
    take(NUMBERS_DRAW_COUNT)
  );

  oddInterval.subscribe((num) => {
    updateOddNumLabel(num);
  });

  evenInterval.subscribe((num) => {
    updateEvenNumLabel(num);
  });

  checkPairNums(oddInterval, evenInterval);
  checkSum(oddInterval, evenInterval);

  resetNumTicketView();
};

const checkPairNums = (
  odd: Observable<number>,
  even: Observable<number>
): void => {
  zip(odd, even)
    .pipe(map(([odd, even]) => ({ odd, even })))
    .subscribe((x) => {
      if (
        x.even === NUMBERS_TICKET.pairEven &&
        x.odd === NUMBERS_TICKET.pairOdd
      ) {
        NUMBERS_TICKET.pairWin = true;
      }
      const lbl = document.querySelector(".pairs-lbl");
      lbl.innerHTML += `[${x.odd}, ${x.even}] `;
    });
};

const checkSum = (odd: Observable<number>, even: Observable<number>): void => {
  merge(odd, even)
    .pipe(reduce((acc: number, x: number) => acc + x, 0))
    .subscribe((sum) => {
      if (
        (NUMBERS_TICKET.less && sum < NUMBERS_SUM) ||
        (!NUMBERS_TICKET.less && sum > NUMBERS_SUM)
      ) {
        NUMBERS_TICKET.lessOrGreaterWin = true;
      }

      if (NUMBERS_TICKET.lessOrGreaterWin && NUMBERS_TICKET.pairWin) {
        setTimeout(() => {
          alert("YOU WON 10 000 € JACKPOT!");
          PLAYER.balance += NUMBERS_JACKPOT;
          NUMBERS_TICKET.pairWin = false;
          NUMBERS_TICKET.lessOrGreaterWin = false;
          updateBalanceLabel();
        }, 100);
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

  NUMBERS_TICKET.pairOdd = Number(num1.value);
  NUMBERS_TICKET.pairEven = Number(num2.value);
  NUMBERS_TICKET.less = less.checked;
};

const generateOddNumber = (): number => {
  let randNum: number = getRandomNum(NUMBERS_MIN_RANGE, NUMBERS_MAX_RANGE);
  if (randNum % 2 === 0) {
    if (randNum === NUMBERS_MAX_RANGE) {
      randNum = randNum - 1;
    } else {
      randNum = randNum + 1;
    }
  }

  return randNum;
};

const generateEvenNumber = (): number => {
  let randNum: number = getRandomNum(NUMBERS_MIN_RANGE + 1, NUMBERS_MAX_RANGE);
  if (randNum % 2 === 1) {
    randNum = randNum + 1;
  }

  return randNum;
};
