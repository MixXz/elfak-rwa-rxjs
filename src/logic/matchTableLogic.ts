import {
  INPUT_DEBOUNCE,
  MATCH_MINUTE_INTERVAL,
  MAX_MATCH_LENGTH,
  MAX_NUM_GOALS,
  MIN_MATCH_LENGTH,
} from "../constants";
import {
  debounceTime,
  filter,
  finalize,
  forkJoin,
  fromEvent,
  interval,
  map,
  Observable,
  switchMap,
  take,
} from "rxjs";
import {
  clearMatchTable,
  drawMatch,
  updateGoalLabel,
  updateMinutesLabel,
} from "../view/matchView";
import { Match } from "../models/Match";
import { getMatches, getMatchesByQuery } from "../controllers/fetchFunctions";
import { checkIfAdded, checkPair, checkTicket } from "./ticketLogic";
import { getRandomNum } from "../common";

const obsArray: Observable<number>[] = [];

export const loadMatches = (): void => {
  getMatches().subscribe((matches) =>
    matches.forEach((match) => {
      drawMatch(match);
      checkIfAdded(match);
    })
  );
};

export const handleSearch = (): void => {
  const searchInput: HTMLInputElement = document.querySelector(".search-input");
  fromEvent(searchInput, "input")
    .pipe(
      debounceTime(INPUT_DEBOUNCE),
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
  const matchLength: number = getRandomNum(MIN_MATCH_LENGTH, MAX_MATCH_LENGTH);

  let homeGoalsMin: number[] = getGoalMinutes(matchLength);
  let guestGoalsMin: number[] = getGoalMinutes(matchLength);

  let homeGoals: number = 0;
  let guestGoals: number = 0;

  match.length = matchLength;

  match.result =
    homeGoalsMin.length > guestGoalsMin.length
      ? "1"
      : homeGoalsMin.length < guestGoalsMin.length
      ? "2"
      : "X";

  const observable = interval(MATCH_MINUTE_INTERVAL).pipe(
    take(matchLength),
    finalize(() => checkPair(match))
  );

  obsArray.push(observable);

  observable.subscribe((minute: number) => {
    updateMinutesLabel(match, minute);

    if (minute === 0) updateGoalLabel(match, homeGoals, guestGoals);

    if (minute === homeGoalsMin[0]) {
      homeGoals++;
      updateGoalLabel(match, homeGoals, guestGoals);
      homeGoalsMin.shift();
    }

    if (minute === guestGoalsMin[0]) {
      guestGoals++;
      updateGoalLabel(match, homeGoals, guestGoals);
      guestGoalsMin.shift();
    }
  });
};

export const waitSimulation = (): void => {
  if (obsArray.length === 0) return;

  forkJoin(obsArray).subscribe(() => {
    setTimeout(() => {
      checkTicket();
    }, 300);
    obsArray.length = 0;
  });
};

const getGoalMinutes = (maxRange: number): number[] => {
  const goalsNum = getRandomNum(0, MAX_NUM_GOALS);
  let goalMinutes: number[] = [];

  if (goalsNum !== 0) {
    for (let i = 0; i < goalsNum; i++) {
      goalMinutes.push(getRandomNum(0, maxRange));
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
