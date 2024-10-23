import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretkey',
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.catsRepository.findUserByPk(payload.sub);

    if (!user) {
      throw new UnauthorizedException('해당하는 유저가 없습니다.');
    }

    return user;
  }
}
