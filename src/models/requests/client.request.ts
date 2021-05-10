import { IContact } from "../interfaces/IContact";

export interface IClientRequest {
    name: string;
    city: string;
    state: string;
    country: string;
    contact: IContact;
}