import {
  Controller,
  Get,
  UseGuards,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { RoleInterceptor } from 'src/interceptors/role.interceptor';

@Controller('v1/accounts')
export class AccountController {
  constructor(private authService: AuthService) {}

  @Post('')
  async createtoken(): Promise<any> {
    return await this.authService.createToken();
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor(['client']))
  findAll() {
    return [];
  }
}
