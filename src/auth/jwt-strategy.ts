import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserRepository } from './user.repository';
import { UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: require('config').get('jwt.secret')
        })
    }

    async validate(payload: JwtPayload) {
        const { username } = payload
        const user = await this.userRepository.findOne({ username })
        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}