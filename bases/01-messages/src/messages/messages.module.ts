import { Module } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { MessagesController } from './messages.controller';
import { MessageService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessageService, MessageRepository]
})
export class MessagesModule {}
