import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RoomBookService } from '../services/room-book.service';
import { BookRoomDTO } from '../dtos/book-room.dto';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { Result } from 'src/backoffice/models/result.model';
import { BookRoomCommand } from '../commands/book-room.command';

@Controller('v1/rooms')
export class AgendaController {
  constructor(private readonly service: RoomBookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async Book(@Req() request, @Body() model: BookRoomDTO) {
    try {
      const command = new BookRoomCommand(
        request.user,
        model.roomId,
        model.date,
      );
      await this.service.Book(command);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível reservar sua sala', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
