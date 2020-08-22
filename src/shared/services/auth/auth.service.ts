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

  async createToken() {
    const user: JwtPayload = {
      document: '1234556789',
      email: 'carol@email.com',
      image: 'assets/images/user.png',
      roles: ['admin'],
    };

    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // NOTE: Fazer chamadas ao banco apenas quando for realmente
    // necessário para nao ficar muito custoso
    // return await this.accountService.findOneByUsername(payload.document);
    return payload;
  }
}
