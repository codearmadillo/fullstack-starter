import {Division} from "./division";

export enum Conference {
  EAST = Division.ATLANTIC | Division.METROPOLITAN,
  WEST = Division.CENTRAL | Division.PACIFIC
}
