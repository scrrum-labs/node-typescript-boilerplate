import { BaseDocument } from "../base.model";

export interface IClient {
    name: string;
    city: string;
    state: string;
    country: string;
    contact: IContact;
}

export interface IContact { 
    name: string;
    email: string;
    phone: string;
}

export interface IClientDocumentJSON extends BaseDocument, IClient {}