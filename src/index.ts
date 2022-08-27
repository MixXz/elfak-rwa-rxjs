import { drawDashboard } from "./view/drawFunctions";
import { loadMatches, search } from "./logic/matchTableLogic";
import { getStake } from "./logic/ticketLogic";

drawDashboard(document.body);
loadMatches();
getStake();
search();