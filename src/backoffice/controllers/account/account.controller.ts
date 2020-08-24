import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Result } from 'src/backoffice/models/result.model';
import { AccountService } from 'src/backoffice/services/account.service';
import { AuthenticateDTO } from 'src/backoffice/dtos/account/authenticate.dto';
import { ResetPasswordDTO } from 'src/backoffice/dtos/account/reset-password.dto';
import { Guid } from 'guid-typescript';
import { request } from 'http';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { ChangePasswordDTO } from 'src/backoffice/dtos/account/change-password.dto';

@Controller('v1/accounts')
export class AccountController {
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
  ) {}

  @Post('authenticate')
  async authenticate(@Body() model: AuthenticateDTO): Promise<any> {
    const customer = await this.accountService.authenticate(
      model.username,
      model.password,
    );

    if (!customer) {
      throw new HttpException(
        new Result('Usuário ou senha inválidos', null, null, false),
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!customer.user.active) {
      throw new HttpException(
        new Result('Usuário inativo', null, null, false),
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.authService.createToken(
      customer.document,
      customer.email,
      '',
      customer.user.roles,
    );

    return new Result('Usuário autenticado com sucesso', token, [], true);
  }

  @Post('reset-password')
  async resetPassword(@Body() model: ResetPasswordDTO): Promise<any> {
    try {
      // TODO: Enviar e-mail
      const password = Guid.create()
        .toString()
        .substring(0, 8)
        .replace('-', '');

      await this.accountService.update(model.document, { password });

      return new Result('Senha atualizada com sucesso!', null, null, true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível restaurar sua senha.', null, null, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Req() request,
    @Body() model: ChangePasswordDTO,
  ): Promise<any> {
    try {
      // TODO: Criptografar senha
      await this.accountService.update(request.user.document, {
        password: model.newPassword,
      });

      return new Result('Senha atualizada com sucesso!', null, null, true);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível atualizar sua senha.', null, null, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() request): Promise<any> {
    const token = await this.authService.createToken(
      request.user.document,
      request.user.email,
      request.user.image,
      request.user.roles,
    );

    return new Result(null, token, null, true);
  }
}
