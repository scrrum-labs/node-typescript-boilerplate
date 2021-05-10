import * as bcryptjs from "bcryptjs";
import * as jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export class Utilities {

    constructor() {
    }

    public hashPassword(secret: string) {
        const encPassword = bcryptjs.hashSync(secret, 10);
        return encPassword;
    }

    public generateToken(req: any) {
        const token = jwt.sign({
            name: req.name,
            email: req.email,
            type: req.type,
            username: req.username,
            isActive: req.isActive,
            isDeleted: req.isDeleted,
            _id: req._id,
            createdAt: req.createdAt,
            updatedAt: req.updatedAt,
            __v: req.__v

        }, process.env.JWT_TOKEN_KEY);
        return token;
    }

    public validatePassword(hashPassword: string, password: string) {
        const isValid = bcryptjs.compareSync(password, hashPassword);
        return isValid;
    }

    public async findInvoice(fileName: string) {
        const filePath = path.join(__dirname, "../../public/assets/invoices/");
        let result: any;
        const file = fs.readFileSync(`${filePath}${fileName}`);

        if (!file) {
            result = "No File Exist";
        } else {
            result = fs.createReadStream(file);
        }

        return await result;
    }
}