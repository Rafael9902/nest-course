import { Injectable } from "@nestjs/common";
import { MessageRepository } from "./message.repository";

@Injectable()
export class MessageService {    

    constructor(private _messagesRepository: MessageRepository){}

    findOne(id: string) {
        return this._messagesRepository.findOne(id);
    }

    findAll() {
        return this._messagesRepository.findAll();
    }

    create(content: string) {
        return this._messagesRepository.create(content);
    }

}