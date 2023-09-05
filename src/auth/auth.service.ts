import { Injectable } from "@nestjs/common";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "src/auth/dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async signIn(dto: AuthDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })
        if(!user){
            throw new Error("User is not exist!");
        }

        const comparePassword = await argon.verify(user.password, dto.password) 
        if(!comparePassword){
            throw new Error("Password is not correct!");
        }
        return this.signToken(user.id, user.email)
    }

    async signUp(dto: AuthDto){
        const hash = await argon.hash(dto.password)
        try{
            const user = await this.prisma.user.create({
            data:{
                email: dto.email,
                password: hash
            }
        })
        return user
        }catch(err){
            throw err
        }
    }

    async signToken(userId: number, email: string): Promise<{access_token: string}>{
        const payload = {
            sub:userId,
            email
        }

        const token = await this.jwt.signAsync(payload,{
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
        })

        return {
            access_token:token
        }
    }
}