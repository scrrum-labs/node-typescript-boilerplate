import { rolesEnum, teamsEnum } from "../enums";

export interface UserReequest {
    name: string;
    role: rolesEnum;
    team: teamsEnum;
    username: string;
    secret: string;
}