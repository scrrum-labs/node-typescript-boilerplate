import { Body, Delete, Get, Path, Post, Put, Request, Route, Tags } from "tsoa";
import { IRequest } from "../../models/interfaces/common/IRequest";
import { SuccessResponseWrapped } from "../../models/interfaces/common/IResponse";
import { BaseController } from "../base.controller";

@Tags("Client")
@Route("client")
export class ClientController extends BaseController {
    constructor() {
        super();
    }

    @Get("/")
    public async getClientList(@Request() req: IRequest): Promise<SuccessResponseWrapped<any>> {
        
        return this._successResponse(req, "", "", 201);
    }

    @Get("{id}")
    public async getClientDetail(@Request() req: IRequest, @Path() id: string): Promise<SuccessResponseWrapped<any>> {
        
        return this._successResponse(req, "", "", 201);
    }

    @Post("/")
    public async addClient(@Request() req: IRequest, @Body() reqBody: any): Promise<SuccessResponseWrapped<any>> {
        
        return this._successResponse(req, "", "", 201);
    }

    @Put("{id}")
    public async updateClientDetail(@Request() req: IRequest, @Path() id: string, @Body() reqBody: any): Promise<SuccessResponseWrapped<any>> {
        
        return this._successResponse(req, "", "", 201);
    }

    @Delete("{id}")
    public async deleteClient(@Request() req: IRequest, @Path() id: string): Promise<SuccessResponseWrapped<any>> {
        
        return this._successResponse(req, "", "", 201);
    }
}