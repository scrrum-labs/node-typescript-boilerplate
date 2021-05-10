import azure from "azure-storage";
import { response } from "express";
import fs from "fs";
export class UploadInvoiceService {

    private readonly containerName = "dev";
    private blobService = azure.createBlobService();

    public uploadInvoice(filePath: string, fileName: string) {
        this.createContainer();
        // this.blobService.createBlockBlobFromLocalFile(this.containerName, fileName, filePath, (err: any, result: any, resposne: any) => {
        //     if (err) {
        //         console.log("unable to upload file", err);
        //         return;
        //     }
        //     console.log("Invoice Uploaded Successfully", result, response);
        // });
        const file = fs.readFileSync(filePath);
        const stream = fs.createReadStream(filePath, { highWaterMark: 16 });
        const streamLength = file.buffer.byteLength;

        this.blobService.createBlockBlobFromStream(this.containerName, fileName, stream, streamLength, (err: any, result: any, resposne: any) => {
            if (err) {
                console.log("unable to upload file", err);
                return;
            }
            console.log("Invoice Uploaded Successfully", result, response);
        });
    }

    private createContainer() {
        this.blobService.createContainerIfNotExists(this.containerName, {
            publicAccessLevel: "blob"
        }, (err: any, result: any, resposne: any) => {

        });
    }

}