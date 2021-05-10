import { BaseDocument } from "../base.model";
import { roles } from "../enums";

export interface IUser {
    name: string;
    email: string;
    type: roles;
    username: string;
    secret: string;
    isActive: boolean;
}

export interface UserDocumentJSON extends BaseDocument, IUser {}
