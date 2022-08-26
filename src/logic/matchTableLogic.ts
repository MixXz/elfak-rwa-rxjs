import { finalize, from, interval, take } from "rxjs";
import { getMatches } from "../controllers/controller";
import { Match } from "../interfaces/Match";
import { drawMatch } from "../view/drawFunctions";

export function loadMatches() {
  getMatches().subscribe((matches) =>
    matches.forEach((match) => {
      drawMatch(match);
    })
  );
}
export function simulateMinutes(match: Match) {
  const randomMinutes: number = Math.floor(Math.random() * 10 + 1) + 90;

  let homeGoalsMin: number[] = getGoalMinutes(
    Math.floor(Math.random() * 4),
    randomMinutes
  );
  let guestGoalsMin: number[] = getGoalMinutes(
    Math.floor(Math.random() * 4),
    randomMinutes
  );

  let homeGoals = 0;
  let guestGoals = 0;

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
      finalize(() => {
        const ticketPairDiv: HTMLElement = document.getElementById(
          `pair${match.id}`
        );
        ticketPairDiv.style.backgroundColor =
          match.result === match.outcome ? "green" : "red";
      })
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
}

function getGoalMinutes(numOfGoals: number, maxRange: number): number[] {
  let goalMinutes: number[] = [];
  if (numOfGoals !== 0) {
    for (let i = 0; i < numOfGoals; i++) {
      goalMinutes.push(Math.floor(Math.random() * maxRange));
    }
  }
  goalMinutes.sort((a, b) => a - b);
  return goalMinutes;
}
