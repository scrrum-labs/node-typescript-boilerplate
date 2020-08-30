import { Route, Get, Tags, Query, Security, Post, Request, Body, Header, Put, Response, Delete, Example, SuccessResponse, Path } from "tsoa";
import App from '../../app';
import { BaseController } from '../base.controller';

@Tags('Chat')
@Route('/chat')
export class ChatController extends BaseController {

    @Get('/connect')
    public async connect() {
        const socketResult = await App.io.on('connect', (socket: any) => {
            console.log(socket)
            return socket;
        })
        this._successResponse('', socketResult, 'Connected', 200, 1);
    }

    @Get('/disconnect')
    public async disconnect() {

    }
    
}