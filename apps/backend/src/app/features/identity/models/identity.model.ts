import {User} from "@prisma/client";

export interface Identity {
  userUuid: string;
  sessionUuid: string;
  accessToken: string;
}
