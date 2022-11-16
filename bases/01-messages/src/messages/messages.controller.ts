import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { createMessageDto } from './dtos/create-message-dto';
import { MessageService } from './messages.service';
@Controller('messages')
export class MessagesController {

    constructor(private _messagesService: MessageService) {}

    @Get("list")
    public listMessages(): any {
        return this._messagesService.findAll();
    }

    @Get(":id")
    async getMessage(@Param('id') id: string) {
        const message = await this._messagesService.findOne(id);

        if(!message) throw new NotFoundException("Message Not Found");
        return message
    }

    @Post("save")   
    public createMessages(@Body() body: createMessageDto): any {
        //const { content } = body;
        return this._messagesService.create(body.content);
    }
}   
