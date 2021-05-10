import { IClientDocumentJSON } from "../models/interfaces/IContact";
import { ClientModel, IClientDocument } from "../models/schemas/client.schema";
import { BaseService } from "./base.service";

export class ClientService extends BaseService <IClientDocument, IClientDocumentJSON> {
    constructor() {
        super();
        this.Model = ClientModel;
    }
}