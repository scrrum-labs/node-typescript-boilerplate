import { Body, Get, Post, Request, Route, Tags } from "tsoa";
import { IRequest } from "../../models/interfaces/common/IRequest";
import { SuccessResponseWrapped } from "../../models/interfaces/common/IResponse";
import { UserDocumentJSON } from "../../models/interfaces/IUser";
import { UserReequest } from "../../models/requests/user.request";
import { UserService } from "../../services/user.service";
import { BaseController } from "../base.controller";

@Tags("User")
@Route("user")
export class UserController extends BaseController {

    userService: UserService;

    constructor() {
        super();
        this.userService = new UserService();
    }

    @Post("/add")
    public async addUser(@Request() req: IRequest, @Body() reqBody: UserReequest): Promise<SuccessResponseWrapped<UserDocumentJSON>> {
        const user = await this.userService.addUser(reqBody);
        return this._successResponse(req, user, "User Added Successfully", 200);
    }

    @Post("/login")
    public async login(@Request() req: IRequest, @Body() reqBody: {username: string, secret: string}): Promise<SuccessResponseWrapped<UserDocumentJSON>> {
        const user = await this.userService.login(reqBody);
        return this._successResponse(req, user, "Successfully Logged In", 200);
    }


}