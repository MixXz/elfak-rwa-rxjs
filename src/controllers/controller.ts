import { from, Observable } from "rxjs";
import { Match } from "../interfaces/Match";
import { SERVER_ADDRESS } from "../helper";

export function getMatches(): Observable<Match[]> {
  const promise = fetch(`${SERVER_ADDRESS}/matches`)
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
}
