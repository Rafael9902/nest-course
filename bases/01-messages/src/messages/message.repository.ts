import { Injectable } from "@nestjs/common";
import { readFile, readFileSync, writeFile, writeFileSync } from "fs";

@Injectable()
export class MessageRepository {

    async  findOne(id: string) {
        const content = readFileSync('messages.json', 'utf-8');
        const messages = JSON.parse(content);

        return messages[id];
    }

    async findAll() {
        const content = readFileSync('messages.json', 'utf-8');
        const messages = JSON.parse(content);

        return messages;
    }

    async create(content: string) {
        const contents = readFileSync('messages.json', 'utf-8');
        const messages = JSON.parse(contents);
        const id = Math.random() * 999;

        messages[id] = { id, content };

        writeFileSync('messages.json', JSON.stringify(messages));
    }

}