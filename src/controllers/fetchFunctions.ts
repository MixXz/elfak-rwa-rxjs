import { from, Observable } from "rxjs";
import { SERVER_ADDRESS } from "../constants";
import { Match } from "../models/match";

export const getMatches = (): Observable<Match[]> => {
  const promise: Promise<Match[]> = fetch(`${SERVER_ADDRESS}/matches`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("No matches found!");
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.error(err);
    });
  return from(promise);
};

export const getMatchesByQuery = (query: string): Observable<Match[]> => {
  const promise: Promise<Match[]> = fetch(
    `${SERVER_ADDRESS}/matches?q=${query}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("No matches found!");
      } else {
        return res.json();
      }
    })
    .catch((err) => console.error(err));
  return from(promise);
};
