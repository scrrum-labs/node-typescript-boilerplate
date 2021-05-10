import mongoose from "mongoose";
import { BaseDocument } from "../base.model";
import { IClientDocumentJSON } from "../interfaces/IContact";

export const clientSchema = new mongoose.Schema({

}, {
    timestamps: true
});

export const ClientModel = mongoose.model<IClientDocument>("client", clientSchema);
export interface IClientDocument extends BaseDocument, IClientDocumentJSON {}