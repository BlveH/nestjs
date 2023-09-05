import { Injectable } from "@nestjs/common";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "src/dto";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService) {}

    siginIn(){
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
}