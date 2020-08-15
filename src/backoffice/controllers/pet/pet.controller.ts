import {
  Controller,
  Post,
  UseInterceptors,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreatePetContract } from 'src/backoffice/contracts/pet/create-pet.contract';
import { Pet } from 'src/backoffice/models/pet.model';
import { Result } from 'src/backoffice/models/result.model';
import { PetService } from 'src/backoffice/services/pet.service';

@Controller('v1/pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post(':document')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(@Param('document') document: string, @Body() model: Pet) {
    try {
      await this.petService.create(document, model);

      return new Result('Seu pet adicionado com sucesso!', model, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível criar seu pet', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(
    @Param('document') document: string,
    @Param('id') id: string,
    @Body() model: Pet,
  ) {
    try {
      await this.petService.update(document, id, model);

      return new Result('Seu pet foi atualizado com sucesso!', model, [], true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível atualizar seu pet', null, error, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
