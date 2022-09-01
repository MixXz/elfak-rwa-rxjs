import { drawDashboard } from "./view/matchView";
import { handleSearch, loadMatches } from "./logic/matchTableLogic";
import { getStake } from "./logic/ticketLogic";

drawDashboard(document.body);
loadMatches();
getStake();
handleSearch();