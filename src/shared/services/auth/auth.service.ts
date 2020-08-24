import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/backoffice/services/account.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(
    document: string,
    email: string,
    image: string,
    roles: string[],
  ) {
    const user: JwtPayload = { document, email, image, roles };

    return this.jwtService.sign(user);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // NOTE: Fazer chamadas ao banco apenas quando for realmente
    // necessário para nao ficar muito custoso
    // return await this.accountService.findOneByUsername(payload.document);
    return payload;
  }
}
