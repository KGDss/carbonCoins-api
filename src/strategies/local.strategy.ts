import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/module/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  //*local strategy
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser({ username, password });
    if (!user) {
      throw new HttpException(
        'Wrong username or password please try again',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }
}
