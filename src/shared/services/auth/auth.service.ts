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
    const user: JwtPayload = { username: 'teste@email.com' };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.accountService.findOneByUsername(payload.username);
  }
}
