import { Route, Get, Tags, Query, Security, Post, Request, Body, Header, Put, Response, Delete, Example, SuccessResponse, Path } from "tsoa";
import { BaseController } from '../base.controller';
import { ChatService } from '../../services/v1/chat.service';

@Tags('Chat')
@Route('/chat')
export class ChatController extends BaseController {

    @Get('/connect')
    public async connect() {
        const socketResult = new ChatService().connectSocket();
        this._successResponse('', socketResult, 'Connected', 200, 1);
    }

    @Get('/disconnect')
    public async disconnect() {
        const socketResult = new ChatService().disconnectSocket();
        this._successResponse('', socketResult, 'Dis-Connected', 200, 1);
    }
    
}