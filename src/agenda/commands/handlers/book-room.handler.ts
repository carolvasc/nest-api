import { BookRoomCommand } from '../book-room.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RoomRepository } from '../../repositories/room.repository';

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
  constructor(private readonly repository: RoomRepository) {}

  async execute(command: BookRoomCommand) {
    console.log('BookRoomHandler:execute - Executando o comando...');

    const room = await this.repository.findOneById(command.customerId);
    room.book(command.customerId);
  }
}
