import { IRequest } from "../models/interfaces/common/IRequest";
import * as jwt from "jsonwebtoken";

export async function expressAuthentication(request: IRequest, securityName: string, scopes?: string[]): Promise<any> {
    if (securityName === "apiKey") {
        if (request.header("Authorization")) {
            const token = request.header("Authorization").split(" "); // Bearer Token
            return new Promise((reject, resolve) => {
                if (!token) {
                    reject(new Error("No Token Provided"));
                } else if (token && token.length === 2) {
                    jwt.verify(token[1], process.env.JWT_TOKEN_KEY, (err: any, decoded: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            // for (const scope of scopes) {
                            //     if (!decoded.scopes.includes(scope)) {
                            //         reject(new Error("JWT does not contain required scope."));
                            //     }
                            // }
                            resolve(decoded);
                        }
                    });
                } else {
                    throw new Error("ForBidden");
                }
            });
        } else {
            throw new Error("ForBidden");
        }
    }
}
