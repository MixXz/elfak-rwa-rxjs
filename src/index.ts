import { drawDashboard } from "./view/drawFunctions";
import { loadMatches } from "./logic/matchTableLogic";
import { getStake } from "./logic/ticketLogic";

drawDashboard(document.body);
loadMatches();
getStake();