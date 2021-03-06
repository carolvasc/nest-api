import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomBookService } from './services/room-book.service';
import { RoomRepository } from './repositories/room.repository';
import { CommandHandlers } from './commands/handlers';
import { AgendaController } from './controllers/agenda.controller';
import { EventHandlers } from './events/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [AgendaController],
  providers: [
    RoomBookService,
    RoomRepository,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class AgendaModule {}
