import {
  debounceTime,
  filter,
  finalize,
  fromEvent,
  interval,
  map,
  switchMap,
  take,
} from "rxjs";
import { Match } from "../models/Match";
import { getMatches, getMatchesByQuery } from "../controllers/data";
import { clearMatchTable, drawMatch } from "../view/drawFunctions";
import { checkIfAdded, checkPair } from "./ticketLogic";

export const loadMatches = (): void => {
  getMatches().subscribe((matches) =>
    matches.forEach((match) => {
      drawMatch(match);
      checkIfAdded(match);
    })
  );
};

export const search = (): void => {
  const searchInput: HTMLInputElement = document.querySelector(".search-input");
  fromEvent(searchInput, "input")
    .pipe(
      debounceTime(200),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((query: string) => {
        if (query.length > 1) return true;

        clearMatchTable();
        loadMatches();
      }),
      switchMap((query) => getMatchesByQuery(query))
    )
    .subscribe((matches) => handleSearchResults(matches));
};

export const simulateMatch = (match: Match): void => {
  const randomMinutes: number = Math.floor(Math.random() * 10 + 1) + 90;

  let homeGoalsMin: number[] = getGoalMinutes(
    Math.floor(Math.random() * 7),
    randomMinutes
  );
  let guestGoalsMin: number[] = getGoalMinutes(
    Math.floor(Math.random() * 7),
    randomMinutes
  );

  let homeGoals: number = 0;
  let guestGoals: number = 0;

  const goalsLabel: HTMLElement = document.getElementById(
    `match${match.id}-goals`
  );
  const minutesLabel: HTMLElement = document.getElementById(
    `match${match.id}-minutes`
  );

  match.length = randomMinutes;

  match.result =
    homeGoalsMin.length > guestGoalsMin.length
      ? "1"
      : homeGoalsMin.length < guestGoalsMin.length
      ? "2"
      : "X";

  interval(50)
    .pipe(
      take(randomMinutes),
      finalize(() => checkPair(match))
    )
    .subscribe((minute: number) => {
      minutesLabel.innerHTML = `${minute}'`;

      if (minute === 0) {
        goalsLabel.innerHTML = "0 : 0";
      }

      if (minute === homeGoalsMin[0]) {
        homeGoals++;
        goalsLabel.innerHTML = `${homeGoals} : ${guestGoals}`;
        homeGoalsMin.shift();
      }
      if (minute === guestGoalsMin[0]) {
        guestGoals++;
        goalsLabel.innerHTML = `${homeGoals} : ${guestGoals}`;
        guestGoalsMin.shift();
      }
    });
};

const getGoalMinutes = (numOfGoals: number, maxRange: number): number[] => {
  let goalMinutes: number[] = [];

  if (numOfGoals !== 0) {
    for (let i = 0; i < numOfGoals; i++) {
      goalMinutes.push(Math.floor(Math.random() * maxRange));
    }
  }
  goalMinutes.sort((a, b) => a - b);
  return goalMinutes;
};
const handleSearchResults = (matches: Match[]): void => {
  clearMatchTable();
  
  matches.forEach((match) => {
    drawMatch(match);
    checkIfAdded(match);
  });
};
