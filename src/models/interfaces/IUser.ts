import { BaseDocument } from "../base.model";
import { rolesEnum } from "../enums";

export interface IUser {
    name: string;
    email: string;
    type: rolesEnum;
    username: string;
    secret: string;
    isActive: boolean;
}

export interface UserDocumentJSON extends BaseDocument, IUser { }
