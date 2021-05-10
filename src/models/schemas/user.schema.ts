import mongoose from "mongoose";
import { BaseDocument } from "../base.model";
import { rolesEnum } from "../enums";
import { UserDocumentJSON } from "../interfaces/IUser";

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type: {
        type: rolesEnum,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    secret: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const UserModel = mongoose.model<UserDocument>("user", UserSchema);
export interface UserDocument extends BaseDocument, UserDocumentJSON { }

