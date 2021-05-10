import fs from "fs";
import path from "path";
import pdfDoc from "pdfkit";
import { UploadInvoiceService } from "./uploadInvoice.azure";

export class InvoiceService {

    uploadInvoiceService: UploadInvoiceService;

    constructor() {
        this.uploadInvoiceService = new UploadInvoiceService();
    }

    public createInvoice(invoice: any, fileName: string) {
        const filePath = `${path.join(__dirname, `../../public/assets/invoices/`)}`;
        this.checkDirectiveExist(filePath);
        const invoiceDoc = new pdfDoc({ margin: 50 });
        this.generateHeader(invoiceDoc);
        this.generateCustomerInformation(invoiceDoc, invoice);
        this.generateInvoiceTable(invoiceDoc, invoice);
        // this.generateFooter(invoiceDoc);

        invoiceDoc.end();
        invoiceDoc.pipe(fs.createWriteStream(`${filePath}${fileName}`));
        this.uploadInvoiceService.uploadInvoice(`${filePath}${fileName}`, fileName);
    }

    private checkDirectiveExist(path: string) {
        if (!fs.existsSync(path)) {
            fs.mkdir(path, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Directive Created");
                }
            });
        }
    }

    private generateHeader(doc: PDFKit.PDFDocument) {
        doc
            .image(path.join(__dirname, "../../public/assets/images/logo.png"), 50, 45, { width: 50 })
            .fillColor("#444444")
            .fontSize(20)
            .text("SL Accounting", 110, 57)
            .fontSize(10)
            .text("We-start co-working space", 200, 65, { align: "right" })
            .text("2E/25, Jhandewalan Extension", 200, 80, { align: "right" })
            .text("New Delhi, Delhi 110055", 200, 95, { align: "right" })
            .moveDown();

        // this.generateHr(doc, 252);
    }

    private generateCustomerInformation(doc: PDFKit.PDFDocument, invoice: any) {

        doc
            .fillColor("#444444")
            .fontSize(20)
            .text("Invoice", 50, 160);

        this.generateHr(doc, 185);

        const customerInformationTop = 200;

        doc
            .fontSize(10)
            .text("Invoice Number:", 50, customerInformationTop)
            .font("Helvetica-Bold")
            .text(invoice.invoice.invoiceNumber, 150, customerInformationTop)
            .font("Helvetica")
            .text("Reference Number:", 50, customerInformationTop + 15)
            .text(invoice.invoice.referenceNumber, 150, customerInformationTop + 15)
            .text("Total Amount:", 50, customerInformationTop + 30)
            .text(
                invoice.totalAmount,
                150,
                customerInformationTop + 30
            )
            .text("Tax Amount:", 50, customerInformationTop + 45)
            .text(
                invoice.taxAmount,
                150,
                customerInformationTop + 45
            )
            .text("Final Amount:", 50, customerInformationTop + 60)
            .text(
                invoice.finalAmount,
                150,
                customerInformationTop + 60
            )
            .text("Balance Due:", 50, customerInformationTop + 75)
            .text(
                this.formatCurrency(invoice.finalAmount - invoice.totalAmount),
                150,
                customerInformationTop + 75
            )

            .moveDown();

        this.generateHr(doc, customerInformationTop + 90);
    }

    private generateInvoiceTable(doc: PDFKit.PDFDocument, invoice: any) {
        let i;
        const invoiceTableTop = 330;

        doc.font("Helvetica-Bold");
        this.generateTableRow(
            doc,
            invoiceTableTop,
            "Item",
            "Quantity",
            "Amount",
            "Tax",
            "Total"
        );
        this.generateHr(doc, invoiceTableTop + 20);
        doc.font("Helvetica");

        for (i = 0; i < invoice.items.length; i++) {
            const item = invoice.items[i];
            const position = invoiceTableTop + (i + 1) * 30;
            this.generateTableRow(
                doc,
                position,
                item.name,
                item.quantity,
                item.amount,
                item.tax,
                item.totalAmount
            );

            this.generateHr(doc, position + 20);
        }

        const subtotalPosition = invoiceTableTop + (i + 1) * 30;
        this.generateTableRow(
            doc,
            subtotalPosition,
            "",
            "",
            "Subtotal",
            "",
            invoice.totalAmount
        );

        const totalTaxPosition = subtotalPosition + 20;
        this.generateTableRow(
            doc,
            totalTaxPosition,
            "",
            "",
            "Tax Amount",
            "",
            invoice.taxAmount
        );

        const finalAmountPosition = totalTaxPosition + 25;
        doc.font("Helvetica-Bold");
        this.generateTableRow(
            doc,
            finalAmountPosition,
            "",
            "",
            "Final Amount",
            "",
            invoice.finalAmount
        );
        doc.font("Helvetica");

    }

    private generateFooter(doc: PDFKit.PDFDocument) {
        doc
            .fontSize(10)
            .text(
                "Payment is due within 15 days. Thank you for your business.",
                50,
                780,
                { align: "center", width: 500 }
            );
    }


    private generateTableRow(doc: PDFKit.PDFDocument, y: number, item: string, quantity: string, amount: string, tax: string, total: string) {
        doc
            .fontSize(10)
            .text(item, 50, y)
            .text(quantity, 150, y, { width: 90, align: "right" })
            .text(amount, 280, y, { width: 90, align: "right" })
            .text(tax, 370, y, { width: 90, align: "right" })
            .text(total, 460, y, { width: 90, align: "right" });
    }


    private generateHr(doc: PDFKit.PDFDocument, y: number) {
        doc
            .strokeColor("#aaaaaa")
            .lineWidth(1)
            .moveTo(50, y)
            .lineTo(550, y)
            .stroke();
    }

    private formatCurrency(cents: number) {
        return "INR" + (cents / 100).toFixed(2);
    }

    formatDate(date: Date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return year + "-" + month + "-" + day;
    }

}