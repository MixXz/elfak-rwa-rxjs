export interface Match {
  id: string;
  homeTeam: string;
  guestTeam: string;
  homeTeamOdd: number;
  guestTeamOdd: number;
  tiedOdd: number;
  outcome: string;
  result: string;
  length: number;
  ended: boolean;
}
