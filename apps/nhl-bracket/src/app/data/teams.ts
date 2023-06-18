import {Team} from "../models/team";
import {Division} from "../models/division";

export const TEAMS: Team[] = [
  // Atlantic
  new Team(0, "Boston Bruins", [91, 93, 87, 3, 2], Division.ATLANTIC),
  new Team(1, "Buffalo Sabres", [88, 87, 82, 0, 2], Division.ATLANTIC),
  new Team(2, "Detroit Red Wings",[91, 88, 87, 2, 2], Division.ATLANTIC),
  new Team(3, "Montreal Canadiens", [90, 84, 81, 1, 1], Division.ATLANTIC),
  new Team(4, "Florida Panthers", [90, 87, 89, 2, 2], Division.ATLANTIC),
  new Team(5, "Ottawa Senators", [89, 86, 84, 1, 4], Division.ATLANTIC),
  new Team(6, "Tampa Bay Lightning",[92, 92, 93, 4, 1], Division.ATLANTIC),
  new Team(7, "Toronto Maple Leafs",[92, 92, 85, 2, 4], Division.ATLANTIC),

  // Central
  new Team(10, "Arizona Coyotes", [82, 85, 79, 0, 1], Division.CENTRAL),
  new Team(11, "Chicago Blackhawks", [85, 86, 77, 1, 1], Division.CENTRAL),
  new Team(12, "Colorado Avalanche", [89, 97, 85, 3, 2], Division.CENTRAL),
  new Team(13, "Dallas Stars", [88, 89, 86, 2, 3], Division.CENTRAL),
  new Team(14, "Minnesota Wild", [89, 90, 85, 1, 2], Division.CENTRAL),
  new Team(15, "St. Louis Blues", [90, 90, 84, 2, 4], Division.CENTRAL),
  new Team(16, "Winnipeg Jets", [87, 89, 88, 1, 3], Division.CENTRAL),
  new Team(17, "Nashville Predators", [90, 92, 88, 3, 2], Division.CENTRAL),

  // Pacific
  new Team(20, "Anaheim Ducks", [88, 87, 90, 1, 2], Division.PACIFIC),
  new Team(21, "Calgary Flames", [89, 91, 90, 3, 2], Division.PACIFIC),
  new Team(22, "Edmonton Oilers", [93, 85, 84, 2, 2], Division.PACIFIC),
  new Team(23, "Los Angeles Kings", [81, 89, 85, 0, 5], Division.PACIFIC),
  new Team(24, "San Jose Sharks", [87, 83, 86, 0, 2], Division.PACIFIC),
  new Team(25, "Seattle Kraken", [86, 87, 82, 0, 2], Division.PACIFIC),
  new Team(26, "Vancouver Canucks", [89, 88, 85, 1, 3], Division.PACIFIC),
  new Team(27, "Vegas Golden Knights", [89, 91, 87, 2, 2], Division.PACIFIC),

  // Metropolitan
  new Team(30, "Carolina Hurricanes", [94, 92, 90, 2, 2], Division.METROPOLITAN),
  new Team(31, "Columbus Blue Jackets", [92, 89, 84, 1, 3], Division.METROPOLITAN),
  new Team(32, "New Jersey Devils", [91, 89, 87, 0, 2], Division.METROPOLITAN),
  new Team(33, "New York Islanders", [86, 92, 90, 2, 2], Division.METROPOLITAN),
  new Team(34, "New York Rangers", [89, 90, 92, 4, 1], Division.METROPOLITAN),
  new Team(35, "Philadelphia Flyers", [86, 90, 82, 0, 2], Division.METROPOLITAN),
  new Team(36, "Pittsburgh Penguins", [92, 91, 86, 2, 3], Division.METROPOLITAN),
  new Team(37, "Washington Capitals", [91, 89, 84, 2, 3], Division.METROPOLITAN),
];
